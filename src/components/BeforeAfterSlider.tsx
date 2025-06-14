'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeAlt?: string
  afterAlt?: string
  className?: string
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Vorher",
  afterAlt = "Nachher",
  className = ""
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return

    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return

    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl cursor-col-resize select-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* Before Image (Background) */}
      <div className="relative w-full h-full">
        <Image
          src={beforeImage}
          alt={beforeAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Before Label */}
        <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
          {beforeAlt}
        </div>
      </div>

      {/* After Image (Overlay) */}
      <div 
        className="absolute top-0 left-0 h-full overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="relative w-full h-full" style={{ width: `${100 / (sliderPosition / 100)}%` }}>
          <Image
            src={afterImage}
            alt={afterAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        {/* After Label */}
        <div className="absolute top-4 right-4 bg-barbershop-gold text-white px-3 py-1 rounded-full text-sm font-medium">
          {afterAlt}
        </div>
      </div>

      {/* Slider Line */}
      <div 
        className="absolute top-0 h-full w-0.5 bg-white shadow-lg z-10"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Slider Handle */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center cursor-col-resize"
          onMouseDown={handleMouseDown}
          onTouchStart={() => setIsDragging(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-1 h-4 bg-gray-400 rounded-full mx-0.5"></div>
          <div className="w-1 h-4 bg-gray-400 rounded-full mx-0.5"></div>
        </motion.div>
      </div>

      {/* Mobile Touch Instructions */}
      {!isDragging && (
        <div className="md:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
          Zum Vergleichen wischen
        </div>
      )}
    </div>
  )
} 