import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import { siteConfig } from '@/config/site'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: `${siteConfig.name} - ${siteConfig.tagline}`,
  description: siteConfig.description,
  keywords: siteConfig.seo.keywords.join(', '),
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Premium Barbershop in Wiener Neustadt`,
      },
    ],
    locale: 'de_AT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HairSalon",
              "name": siteConfig.name,
              "image": siteConfig.ogImage,
              "description": siteConfig.description,
              "url": siteConfig.url,
              "telephone": siteConfig.contact.phone,
              "email": siteConfig.contact.email,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": siteConfig.contact.address.street,
                "addressLocality": "Wiener Neustadt",
                "addressRegion": "Niederösterreich",
                "postalCode": "2700",
                "addressCountry": "AT"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": siteConfig.contact.coordinates.lat,
                "longitude": siteConfig.contact.coordinates.lng
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "09:00",
                  "closes": "19:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Saturday",
                  "opens": "08:00",
                  "closes": "17:00"
                }
              ],
              "sameAs": [
                siteConfig.social.facebook,
                siteConfig.social.instagram
              ],
              "priceRange": "€€",
              "currenciesAccepted": "EUR",
              "paymentAccepted": "Cash, Card",
              "foundingDate": siteConfig.established,
              "areaServed": {
                "@type": "City",
                "name": "Wiener Neustadt"
              },
              "serviceType": "Hair Salon",
              "makesOffer": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Herrenhaarschnitt",
                    "description": "Klassischer und moderner Herrenhaarschnitt"
                  }
                },
                {
                  "@type": "Offer", 
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Traditionelle Rasur",
                    "description": "Klassische Rasur mit Rasiermesser und heißen Tüchern"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service", 
                    "name": "Bartpflege",
                    "description": "Professionelle Bartpflege und Styling"
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className="font-inter antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  )
} 