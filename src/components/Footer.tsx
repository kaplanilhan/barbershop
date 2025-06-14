import Link from 'next/link'
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { siteConfig, navigationLinks } from '@/config/site'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-deep-black text-pure-white">
      <div className="container py-8 sm:py-12">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-barbershop-gold mb-4">
              {siteConfig.name}
            </h3>
            <p className="text-gray-300 mb-4 sm:mb-6 max-w-md">
              {siteConfig.longDescription}
            </p>
            <div className="flex gap-4">
              <a 
                href={siteConfig.social.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-barbershop-gold flex items-center justify-center hover:bg-copper transition-colors"
                aria-label="Facebook besuchen"
              >
                <FaFacebook size={18} />
              </a>
              <a 
                href={siteConfig.social.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-barbershop-gold flex items-center justify-center hover:bg-copper transition-colors"
                aria-label="Instagram besuchen"
              >
                <FaInstagram size={18} />
              </a>
              <a 
                href={siteConfig.social.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-barbershop-gold flex items-center justify-center hover:bg-copper transition-colors"
                aria-label="WhatsApp schreiben"
              >
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-barbershop-gold">Quick Links</h4>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 hover:text-barbershop-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-barbershop-gold">Kontakt</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-barbershop-gold" />
                <a 
                  href={`tel:${siteConfig.contact.phone}`} 
                  className="text-gray-300 hover:text-barbershop-gold transition-colors"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-barbershop-gold" />
                <a 
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-gray-300 hover:text-barbershop-gold transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-barbershop-gold mt-0.5" />
                <address className="text-gray-300 not-italic">
                  {siteConfig.contact.address.street}<br />
                  {siteConfig.contact.address.city}<br />
                  {siteConfig.contact.address.country}
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* Opening Hours */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-semibold text-lg mb-4 text-barbershop-gold flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Öffnungszeiten
              </h4>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Montag - Freitag:</span>
                  <span className="text-pure-white">{siteConfig.businessHours.monday}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Samstag:</span>
                  <span className="text-pure-white">{siteConfig.businessHours.saturday}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Sonntag:</span>
                  <span className="text-pure-white">{siteConfig.businessHours.sunday}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4 text-barbershop-gold">Terminavereinbarung</h4>
              <p className="text-gray-300 text-sm mb-4">
                Rufen Sie uns an oder schreiben Sie uns über WhatsApp für Ihren Wunschtermin.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a 
                  href={`tel:${siteConfig.contact.phone}`}
                  className="btn btn-primary text-sm"
                >
                  Anrufen
                </a>
                <a 
                  href={siteConfig.social.whatsapp}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-secondary text-sm"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} {siteConfig.name}. Alle Rechte vorbehalten.
            </p>
            <div className="flex gap-4 text-sm">
              <Link href="/impressum" className="text-gray-400 hover:text-barbershop-gold transition-colors">
                Impressum
              </Link>
              <Link href="/datenschutz" className="text-gray-400 hover:text-barbershop-gold transition-colors">
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 