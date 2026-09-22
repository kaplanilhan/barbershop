# 08 – Innovation Roadmap

Die Phasen sind Stage Gates, keine kalenderfeste Zusage. Ein Feature wechselt nur weiter, wenn die vorher definierten Metriken und Security-Gates erfüllt sind.

## Phase 1 – Foundation und Quick Wins

**Features:** F01 kanonische Content-/Knowledge-API, F02 Golden Set, F03 Conflict Guard, F04 deterministische Suche, F05 Servicefinder, F26 Approval Workflow; bestehende Auth-/Input-/Rate-Limit-Schwächen als Voraussetzung beheben, nicht als Innovation verkaufen.

**Umsetzungsstand:** Ein erster F01-Slice und F04-MVP sind vorhanden: gemeinsames Knowledge-Modul, read-only APIs, deterministische FAQ-/Service-Suche, Quellenlinks und explizites No-answer/Handoff. Unit-/API-Tests prüfen Suche, Limits und Cache-Revalidierung in CI. Persistente Pflege, Golden-Set-Telemetrie und Approval bleiben offen.

- **Voraussetzungen:** Content Owner, Entscheidung über kanonische Persistenz, produktionsreife Admin-Authentifizierung/RBAC, Datenschutz- und Telemetriegrundsätze.
- **Erwarteter Nutzen:** korrekte Kernfakten, schnellere Informationsfindung, qualifiziertere Anfragen und eine belastbare No-AI-Baseline.
- **Risiken:** Contentmigration, Scope-Ausweitung in ein CMS, Prozessfriktion.
- **Grober Aufwand:** **M (4–8 Teamwochen)** inklusive Security-/Contentfundament; Quick-Win-Slices können früher ausgeliefert werden.
- **Exit Gate:** keine bekannten Kernfakt-Konflikte; ≥95 % Golden-Set-Abdeckung durch Content; Suche und Servicefinder instrumentiert; unerlaubtes Publishing in Tests = 0.

## Phase 2 – RAG Quality und Trust

**Features (nur bei nachgewiesener Lücke):** F07 Concierge-Pilot, F09 Dynamic Top-K/Threshold, F13 No-answer/Handoff, F14 Claim-Citation Coverage, F15 Quellenhighlight, F16 erklärbarer Evidenzindikator, F30 dünnes Model-/Budget-Gateway. F10 Retry nur nach Recall-Analyse.

- **Voraussetzungen:** Phase-1-Exit, genügend reale Suchfragen, freigegebener AI-Anbieter/Retention, Passage-IDs, Red-Team-/Injection-Testset und Kostenbudget.
- **Erwarteter Nutzen:** natürlichsprachliche, überprüfbare Antworten bei ehrlich begrenzter Reichweite.
- **Risiken:** Halluzination, PII/Prompt Injection, falsche Ablehnung, Latenz und variabler Preis.
- **Grober Aufwand:** **M–L (6–12 Teamwochen)** für sicheren Pilot, Evaluation und gestuften Rollout.
- **Exit Gate:** definierter signifikanter Task-Success-Uplift gegenüber F04; Citation Accuracy und No-answer F1 erreichen vereinbarte Schwellen; materielle falsche Betriebsfakten <1 %; Kosten/p95 im Budget.

## Phase 3 – Agentic und Document Intelligence

**Features:** F06 bestätigte Anfrage-Triage, F17 kontrollierte Ingestion, F18 Version Diff, F19 Duplicate Detection, F20 Key Facts (bedingt), F21 Vergleich (bedingt), F27 Freshness Monitor und F28 Conversational Workflow. Keine autonomen Schreibagenten.

- **Voraussetzungen:** realer Dokumentkorpus, sichere Upload-/Parser-Quarantäne, RBAC/Audit, Queue/Scheduler, Human Approval, erfolgreiche Phase 2.
- **Erwarteter Nutzen:** effizientere Contentpflege, strukturierte Anfragen, nachvollziehbare Änderungen und ein zusammenhängender Customer Flow.
- **Risiken:** indirekte Prompt Injection, Parsingfehler, Workflow-Komplexität, falsch freigegebene Ableitungen.
- **Grober Aufwand:** **L (10–20 Teamwochen)**, abhängig von Dokumenttypen und Kalender-/CRM-Integrationen.
- **Exit Gate:** Parse/Metadata-SLAs, 0 ungeprüfte Publikationen, Triage-Pflichtfelder ≥95 % korrekt, Workflow verbessert Abschlussquote ohne höhere operative Fehler.

## Phase 4 – Advanced Innovation

**Features:** F08 Hybrid Retrieval, F11 Parent-Child, F12 Reranking, F22 Relationship Catalog, F23 Multi-Location Knowledge Map, F24 begrenztes Session Memory, F25 minimale Präferenzen, F29 read-only Document Analysis Assistant.

- **Voraussetzungen:** messbare Korpus-/Standortkomplexität, starke Offline-Benchmarks, isolierte Sessions/ACL, Modell- und Kosten-Gateway, dokumentierter Business Case.
- **Erwarteter Nutzen:** bessere komplexe Suche und Cross-Document-/Multi-Location-Fragen; differenzierende Assistenz nur bei Expansion.
- **Risiken:** Overengineering, Leakage, hohe variable Kosten, schwer erklärbare Agentenfehler und geringe Nutzung.
- **Grober Aufwand:** **XL (3–6+ Monate)**; jedes LAB hat eigenen Go/No-Go-Test.
- **Exit Gate:** jedes Feature schlägt die einfachere Alternative signifikant; Graph/Agent nur bei erfüllten Abbruch-/Revisit-Kriterien aus `05-BIG-BETS.md` und `07-DO-NOT-BUILD.md`.

## Reihenfolge als Abhängigkeitskette

`Auth/RBAC + Content Ownership → F01 → F02/F03/F26 → F04/F05 → Bedarfsmessung → F07 Pilot → F09/F13/F14/F15/F30 → optional F10/F17/F28 → nur bei Skalierung F08/F11/F12/F23/F29`

Diese Reihenfolge verhindert, dass eine moderne Retrieval- oder Agentenschicht inkonsistente Inhalte nur teurer und überzeugender ausliefert.
