# 01 – Current Capabilities

## Prüfrahmen

Stand: 22. September 2026. Diese Analyse basiert ausschließlich auf dem Repository. **Wichtiger Befund:** Die technische Baseline ist keine RAG-Anwendung, sondern eine öffentliche Barbershop-Marketingwebsite. Es gibt weder LLM-/Embedding-Abhängigkeiten noch Vektorindex, Dokument-Ingestion, Retrieval oder Agent-Laufzeit. Alle RAG-Vorschläge sind daher Greenfield-Optionen und keine Erweiterung einer vorhandenen RAG-Pipeline. Nach Abschluss der Analyse wurde als erster Umsetzungsschritt F01 begonnen: Services, Team und FAQ nutzen nun ein gemeinsames, versioniertes Knowledge-Modul mit öffentlichem Read-Endpunkt.

Geprüft wurden `package.json`, `README.md`, `prisma/schema.prisma`, alle Dateien unter `src/app`, `src/components`, `src/config`, `src/lib`, `src/middleware.ts` sowie vorhandene Projektnotizen. Aussagen über Produktion, tatsächlich provisionierte Datenbank, Nutzerzahlen oder externe Systeme bleiben **UNKNOWN**, wenn sie nicht im Code belegt sind.

## Produktbild

- **Zielgruppe (EXISTS):** lokale Interessenten und Kunden eines Barbershops; Betreiber/Admin ist als zweite, unfertige Persona angelegt.
- **Kern-Use-Cases (EXISTS):** Leistungen, Team, Galerie, FAQ, Standort und Öffnungszeiten ansehen; telefonisch/über WhatsApp Kontakt aufnehmen; Kontakt- bzw. Terminanfrage per E-Mail senden.
- **Geschäftlicher Kontext (EXISTS):** einzelner Standort in Wiener Neustadt; Preise, Team- und Öffnungsdaten liegen überwiegend statisch in React/TypeScript vor.
- **RAG-/Agentic-Produkt (MISSING):** kein Chat, keine semantische Suche, kein Wissensbestand, keine Quellenzitate, keine Dokumentverwaltung und kein Agent.

## Capability Map

| Bereich | Status | Repository-Evidenz / Einordnung |
|---|---|---|
| Responsive Marketing-UI | EXISTS | Next.js-Seiten für Home, Services, Team, Galerie, FAQ, Kontakt sowie responsive Tailwind-Komponenten. |
| Kanonischer öffentlicher Content | PARTIAL | Services, Team und FAQ verwenden jetzt `src/content/knowledge.ts` mit IDs und Veröffentlichungsmetadaten; Standort-/Kontaktdaten bleiben in `siteConfig`. Persistente Pflege und Approval fehlen noch. |
| Servicekatalog | EXISTS | Öffentliche Service-Seite liest den zentralen Knowledge-Datensatz; zusätzlich existiert ein noch ungenutztes `Service`-Modell im Prisma-Schema. |
| Teamdarstellung | EXISTS | Teamseite liest den zentralen Knowledge-Datensatz; Dashboard verwendet weiterhin nur Beispieldaten. |
| Kontaktformular | EXISTS | `POST /api/contact` validiert Eingaben, begrenzt Anfragen im Prozessspeicher und versendet Betreiber-/Kundenmail über Resend. |
| Terminbuchung | PARTIAL | Gewünschter Service, Datum und Uhrzeit werden als unverbindliche E-Mail-Anfrage erfasst; keine Slots, Verfügbarkeit, Reservierung oder Bestätigungstransaktion. |
| WhatsApp/Telefon | EXISTS | Direkte Links aus zentraler Site-Konfiguration; keine API-Integration oder Konversationshistorie. |
| Öffnungszeiten/Standort | EXISTS | Statische Konfiguration, clientseitiger Offen/Geschlossen-Hinweis und Google-Map-Komponente. Feiertage/Zeitzonen-Ausnahmen fehlen. |
| FAQ | EXISTS | FAQ-UI liest den zentralen Knowledge-Datensatz, bietet eine lokale Suche und ersetzt unbestätigte Aussagen durch transparente Kontakt-Fallbacks. |
| Admin-UI | PARTIAL | Login und Dashboard-Oberfläche existieren, aber Dashboard nutzt Beispieldaten; Buttons speichern nicht. |
| Authentifizierung | PARTIAL | Middleware prüft nur Existenz eines `auth-token`-Cookies. Aufgerufene `/api/admin/login`-Route und Tokenvalidierung fehlen. |
| Rollen/RBAC | MISSING | Nur ein `Admin`-Modell ohne Rollen/Rechte; keine Dokument-ACL oder Tenant-Grenzen. |
| Persistenz | PARTIAL | Prisma-Schema für SQLite ist vorhanden, aber `@prisma/client` fehlt in `package.json`; keine Nutzung im Anwendungscode ermittelt. |
| Öffentliche API | EXISTS | `POST /api/contact` und der cachebare Read-Endpunkt `GET /api/knowledge` sind vorhanden. |
| Admin-/CRUD-APIs | MISSING | Keine Login-, Service-, Barber- oder Öffnungszeiten-API. |
| Datenquellen | EXISTS | Zentrales, versioniertes Knowledge-Modul plus `siteConfig`; Nutzereingaben im Kontaktformular; externe E-Mail-, Maps-, Review-/Bildquellen in UI-Komponenten. |
| Dokumenttypen | MISSING | Keine Uploads, Parser, Dokumentmodelle oder Objektablage. Marketing-/FAQ-Text ist kein verwalteter Dokumentkorpus. |
| Keyword-/Facettensuche | PARTIAL | FAQ-Seite und `GET /api/knowledge/search` durchsuchen FAQ und Services deterministisch mit Synonymen. Facetten, persistente Analytics und ein größerer Korpus fehlen. |
| Dense/Sparse/Hybrid Retrieval | MISSING | Keine Suchengine, Embeddings oder Vektordatenbank. |
| Chunking/Indexierung | MISSING | Keine Ingestion-Pipeline. |
| RAG-Antworten/Quellen | MISSING | Kein Modellgateway, Prompt, Kontextaufbau oder Zitiermodell. |
| Agenten/Tools/Workflows | MISSING | Keine Agent-Library, Tool Registry oder langlebige Workflow-Ausführung. |
| Conversation/Session Memory | MISSING | Kein Chat und kein Conversation Store. |
| Nutzerkonten/Personalisierung | MISSING | Keine Kundenidentität; nur unfertiges Admin-Konzept. |
| Evaluation/AI-Observability | PARTIAL | Automatisierte Unit- und API-Integrationstests decken Knowledge Search, No-answer, Limits und Cache-Revalidierung ab. Goldset, Nutzererfolg, AI-Metriken und Traces fehlen. |
| Audit Logging | MISSING | Keine nachvollziehbare Admin-/AI-Aktivität. |
| Datenschutzseiten/Cookie-Banner | EXISTS | Datenschutz/Impressum und Cookie-Komponente vorhanden; dies belegt noch keine vollständige technische Consent-Durchsetzung. |
| Produktionsbetrieb/Traffic/SLA | UNKNOWN | Aus dem Repository nicht belastbar ableitbar. |

## Aktuelle User Flows

1. **Entdecken:** Landingpage → Services/Team/Galerie/FAQ → Kontakt.
2. **Anfragen:** Formular ausfüllen → `POST /api/contact` → Validierung/Rate Limit → zwei E-Mail-Versuche → Erfolg/Fehler in UI.
3. **Direktkontakt:** Telefon- oder WhatsApp-Link → externer Kanal.
4. **Admin (nur UI-Prototyp):** `/admin/login` ruft eine nicht vorhandene API auf; Middleware würde bereits die Login-Seite ohne Cookie wieder auf `/admin/login` umleiten. Dashboard-Änderungen sind nicht persistent.

## Technische Grenzen und Konsequenzen

1. **Kein belegtes RAG-Problem:** Der kleine, statische Informationsumfang lässt sich heute zuverlässiger, günstiger und schneller über FAQ, Navigation und deterministische Filter lösen.
2. **Greenfield-Aufwand:** RAG benötigt Dokumentmodell, Ingestion, Metadaten/ACL, Retrieval, Modellprovider, Quellen-UX, Evaluation und Betrieb – keine dieser Grundlagen existiert.
3. **Unfertige Identity-Grenze:** Vor personalisiertem Retrieval, Memory oder Admin-Wissenspflege müssen Authentifizierung, Autorisierung und Auditierbarkeit belastbar sein.
4. **Quellenwahrheit ist erst teilweise konsolidiert:** Services, Team und FAQ sind zentralisiert; `siteConfig`, Mock-Dashboard und ungenutztes Schema bleiben separate Repräsentationen. Persistente Pflege, Freigabe und vollständige Konfliktprüfung fehlen.
5. **Security-Baseline:** Cookie-Präsenz ist keine Authentifizierung; In-Memory-Rate-Limit ist instanzlokal; Kontaktwerte werden in HTML interpoliert. Neue AI-Flächen würden Prompt-Injection-, Leakage- und Kostenmissbrauchsrisiken hinzufügen.
6. **Kein Bedarf für autonome Agenten belegt:** Es gibt keine Tool-Landschaft oder schreibende Geschäftsprozesse, die agentische Planung rechtfertigen.

## Architektur-Fit für Innovation

Next.js Route Handlers und React UI eignen sich für einen kleinen, zustandsarmen FAQ-Assistenten. Dagegen erfordern Dokument-Ingestion, Hintergrundjobs, Vektorsuche, Versionierung, ACL, Memory und Deep Research neue Plattformkomponenten. Sie sind deshalb in der Roadmap hinter Problemvalidierung, kanonischem Content und Evaluation eingeordnet.
