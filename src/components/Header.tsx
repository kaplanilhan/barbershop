'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Menu, X, MapPin, Clock, Star, ChevronDown } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { siteConfig } from '@/config/site'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import ThemeToggle from './ThemeToggle'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Team', href: '/team' },
  { name: 'Galerie', href: '/gallery' },
  { name: 'Kontakt', href: '/contact' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Body scroll lock für Mobile Menu
  useEffect(() => {
    const targetElement = document.querySelector('#mobile-menu')
    if (isMenuOpen && targetElement) {
      disableBodyScroll(targetElement)
    } else if (targetElement) {
      enableBodyScroll(targetElement)
    }
    
    return () => {
      if (targetElement) enableBodyScroll(targetElement)
    }
  }, [isMenuOpen])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  }

  return (
    <>
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-pure-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-pure-white/90 backdrop-blur-sm'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Top Bar - nur auf Desktop */}
        <div className="hidden lg:block bg-deep-black text-pure-white py-2">
          <div className="container">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-barbershop-gold" />
                  <span>{siteConfig.contact.address.street}, {siteConfig.contact.address.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-barbershop-gold" />
                  <span>Mo-Sa: 9:00-19:00</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-barbershop-gold text-barbershop-gold" />
                  <span>4.9/5 bei Google</span>
                </div>
                <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-2 hover:text-barbershop-gold transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>{siteConfig.contact.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="container">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-barbershop-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-pure-white font-bold text-lg">C</span>
              </div>
              <div>
                <h1 className="text-xl font-serif font-bold text-deep-black">
                  {siteConfig.name}
                </h1>
                <p className="text-xs text-warm-gray -mt-1">Premium Barbershop</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative text-base font-medium transition-colors hover:text-barbershop-gold ${
                    pathname === item.href ? 'text-barbershop-gold' : 'text-deep-black'
                  }`}
                >
                  {item.name}
                  {pathname === item.href && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-barbershop-gold"
                      layoutId="activeTab"
                      initial={false}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <ThemeToggle />
              <a 
                href={`tel:${siteConfig.contact.phone}`}
                className="btn btn-outline"
                aria-label={`Anrufen: ${siteConfig.contact.phoneDisplay}`}
              >
                <Phone className="w-4 h-4 mr-2" />
                Anrufen
              </a>
              <a 
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                aria-label="WhatsApp schreiben"
              >
                <FaWhatsapp className="w-4 h-4 mr-2" />
                WhatsApp
              </a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMenu}
              className="lg:hidden w-10 h-10 rounded-full bg-barbershop-gold flex items-center justify-center text-pure-white"
              whileTap={{ scale: 0.95 }}
              aria-label="Menü öffnen/schließen"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={toggleMenu}
            />

            {/* Mobile Menu */}
            <motion.div
              id="mobile-menu"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-pure-white shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Menu Header */}
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-barbershop-gold rounded-full flex items-center justify-center">
                      <span className="text-pure-white font-bold">C</span>
                    </div>
                    <span className="font-serif font-bold text-lg">{siteConfig.name}</span>
                  </div>
                  <button
                    onClick={toggleMenu}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-2">
                  {navigation.map((item, index) => (
                    <motion.div key={item.name} variants={itemVariants}>
                      <Link
                        href={item.href}
                        onClick={toggleMenu}
                        className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                          pathname === item.href
                            ? 'bg-barbershop-gold text-pure-white'
                            : 'text-deep-black hover:bg-gray-100'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile Contact Info */}
                <motion.div variants={itemVariants} className="mt-8 pt-6 border-t border-gray-200">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm text-warm-gray">
                      <MapPin className="w-4 h-4 text-barbershop-gold" />
                      <span>{siteConfig.contact.address.street}, {siteConfig.contact.address.city}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-warm-gray">
                      <Clock className="w-4 h-4 text-barbershop-gold" />
                      <span>Mo-Sa: 9:00-19:00</span>
                    </div>
                  </div>
                </motion.div>

                {/* Mobile CTA Buttons */}
                <motion.div variants={itemVariants} className="mt-6 space-y-3">
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="btn btn-outline w-full justify-center"
                    onClick={toggleMenu}
                    aria-label={`Anrufen: ${siteConfig.contact.phoneDisplay}`}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {siteConfig.contact.phoneDisplay}
                  </a>
                  <a
                    href={siteConfig.social.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary w-full justify-center"
                    onClick={toggleMenu}
                    aria-label="WhatsApp schreiben"
                  >
                    <FaWhatsapp className="w-4 h-4 mr-2" />
                    WhatsApp schreiben
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
} 