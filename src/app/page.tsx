import Image from 'next/image'
import Link from 'next/link'
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { Star, Users, Award, Clock, ChevronRight, Quote, Phone, MessageCircle } from 'lucide-react'

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-bg.jpg"
            alt="Barbershop Interior"
            fill
            className="object-cover scale-105"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-black/30 to-transparent" />
        </div>
        
        <div className="container relative z-10 text-center text-pure-white px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold mb-6 sm:mb-8 animate-fadeInUp">
              Willkommen bei 
              <span className="block text-barbershop-gold mt-2 sm:mt-4 animate-float">
                Classman The Barber Club
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed font-light drop-shadow-xl animate-fadeInUp animation-delay-400">
              Seit 2025 steht Classman The Barber Club für erstklassige Barbershop-Tradition kombiniert mit
              modernem Stil in Wiener Neustadt. Erleben Sie Handwerkskunst auf höchstem Niveau.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-fadeInUp animation-delay-600">
              <a href="tel:+436609353277" className="btn btn-primary text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 group">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:animate-pulse" />
                Jetzt anrufen
              </a>
              <a href="https://wa.me/436609353277" target="_blank" rel="noopener noreferrer" className="btn btn-secondary text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 group">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:animate-pulse" />
                WhatsApp schreiben
              </a>
            </div>
            
            <div className="mt-12 sm:mt-16 animate-fadeInUp animation-delay-800">
              <div className="flex justify-center gap-6 sm:gap-8">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-barbershop-gold hover:scale-110 transition-all duration-300">
                  <FaFacebook size={18} className="sm:w-5 sm:h-5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-barbershop-gold hover:scale-110 transition-all duration-300">
                  <FaInstagram size={18} className="sm:w-5 sm:h-5" />
                </a>
                <a href="https://wa.me/436609353277" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-barbershop-gold hover:scale-110 transition-all duration-300">
                  <FaWhatsapp size={18} className="sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section bg-pure-white">
        <div className="container">
          <div className="grid gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2 items-center">
            <div className="animate-slideInRight order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold mb-4 sm:mb-6">
                Willkommen bei <span className="text-barbershop-gold">Classman The Barber Club</span>
              </h2>
              <p className="text-warm-gray mb-4 sm:mb-6">
                Seit 2025 steht Classman The Barber Club für erstklassige Barbershop-Tradition kombiniert mit 
                modernem Style. In unserem stilvollen Ambiente erwartet Sie mehr als nur ein Haarschnitt – 
                es ist eine Auszeit vom Alltag.
              </p>
              <p className="text-warm-gray mb-6 sm:mb-8">
                Unsere erfahrenen Barber verstehen ihr Handwerk und nehmen sich Zeit für jeden einzelnen 
                Kunden. Bei uns erhalten Sie nicht nur einen perfekten Schnitt, sondern auch eine 
                professionelle Beratung und ein unvergessliches Erlebnis.
              </p>
              <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-barbershop-gold mb-2">2</div>
                  <p className="text-sm sm:text-base text-warm-gray">Erfahrene Barber</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-barbershop-gold mb-2">10+</div>
                  <p className="text-sm sm:text-base text-warm-gray">Jahre Erfahrung</p>
                </div>
              </div>
              <Link href="/team" className="btn btn-primary">
                Unser Team kennenlernen
              </Link>
            </div>
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] animate-scaleIn animation-delay-300 order-1 lg:order-2">
              <Image
                src="/images/about/about-us.jpg"
                alt="Barber bei der Arbeit"
                fill
                className="object-cover rounded-xl shadow-2xl"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-cream-white">
        <div className="container">
          <h2 className="section-title">Warum Classman The Barber Club?</h2>
          
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-barbershop-gold rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <Star className="w-8 h-8 sm:w-10 sm:h-10 text-pure-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Premium Qualität</h3>
              <p className="text-sm sm:text-base text-warm-gray">Nur die besten Produkte und Werkzeuge für perfekte Ergebnisse</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-barbershop-gold rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 sm:w-10 sm:h-10 text-pure-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Erfahrene Barber</h3>
              <p className="text-sm sm:text-base text-warm-gray">Ausgebildete Profis mit Leidenschaft für ihr Handwerk</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-barbershop-gold rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-8 h-8 sm:w-10 sm:h-10 text-pure-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Ausgezeichnet</h3>
              <p className="text-sm sm:text-base text-warm-gray">Mehrfach prämiert für exzellenten Service und Qualität</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-barbershop-gold rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-pure-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Flexible Termine</h3>
              <p className="text-sm sm:text-base text-warm-gray">Rufen Sie uns an oder schreiben Sie uns - wir finden Ihren Wunschtermin</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services Section */}
      <section className="section bg-pure-white">
        <div className="container">
          <h2 className="section-title">Beliebte Services</h2>
          
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="card hover-lift group">
              <div className="h-40 sm:h-48 relative overflow-hidden">
                <Image
                  src="/images/services/service-haircut.jpg"
                  alt="Herrenschnitt"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Klassischer Herrenschnitt</h3>
                <p className="text-sm sm:text-base text-warm-gray mb-4">Der perfekte Schnitt für den modernen Gentleman</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl sm:text-2xl font-bold text-barbershop-gold">ab 25€</span>
                </div>
              </div>
            </div>
            
            <div className="card hover-lift group">
              <div className="h-40 sm:h-48 relative overflow-hidden">
                <Image
                  src="/images/services/service-shave.jpg"
                  alt="Rasur"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Traditionelle Rasur</h3>
                <p className="text-sm sm:text-base text-warm-gray mb-4">Entspannung pur mit heißen Tüchern und Rasiermesser</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl sm:text-2xl font-bold text-barbershop-gold">ab 35€</span>
                </div>
              </div>
            </div>
            
            <div className="card hover-lift group sm:col-span-2 lg:col-span-1">
              <div className="h-40 sm:h-48 relative overflow-hidden">
                <Image
                  src="/images/services/service-beard.jpg"
                  alt="Bart-Styling"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Bart-Trimming & Styling</h3>
                <p className="text-sm sm:text-base text-warm-gray mb-4">Professionelle Bartpflege für Ihren perfekten Look</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl sm:text-2xl font-bold text-barbershop-gold">ab 20€</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8 sm:mt-12">
            <Link href="/services" className="btn btn-primary">
              Alle Services ansehen
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-deep-black text-pure-white">
        <div className="container">
          <h2 className="section-title">Was unsere Kunden sagen</h2>
          
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-anthracite rounded-xl p-6 sm:p-8 relative">
              <Quote className="w-10 h-10 sm:w-12 sm:h-12 text-barbershop-gold/20 absolute top-4 right-4" />
              <div className="flex gap-1 mb-3 sm:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-barbershop-gold text-barbershop-gold" />
                ))}
              </div>
              <p className="mb-4 sm:mb-6 italic text-sm sm:text-base">
                "Der beste Barbershop in der Stadt! Professioneller Service, entspannte Atmosphäre 
                und das Ergebnis ist jedes Mal perfekt. Kann ich nur empfehlen!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-barbershop-gold rounded-full flex items-center justify-center">
                  <span className="font-bold text-sm sm:text-base">MK</span>
                </div>
                <div>
                  <p className="font-semibold text-sm sm:text-base">Michael König</p>
                  <p className="text-xs sm:text-sm text-gray-400">Stammkunde seit 2019</p>
                </div>
              </div>
            </div>
            
            <div className="bg-anthracite rounded-xl p-6 sm:p-8 relative">
              <Quote className="w-10 h-10 sm:w-12 sm:h-12 text-barbershop-gold/20 absolute top-4 right-4" />
              <div className="flex gap-1 mb-3 sm:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-barbershop-gold text-barbershop-gold" />
                ))}
              </div>
              <p className="mb-4 sm:mb-6 italic text-sm sm:text-base">
                "Endlich ein Barbershop, der versteht was Mann will. Super Team, faire Preise 
                und immer ein tolles Ergebnis. Besonders die Rasur ist ein Erlebnis!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-barbershop-gold rounded-full flex items-center justify-center">
                  <span className="font-bold text-sm sm:text-base">TH</span>
                </div>
                <div>
                  <p className="font-semibold text-sm sm:text-base">Thomas Hartmann</p>
                  <p className="text-xs sm:text-sm text-gray-400">Kunde seit 2020</p>
                </div>
              </div>
            </div>
            
            <div className="bg-anthracite rounded-xl p-6 sm:p-8 relative sm:col-span-2 lg:col-span-1">
              <Quote className="w-10 h-10 sm:w-12 sm:h-12 text-barbershop-gold/20 absolute top-4 right-4" />
              <div className="flex gap-1 mb-3 sm:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-barbershop-gold text-barbershop-gold" />
                ))}
              </div>
              <p className="mb-4 sm:mb-6 italic text-sm sm:text-base">
                "Einfach anrufen und Termin vereinbaren - das Team ist wirklich professionell. 
                Ich gehe zu keinem anderen Barbershop mehr!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-barbershop-gold rounded-full flex items-center justify-center">
                  <span className="font-bold text-sm sm:text-base">PW</span>
                </div>
                <div>
                  <p className="font-semibold text-sm sm:text-base">Peter Weber</p>
                  <p className="text-xs sm:text-sm text-gray-400">Kunde seit 2021</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-barbershop-gold text-pure-white">
        <div className="container text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold mb-4 sm:mb-6">
            Bereit für Ihren neuen Look?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto">
            Rufen Sie uns an oder schreiben Sie uns und erleben Sie Premium-Barbershop-Service 
            auf höchstem Niveau.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a href="tel:+436609353277" className="btn bg-pure-white text-barbershop-gold hover:bg-cream-white">
              Jetzt anrufen
            </a>
            <a href="https://wa.me/436609353277" target="_blank" rel="noopener noreferrer" className="btn bg-pure-white text-barbershop-gold hover:bg-cream-white">
              WhatsApp schreiben
            </a>
          </div>
        </div>
      </section>

      {/* Galerie Section */}
      <section className="section bg-cream-white">
        <div className="container">
          <h2 className="section-title">Galerie</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
              <Image src="/images/gallery/gallery-1.jpg" alt="Barbershop Galerie 1" fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
            </div>
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
              <Image src="/images/gallery/gallery-2.jpg" alt="Barbershop Galerie 2" fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
            </div>
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
              <Image src="/images/gallery/gallery-3.jpg" alt="Barbershop Galerie 3" fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
            </div>
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
              <Image src="/images/gallery/gallery-4.jpg" alt="Barbershop Galerie 4" fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
            </div>
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
              <Image src="/images/gallery/gallery-5.jpg" alt="Barbershop Galerie 5" fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
            </div>
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden sm:col-span-2 lg:col-span-1">
              <Image src="/images/gallery/gallery-6.jpg" alt="Barbershop Galerie 6" fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}