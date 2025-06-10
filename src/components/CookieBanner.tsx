'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setIsVisible(false)
  }

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-pure-white border-t border-light-gray p-4 z-50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold mb-2">Cookie-Einstellungen</h3>
            <p className="text-warm-gray text-sm">
              Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern. 
              Einige Cookies sind für die Funktionalität der Website notwendig, während andere 
              uns helfen, die Website zu optimieren und Ihnen personalisierte Inhalte anzubieten.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={declineCookies}
              className="btn bg-light-cream text-warm-gray hover:bg-gray-200"
            >
              Nur notwendige Cookies
            </button>
            <button
              onClick={acceptCookies}
              className="btn btn-primary"
            >
              Alle Cookies akzeptieren
            </button>
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 text-warm-gray hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
} 