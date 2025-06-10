'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-deep-black shadow-lg' 
        : 'bg-pure-white/95 backdrop-blur-md shadow-md'
    }`}>
      <nav className="container flex justify-between items-center py-3 sm:py-4">
        <Link 
          href="/" 
          className={`font-serif text-lg sm:text-xl md:text-2xl font-bold transition-colors ${
            isScrolled 
              ? 'text-barbershop-gold hover:text-copper' 
              : 'text-barbershop-gold hover:text-copper'
          }`}
        >
          <span className="hidden sm:inline">Classman The Barber Club</span>
          <span className="sm:hidden">Classman</span>
        </Link>
        
        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          <li>
            <Link 
              href="/" 
              className={`nav-link ${
                isScrolled ? 'text-pure-white' : 'text-anthracite'
              } ${pathname === '/' ? 'border-b-2 border-barbershop-gold' : ''}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              href="/services" 
              className={`nav-link ${
                isScrolled ? 'text-pure-white' : 'text-anthracite'
              } ${pathname === '/services' ? 'border-b-2 border-barbershop-gold' : ''}`}
            >
              Services
            </Link>
          </li>
          <li>
            <Link 
              href="/team" 
              className={`nav-link ${
                isScrolled ? 'text-pure-white' : 'text-anthracite'
              } ${pathname === '/team' ? 'border-b-2 border-barbershop-gold' : ''}`}
            >
              Team
            </Link>
          </li>
          <li>
            <Link 
              href="/contact" 
              className={`nav-link ${
                isScrolled ? 'text-pure-white' : 'text-anthracite'
              } ${pathname === '/contact' ? 'border-b-2 border-barbershop-gold' : ''}`}
            >
              Kontakt
            </Link>
          </li>
        </ul>

        <a 
          href="tel:+436609353277" 
          className="btn btn-primary hidden md:inline-flex"
        >
          Jetzt anrufen
        </a>

        <button 
          className={`md:hidden transition-colors ${
            isScrolled 
              ? 'text-pure-white hover:text-barbershop-gold' 
              : 'text-anthracite hover:text-barbershop-gold'
          }`}
          onClick={toggleMobileMenu}
          aria-label="Menü öffnen/schließen"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed top-0 right-0 w-full max-w-[300px] sm:max-w-[320px] h-screen bg-deep-black transition-transform duration-300 transform ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden pt-16 sm:pt-20 px-6 z-[60]`}
      >
        <ul className="space-y-4 sm:space-y-6">
          <li>
            <Link 
              href="/" 
              className={`nav-link text-base sm:text-lg text-pure-white ${pathname === '/' ? 'border-b-2 border-barbershop-gold' : ''}`}
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              href="/services" 
              className={`nav-link text-base sm:text-lg text-pure-white ${pathname === '/services' ? 'border-b-2 border-barbershop-gold' : ''}`}
              onClick={toggleMobileMenu}
            >
              Services
            </Link>
          </li>
          <li>
            <Link 
              href="/team" 
              className={`nav-link text-base sm:text-lg text-pure-white ${pathname === '/team' ? 'border-b-2 border-barbershop-gold' : ''}`}
              onClick={toggleMobileMenu}
            >
              Team
            </Link>
          </li>
          <li>
            <Link 
              href="/contact" 
              className={`nav-link text-base sm:text-lg text-pure-white ${pathname === '/contact' ? 'border-b-2 border-barbershop-gold' : ''}`}
              onClick={toggleMobileMenu}
            >
              Kontakt
            </Link>
          </li>
          <li className="pt-4">
            <a 
              href="tel:+436609353277" 
              className="btn btn-primary w-full text-center"
              onClick={toggleMobileMenu}
            >
              Jetzt anrufen
            </a>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={toggleMobileMenu}
        />
      )}
    </header>
  )
} 