# Classman The Barber Club

Produktionsorientierte Website für **Classman The Barber Club** in Wiener Neustadt. Die Next.js-Anwendung präsentiert Services, Team, Galerie, Öffnungszeiten und Kontaktmöglichkeiten und verarbeitet Kontakt- sowie Terminanfragen per Resend.

## Lokale Entwicklung

```bash
npm install
cp .env.example .env.local
npm run dev
```

Die Anwendung ist anschließend unter `http://localhost:3000` erreichbar.

## Konfiguration

Für den E-Mail-Versand sind `RESEND_API_KEY`, `RESEND_DOMAIN` und `CONTACT_EMAIL` erforderlich. `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` aktiviert die interaktive Google-Karte; ohne Schlüssel wird eine eingebettete Karte verwendet. Siehe `.env.example` für alle Werte.

## Qualitätschecks

```bash
npm run lint
npm run typecheck
npm run build
# oder kombiniert
npm run check
```

## Architektur

- Next.js 15 App Router und React 18
- TypeScript im Strict Mode
- Tailwind CSS und zentrale Geschäftsdaten in `src/config/site.ts`
- Wiederverwendbare, öffentlich durchsuchbare Inhalte in `src/content/knowledge.ts`
- Servervalidiertes Kontaktformular (`Zod`) und Resend-E-Mail-Versand
- Dynamische Sitemap, Robots-Regeln und strukturierte Local-Business-Daten

Das frühere nicht funktionale Admin-Mockup wurde bewusst entfernt. Inhalte werden aktuell versioniert im Repository gepflegt; für ein echtes CMS sind zuerst Hosting-, Rollen- und Datenbankanforderungen festzulegen.
