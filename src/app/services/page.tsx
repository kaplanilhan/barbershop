import Link from 'next/link'
import { Clock, Scissors, Sparkles } from 'lucide-react'
import Image from 'next/image'

const services = [
  {
    title: "Klassischer Herrenschnitt",
    description: "Der perfekte Schnitt für den modernen Gentleman. Inklusive Beratung, Waschen und Styling.",
    price: "ab 25€",
    image: "/images/services/service-1.jpg"
  },
  {
    title: "Traditionelle Rasur",
    description: "Entspannung pur mit heißen Tüchern und Rasiermesser. Inklusive Gesichtspflege.",
    price: "ab 35€",
    image: "/images/services/service-2.jpg"
  },
  {
    title: "Bart-Trimming & Styling",
    description: "Professionelle Bartpflege für Ihren perfekten Look. Inklusive Beratung und Pflegetipps.",
    price: "ab 20€",
    image: "/images/services/service-3.jpg"
  },
  {
    title: "Haarwäsche & Styling",
    description: "Erfrischende Haarwäsche mit Premium-Produkten und professionellem Styling.",
    price: "ab 15€",
    image: "/images/services/service-4.jpg"
  },
  {
    title: "Gesichtsbehandlung",
    description: "Tiefenreinigung und Pflege für Ihre Haut. Inklusive Gesichtsmassage.",
    price: "ab 30€",
    image: "/images/services/service-5.jpg"
  },
  {
    title: "Kinderschnitt",
    description: "Spezielle Aufmerksamkeit für unsere jüngsten Kunden. Inklusive kleinem Geschenk.",
    price: "ab 20€",
    image: "/images/services/service-6.jpg"
  }
]

export default function Services() {
  return (
    <main className="min-h-screen bg-cream-white">
      <div className="container py-20 sm:py-24 md:py-28 lg:py-32">
        <h1 className="section-title">Unsere Premium Services</h1>
        
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div 
              key={index}
              className="card hover-lift group"
            >
              <div className="h-40 sm:h-48 relative overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-4 sm:p-6 md:p-8">
                <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-semibold mb-3 sm:mb-4">{service.title}</h3>
                <p className="text-sm sm:text-base text-warm-gray mb-4 sm:mb-6">{service.description}</p>
                <div className="text-xl sm:text-2xl font-bold text-barbershop-gold mb-4 sm:mb-6">
                  {service.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
} 