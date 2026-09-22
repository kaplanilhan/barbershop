# 05 – Big Bets

## Big Bet A – Grounded Conversational Commerce Concierge (F28)

- **Erwarteter Nutzen:** 24/7 beantwortete Fragen, passende Serviceauswahl und qualifizierte, bestätigte Kontaktanfrage in einem Flow; potenziell höhere Conversion und weniger Routine-Rückfragen.
- **Technisches Risiko:** Halluzinierte Preise/Zeiten, PII-Verarbeitung, Prompt Injection, komplexe Dialogzustände und zusätzliche Latenz/Kosten.
- **Voraussetzungen:** F01/F02/F04/F13, produktionsreife Auth-/Abuse-Kontrollen, Content Owner, Rechts-/Datenschutzprüfung und nachgewiesenes Fragevolumen.
- **MVP:** Read-only FAQ-/Service-Q&A mit Quellen; regelbasierte Auswahl; editierbare Anfrage; explizite Bestätigung vor E-Mail; kein Memory, keine Buchungszusage.
- **Vollversion:** kontextabhängiger Router zwischen Lookup, Beratung, Intake und Handoff; optional deterministische Kalenderintegration mit Idempotenz und Human Approval.
- **Abbruchkriterien:** Task Success <80 %, materiell falsche Preis-/Zeitangaben >1 %, Handoff >50 % ohne Nutzergewinn, keine messbare Conversion-/Supportverbesserung oder Kosten/erfolgreicher Task oberhalb des vorab vereinbarten Budgets.

## Big Bet B – Intake-to-Booking Journey mit Human Approval (F06 plus künftiger Scheduling-Dienst)

- **Erwarteter Nutzen:** weniger Medienbrüche, strukturierte Anfragen und – erst später – verbindliche Slots.
- **Technisches Risiko:** mehrdeutige Datumsangaben, Doppelbuchung, externe Kalenderausfälle, personenbezogene Daten und irrtümliche Aktionen.
- **Voraussetzungen:** kanonische Services, ein neues Appointment-/Availability-Domainmodell, belastbare AuthN/AuthZ, Idempotenz, Audit, Zeitzonen-/Feiertagsregeln und Owner für operative Ausnahmen.
- **MVP:** Freitext/Schritte in Felder überführen, serverseitig validieren, Nutzerzusammenfassung bestätigen lassen und nur die bestehende **Anfrage** senden; kein Slot-Write.
- **Vollversion:** transaktionale Verfügbarkeitsprüfung, temporäre Holds, verbindliche Bestätigung, Umbuchung/Storno und menschlicher Ausnahmeprozess. Der Scheduler bleibt deterministisch; ein LLM darf nur Sprache/Extraktion unterstützen.
- **Abbruchkriterien:** Pflichtfeldgenauigkeit <95 %, höhere Abbruchrate als Formular, unvertretbare Doppelbuchungs-/Fehlaktionsrate oder keine sinkende Rückfragequote.

## Big Bet C – Multi-Location Operations Copilot / Knowledge Map (F23/F29, konditional)

- **Erwarteter Nutzen:** bei echter Expansion standortübergreifende Fragen zu Services, Mitarbeitern, Policies und Änderungen beantworten; Differenzierung durch belegtes Cross-Document Reasoning.
- **Technisches Risiko:** sehr hoher Greenfield-Aufwand, ACL-/Tenant-Leakage, stale Beziehungen, Multi-Step-Kosten und geringe Erklärbarkeit.
- **Voraussetzungen:** mehrere reale Standorte, großer versionierter Korpus, dokumentierte Relationship-Queries, F01/F02/F17/F22 und 100 % bestandene ACL-Isolationstests.
- **MVP:** relationale Standort→Service→Mitarbeiter→Policy-Abfragen mit sichtbaren Quellen; kein Graph und kein autonomer Agent.
- **Vollversion:** nur bei Benchmarkgewinn Vector+Graph Retrieval sowie read-only Document-Analysis-Workflow mit hartem Schritt-/Kostenlimit.
- **Abbruchkriterien:** kein echter Multi-Location-Korpus, weniger als 10 % relevante Queries benötigen mehr als einen Beziehungssprung, relationale Lösung erreicht Zielqualität oder ACL-Tests sind nicht vollständig bestanden.

## Portfoliohinweis

Die Big Bets sind Optionen, kein impliziter Auftrag. A wird frühestens nach Problemvalidierung pilotiert; B ist primär ein klassisches Scheduling-Produkt; C bleibt LAB bis sich das Geschäftsmodell verändert.
