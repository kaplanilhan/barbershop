'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Instagram } from 'lucide-react'

interface InstagramPost {
  id: string
  imageUrl: string
  caption: string
  permalink: string
  likes: number
  comments: number
}

// Beispiel-Posts (später durch echte Instagram API ersetzen)
const mockPosts: InstagramPost[] = [
  {
    id: '1',
    imageUrl: '/images/instagram/post1.jpg',
    caption: 'Frischer Schnitt für den Sommer! 🌞 #classiccuts #barbershop',
    permalink: 'https://instagram.com/p/example1',
    likes: 0,
    comments: 0
  },
  {
    id: '2',
    imageUrl: '/images/instagram/post2.jpg',
    caption: 'Traditionelle Bartpflege bei Classman The Barber Club ✂️ #beardcare',
    permalink: 'https://instagram.com/p/example2',
    likes: 234,
    comments: 12
  },
  {
    id: '3',
    imageUrl: '/images/instagram/post3.jpg',
    caption: 'Neue Frisur, neues Glück! 💇‍♂️ #menshaircut',
    permalink: 'https://instagram.com/p/example3',
    likes: 0,
    comments: 0
  },
  {
    id: '4',
    imageUrl: '/images/instagram/post4.jpg',
    caption: 'Unser Team wächst! Willkommen im Classman The Barber Club Family 👋',
    permalink: 'https://instagram.com/p/example4',
    likes: 189,
    comments: 8
  },
  {
    id: '5',
    imageUrl: '/images/instagram/post5.jpg',
    caption: 'Premium Haarpflege-Produkte jetzt im Shop erhältlich 🛍️',
    permalink: 'https://instagram.com/p/example5',
    likes: 0,
    comments: 0
  },
  {
    id: '6',
    imageUrl: '/images/instagram/post6.jpg',
    caption: 'Frühling-Special: 20% auf alle Services 🌸',
    permalink: 'https://instagram.com/p/example6',
    likes: 0,
    comments: 0
  }
]

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Hier später: Instagram API Integration
    setPosts(mockPosts)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="container py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Folgen Sie uns auf Instagram</h2>
        <p className="text-warm-gray mb-4">
          Entdecken Sie unsere neuesten Styles und Angebote
        </p>
        <a
          href="https://instagram.com/classiccuts"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-barbershop-gold hover:text-gold-dark transition-colors"
        >
          <Instagram className="w-5 h-5" />
          @classiccuts
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {posts.map((post) => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden rounded-lg"
          >
            <Image
              src={post.imageUrl}
              alt={post.caption}
              fill
              className="object-cover transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
              <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </a>
        ))}
      </div>
    </div>
  )
} 