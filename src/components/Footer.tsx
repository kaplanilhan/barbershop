import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-deep-black text-pure-white">
      <div className="container py-12 sm:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-8 sm:mb-12">
          {/* Logo & Beschreibung */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="text-xl sm:text-2xl font-serif font-bold text-barbershop-gold">
              Classman The Barber Club
            </Link>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-400">
              Premium Barbershop für den modernen Gentleman. Tradition trifft auf modernen Style.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <Link href="/services" className="text-sm sm:text-base text-gray-400 hover:text-barbershop-gold transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-sm sm:text-base text-gray-400 hover:text-barbershop-gold transition-colors">
                  Unser Team
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm sm:text-base text-gray-400 hover:text-barbershop-gold transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Öffnungszeiten */}
          <div>
            <h3 className="text-lg font-semibold mb-3 sm:mb-4">Öffnungszeiten</h3>
            <div className="space-y-1 sm:space-y-2 text-sm sm:text-base">
              <p>Mo - Fr: 08:30 - 19:00</p>
              <p>Sa: 08:30 - 18:00</p>
              <p>So: Geschlossen</p>
            </div>
          </div>

          {/* Kontakt Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3 sm:mb-4">Kontakt</h3>
            <div className="space-y-1 sm:space-y-2 text-sm sm:text-base">
              <p>Pottendorfer Str. 138/3</p>
              <p>2700 Wiener Neustadt</p>
              <p>Tel: +43 660 9353277</p>
              <p>Email: info@classman.at</p>
            </div>
            
            <div className="flex justify-start gap-4 sm:gap-6 mt-4">
              <a
                href="https://facebook.com/classmanbarberclub"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-barbershop-gold transition-colors"
              >
                <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href="https://instagram.com/classmanbarberclub"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-barbershop-gold transition-colors"
              >
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href="https://wa.me/436609353277"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-barbershop-gold transition-colors"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Zusätzliche Sections für größere Bildschirme */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8 mb-8">
          {/* Rechtliches */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Rechtliches</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/impressum" className="text-gray-400 hover:text-barbershop-gold transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="text-gray-400 hover:text-barbershop-gold transition-colors">
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>

          {/* Über uns */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Über uns</h3>
            <p className="text-gray-400">
              Classman The Barber Club - Ihr professioneller Barbershop in Wiener Neustadt. 
              Traditionelle Bartpflege und moderne Haarschnitte in entspannter Atmosphäre.
            </p>
          </div>
        </div>

        {/* Mobile Rechtliches - nur auf kleinen Bildschirmen */}
        <div className="lg:hidden border-t border-anthracite pt-6 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <Link href="/impressum" className="text-sm text-gray-400 hover:text-barbershop-gold transition-colors text-center">
              Impressum
            </Link>
            <Link href="/datenschutz" className="text-sm text-gray-400 hover:text-barbershop-gold transition-colors text-center">
              Datenschutz
            </Link>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-anthracite text-center">
          <p className="text-xs sm:text-sm text-gray-400">
            © {new Date().getFullYear()} Classman The Barber Club. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  )
} 