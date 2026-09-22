# 06 – Gemeinsame Platform Capabilities

## Build / do not build yet

| Fähigkeit | Ermöglicht | Entscheidung / Trigger |
|---|---|---|
| **Kanonisches Contentmodell mit stabilen IDs, Version, Owner, Status, Gültigkeit und Provenienz** | F01, F03–F05, F07, F14–F23, F26–F28 | **Jetzt planen (P0):** viele Verbraucher und bereits sichtbare Inkonsistenzen. |
| **Echte Admin-Authentifizierung, RBAC und Audit** | Contentpflege, Upload, Approval, Automation, AI-Tools | **Security-Gate vor neuen Admin-/AI-Flächen.** Cookie-Präsenz genügt nicht. |
| **Evaluation Pipeline + Golden Set** | Suche/RAG, Retry, Rerank, Trust, Kostenentscheidungen | **Jetzt klein starten (P0):** gemeinsam für mehrere Features; deterministische Baseline zuerst. |
| **Approval State Machine** | Publishing, Summaries, Tagging, Automation | **Bauen, sobald persistente Contentpflege beschlossen ist;** kein Agent nötig. |
| **PII-arme Observability und Kostenledger** | Q&A, Verification, Retry, Agent-LAB | **Mit erstem AI-Pilot**, nicht als allgemeine Plattform vorher. |
| **Standardisierte Retrieval API / Context Contract** | F07–F15, F29 | **Nur nach validierter RAG-Entscheidung.** Muss ACL/Status/Gültigkeit vor Retrieval erzwingen. |
| **Model Gateway, Budgets, Circuit Breaker und versionierter Cache** | Generation, Reranking, Summary, Verification | **Ab zwei beschlossenen AI-Verbrauchern** oder direkt im begrenzten Pilot als dünner Adapter; kein Plattformprojekt. |
| **Prompt Registry / Feature Flags** | sicherer Rollout und reproduzierbare Evals | **Mit erstem produktiven LLM-Feature.** Version mit Modell, Content- und Eval-Version koppeln. |
| **Reranking Layer** | F12, eventuell F29 | **Nicht bauen**, bis Retrieval-Benchmark eine Ranking-Lücke zeigt. |
| **Event/Job System** | Ingestion, Freshness, Notifications | **Erst bei F17/F27**; ein Scheduler/Queue reicht, keine Echtzeitarchitektur. |
| **User Preference Store** | F25 | **Nicht bauen** für ein einzelnes Komfortfeature; local-first bevorzugen. |
| **Agent Tool Registry** | F29 und spätere Tools | **Nicht bauen**, solange weniger als zwei sichere, echte Tools gebraucht werden. Read-only Tool-Fassade zuerst. |
| **Knowledge Graph** | F23 | **LAB-Gate:** nur bei realen Multi-Hop-Fragen, die relationale Queries messbar nicht lösen. |

## Architekturprinzipien

1. **Structured facts before embeddings:** Preise, Zeiten, Kontakt und Verfügbarkeit sind Felder, keine semantischen Dokumente.
2. **Authorization before retrieval:** Suche darf niemals erst Treffer laden und nachträglich hoffen, sie auszufiltern.
3. **Untrusted content boundary:** Dokumente und Nutzereingaben sind Daten, keine Instruktionen; Toolrechte entstehen nie aus Dokumenttext.
4. **Confirm before write:** Mail, Buchung und Publishing benötigen sichtbare Bestätigung, Idempotenz und Audit.
5. **Evaluation before complexity:** Hybrid Search, Rewrite, Rerank, Graph und Agenten brauchen einen gemessenen inkrementellen Vorteil.
6. **Cost per successful task:** Nicht Calls isoliert optimieren, sondern Kosten und Latenz je korrekt gelöster Aufgabe.

## Cross-Review: Konflikte und Konsolidierung

- Concierge, Serviceberatung, Triage und Handoff sind Module eines begrenzten Workflows, keine vier Agenten.
- Citation UI, Claim Coverage und Confidence-Erklärung teilen Content-/Passage-IDs; keine getrennten Quellensysteme.
- Versionsdiff, Conflict Guard und Freshness Monitor teilen Metadaten und Review Workflow.
- Memory kollidiert mit Cache und Datenschutz: niemals rohe Nutzerhistorie in Shared Cache; Retrievalrechte dürfen nicht personalisiert aufgeweicht werden.
- Auto-Summaries werden abgeleitete Artefakte, niemals Source of Truth.
