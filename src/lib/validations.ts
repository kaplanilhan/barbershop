import { z } from 'zod'

export const contactSchema = z.object({
  website: z.string().max(0).optional(),
  name: z
    .string()
    .min(2, 'Name muss mindestens 2 Zeichen lang sein')
    .max(50, 'Name darf nicht länger als 50 Zeichen sein')
    .regex(/^[a-zA-ZäöüÄÖÜß\s-]+$/, 'Name darf nur Buchstaben, Leerzeichen und Bindestriche enthalten'),

  email: z
    .string()
    .email('Bitte geben Sie eine gültige E-Mail-Adresse ein')
    .min(5, 'E-Mail-Adresse muss mindestens 5 Zeichen lang sein')
    .max(100, 'E-Mail-Adresse darf nicht länger als 100 Zeichen sein'),

  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[+]?[\d\s\-\(\)]{7,20}$/.test(val),
      'Bitte geben Sie eine gültige Telefonnummer ein'
    ),

  subject: z
    .string()
    .min(5, 'Betreff muss mindestens 5 Zeichen lang sein')
    .max(100, 'Betreff darf nicht länger als 100 Zeichen sein'),

  message: z
    .string()
    .min(10, 'Nachricht muss mindestens 10 Zeichen lang sein')
    .max(1000, 'Nachricht darf nicht länger als 1000 Zeichen sein'),

  service: z
    .string()
    .max(80)
    .optional(),

  preferredDate: z
    .string()
    .regex(/^$|^\d{4}-\d{2}-\d{2}$/, 'Bitte geben Sie ein gültiges Datum ein')
    .optional(),

  preferredTime: z
    .string()
    .regex(/^$|^\d{2}:\d{2}$/, 'Bitte geben Sie eine gültige Uhrzeit ein')
    .optional()
}).superRefine((data, context) => {
  if ((data.preferredDate && !data.preferredTime) || (!data.preferredDate && data.preferredTime)) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: [data.preferredDate ? 'preferredTime' : 'preferredDate'],
      message: 'Datum und Uhrzeit müssen gemeinsam angegeben werden',
    })
  }
})

export type ContactFormData = z.infer<typeof contactSchema>

// Separate schema for appointment requests
export const appointmentSchema = z.object({
  name: z
    .string()
    .min(2, 'Name muss mindestens 2 Zeichen lang sein')
    .max(50, 'Name darf nicht länger als 50 Zeichen sein'),

  phone: z
    .string()
    .min(7, 'Telefonnummer ist erforderlich')
    .regex(/^[+]?[\d\s\-\(\)]{7,20}$/, 'Bitte geben Sie eine gültige Telefonnummer ein'),

  email: z
    .string()
    .email('Bitte geben Sie eine gültige E-Mail-Adresse ein')
    .optional(),

  service: z
    .string()
    .min(1, 'Bitte wählen Sie einen Service aus'),

  preferredDate: z
    .string()
    .min(1, 'Bitte wählen Sie ein Datum aus'),

  preferredTime: z
    .string()
    .min(1, 'Bitte wählen Sie eine Uhrzeit aus'),

  message: z
    .string()
    .max(500, 'Nachricht darf nicht länger als 500 Zeichen sein')
    .optional()
})

export type AppointmentFormData = z.infer<typeof appointmentSchema>

// Helper function to format validation errors for API responses
export const formatValidationErrors = (error: z.ZodError) => {
  return error.errors.map(err => ({
    field: err.path.join('.'),
    message: err.message
  }))
}
