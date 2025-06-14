'use client'

import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'white' | 'gold'
}

export default function LoadingSpinner({ 
  size = 'md', 
  color = 'primary' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  }

  const colorClasses = {
    primary: 'border-barbershop-gold',
    white: 'border-pure-white',
    gold: 'border-barbershop-gold'
  }

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizeClasses[size]} border-2 ${colorClasses[color]} border-t-transparent rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  )
}

// Premium Skeleton Loading Component
export function SkeletonLoader({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg ${className}`}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        backgroundSize: "200% 100%"
      }}
    />
  )
}

// Page Loading Component
export function PageLoader() {
  return (
    <motion.div
      className="fixed inset-0 bg-deep-black/90 backdrop-blur-sm z-[9999] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center">
        <div className="mb-6">
          <LoadingSpinner size="lg" color="gold" />
        </div>
        <motion.div
          className="text-barbershop-gold font-serif text-xl"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Classman The Barber Club
        </motion.div>
      </div>
    </motion.div>
  )
} 