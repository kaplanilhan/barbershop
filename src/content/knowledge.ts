import { siteConfig } from '@/config/site'

export const knowledgeMetadata = {
  version: '2026-09-22',
  status: 'published',
  owner: 'Classman The Barber Club',
  updatedAt: '2026-09-22T00:00:00.000Z',
} as const

export const services = [
  {
    id: 'herrenschnitt',
    title: 'Klassischer Herrenschnitt',
    description: 'Der perfekte Schnitt für den modernen Gentleman. Von klassisch bis trendy - wir schneiden nach Ihren Wünschen.',
    price: 'ab 25€',
    duration: '45 Min',
    image: '/images/services/service-haircut.jpg',
    features: ['Professionelle Beratung', 'Waschen & Styling', 'Hochwertige Produkte', 'Nachschnitt-Garantie'],
    icon: 'scissors',
  },
  {
    id: 'rasur',
    title: 'Traditionelle Rasur',
    description: 'Entspannung pur mit heißen Tüchern und Rasiermesser. Ein Erlebnis für alle Sinne.',
    price: 'ab 35€',
    duration: '60 Min',
    image: '/images/services/service-shave.jpg',
    features: ['Heißtuch-Behandlung', 'Premium Rasierschaum', 'Traditionelles Rasiermesser', 'Aftershave-Pflege'],
    icon: 'sparkles',
  },
  {
    id: 'bartpflege',
    title: 'Bart-Trimming & Styling',
    description: 'Professionelle Bartpflege für Ihren perfekten Look. Trimmen, Formen und Styling.',
    price: 'ab 20€',
    duration: '30 Min',
    image: '/images/services/service-beard.jpg',
    features: ['Bart-Trimming', 'Konturenschnitt', 'Bart-Öl Behandlung', 'Styling-Tipps'],
    icon: 'award',
  },
] as const

export const teamMembers = [
  {
    id: 'oemer-ali-avci',
    name: 'Ömer Ali Avci',
    role: 'Inhaber & Barber',
    experience: '5+ Jahre Erfahrung',
    specialty: 'Klassische Herrenschnitte & Rasur',
    description: 'Ömer ist der Inhaber von Classman The Barber Club und bringt 5 Jahre Erfahrung mit.',
    image: '/images/barbers/barber-3.jpg',
    rating: 5.0,
    awards: ['Master Barber Certification'],
  },
  {
    id: 'yunus-emre-koekki',
    name: 'Yunus Emre Kökki',
    role: 'Barber',
    experience: '10+ Jahre Erfahrung',
    specialty: 'Modern Fades & Beard Design',
    description: 'Yunus ist unser erfahrener Barber mit 10 Jahren Expertise in modernen Schnitten und Bart-Styles.',
    image: '/images/barbers/barber-2.jpg',
    rating: 4.9,
    awards: ['Fade Master 2022'],
  },
] as const

export const faqs = [
  {
    id: 'appointment',
    question: 'Wie kann ich einen Termin vereinbaren?',
    answer: `Sie können uns telefonisch unter ${siteConfig.contact.phoneDisplay} oder per WhatsApp erreichen. Wir sind Mo–Fr von ${siteConfig.businessHours.monday} und Sa von ${siteConfig.businessHours.saturday} für Sie da.`,
  },
  {
    id: 'haircut-price',
    question: 'Was kostet ein Haarschnitt?',
    answer: `Unsere Preise beginnen bei ${services[0].price.replace('ab ', '')} für einen klassischen Herrenhaarschnitt. Die aktuellen Preise finden Sie auf unserer Services-Seite.`,
  },
  {
    id: 'appointment-duration',
    question: 'Wie lange dauert ein Termin?',
    answer: `Ein klassischer Herrenhaarschnitt dauert etwa ${services[0].duration}. Je nach Service planen Sie bitte ${services[2].duration} bis ${services[1].duration} ein.`,
  },
  {
    id: 'children',
    question: 'Können Sie auch Kinder schneiden?',
    answer: 'Bitte fragen Sie telefonisch oder per WhatsApp an, ob der gewünschte Kindertermin möglich ist.',
  },
  {
    id: 'payment-methods',
    question: 'Welche Zahlungsmethoden akzeptieren Sie?',
    answer: 'Bitte erfragen Sie die aktuell akzeptierten Zahlungsmethoden direkt telefonisch oder per WhatsApp.',
  },
  {
    id: 'parking',
    question: 'Gibt es Parkmöglichkeiten?',
    answer: 'Bitte prüfen Sie die aktuelle Parksituation rund um unseren Standort vor Ihrer Anfahrt.',
  },
  {
    id: 'walk-in',
    question: 'Kann ich auch ohne Termin kommen?',
    answer: 'Bitte kontaktieren Sie uns kurz telefonisch oder per WhatsApp, damit wir die aktuelle Auslastung prüfen können.',
  },
  {
    id: 'gift-cards',
    question: 'Bieten Sie auch Geschenkkarten an?',
    answer: 'Bitte fragen Sie die aktuelle Verfügbarkeit von Geschenkkarten direkt bei uns an.',
  },
] as const

export const publicKnowledge = {
  metadata: knowledgeMetadata,
  business: {
    name: siteConfig.name,
    contact: siteConfig.contact,
    businessHours: siteConfig.businessHours,
  },
  services,
  teamMembers,
  faqs,
} as const

export type ServiceIcon = (typeof services)[number]['icon']
