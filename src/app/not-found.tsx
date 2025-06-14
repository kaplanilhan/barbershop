'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Scissors, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-black via-anthracite to-deep-black text-pure-white flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* 404 Animation */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="text-8xl sm:text-9xl md:text-[12rem] font-bold text-barbershop-gold/20 select-none"
            animate={{ 
              textShadow: [
                "0 0 20px rgba(184, 134, 11, 0.3)",
                "0 0 40px rgba(184, 134, 11, 0.5)",
                "0 0 20px rgba(184, 134, 11, 0.3)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            404
          </motion.div>
        </motion.div>

        {/* Animated Scissors */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.div
            className="w-16 h-16 bg-barbershop-gold rounded-full flex items-center justify-center"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Scissors className="w-8 h-8 text-deep-black" />
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-6">
            Seite nicht gefunden
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
            Diese Seite scheint einen schlechten Haarschnitt bekommen zu haben. 
            <br className="hidden sm:block" />
            Aber keine Sorge - wir können das reparieren!
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <Link href="/">
            <motion.div
              className="btn bg-barbershop-gold text-deep-black hover:bg-copper inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-5 h-5" />
              Zur Startseite
            </motion.div>
          </Link>
          
          <motion.button
            onClick={() => window.history.back()}
            className="btn btn-outline border-barbershop-gold text-barbershop-gold hover:bg-barbershop-gold hover:text-deep-black inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Zurück
          </motion.button>
        </motion.div>

        {/* Popular Links */}
        <motion.div
          className="mt-12 pt-8 border-t border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-4 text-barbershop-gold">
            Vielleicht suchten Sie nach:
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { href: '/services', label: 'Unsere Services' },
              { href: '/team', label: 'Unser Team' },
              { href: '/contact', label: 'Kontakt' },
              { href: '/gallery', label: 'Galerie' }
            ].map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
              >
                <Link
                  href={link.href}
                  className="px-4 py-2 bg-gray-800 hover:bg-barbershop-gold hover:text-deep-black text-gray-300 rounded-lg transition-colors text-sm"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Background Decoration */}
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 border border-barbershop-gold/20 rounded-full"
              style={{
                left: `${20 + i * 30}%`,
                top: `${10 + i * 25}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
} 