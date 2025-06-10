'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "Wie kann ich einen Termin vereinbaren?",
    answer: "Sie können uns telefonisch unter +49 123 456789 oder per WhatsApp erreichen. Wir sind Mo-Fr von 9-19 Uhr und Sa von 9-16 Uhr für Sie da."
  },
  {
    question: "Was kostet ein Haarschnitt?",
    answer: "Unsere Preise beginnen bei 25€ für einen klassischen Herrenhaarschnitt. Die genauen Preise finden Sie in unserer Preisliste unter Services."
  },
  {
    question: "Wie lange dauert ein Termin?",
    answer: "Ein klassischer Haarschnitt dauert etwa 30 Minuten. Mit Bartpflege oder zusätzlichen Services planen Sie bitte 45-60 Minuten ein."
  },
  {
    question: "Können Sie auch Kinder schneiden?",
    answer: "Ja, wir schneiden auch Kinder ab 6 Jahren. Für Kinder bis 12 Jahre bieten wir spezielle Kinderpreise an."
  },
  {
    question: "Welche Zahlungsmethoden akzeptieren Sie?",
    answer: "Wir akzeptieren Barzahlung, EC-Karte und alle gängigen Kreditkarten."
  },
  {
    question: "Gibt es Parkmöglichkeiten?",
    answer: "Ja, direkt vor unserem Salon befinden sich kostenlose Parkplätze. Zusätzlich gibt es in der Nähe mehrere Parkhäuser."
  },
  {
    question: "Kann ich auch ohne Termin kommen?",
    answer: "Ja, Sie können auch ohne Termin vorbeikommen. Allerdings empfehlen wir eine vorherige Terminvereinbarung, um Wartezeiten zu vermeiden."
  },
  {
    question: "Bieten Sie auch Geschenkkarten an?",
    answer: "Ja, wir bieten Geschenkkarten in verschiedenen Wertstufen an. Diese können Sie direkt bei uns im Salon erwerben."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <main className="min-h-screen bg-cream-white">
      <div className="container py-32">
        <h1 className="section-title">Häufig gestellte Fragen</h1>
        
        <div className="max-w-3xl mx-auto mt-12">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="card hover:shadow-lg transition-shadow"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-barbershop-gold" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-barbershop-gold" />
                  )}
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-warm-gray">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-warm-gray mb-4">
              Sie haben weitere Fragen? Kontaktieren Sie uns gerne!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+4912345678900" 
                className="btn bg-barbershop-gold text-pure-white hover:bg-gold-dark"
              >
                Jetzt anrufen
              </a>
              <a 
                href="/contact" 
                className="btn bg-pure-white text-barbershop-gold hover:bg-cream-white"
              >
                Kontaktformular
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 