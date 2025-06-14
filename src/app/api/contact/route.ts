import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactSchema, formatValidationErrors } from '@/lib/validations'
import { siteConfig } from '@/config/site'

const resend = new Resend(process.env.RESEND_API_KEY)

// Simple in-memory rate limiting (in production, use Redis or a database)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>()
const RATE_LIMIT_MAX_REQUESTS = 3
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour in milliseconds

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const userEntry = rateLimitMap.get(ip)

  if (!userEntry) {
    rateLimitMap.set(ip, { count: 1, timestamp: now })
    return true
  }

  if (now - userEntry.timestamp > RATE_LIMIT_WINDOW) {
    // Reset the count if the time window has passed
    rateLimitMap.set(ip, { count: 1, timestamp: now })
    return true
  }

  if (userEntry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false
  }

  userEntry.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.' 
        },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validationResult = contactSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Ungültige Eingabedaten',
          details: formatValidationErrors(validationResult.error)
        },
        { status: 400 }
      )
    }

    const { name, email, phone, subject, message, service, preferredDate, preferredTime } = validationResult.data

    // Check if required environment variables are set
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { 
          success: false, 
          error: 'E-Mail-Service ist nicht konfiguriert' 
        },
        { status: 500 }
      )
    }

    if (!process.env.CONTACT_EMAIL) {
      console.error('CONTACT_EMAIL is not configured')
      return NextResponse.json(
        { 
          success: false, 
          error: 'Empfänger-E-Mail ist nicht konfiguriert' 
        },
        { status: 500 }
      )
    }

    // Determine if this is an appointment request
    const isAppointmentRequest = service && preferredDate && preferredTime

    // Email template for the business owner
    const businessEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #D4AF37, #B8860B); color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">${siteConfig.name}</h1>
          <h2 style="margin: 10px 0 0 0; font-weight: normal;">
            ${isAppointmentRequest ? 'Neue Terminanfrage' : 'Neue Kontaktanfrage'}
          </h2>
        </div>
        
        <div style="padding: 30px; background-color: #f9f9f9;">
          <h3 style="color: #333; margin-top: 0;">Kundendaten:</h3>
          <ul style="list-style: none; padding: 0; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <li style="margin-bottom: 10px;"><strong>Name:</strong> ${name}</li>
            <li style="margin-bottom: 10px;"><strong>E-Mail:</strong> ${email}</li>
            ${phone ? `<li style="margin-bottom: 10px;"><strong>Telefon:</strong> ${phone}</li>` : ''}
            ${service ? `<li style="margin-bottom: 10px;"><strong>Service:</strong> ${service}</li>` : ''}
            ${preferredDate ? `<li style="margin-bottom: 10px;"><strong>Wunschtermin:</strong> ${preferredDate}</li>` : ''}
            ${preferredTime ? `<li style="margin-bottom: 10px;"><strong>Uhrzeit:</strong> ${preferredTime}</li>` : ''}
          </ul>

          <h3 style="color: #333; margin-top: 25px;">${isAppointmentRequest ? 'Terminanfrage' : 'Betreff'}:</h3>
          <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <p style="margin: 0; font-weight: bold; color: #D4AF37;">${subject}</p>
          </div>

          <h3 style="color: #333; margin-top: 25px;">Nachricht:</h3>
          <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="margin-top: 30px; padding: 20px; background: #D4AF37; color: white; border-radius: 8px; text-align: center;">
            <p style="margin: 0; font-weight: bold;">Schnell antworten:</p>
            <div style="margin-top: 15px;">
              <a href="mailto:${email}" style="display: inline-block; background: white; color: #D4AF37; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 0 5px; font-weight: bold;">E-Mail senden</a>
              ${phone ? `<a href="tel:${phone}" style="display: inline-block; background: white; color: #D4AF37; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 0 5px; font-weight: bold;">Anrufen</a>` : ''}
            </div>
          </div>
        </div>
      </div>
    `

    // Confirmation email template for the customer
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #D4AF37, #B8860B); color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">${siteConfig.name}</h1>
          <h2 style="margin: 10px 0 0 0; font-weight: normal;">Vielen Dank für Ihre Anfrage!</h2>
        </div>
        
        <div style="padding: 30px; background-color: #f9f9f9;">
          <p style="font-size: 16px; line-height: 1.6; margin-top: 0;">Liebe/r ${name},</p>
          
          <p style="font-size: 16px; line-height: 1.6;">
            vielen Dank für Ihr Interesse an ${siteConfig.name}! 
            ${isAppointmentRequest 
              ? 'Wir haben Ihre Terminanfrage erhalten und werden uns so schnell wie möglich bei Ihnen melden, um den Termin zu bestätigen.'
              : 'Wir haben Ihre Nachricht erhalten und werden uns so schnell wie möglich bei Ihnen melden.'
            }
          </p>

          <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin: 25px 0;">
            <h3 style="color: #D4AF37; margin-top: 0;">Ihre Anfrage:</h3>
            <p><strong>Betreff:</strong> ${subject}</p>
            ${service ? `<p><strong>Service:</strong> ${service}</p>` : ''}
            ${preferredDate ? `<p><strong>Wunschtermin:</strong> ${preferredDate} um ${preferredTime}</p>` : ''}
            <p style="margin-bottom: 0;"><strong>Nachricht:</strong></p>
            <p style="margin-top: 5px; color: #666; font-style: italic;">"${message}"</p>
          </div>

          <div style="background: #D4AF37; color: white; padding: 20px; border-radius: 8px; text-align: center;">
            <h3 style="margin-top: 0;">Kontakt für Rückfragen:</h3>
            <p style="margin: 5px 0;"><strong>Telefon:</strong> ${siteConfig.contact.phoneDisplay}</p>
            <p style="margin: 5px 0;"><strong>WhatsApp:</strong> ${siteConfig.contact.phoneDisplay}</p>
            <p style="margin: 5px 0;"><strong>E-Mail:</strong> ${siteConfig.contact.email}</p>
          </div>

          <p style="font-size: 14px; color: #666; margin-top: 25px; text-align: center;">
            Mit freundlichen Grüßen,<br>
            Ihr Team von ${siteConfig.name}
          </p>
        </div>
      </div>
    `

    // Send emails using Resend
    const [businessEmail, customerEmail] = await Promise.allSettled([
      // Email to business
      resend.emails.send({
        from: `${siteConfig.name} <noreply@${process.env.RESEND_DOMAIN || 'resend.dev'}>`,
        to: [process.env.CONTACT_EMAIL!],
        subject: `${isAppointmentRequest ? '🗓️ Neue Terminanfrage' : '📧 Neue Kontaktanfrage'} von ${name}`,
        html: businessEmailHtml,
        replyTo: email,
      }),
      
      // Confirmation email to customer
      resend.emails.send({
        from: `${siteConfig.name} <noreply@${process.env.RESEND_DOMAIN || 'resend.dev'}>`,
        to: [email],
        subject: `Bestätigung Ihrer ${isAppointmentRequest ? 'Terminanfrage' : 'Kontaktanfrage'} - ${siteConfig.name}`,
        html: customerEmailHtml,
      })
    ])

    // Check if emails were sent successfully
    const businessEmailSuccess = businessEmail.status === 'fulfilled'
    const customerEmailSuccess = customerEmail.status === 'fulfilled'

    if (!businessEmailSuccess) {
      console.error('Failed to send business email:', businessEmail.reason)
    }

    if (!customerEmailSuccess) {
      console.error('Failed to send customer email:', customerEmail.reason)
    }

    // Return success even if customer email fails (business email is more important)
    if (businessEmailSuccess) {
      return NextResponse.json({
        success: true,
        message: isAppointmentRequest 
          ? 'Terminanfrage erfolgreich gesendet! Wir melden uns bald bei Ihnen.'
          : 'Nachricht erfolgreich gesendet! Wir melden uns bald bei Ihnen.',
        customerEmailSent: customerEmailSuccess
      })
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: 'E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.' 
        },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' 
      },
      { status: 500 }
    )
  }
}

// Handle preflight requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
} 