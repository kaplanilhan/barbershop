'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    } else {
      setIsDark(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    
    if (newTheme) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-8 bg-gray-200 dark:bg-gray-700 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-barbershop-gold focus:ring-offset-2"
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? 'Zu hellem Modus wechseln' : 'Zu dunklem Modus wechseln'}
    >
      {/* Toggle Background */}
      <motion.div
        className="absolute inset-1 bg-gradient-to-r from-barbershop-gold to-copper rounded-full"
        animate={{
          x: isDark ? 24 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      />
      
      {/* Sun Icon */}
      <motion.div
        className="absolute left-1 top-1 w-6 h-6 flex items-center justify-center"
        animate={{
          opacity: isDark ? 0 : 1,
          rotate: isDark ? 180 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <Sun className="w-4 h-4 text-white" />
      </motion.div>
      
      {/* Moon Icon */}
      <motion.div
        className="absolute right-1 top-1 w-6 h-6 flex items-center justify-center"
        animate={{
          opacity: isDark ? 1 : 0,
          rotate: isDark ? 0 : -180,
        }}
        transition={{ duration: 0.3 }}
      >
        <Moon className="w-4 h-4 text-white" />
      </motion.div>
    </motion.button>
  )
} 