'use client'

import { useState, useEffect } from 'react'
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, MessageCircle, X, User, AtSign, FileText, Send } from 'lucide-react'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Hier würde die Logik für das Absenden des Formulars implementiert
    console.log(formData)
    alert('Vielen Dank für Ihre Nachricht! Wir werden uns schnellstmöglich bei Ihnen melden.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Öffnungszeiten Widget
  const OpeningHoursWidget = () => {
    const now = new Date()
    const day = now.getDay()
    const hour = now.getHours()
    
    const isOpen = (day >= 1 && day <= 5 && hour >= 9 && hour < 19) || // Mo-Fr 9-19
                   (day === 6 && hour >= 9 && hour < 16) // Sa 9-16
    
    return (
      <div className={`p-3 sm:p-4 rounded-lg ${isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-semibold text-sm sm:text-base">{isOpen ? 'Jetzt geöffnet' : 'Geschlossen'}</span>
        </div>
        <div className="text-xs sm:text-sm">
          <p>Mo - Fr: 09:00 - 19:00</p>
          <p>Sa: 09:00 - 16:00</p>
          <p>So: Geschlossen</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-cream-white">
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/436609353277"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-green-500 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
        onClick={() => setIsWhatsAppOpen(true)}
      >
        <MessageCircle size={20} className="sm:w-6 sm:h-6" />
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
              href="https://wa.me/436609353277"
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
              href="tel:+436609353277" 
              className="btn bg-pure-white text-barbershop-gold hover:bg-cream-white font-semibold group"
            >
              <span className="flex items-center justify-center gap-2 text-sm sm:text-base">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Jetzt anrufen: +43 660 9353277</span>
                <span className="sm:hidden">Anrufen</span>
              </span>
            </a>
            <button 
              onClick={() => setIsWhatsAppOpen(true)}
              className="btn bg-pure-white text-barbershop-gold hover:bg-cream-white font-semibold group"
            >
              <span className="flex items-center justify-center gap-2 text-sm sm:text-base">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                WhatsApp schreiben
              </span>
            </button>
          </div>
        </div>

        <div className="grid gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2">
          {/* Kontaktinformationen */}
          <div className="space-y-6 sm:space-y-8">
            <div className="card p-4 sm:p-6 md:p-8">
              <h3 className="text-xl sm:text-2xl font-serif font-semibold mb-4 sm:mb-6">Besuchen Sie uns</h3>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Öffnungszeiten</h4>
                  <p className="text-warm-gray text-sm sm:text-base">Mo - Fr: 08:30 - 19:00</p>
                  <p className="text-warm-gray text-sm sm:text-base">Sa: 08:30 - 18:00</p>
                  <p className="text-warm-gray text-sm sm:text-base">So: Geschlossen</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Adresse</h4>
                  <p className="text-warm-gray text-sm sm:text-base">Classman The Barber Club</p>
                  <p className="text-warm-gray text-sm sm:text-base">Pottendorfer Str. 138/3</p>
                  <p className="text-warm-gray text-sm sm:text-base">2700 Wiener Neustadt</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Kontakt</h4>
                  <p className="text-warm-gray text-sm sm:text-base">Tel: +43 660 9353277</p>
                  <p className="text-warm-gray text-sm sm:text-base">Email: info@classman.at</p>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="card overflow-hidden h-64 sm:h-80 md:h-[400px] rounded-xl shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2658.4097483055!2d16.2429863158075!3d47.81626797981362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d1b9c8c8c8c8c%3A0x8c8c8c8c8c8c8c8c!2sPottendorfer%20Str.%20138%2F3%2C%202700%20Wiener%20Neustadt!5e0!3m2!1sde!2sat!4v1647881234567!5m2!1sde!2sat"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
              />
            </div>
          </div>

          {/* Kontaktformular */}
          <div className="contact-form">
            <h2 className="text-xl sm:text-2xl font-serif font-semibold">Schreiben Sie uns</h2>
            <p className="subtitle">
              Haben Sie Fragen oder möchten Sie einen Termin vereinbaren? Wir freuen uns auf Ihre Nachricht!
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-group">
                <label className="label flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="input"
                  placeholder="Ihr vollständiger Name"
                />
              </div>
              
              <div className="form-group">
                <label className="label flex items-center gap-2">
                  <AtSign className="w-4 h-4" />
                  E-Mail *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="input"
                  placeholder="ihre@email.de"
                />
              </div>
              
              <div className="form-group">
                <label className="label flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Betreff *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="input"
                  placeholder="Worum geht es?"
                />
              </div>
              
              <div className="form-group">
                <label className="label flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Nachricht *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="input textarea"
                  placeholder="Teilen Sie uns mit, wie wir Ihnen helfen können..."
                />
              </div>
              
              <button 
                type="submit" 
                className="form-submit-btn group"
              >
                <span className="flex items-center justify-center gap-2">
                  Nachricht senden
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
} 