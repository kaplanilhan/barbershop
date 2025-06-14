'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, X, AlertCircle, Info } from 'lucide-react'

interface ToastProps {
  type: 'success' | 'error' | 'info'
  title: string
  message?: string
  isVisible: boolean
  onClose: () => void
  duration?: number
}

export default function Toast({ 
  type, 
  title, 
  message, 
  isVisible, 
  onClose, 
  duration = 5000 
}: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info
  }

  const colors = {
    success: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-700',
      icon: 'text-green-500',
      text: 'text-green-800 dark:text-green-200'
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-700',
      icon: 'text-red-500',
      text: 'text-red-800 dark:text-red-200'
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-700',
      icon: 'text-blue-500',
      text: 'text-blue-800 dark:text-blue-200'
    }
  }

  const IconComponent = icons[type]
  const colorScheme = colors[type]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-4 right-4 z-[9999] max-w-sm w-full"
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className={`
            ${colorScheme.bg} ${colorScheme.border} 
            border rounded-xl shadow-lg backdrop-blur-sm p-4
          `}>
            <div className="flex items-start gap-3">
              <IconComponent className={`w-6 h-6 ${colorScheme.icon} flex-shrink-0 mt-0.5`} />
              
              <div className="flex-1 min-w-0">
                <h4 className={`font-semibold ${colorScheme.text} text-sm`}>
                  {title}
                </h4>
                {message && (
                  <p className={`mt-1 text-sm ${colorScheme.text} opacity-90`}>
                    {message}
                  </p>
                )}
              </div>

              <motion.button
                onClick={onClose}
                className={`${colorScheme.text} opacity-60 hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-black/5`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Progress Bar */}
            {duration > 0 && (
              <motion.div
                className="mt-3 h-1 bg-black/10 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className={`h-full ${
                    type === 'success' ? 'bg-green-500' : 
                    type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                  }`}
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: duration / 1000, ease: "linear" }}
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Toast Hook für einfache Verwendung
export function useToast() {
  const showToast = (type: 'success' | 'error' | 'info', title: string, message?: string) => {
    // Diese Implementierung würde normalerweise einen Toast Provider verwenden
    // Für Demo-Zwecke erstellen wir eine einfache Version
    const event = new CustomEvent('showToast', {
      detail: { type, title, message }
    })
    window.dispatchEvent(event)
  }

  return { showToast }
} 