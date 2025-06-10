import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import { StagewiseToolbar } from '@stagewise/toolbar-next'

const inter = Inter({ subsets: ['latin'] })

const stagewiseConfig = {
  plugins: []
}

export const metadata: Metadata = {
  title: 'Classman The Barber Club - Ihr Barbershop in Wiener Neustadt',
  description: 'Professionelle Haarschnitte und Bartpflege in Wiener Neustadt. Traditionelle Barbershop-Erfahrung mit modernem Stil.',
  keywords: 'Barbershop Wiener Neustadt, Herrenfrisuren, Bartpflege, Classman The Barber Club, Friseur Wiener Neustadt, Herrensalon',
  openGraph: {
    title: 'Classman The Barber Club - Traditionelle Herrenfrisuren in Wiener Neustadt',
    description: 'Professionelle Haarschnitte und Bartpflege in Wiener Neustadt. Traditionelle Barbershop-Erfahrung mit modernem Stil.',
    siteName: 'Classman The Barber Club',
    locale: 'de_AT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Classman The Barber Club - Traditionelle Herrenfrisuren in Wiener Neustadt',
    description: 'Professionelle Haarschnitte und Bartpflege in Wiener Neustadt. Traditionelle Barbershop-Erfahrung mit modernem Stil.',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'your-google-site-verification',
  },
  alternates: {
    canonical: 'https://classman.at',
  },
  metadataBase: new URL('https://classman.at'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <head>
        <link rel="canonical" href="https://classiccuts.de" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#D4AF37" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BarberShop",
              "name": "Classic Cuts Barbershop",
              "image": "https://classiccuts.de/images/barbershop.jpg",
              "description": "Professioneller Barbershop in Berlin. Traditionelle Herrenfrisuren, Bartpflege und mehr.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Musterstraße 123",
                "addressLocality": "Berlin",
                "postalCode": "12345",
                "addressCountry": "DE"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "52.520008",
                "longitude": "13.404954"
              },
              "url": "https://classiccuts.de",
              "telephone": "+4912345678900",
              "priceRange": "€€",
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
                  "opens": "09:00",
                  "closes": "16:00"
                }
              ],
              "sameAs": [
                "https://www.facebook.com/classiccuts",
                "https://www.instagram.com/classiccuts"
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
        {process.env.NODE_ENV === 'development' && <StagewiseToolbar config={stagewiseConfig} />}
      </body>
    </html>
  )
} 