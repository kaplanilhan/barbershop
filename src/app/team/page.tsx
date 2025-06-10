import Image from 'next/image'
import Link from 'next/link'
import { Award, Star, Calendar } from 'lucide-react'

const team = [
  {
    name: "Ömer Ali Avci",
    role: "Inhaber & Barber",
    experience: "5+ Jahre Erfahrung",
    specialty: "Klassische Herrenschnitte & Rasur",
    description: "Ömer ist der Inhaber von Classman The Barber Club und bringt 5 Jahre Erfahrung mit.",
    image: "/images/barbers/barber-3.jpg",
    rating: 5.0,
    awards: ["Master Barber Certification"]
  },
  {
    name: "Yunus Emre Kökki",
    role: "Barber",
    experience: "10+ Jahre Erfahrung",
    specialty: "Modern Fades & Beard Design",
    description: "Yunus ist unser erfahrener Barber mit 10 Jahren Expertise in modernen Schnitten und Bart-Styles.",
    image: "/images/barbers/barber-2.jpg",
    rating: 4.9,
    awards: ["Fade Master 2022"]
  }
]

export default function Team() {
  return (
    <main className="min-h-screen bg-cream-white">
      <div className="container py-20 sm:py-24 md:py-28 lg:py-32">
        <h1 className="section-title animate-fadeInUp">Unser Expertenteam</h1>
        
        <p className="text-center text-warm-gray max-w-3xl mx-auto mb-12 sm:mb-16 animate-fadeInUp animation-delay-300">
          Bei Classman The Barber Club arbeiten nur die besten Barber der Stadt. Jeder unserer Experten bringt seine eigene 
          Persönlichkeit und Expertise mit, um Ihnen ein unvergessliches Erlebnis zu bieten.
        </p>

        <div className="grid gap-8 sm:gap-10 md:gap-12 md:grid-cols-2 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <div 
              key={index}
              className="card group hover-lift animate-scaleIn bg-pure-white"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative h-80 sm:h-96 md:h-[400px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-deep-black/70 to-transparent z-10" />
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                />
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-20 text-pure-white">
                  <h3 className="text-2xl sm:text-3xl font-semibold mb-1 sm:mb-2">{member.name}</h3>
                  <p className="text-barbershop-gold font-medium text-base sm:text-lg">{member.role}</p>
                </div>
              </div>
              
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${
                          i < Math.floor(member.rating)
                            ? 'fill-barbershop-gold text-barbershop-gold'
                            : 'fill-light-gray text-light-gray'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-warm-gray text-sm sm:text-base md:text-lg">({member.rating})</span>
                </div>
                
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <p className="text-xs sm:text-sm text-warm-gray uppercase tracking-wider mb-1">Erfahrung</p>
                    <p className="font-medium text-base sm:text-lg">{member.experience}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-warm-gray uppercase tracking-wider mb-1">Spezialisierung</p>
                    <p className="font-medium text-base sm:text-lg">{member.specialty}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-warm-gray uppercase tracking-wider mb-2">Auszeichnungen</p>
                    <div className="flex flex-wrap gap-2">
                      {member.awards.map((award, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 sm:px-4 sm:py-2 bg-light-cream text-barbershop-gold rounded-full text-xs sm:text-sm font-medium"
                        >
                          {award}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="mt-6 sm:mt-8 text-warm-gray text-sm sm:text-base md:text-lg leading-relaxed">{member.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 text-center bg-pure-white rounded-xl p-6 sm:p-8 md:p-12 shadow-lg">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Werden Sie Teil unseres Teams</h2>
          <p className="text-sm sm:text-base text-warm-gray mb-6 sm:mb-8 max-w-2xl mx-auto">
            Wir suchen immer nach talentierten Barbern, die unsere Leidenschaft für Exzellenz teilen. 
            Wenn Sie Teil von Classman The Barber Club werden möchten, kontaktieren Sie uns.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Jetzt bewerben
          </Link>
        </div>
      </div>
    </main>
  )
} 