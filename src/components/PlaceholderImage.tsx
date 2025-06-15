'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface PlaceholderImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

const PlaceholderImage = ({
  src,
  alt,
  width = 800,
  height = 600,
  className = '',
  priority = false
}: PlaceholderImageProps) => {
  const [error, setError] = useState(false)

  // Generiere einen Platzhalter mit dem Bildnamen
  const getPlaceholderUrl = (imagePath: string) => {
    const imageName = imagePath.split('/').pop()?.split('.')[0] || 'placeholder'
    return `https://placehold.co/${width}x${height}/1a1a1a/ffffff?text=${imageName}`
  }

  useEffect(() => {
    setError(false)
  }, [src])

  if (error) {
    return (
      <div 
        className={`relative bg-gray-900 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <p className="text-white text-sm text-center p-4">
          {alt}
        </p>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={() => setError(true)}
      placeholder="blur"
      blurDataURL={getPlaceholderUrl(src)}
    />
  )
}

export default PlaceholderImage 