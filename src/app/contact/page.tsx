'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, MessageCircle, X, User, AtSign, FileText, Send, Calendar, AlertCircle, CheckCircle } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { ContactFormData } from '@/lib/validations'
import GoogleMap from '@/components/GoogleMap'

interface FormState {
  data: ContactFormData
  errors: Record<string, string>
  isLoading: boolean
  isSuccess: boolean
  errorMessage: string
}

export default function Contact() {
  const [formState, setFormState] = useState<FormState>({
    data: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      service: '',
      preferredDate: '',
      preferredTime: ''
    },
    errors: {},
    isLoading: false,
    isSuccess: false,
    errorMessage: ''
  })

  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    setFormState(prev => ({ 
      ...prev, 
      isLoading: true, 
      errors: {}, 
      errorMessage: '',
      isSuccess: false 
    }))

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState.data),
      })

      const result = await response.json()

      if (result.success) {
        setFormState(prev => ({
          ...prev,
          isLoading: false,
          isSuccess: true,
          data: {
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
            service: '',
            preferredDate: '',
            preferredTime: ''
          }
        }))
      } else {
        if (result.details) {
          // Handle validation errors
          const fieldErrors: Record<string, string> = {}
          result.details.forEach((error: { field: string; message: string }) => {
            fieldErrors[error.field] = error.message
          })
          setFormState(prev => ({
            ...prev,
            isLoading: false,
            errors: fieldErrors
          }))
        } else {
          setFormState(prev => ({
            ...prev,
            isLoading: false,
            errorMessage: result.error || 'Ein Fehler ist aufgetreten'
          }))
        }
      }
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        isLoading: false,
        errorMessage: 'Netzwerkfehler. Bitte versuchen Sie es später erneut.'
      }))
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [name]: value
      },
      errors: {
        ...prev.errors,
        [name]: '' // Clear error when user starts typing
      }
    }))
  }

  // Öffnungszeiten Widget
  const OpeningHoursWidget = () => {
    const now = new Date()
    const day = now.getDay()
    const hour = now.getHours()
    
    const isOpen = (day >= 1 && day <= 5 && hour >= 9 && hour < 19) || // Mo-Fr 9-19
                   (day === 6 && hour >= 8 && hour < 17) // Sa 8-17
    
    return (
      <div className={`p-3 sm:p-4 rounded-lg ${isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-semibold text-sm sm:text-base">{isOpen ? 'Jetzt geöffnet' : 'Geschlossen'}</span>
        </div>
        <div className="text-xs sm:text-sm">
          <p>Mo - Fr: {siteConfig.businessHours.monday}</p>
          <p>Sa: {siteConfig.businessHours.saturday}</p>
          <p>So: {siteConfig.businessHours.sunday}</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-cream-white">
      {/* Floating WhatsApp Button */}
      <a
        href={siteConfig.social.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-green-500 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors group"
        aria-label="WhatsApp schreiben"
      >
        <MessageCircle size={20} className="sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
      </a>

      {/* WhatsApp Popup */}
      {isWhatsAppOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-4 sm:p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <h3 className="text-lg sm:text-xl font-semibold">WhatsApp Kontakt</h3>
              <button 
                onClick={() => setIsWhatsAppOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Schließen"
              >
                <X size={20} className="sm:w-6 sm:h-6" />
              </button>
            </div>
            <p className="mb-3 sm:mb-4 text-sm sm:text-base">
              Schreiben Sie uns eine WhatsApp-Nachricht für:
            </p>
            <ul className="list-disc list-inside mb-4 sm:mb-6 space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li>Terminvereinbarung</li>
              <li>Fragen zu unseren Services</li>
              <li>Preisanfragen</li>
              <li>Allgemeine Anfragen</li>
            </ul>
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full"
            >
              WhatsApp öffnen
            </a>
          </div>
        </div>
      )}

      <div className="container py-20 sm:py-24 md:py-28 lg:py-32">
        <h1 className="section-title">Kontakt</h1>
        
        {/* Termin vereinbaren Sektion */}
        <div className="bg-barbershop-gold text-pure-white rounded-xl p-6 sm:p-8 mb-8 sm:mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold mb-3 sm:mb-4">Termin vereinbaren</h2>
          <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6">
            Rufen Sie uns an oder schreiben Sie uns eine WhatsApp-Nachricht - 
            wir finden gemeinsam Ihren perfekten Termin!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a 
              href={`tel:${siteConfig.contact.phone}`} 
              className="btn bg-pure-white text-barbershop-gold hover:bg-cream-white font-semibold group"
              aria-label={`Anrufen: ${siteConfig.contact.phoneDisplay}`}
            >
              <span className="flex items-center justify-center gap-2 text-sm sm:text-base">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Jetzt anrufen: {siteConfig.contact.phoneDisplay}</span>
                <span className="sm:hidden">Anrufen</span>
              </span>
            </a>
            <a 
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-pure-white text-barbershop-gold hover:bg-cream-white font-semibold group"
              aria-label="WhatsApp schreiben"
            >
              <span className="flex items-center justify-center gap-2 text-sm sm:text-base">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                WhatsApp schreiben
              </span>
            </a>
          </div>
        </div>

        <div className="grid gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2">
          {/* Kontaktinformationen */}
          <div className="space-y-6 sm:space-y-8">
            <div className="card p-4 sm:p-6 md:p-8">
              <h3 className="text-xl sm:text-2xl font-serif font-semibold mb-4 sm:mb-6">Besuchen Sie uns</h3>
              <div className="space-y-4 sm:space-y-6">
                <OpeningHoursWidget />
                
                <div>
                  <h4 className="font-semibold mb-2 text-sm sm:text-base flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Adresse
                  </h4>
                  <address className="text-warm-gray text-sm sm:text-base not-italic">
                    {siteConfig.name}<br />
                    {siteConfig.contact.address.street}<br />
                    {siteConfig.contact.address.city}<br />
                    {siteConfig.contact.address.country}
                  </address>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 text-sm sm:text-base flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Kontakt
                  </h4>
                  <div className="space-y-1">
                    <p className="text-warm-gray text-sm sm:text-base">
                      Tel: <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-barbershop-gold transition-colors">{siteConfig.contact.phoneDisplay}</a>
                    </p>
                    <p className="text-warm-gray text-sm sm:text-base">
                      Email: <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-barbershop-gold transition-colors">{siteConfig.contact.email}</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <GoogleMap 
              className="card overflow-hidden rounded-xl shadow-lg" 
              height="320px"
            />
          </div>

          {/* Kontaktformular */}
          <div className="contact-form">
            <h2 className="text-xl sm:text-2xl font-serif font-semibold">Schreiben Sie uns</h2>
            <p className="subtitle">
              Haben Sie Fragen oder möchten Sie einen Termin vereinbaren? Wir freuen uns auf Ihre Nachricht!
            </p>
            
            {/* Success Message */}
            {formState.isSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns bald bei Ihnen.</span>
              </div>
            )}

            {/* Error Message */}
            {formState.errorMessage && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                <span>{formState.errorMessage}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-group">
                <label className="label flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formState.data.name}
                  onChange={handleInputChange}
                  required
                  className={`input ${formState.errors.name ? 'border-red-500' : ''}`}
                  placeholder="Ihr vollständiger Name"
                  disabled={formState.isLoading}
                />
                {formState.errors.name && (
                  <p className="text-red-500 text-sm mt-1">{formState.errors.name}</p>
                )}
              </div>
              
              <div className="form-group">
                <label className="label flex items-center gap-2">
                  <AtSign className="w-4 h-4" />
                  E-Mail *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formState.data.email}
                  onChange={handleInputChange}
                  required
                  className={`input ${formState.errors.email ? 'border-red-500' : ''}`}
                  placeholder="ihre@email.com"
                  disabled={formState.isLoading}
                />
                {formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">{formState.errors.email}</p>
                )}
              </div>

              <div className="form-group">
                <label className="label flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Telefon (optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formState.data.phone}
                  onChange={handleInputChange}
                  className={`input ${formState.errors.phone ? 'border-red-500' : ''}`}
                  placeholder="+43 660 123 45 67"
                  disabled={formState.isLoading}
                />
                {formState.errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{formState.errors.phone}</p>
                )}
              </div>

              <div className="form-group">
                <label className="label flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Service (optional)
                </label>
                <select
                  name="service"
                  value={formState.data.service}
                  onChange={handleInputChange}
                  className="input"
                  disabled={formState.isLoading}
                >
                  <option value="">Service auswählen</option>
                  <option value="Herrenschnitt">Herrenschnitt</option>
                  <option value="Traditionelle Rasur">Traditionelle Rasur</option>
                  <option value="Bart-Trimming">Bart-Trimming & Styling</option>
                  <option value="Komplett-Paket">Komplett-Paket</option>
                  <option value="Sonstiges">Sonstiges</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="label flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Betreff *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formState.data.subject}
                  onChange={handleInputChange}
                  required
                  className={`input ${formState.errors.subject ? 'border-red-500' : ''}`}
                  placeholder="Worum geht es?"
                  disabled={formState.isLoading}
                />
                {formState.errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{formState.errors.subject}</p>
                )}
              </div>
              
              <div className="form-group">
                <label className="label flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Nachricht *
                </label>
                <textarea
                  name="message"
                  value={formState.data.message}
                  onChange={handleInputChange}
                  required
                  className={`input textarea ${formState.errors.message ? 'border-red-500' : ''}`}
                  placeholder="Teilen Sie uns mit, wie wir Ihnen helfen können..."
                  disabled={formState.isLoading}
                />
                {formState.errors.message && (
                  <p className="text-red-500 text-sm mt-1">{formState.errors.message}</p>
                )}
              </div>
              
              <button 
                type="submit" 
                className="form-submit-btn group"
                disabled={formState.isLoading}
              >
                <span className="flex items-center justify-center gap-2">
                  {formState.isLoading ? 'Wird gesendet...' : 'Nachricht senden'}
                  {!formState.isLoading && (
                    <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
} 