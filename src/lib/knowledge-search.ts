import { siteConfig } from '../config/site'
import { faqs, services } from '../content/knowledge'

export interface KnowledgeSearchResult {
  id: string
  type: 'business' | 'faq' | 'service'
  title: string
  summary: string
  href: string
  matchedTerms: string[]
}

const aliases: Record<string, readonly string[]> = {
  buchen: ['termin', 'vereinbaren', 'appointment'],
  termin: ['buchen', 'vereinbaren', 'appointment'],
  kosten: ['preis', 'preise', 'euro'],
  preis: ['kosten', 'preise', 'euro'],
  haare: ['haarschnitt', 'herrenschnitt', 'schnitt'],
  bart: ['bartpflege', 'bart-trimming', 'beard'],
  offen: ['öffnungszeiten', 'geöffnet', 'uhr'],
  geoffnet: ['offen', 'öffnungszeiten', 'uhr'],
  offnungszeiten: ['offen', 'geöffnet', 'uhr'],
  parken: ['parkplatz', 'parkmöglichkeiten'],
  gutschein: ['geschenkkarte', 'geschenkkarten'],
}

const stopWords = new Set(['am', 'an', 'das', 'der', 'die', 'ein', 'eine', 'fur', 'ich', 'ist', 'kann', 'mit', 'sie', 'und', 'was', 'wie', 'wo'])

function normalize(value: string) {
  return value
    .toLocaleLowerCase('de-AT')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9äöüß]+/g, ' ')
    .trim()
}

function queryTerms(query: string) {
  const baseTerms = normalize(query)
    .split(' ')
    .filter((term) => term.length > 1 && !stopWords.has(term))
  const expanded = baseTerms.flatMap((term) => [term, ...(aliases[term] ?? [])])
  return Array.from(new Set(expanded.map(normalize)))
}

function rankDocument(
  query: string,
  terms: string[],
  document: Omit<KnowledgeSearchResult, 'matchedTerms'>,
) {
  const normalizedQuery = normalize(query)
  const title = normalize(document.title)
  const searchable = normalize(`${document.title} ${document.summary}`)
  const matchedTerms = terms.filter((term) => searchable.includes(term))

  if (matchedTerms.length === 0) return null

  const exactTitleMatch = title.includes(normalizedQuery) ? 10 : 0
  const titleMatches = matchedTerms.filter((term) => title.includes(term)).length * 3
  const coverage = matchedTerms.length / terms.length

  return {
    result: { ...document, matchedTerms },
    score: exactTitleMatch + titleMatches + coverage,
  }
}

export function searchKnowledge(query: string, limit = 6): KnowledgeSearchResult[] {
  const trimmedQuery = query.trim().slice(0, 120)
  if (trimmedQuery.length < 2) return []

  const terms = queryTerms(trimmedQuery)
  const documents: Array<Omit<KnowledgeSearchResult, 'matchedTerms'>> = [
    {
      id: 'opening-hours',
      type: 'business',
      title: 'Öffnungszeiten',
      summary: `Montag bis Freitag: ${siteConfig.businessHours.monday}. Samstag: ${siteConfig.businessHours.saturday}. Sonntag: ${siteConfig.businessHours.sunday}.`,
      href: '/contact#opening-hours',
    },
    {
      id: 'contact',
      type: 'business',
      title: 'Kontakt und Adresse',
      summary: `${siteConfig.contact.phoneDisplay}, ${siteConfig.contact.email}, ${siteConfig.contact.address.full}.`,
      href: '/contact',
    },
    ...faqs.map((faq) => ({
      id: faq.id,
      type: 'faq' as const,
      title: faq.question,
      summary: faq.answer,
      href: `/faq#${faq.id}`,
    })),
    ...services.map((service) => ({
      id: service.id,
      type: 'service' as const,
      title: service.title,
      summary: `${service.description} ${service.price}, ${service.duration}.`,
      href: `/services#${service.id}`,
    })),
  ]

  return documents
    .map((document) => rankDocument(trimmedQuery, terms, document))
    .filter((match): match is NonNullable<typeof match> => match !== null)
    .sort((a, b) => b.score - a.score || a.result.title.localeCompare(b.result.title, 'de'))
    .slice(0, Math.max(1, Math.min(limit, 10)))
    .map(({ result }) => result)
}
