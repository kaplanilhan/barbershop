export const siteConfig = {
  name: "Classman The Barber Club",
  tagline: "Ihr professioneller Barbershop in Wiener Neustadt",
  description: "Seit 2025 steht Classman The Barber Club für erstklassige Barbershop-Tradition kombiniert mit modernem Stil in Wiener Neustadt. Erleben Sie Handwerkskunst auf höchstem Niveau.",
  longDescription: "Professionelle Herrenfrisuren, traditionelle Rasur und Bartpflege von erfahrenen Barbern. Premium-Service in stilvollem Ambiente - mehr als nur ein Haarschnitt, es ist eine Auszeit vom Alltag.",
  url: "https://classman.at",
  ogImage: "https://classman.at/og.jpg",
  established: "2025",
  
  contact: {
    phone: "+43 660 9353277",
    phoneFormatted: "+43 660 9353277",
    phoneDisplay: "0660 9353277",
    email: "info@classman.at",
    address: {
      street: "Pottendorfer Str. 138/3",
      city: "2700 Wiener Neustadt",
      country: "Österreich",
      full: "Pottendorfer Str. 138/3, 2700 Wiener Neustadt, Österreich",
    },
    coordinates: {
      lat: 47.8127,
      lng: 16.2432
    }
  },
  
  social: {
    facebook: "https://facebook.com/classmanbarberclub",
    instagram: "https://instagram.com/classmanbarberclub", 
    whatsapp: "https://wa.me/436609353277",
    whatsappText: "Hallo! Ich möchte gerne einen Termin vereinbaren."
  },
  
  businessHours: {
    monday: "9:00 - 19:00",
    tuesday: "9:00 - 19:00", 
    wednesday: "9:00 - 19:00",
    thursday: "9:00 - 19:00",
    friday: "9:00 - 19:00",
    saturday: "8:00 - 17:00",
    sunday: "Geschlossen"
  },
  
  team: {
    totalBarbers: 2,
    experienceYears: "10+",
    foundingYear: 2025
  },
  
  seo: {
    keywords: [
      "Barbershop Wiener Neustadt",
      "Herrenfrisuren",
      "Bartpflege", 
      "Classman The Barber Club",
      "Friseur Wiener Neustadt",
      "Herrensalon",
      "Traditionelle Rasur",
      "Männerfrisuren",
      "Bart trimmen",
      "Premium Barbershop"
    ]
  },
  
  features: [
    {
      title: "Premium Qualität",
      description: "Nur die besten Produkte und Werkzeuge für perfekte Ergebnisse",
      icon: "Star"
    },
    {
      title: "Erfahrene Barber", 
      description: "Ausgebildete Profis mit Leidenschaft für ihr Handwerk",
      icon: "Users"
    },
    {
      title: "Ausgezeichnet",
      description: "Mehrfach prämiert für exzellenten Service und Qualität", 
      icon: "Award"
    },
    {
      title: "Flexible Termine",
      description: "Rufen Sie uns an oder schreiben Sie uns - wir finden Ihren Wunschtermin",
      icon: "Clock"
    }
  ]
} as const

export const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Kontakt" }
] as const 