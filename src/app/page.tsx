'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { Star, Users, Award, Clock, ChevronRight, Quote, Phone, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { siteConfig } from '@/config/site'

// Animation Variants
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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
}

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 }
}

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 }
}

// Animated Number Counter Component
function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const springValue = useSpring(0, { 
    duration: duration * 1000,
    bounce: 0
  })

  useEffect(() => {
    if (isInView) {
      springValue.set(value)
    }
  }, [isInView, springValue, value])

  const displayValue = useTransform(springValue, (latest: number) => Math.round(latest))

  return (
    <motion.div ref={ref} className="text-3xl sm:text-4xl font-bold text-barbershop-gold mb-2">
      <motion.span>{displayValue}</motion.span>
    </motion.div>
  )
}

// Magnetic Button Component
function MagneticButton({ children, className, ...props }: any) {
  const ref = useRef<HTMLAnchorElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const btn = ref.current
    if (!btn) return

    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`
  }

  const handleMouseLeave = () => {
    const btn = ref.current
    if (!btn) return
    btn.style.transform = 'translate(0px, 0px)'
  }

  return (
    <motion.a
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </motion.a>
  )
}

export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <main>
      {/* Hero Section mit Parallax */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y }}
        >
          <Image
            src="/images/hero/hero-bg.jpg"
            alt="Barbershop Interior"
            fill
            className="object-cover scale-105"
            priority
            quality={85}
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+i"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-black/30 to-transparent" />
        </motion.div>
        
        <motion.div 
          className="container relative z-10 text-center text-pure-white px-4"
          style={{ opacity }}
        >
          <div className="max-w-5xl mx-auto">
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Willkommen bei
              <motion.span 
                className="block text-barbershop-gold mt-2 sm:mt-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {siteConfig.name}
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed font-light drop-shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {siteConfig.description}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <MagneticButton 
                href={`tel:${siteConfig.contact.phone}`} 
                className="btn btn-primary text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 group" 
                aria-label={`Anrufen: ${siteConfig.contact.phoneDisplay}`}
              >
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:animate-pulse" />
                Jetzt anrufen
              </MagneticButton>
              
              <MagneticButton 
                href={siteConfig.social.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 group" 
                aria-label="WhatsApp schreiben"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:animate-pulse" />
                WhatsApp schreiben
              </MagneticButton>
            </motion.div>
            
            <motion.div 
              className="mt-12 sm:mt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <div className="flex justify-center gap-6 sm:gap-8">
                {[
                  { href: siteConfig.social.facebook, icon: FaFacebook, label: "Facebook" },
                  { href: siteConfig.social.instagram, icon: FaInstagram, label: "Instagram" },
                  { href: siteConfig.social.whatsapp, icon: FaWhatsapp, label: "WhatsApp" }
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-barbershop-gold hover:scale-110 transition-all duration-300"
                    aria-label={`${social.label} besuchen`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <social.icon size={18} className="sm:w-5 sm:h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* About Section mit Animationen */}
      <section className="section bg-pure-white">
        <div className="container">
          <div className="grid gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2 items-center">
            <motion.div 
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold mb-4 sm:mb-6">
                Willkommen bei <span className="text-barbershop-gold">{siteConfig.name}</span>
              </h2>
              <p className="text-warm-gray mb-4 sm:mb-6">
                {siteConfig.description}
              </p>
              <p className="text-warm-gray mb-6 sm:mb-8">
                {siteConfig.longDescription}
              </p>
              <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <motion.div 
                  className="text-center"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <AnimatedCounter value={siteConfig.team.totalBarbers} />
                  <p className="text-sm sm:text-base text-warm-gray">Erfahrene Barber</p>
                </motion.div>
                <motion.div 
                  className="text-center"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <AnimatedCounter value={10} />
                  <p className="text-sm sm:text-base text-warm-gray">Jahre Erfahrung</p>
                </motion.div>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/team" className="btn btn-primary">
                  Unser Team kennenlernen
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] order-1 lg:order-2"
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                                  <Image
                    src="/images/about/about-us.jpg"
                    alt="Barber bei der Arbeit"
                    fill
                    className="object-cover rounded-xl shadow-2xl"
                    quality={85}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
                    loading="lazy"
                  />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section mit Stagger Animation */}
      <section className="section bg-cream-white">
        <div className="container">
          <motion.h2 
            className="section-title"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Warum {siteConfig.name}?
          </motion.h2>
          
          <motion.div 
            className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {siteConfig.features.map((feature, index) => {
              const iconMap = {
                Star: Star,
                Users: Users,
                Award: Award,
                Clock: Clock
              }
              const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Star
              
              return (
                <motion.div 
                  key={index} 
                  className="text-center group"
                  variants={fadeInUp}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                >
                  <motion.div 
                    className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-barbershop-gold rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-pure-white" />
                  </motion.div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-warm-gray">{feature.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Services Section mit 3D Card Effects */}
      <section className="section bg-pure-white">
        <div className="container">
          <motion.h2 
            className="section-title"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Beliebte Services
          </motion.h2>
          
          <motion.div 
            className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              {
                title: "Klassischer Herrenschnitt",
                description: "Der perfekte Schnitt für den modernen Gentleman",
                price: "ab 25€",
                image: "/images/services/service-haircut.jpg"
              },
              {
                title: "Traditionelle Rasur",
                description: "Entspannung pur mit heißen Tüchern und Rasiermesser",
                price: "ab 35€",
                image: "/images/services/service-shave.jpg"
              },
              {
                title: "Bart-Trimming & Styling",
                description: "Professionelle Bartpflege für Ihren perfekten Look",
                price: "ab 20€",
                image: "/images/services/service-beard.jpg"
              }
            ].map((service, index) => (
              <motion.div 
                key={index}
                className="card hover-lift group"
                variants={scaleIn}
                whileHover={{ 
                  y: -10, 
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: 1000
                }}
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
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm sm:text-base text-warm-gray mb-4">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl sm:text-2xl font-bold text-barbershop-gold">{service.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center mt-8 sm:mt-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/services" className="btn btn-primary">
                Alle Services ansehen
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-deep-black text-pure-white">
        <div className="container">
          <motion.h2 
            className="section-title"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Was unsere Kunden sagen
          </motion.h2>
          
          <motion.div 
            className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              {
                text: "Der beste Barbershop in der Stadt! Professioneller Service, entspannte Atmosphäre und das Ergebnis ist jedes Mal perfekt. Kann ich nur empfehlen!",
                name: "Michael König",
                role: "Stammkunde seit 2019",
                initials: "MK"
              },
              {
                text: "Endlich ein Barbershop, der versteht was Mann will. Super Team, faire Preise und immer ein tolles Ergebnis. Besonders die Rasur ist ein Erlebnis!",
                name: "Thomas Hartmann",
                role: "Kunde seit 2020",
                initials: "TH"
              },
              {
                text: "Einfach anrufen und Termin vereinbaren - das Team ist wirklich professionell. Ich gehe zu keinem anderen Barbershop mehr!",
                name: "Peter Weber",
                role: "Kunde seit 2021",
                initials: "PW"
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-anthracite rounded-xl p-6 sm:p-8 relative"
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <Quote className="w-10 h-10 sm:w-12 sm:h-12 text-barbershop-gold/20 absolute top-4 right-4" />
                <div className="flex gap-1 mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-barbershop-gold text-barbershop-gold" />
                  ))}
                </div>
                <p className="mb-4 sm:mb-6 italic text-sm sm:text-base">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-barbershop-gold rounded-full flex items-center justify-center">
                    <span className="font-bold text-sm sm:text-base">{testimonial.initials}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">{testimonial.name}</p>
                    <p className="text-xs sm:text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="section bg-barbershop-gold text-pure-white"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold mb-4 sm:mb-6">
            Bereit für Ihren neuen Look?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto">
            Rufen Sie uns an oder schreiben Sie uns und erleben Sie Premium-Barbershop-Service 
            auf höchstem Niveau.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <MagneticButton 
              href={`tel:${siteConfig.contact.phone}`} 
              className="btn bg-pure-white text-barbershop-gold hover:bg-cream-white" 
              aria-label={`Anrufen: ${siteConfig.contact.phoneDisplay}`}
            >
              Jetzt anrufen
            </MagneticButton>
            <MagneticButton 
              href={siteConfig.social.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn bg-pure-white text-barbershop-gold hover:bg-cream-white" 
              aria-label="WhatsApp schreiben"
            >
              WhatsApp schreiben
            </MagneticButton>
          </div>
        </div>
      </motion.section>

      {/* Galerie Section */}
      <section className="section bg-cream-white">
        <div className="container">
          <motion.h2 
            className="section-title"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Galerie
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <motion.div 
                key={num}
                className="relative aspect-[16/9] rounded-xl overflow-hidden"
                variants={scaleIn}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                <Image 
                  src={`/images/gallery/gallery-${num}.jpg`} 
                  alt={`Barbershop Galerie ${num}`} 
                  fill 
                  className="object-cover" 
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" 
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  )
}