'use client'

import { useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { generateBlurDataURL, imageSizes, imageQuality } from '@/lib/image-utils'
import { motion } from 'framer-motion'

interface OptimizedImageProps extends Omit<ImageProps, 'placeholder' | 'blurDataURL'> {
  useCase?: 'hero' | 'content' | 'thumbnail' | 'preview'
  sizePreset?: keyof typeof imageSizes
  showLoader?: boolean
  className?: string
}

export default function OptimizedImage({
  src,
  alt,
  useCase = 'content',
  sizePreset,
  showLoader = true,
  className = '',
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  // Automatically set quality and sizes based on use case
  const quality = imageQuality[useCase] || imageQuality.content
  const sizes = sizePreset ? imageSizes[sizePreset] : props.sizes

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setError(true)
  }

  if (error) {
    return (
      <div className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-sm">Bild konnte nicht geladen werden</span>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        quality={quality}
        sizes={sizes}
        placeholder="blur"
        blurDataURL={generateBlurDataURL()}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        {...props}
      />
      
      {/* Loading shimmer effect */}
      {showLoader && isLoading && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            backgroundSize: '200% 100%'
          }}
        />
      )}
    </div>
  )
}

// Presets for common use cases
export const HeroImage = (props: Omit<OptimizedImageProps, 'useCase' | 'sizePreset'>) => (
  <OptimizedImage useCase="hero" sizePreset="hero" {...props} />
)

export const AboutImage = (props: Omit<OptimizedImageProps, 'useCase' | 'sizePreset'>) => (
  <OptimizedImage useCase="content" sizePreset="about" {...props} />
)

export const GalleryImage = (props: Omit<OptimizedImageProps, 'useCase' | 'sizePreset'>) => (
  <OptimizedImage useCase="content" sizePreset="gallery" {...props} />
)

export const ServiceImage = (props: Omit<OptimizedImageProps, 'useCase' | 'sizePreset'>) => (
  <OptimizedImage useCase="content" sizePreset="service" {...props} />
)

export const BarberImage = (props: Omit<OptimizedImageProps, 'useCase' | 'sizePreset'>) => (
  <OptimizedImage useCase="content" sizePreset="barber" {...props} />
) 