'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { siteConfig, navigationLinks } from '@/config/site'

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

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Prevent scrolling
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '0px' // Prevent layout shift
    } else {
      // Restore scrolling
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
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
          <span className="hidden sm:inline">{siteConfig.name}</span>
          <span className="sm:hidden">Classman</span>
        </Link>
        
        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          {navigationLinks.map((link) => (
            <li key={link.href}>
              <Link 
                href={link.href} 
                className={`nav-link ${
                  isScrolled ? 'text-pure-white' : 'text-anthracite'
                } ${pathname === link.href ? 'border-b-2 border-barbershop-gold' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <a 
          href={`tel:${siteConfig.contact.phone}`} 
          className="btn btn-primary hidden md:inline-flex"
          aria-label={`Anrufen: ${siteConfig.contact.phoneDisplay}`}
        >
          Jetzt anrufen
        </a>

        <button 
          className={`md:hidden transition-colors z-[70] relative ${
            isScrolled 
              ? 'text-pure-white hover:text-barbershop-gold' 
              : 'text-anthracite hover:text-barbershop-gold'
          }`}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed top-0 right-0 w-full max-w-[300px] sm:max-w-[320px] h-screen bg-deep-black transition-transform duration-300 transform ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden pt-16 sm:pt-20 px-6 z-[60] shadow-2xl`}
      >
        <ul className="space-y-4 sm:space-y-6">
          {navigationLinks.map((link) => (
            <li key={link.href}>
              <Link 
                href={link.href} 
                className={`nav-link text-base sm:text-lg text-pure-white block py-2 border-b border-transparent hover:border-barbershop-gold transition-colors ${
                  pathname === link.href ? 'border-b-2 border-barbershop-gold text-barbershop-gold' : ''
                }`}
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-4">
            <a 
              href={`tel:${siteConfig.contact.phone}`} 
              className="btn btn-primary w-full text-center block"
              onClick={closeMobileMenu}
              aria-label={`Anrufen: ${siteConfig.contact.phoneDisplay}`}
            >
              Jetzt anrufen
            </a>
          </li>
          <li className="pt-2">
            <a 
              href={siteConfig.social.whatsapp} 
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary w-full text-center block"
              onClick={closeMobileMenu}
              aria-label="WhatsApp schreiben"
            >
              WhatsApp schreiben
            </a>
          </li>
        </ul>
      </div>

      {/* Improved Overlay with better touch handling */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 md:hidden z-40 backdrop-blur-sm"
          onClick={closeMobileMenu}
          onTouchStart={closeMobileMenu}
          aria-label="Menü schließen"
        />
      )}
    </header>
  )
} 