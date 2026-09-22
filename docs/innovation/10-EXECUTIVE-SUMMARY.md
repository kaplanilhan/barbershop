# 10 – Executive Summary

## Entscheidung in einem Satz

Das Repository ist **heute keine RAG-Anwendung**, sondern eine lokale Barbershop-Website. Die Umsetzung beginnt deshalb nicht mit einem Agenten oder Vector Store, sondern mit einer **kanonischen, versionierten Content-/Knowledge-Quelle plus messbarer Suchbaseline**. Der erste Code-Slice zentralisiert Services, Team und FAQ; der zweite ergänzt eine deterministische FAQ-/Service-Suche mit explizitem No-answer-Fallback.

## Aktueller Produktstand

Das Produkt informiert über Services, Team, Galerie, FAQ, Standort und Öffnungszeiten und leitet zu Telefon, WhatsApp oder einer per Resend versendeten Kontakt-/Terminanfrage. Services, Team und FAQ lesen inzwischen ein gemeinsames Knowledge-Modul; persistente Pflege und Approval fehlen weiterhin. Das Admin-Dashboard ist ein Mock, der Login-Endpunkt fehlt, die Middleware prüft lediglich die Existenz eines Cookies, und das Prisma-Schema wird im Anwendungscode nicht als Datenquelle verwendet. AI-, Retrieval-, Dokument-, Zitier-, Agenten-, Memory- und AI-Evaluationsfähigkeiten fehlen vollständig.

Die wichtigste bestehende Qualitätslücke liegt bereits vor AI: Betriebsfakten sind über statische Dateien verteilt und teilweise widersprüchlich. RAG auf dieser Basis würde nicht „Wissen schaffen“, sondern Konflikte sprachlich überzeugend reproduzieren.

## Wichtigste Innovationslücken

1. noch keine vollständig persistente, administrierbare Contentquelle mit Provenienz und Freigabe;
2. noch keine persistente Messung von Suchanfragen, Nulltreffern und Nutzererfolg;
3. keine belastbare Admin-Authentifizierung, RBAC oder Auditierung;
4. erste automatisierte Knowledge-/Search-Tests vorhanden, aber noch keine Golden-Set-/Observability-Basis für AI-Qualität und Kosten;
5. kein dokumentierter Korpus oder Retrievalproblem, das Vector Search rechtfertigt;
6. keine Grounding-/No-answer-/Citation-Policy;
7. kein sicheres Workflowfundament für schreibende Aktionen.

## Top 10

1. F01 Kanonische Content-/Knowledge-API
2. F03 Content Conflict & Freshness Guard
3. F04 Deterministische FAQ-/Service-Suche
4. F05 Geführter Servicefinder
5. F02 Golden Evaluation Set & Telemetrie
6. F26 Review-/Approval-Workflow
7. F13 No-answer & Human Handoff
8. F14 Claim-Citation Coverage
9. F07 Grounded Website Concierge – bedingt nach Bedarfsnachweis
10. F18 Versionsvergleich & Änderungserkennung

## Fünf Quick Wins

- automatischer Kernfakt-Konfliktcheck;
- deterministische FAQ-/Service-Suche;
- regelbasierter Servicefinder mit vorausgefüllter Anfrage;
- expliziter No-answer/Handoff über bestehende Kanäle;
- erstes Golden Set mit realen und unbeantwortbaren Fragen.

## Drei Big Bets

1. **Grounded Conversational Commerce Concierge:** Q&A, Beratung, bestätigte Anfrage und Handoff – als begrenzter Workflow, nicht freier Agent.
2. **Intake-to-Booking Journey mit Human Approval:** erst strukturierte Anfrage, später deterministischer Scheduling-Dienst; nie blindes Kalender-Write.
3. **Multi-Location Operations Copilot/Knowledge Map:** ausschließlich bei realer Expansion und nachgewiesenem Multi-Hop-Bedarf.

## Wichtigste technische Voraussetzungen

- produktionsreife Admin-Authentifizierung, RBAC, Audit und Confirm-before-write;
- kanonisches Contentmodell mit stabilen IDs, Owner, Version, Status, Gültigkeit und Provenienz;
- Evaluation mit deterministischer Baseline, adversarial/no-answer Fällen und menschlicher Stichprobe;
- erst beim AI-Pilot: standardisierter read-only Retrievalvertrag, PII-arme Telemetrie, Budget/Quota/Circuit Breaker, Prompt-/Modellversionierung;
- Ingestion/Event/Agent/Graph-Infrastruktur nur, wenn jeweils mehrere validierte Verbraucher existieren.

## Größte Risiken

Die größten Risiken sind falsche Preise/Zeiten, indirekte Prompt Injection, PII in Prompts/Logs/Memory, unzureichende Autorisierung, Cross-user-/spätere Tenant-Leakage, missverstandene Confidence-Werte, Kosten- und Latenzvervielfachung durch Retry/Rerank/Verifier/Agenten sowie Overengineering für einen sehr kleinen Korpus. Ein numerischer Confidence-Wert darf nie als Wahrheitswahrscheinlichkeit erscheinen; angezeigt werden nachvollziehbare Evidenzfaktoren.

## Empfohlene Reihenfolge

1. Security-/Ownership-Gate und F01 spezifizieren.
2. F02/F03/F26 als schlanke gemeinsame Grundlage aufbauen.
3. F04/F05 ausliefern und reales Frage-/Nulltrefferverhalten messen.
4. Nur bei belegter Lücke F07 als begrenzten read-only Pilot mit F09/F13/F14/F15/F30 testen.
5. Dokument- und Workflowfunktionen erst nach realem Korpus/Prozessbedarf; Advanced Retrieval, Graph und Agenten bleiben konditional.

## START WITH

**Feature:** F01 – Kanonische Content- und Knowledge-API, begleitet vom ersten Slice aus F02 (Golden Set).  
**Warum:** Sie behebt ein heute nachweisbares Problem, ist Grundlage für Suche, Trust, Dokumente und jeden späteren RAG-Pilot und verhindert, dass AI widersprüchliche Fakten verstärkt. Nutzer bemerken korrekte, konsistente Preise/Zeiten unmittelbar; ein LLM oder Agent ist dafür nicht nötig.  
**Abhängigkeiten:** belastbare Admin-Authentifizierung/RBAC als Security-Gate, benannter Content Owner, Freigabe- und Gültigkeitsregeln, Entscheidung für eine kanonische Persistenz.  
**MVP Scope:** Services, Preise/Dauer, FAQ, Kontakt und Öffnungszeiten einmalig normalisieren; stabile Content-IDs, `updatedAt`/Gültigkeit/Owner/Status; read-only Auslieferung an bestehende Seiten; Konfliktcheck; 30 Golden Questions einschließlich No-answer. Keine Uploads, Embeddings, LLMs, Agenten oder Migrationen in dieser Analysephase.  
**Geschätzter Aufwand:** **1–2 Wochen** für Produkt-/Content-/Architekturdesign und anschließende MVP-Umsetzung durch ein kleines Team, zuzüglich separat zu planender Security-Baseline; Schätzung nach technischer Detailklärung verfeinern.

Danach: Messergebnisse abwarten und erst auf weitere Produktentscheidung hin einen RAG-Pilot spezifizieren.
