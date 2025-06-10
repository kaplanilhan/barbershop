'use client'

import { Star } from 'lucide-react'

interface Review {
  author: string
  rating: number
  text: string
  date: string
}

// Beispiel-Reviews (später durch Google Reviews API ersetzen)
const mockReviews: Review[] = [
  {
    author: "Michael Schmidt",
    rating: 5,
    text: "Bester Barbershop in Berlin! Sehr professionell und freundlich. Der Haarschnitt ist immer perfekt.",
    date: "2024-03-15"
  },
  {
    author: "Thomas Weber",
    rating: 5,
    text: "Sehr zu empfehlen! Tolle Atmosphäre und erstklassiger Service. Komme regelmäßig hierher.",
    date: "2024-03-10"
  },
  {
    author: "David Müller",
    rating: 5,
    text: "Endlich ein echter Barbershop! Traditionelle Rasur und perfekte Beratung.",
    date: "2024-03-05"
  },
  {
    author: "Andreas Becker",
    rating: 5,
    text: "Sehr zufrieden mit dem Service. Terminvereinbarung klappt super und die Qualität ist top.",
    date: "2024-02-28"
  },
  {
    author: "Markus Fischer",
    rating: 5,
    text: "Professionelles Team und tolle Atmosphäre. Werde definitiv wiederkommen!",
    date: "2024-02-20"
  }
]

export default function GoogleReviews() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="container py-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Was unsere Kunden sagen</h2>
        <p className="text-warm-gray mb-4">
          Überzeugen Sie sich selbst von unserer Qualität
        </p>
        <a
          href="https://g.page/classiccuts/review"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Bewertung schreiben
        </a>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockReviews.map((review, index) => (
          <div 
            key={index}
            className="card p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < review.rating
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <p className="text-warm-gray mb-4">{review.text}</p>
            
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{review.author}</span>
              <span className="text-warm-gray">{formatDate(review.date)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <a
          href="https://g.page/classiccuts"
          target="_blank"
          rel="noopener noreferrer"
          className="text-barbershop-gold hover:text-gold-dark transition-colors"
        >
          Alle Google Reviews ansehen →
        </a>
      </div>
    </div>
  )
} 