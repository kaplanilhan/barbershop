import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Datenschutz',
  description: `Datenschutzerklärung von ${siteConfig.name}.`,
}

export default function Datenschutz() {
  return (
    <main className="min-h-screen bg-cream-white">
      <article className="container max-w-3xl py-24 sm:py-32">
        <h1 className="section-title text-left">Datenschutzerklärung</h1>
        <div className="space-y-8 text-warm-gray">
          <section>
            <h2 className="mb-3 text-2xl text-deep-black">1. Verantwortlicher</h2>
            <p>{siteConfig.name}<br />{siteConfig.contact.address.full}<br />E-Mail: <a className="text-barbershop-gold underline" href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a></p>
          </section>
          <section>
            <h2 className="mb-3 text-2xl text-deep-black">2. Kontaktanfragen</h2>
            <p>Wenn Sie das Kontaktformular verwenden, verarbeiten wir Name, E-Mail-Adresse sowie Ihre freiwilligen Angaben ausschließlich zur Bearbeitung Ihrer Anfrage. Die Übermittlung und Zustellung erfolgt über den E-Mail-Dienst Resend. Rechtsgrundlage ist die Durchführung vorvertraglicher Maßnahmen beziehungsweise unser berechtigtes Interesse an der Beantwortung Ihrer Anfrage. Die Daten werden gelöscht, sobald sie für die Bearbeitung nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</p>
          </section>
          <section>
            <h2 className="mb-3 text-2xl text-deep-black">3. Hosting und technische Daten</h2>
            <p>Beim Aufruf der Website können technisch notwendige Server-Logdaten wie IP-Adresse, Zeitpunkt, aufgerufene Seite und Browsertyp verarbeitet werden. Sie dienen dem sicheren und stabilen Betrieb. Die Website nutzt Vercel Speed Insights zur anonymisierten Leistungsmessung; es werden keine Werbeprofile erstellt.</p>
          </section>
          <section>
            <h2 className="mb-3 text-2xl text-deep-black">4. Externe Karte und Links</h2>
            <p>Auf der Kontaktseite wird eine Google-Karte eingebettet. Beim Laden können Daten an Google übertragen werden. Externe Links zu WhatsApp und sozialen Netzwerken werden erst beim Anklicken aufgerufen; dort gelten die Datenschutzbestimmungen des jeweiligen Anbieters.</p>
          </section>
          <section>
            <h2 className="mb-3 text-2xl text-deep-black">5. Ihre Rechte</h2>
            <p>Sie haben im Rahmen der gesetzlichen Voraussetzungen Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch. Zudem können Sie sich bei der österreichischen Datenschutzbehörde beschweren. Für Datenschutzanfragen kontaktieren Sie uns unter der oben genannten E-Mail-Adresse.</p>
          </section>
          <p className="text-sm">Stand: September 2026</p>
        </div>
      </article>
    </main>
  )
}
