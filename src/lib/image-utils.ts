/**
 * Image optimization utilities
 */

// Base64 shimmer placeholder generator
export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#D4AF37" offset="20%" />
      <stop stop-color="#B8860B" offset="50%" />
      <stop stop-color="#D4AF37" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f7f8" />
  <rect width="${w}" height="${h}" fill="url(#g)" opacity="0.5" />
  <animateTransform
    attributeName="transform"
    attributeType="XML"
    values="-100 0; 100 0; -100 0"
    dur="2s"
    repeatCount="indefinite" />
</svg>`

export const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

// Generate blur data URL
export const generateBlurDataURL = (w: number = 10, h: number = 10) =>
  `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`

// Optimized image sizes for responsive images
export const imageSizes = {
  hero: '100vw',
  about: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px',
  gallery: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  service: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  barber: '(max-width: 640px) 100vw, (max-width: 768px) 50vw, 300px'
}

// Image quality settings by use case
export const imageQuality = {
  hero: 85,
  content: 85,
  thumbnail: 75,
  preview: 60
}

// Preload critical images
export const preloadImage = (src: string) => {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    document.head.appendChild(link)
  }
}

// Lazy load images with intersection observer
export const createLazyImageObserver = (callback: (entry: IntersectionObserverEntry) => void) => {
  if (typeof window === 'undefined') return null

  return new IntersectionObserver(
    (entries) => {
      entries.forEach(callback)
    },
    {
      rootMargin: '50px 0px',
      threshold: 0.01
    }
  )
} 