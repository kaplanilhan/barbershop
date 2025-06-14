'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { X, MessageCircle } from 'lucide-react'
import { siteConfig } from '@/config/site'

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000) // Zeige nach 3 Sekunden

    return () => clearTimeout(timer)
  }, [])

  const toggleChat = () => setIsOpen(!isOpen)

  const openWhatsApp = () => {
    const message = encodeURIComponent(siteConfig.social.whatsappText)
    window.open(`${siteConfig.social.whatsapp}?text=${message}`, '_blank')
  }

  if (!isVisible) return null

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.button
          onClick={toggleChat}
          className="w-14 h-14 bg-green-500 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-green-600 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={isOpen ? {} : { 
            scale: [1, 1.1, 1],
            boxShadow: [
              "0 4px 15px rgba(34, 197, 94, 0.4)",
              "0 8px 30px rgba(34, 197, 94, 0.6)",
              "0 4px 15px rgba(34, 197, 94, 0.4)"
            ]
          }}
          transition={{ 
            duration: 2, 
            repeat: isOpen ? 0 : Infinity,
            repeatType: "loop"
          }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="whatsapp"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaWhatsapp size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Notification Dot */}
        {!isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            1
          </motion.div>
        )}
      </motion.div>

      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 max-w-[calc(100vw-3rem)] z-40"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Header */}
              <div className="bg-green-500 p-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <FaWhatsapp size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{siteConfig.name}</h3>
                    <p className="text-sm opacity-90">Meist antwortet innerhalb weniger Minuten</p>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="p-4">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-4">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 bg-barbershop-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">C</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-800 dark:text-gray-200">
                        Hallo! 👋<br/>
                        Gerne helfen wir Ihnen bei der Terminvereinbarung oder beantworten Ihre Fragen zu unseren Services.
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date().toLocaleTimeString('de-DE', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-2">
                  <button
                    onClick={openWhatsApp}
                    className="w-full p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={16} />
                    Chat starten
                  </button>
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="w-full p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    📞 Direkt anrufen
                  </a>
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 pb-4">
                <p className="text-xs text-gray-500 text-center">
                  Öffnungszeiten: Mo-Sa 9:00-19:00
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 