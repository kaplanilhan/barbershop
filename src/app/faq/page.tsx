'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp, Search } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { faqs } from '@/content/knowledge'
import { searchKnowledge } from '@/lib/knowledge-search'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [query, setQuery] = useState('')

  const searchResults = searchKnowledge(query)
  const isSearching = query.trim().length >= 2

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <main className="min-h-screen bg-cream-white">
      <div className="container py-32">
        <h1 className="section-title">Häufig gestellte Fragen</h1>

        <div className="max-w-3xl mx-auto mt-12">
          <div className="relative mb-8">
            <Search
              aria-hidden="true"
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-warm-gray"
            />
            <label htmlFor="knowledge-search" className="sr-only">
              Services und häufige Fragen durchsuchen
            </label>
            <input
              id="knowledge-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              maxLength={120}
              placeholder="Zum Beispiel: Was kostet ein Haarschnitt?"
              className="input w-full pl-12"
            />
          </div>

          {isSearching ? (
            <div aria-live="polite" className="space-y-4">
              {searchResults.length > 0 ? (
                <>
                  <p className="text-sm text-warm-gray">
                    {searchResults.length} passende {searchResults.length === 1 ? 'Antwort' : 'Antworten'}
                  </p>
                  {searchResults.map((result) => (
                    <article key={`${result.type}-${result.id}`} className="card p-6">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-barbershop-gold">
                        {result.type === 'service' ? 'Service' : result.type === 'business' ? 'Standortinformation' : 'Häufige Frage'}
                      </p>
                      <h2 className="mb-2 text-lg font-semibold">{result.title}</h2>
                      <p className="text-warm-gray">{result.summary}</p>
                      {result.type !== 'faq' && (
                        <Link href={result.href} className="mt-4 inline-flex font-medium text-barbershop-gold hover:text-gold-dark">
                          {result.type === 'service' ? 'Service ansehen' : 'Kontaktseite ansehen'}
                        </Link>
                      )}
                    </article>
                  ))}
                </>
              ) : (
                <div className="card p-6 text-center">
                  <h2 className="mb-2 text-lg font-semibold">Keine belegte Antwort gefunden</h2>
                  <p className="text-warm-gray">
                    Versuchen Sie einen anderen Suchbegriff oder kontaktieren Sie uns direkt. Wir erfinden keine Antwort.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  id={faq.id}
                  key={faq.id}
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
          )}

          <div className="mt-12 text-center">
            <p className="text-warm-gray mb-4">
              Sie haben weitere Fragen? Kontaktieren Sie uns gerne!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${siteConfig.contact.phone}`}
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
