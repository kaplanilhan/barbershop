'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

// Dynamic import für BeforeAfterSlider
const BeforeAfterSlider = dynamic(() => import('@/components/BeforeAfterSlider'), {
  loading: () => <div className="w-full h-96 bg-gray-200 animate-pulse rounded-xl" />
})
import Image from 'next/image'
import Link from 'next/link'
import { Check, Clock, Star, Users, Award, Scissors, Sparkles } from 'lucide-react'

import { siteConfig } from '@/config/site'

const services = [
  {
    id: 'herrenschnitt',
    title: 'Klassischer Herrenschnitt',
    description: 'Der perfekte Schnitt für den modernen Gentleman. Von klassisch bis trendy - wir schneiden nach Ihren Wünschen.',
    price: 'ab 25€',
    duration: '45 Min',
    image: '/images/services/service-haircut.jpg',
    features: [
      'Professionelle Beratung',
      'Waschen & Styling',
      'Hochwertige Produkte',
      'Nachschnitt-Garantie'
    ],
    icon: Scissors
  },
  {
    id: 'rasur',
    title: 'Traditionelle Rasur',
    description: 'Entspannung pur mit heißen Tüchern und Rasiermesser. Ein Erlebnis für alle Sinne.',
    price: 'ab 35€',
    duration: '60 Min',
    image: '/images/services/service-shave.jpg',
    features: [
      'Heißtuch-Behandlung',
      'Premium Rasierschaum',
      'Traditionelles Rasiermesser',
      'Aftershave-Pflege'
    ],
    icon: Sparkles
  },
  {
    id: 'bartpflege',
    title: 'Bart-Trimming & Styling',
    description: 'Professionelle Bartpflege für Ihren perfekten Look. Trimmen, Formen und Styling.',
    price: 'ab 20€',
    duration: '30 Min',
    image: '/images/services/service-beard.jpg',
    features: [
      'Bart-Trimming',
      'Konturenschnitt',
      'Bart-Öl Behandlung',
      'Styling-Tipps'
    ],
    icon: Award
  }
]

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

export default function ServicesPage() {
  return (
    <div className="pt-32 pb-16">
      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-deep-black via-anthracite to-deep-black text-pure-white">
        <div className="container">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-6"
              variants={fadeInUp}
            >
              Unsere <span className="text-barbershop-gold">Services</span>
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl text-gray-200 mb-8"
              variants={fadeInUp}
            >
              Professionelle Dienstleistungen für den modernen Mann. 
              Qualität, Stil und Perfektion in jedem Detail.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              <a 
                href={`tel:${siteConfig.contact.phone}`}
                className="btn btn-primary"
              >
                Termin vereinbaren
              </a>
              <a 
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                WhatsApp schreiben
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section bg-pure-white dark:bg-deep-black">
        <div className="container">
          <motion.div 
            className="grid gap-8 lg:gap-12"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <motion.div 
                  key={service.id}
                  className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                  variants={fadeInUp}
                >
                  {/* Service Image */}
                  <div className={`${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                    <motion.div 
                      className="relative h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      
                      {/* Service Badge */}
                      <div className="absolute top-4 left-4 bg-barbershop-gold text-white px-3 py-1 rounded-full text-sm font-medium">
                        {service.price}
                      </div>
                    </motion.div>
                  </div>

                  {/* Service Details */}
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'} space-y-6`}>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-barbershop-gold rounded-full flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold">
                          {service.title}
                        </h2>
                        <div className="flex items-center gap-4 text-sm text-warm-gray">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {service.duration}
                          </span>
                          <span className="text-barbershop-gold font-semibold">
                            {service.price}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-warm-gray text-lg leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-barbershop-gold flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <motion.a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="btn btn-primary inline-flex"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Jetzt buchen
                    </motion.a>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="section bg-cream-white dark:bg-anthracite">
        <div className="container">
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-6">
              Unsere <span className="text-barbershop-gold">Ergebnisse</span>
            </h2>
            <p className="text-lg text-warm-gray max-w-2xl mx-auto">
              Sehen Sie selbst, wie wir das Beste aus jedem Look herausholen. 
              Perfektion in jedem Detail.
            </p>
          </motion.div>

          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {[
              {
                before: '/images/before-after/before-1.jpg',
                after: '/images/before-after/after-1.jpg',
                title: 'Klassischer Schnitt'
              },
              {
                before: '/images/before-after/before-2.jpg',
                after: '/images/before-after/after-2.jpg',
                title: 'Moderne Rasur'
              },
              {
                before: '/images/before-after/before-3.jpg',
                after: '/images/before-after/after-3.jpg',
                title: 'Bart-Styling'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="aspect-[4/3]"
                variants={fadeInUp}
              >
                <BeforeAfterSlider
                  beforeImage={item.before}
                  afterImage={item.after}
                  beforeAlt={`${item.title} - Vorher`}
                  afterAlt={`${item.title} - Nachher`}
                  className="w-full h-full"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-barbershop-gold text-white">
        <div className="container">
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {[
              { number: '500+', label: 'Zufriedene Kunden' },
              { number: '5', label: 'Jahre Erfahrung' },
              { number: '4.9', label: 'Google Bewertung' },
              { number: '100%', label: 'Qualitätsgarantie' }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                variants={fadeInUp}
              >
                <div className="text-3xl sm:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <p className="text-sm sm:text-base opacity-90">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-deep-black text-white">
        <div className="container text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.h2 
              className="text-3xl sm:text-4xl font-serif font-bold mb-6"
              variants={fadeInUp}
            >
              Bereit für Ihren neuen Look?
            </motion.h2>
            <motion.p 
              className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Vereinbaren Sie noch heute einen Termin und erleben Sie 
              Premium-Service auf höchstem Niveau.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              <a 
                href={`tel:${siteConfig.contact.phone}`}
                className="btn bg-barbershop-gold text-white hover:bg-copper"
              >
                Jetzt anrufen
              </a>
              <Link 
                href="/contact"
                className="btn btn-outline border-barbershop-gold text-barbershop-gold hover:bg-barbershop-gold hover:text-white"
              >
                Kontakt aufnehmen
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 