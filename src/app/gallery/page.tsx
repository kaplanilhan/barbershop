'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import PlaceholderImage from '@/components/PlaceholderImage'

const galleryImages = [
  {
    src: '/images/gallery/gallery-1.jpg',
    alt: 'Barbershop Interior',
    category: 'interior'
  },
  {
    src: '/images/gallery/gallery-2.jpg',
    alt: 'Haircut Service',
    category: 'services'
  },
  {
    src: '/images/gallery/gallery-3.jpg',
    alt: 'Beard Trim',
    category: 'services'
  },
  {
    src: '/images/gallery/gallery-4.jpg',
    alt: 'Barbershop Team',
    category: 'team'
  },
  {
    src: '/images/gallery/gallery-5.jpg',
    alt: 'Customer Experience',
    category: 'services'
  },
  {
    src: '/images/gallery/gallery-6.jpg',
    alt: 'Barbershop Atmosphere',
    category: 'interior'
  }
]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  return (
    <main className="min-h-screen bg-black text-white pt-24">
      <div className="container mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-8"
        >
          Unsere Galerie
        </motion.h1>

        <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
          {['all', 'interior', 'services', 'team'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category 
                  ? 'bg-white text-black' 
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          layout
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-square overflow-hidden rounded-lg"
            >
              <PlaceholderImage
                src={image.src}
                alt={image.alt}
                width={800}
                height={800}
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  )
} 