# 03 – Feature Scoring

## Formel und Lesart

`Value = User Value×3 + Strategic Value×2 + Technical Fit×2 + Innovation`  
`Cost = Implementation Effort×2 + Operational Cost + Technical Risk + Security Risk`  
`Final Score = Value − Cost`

Alle acht Ratings nutzen 1–5. Ein hoher Score ersetzt keine Abhängigkeits-, Security- oder Problemvalidierung. P0 ist ausschließlich Enablern vorbehalten; daher ist etwa F03 trotz Spitzenscore P1. F09/F14/F30 sind trotz guter Scores erst nach einem beschlossenen RAG-Pilot sinnvoll.

| ID | Feature | UV/SV/Fit/Effort/Op/Tech/Sec/Innov | Value | Cost | Final | Prio |
|---|---|---|---:|---:|---:|---|
| F01 | Kanonische Content- und Knowledge-API | 5/5/5/2/1/2/2/1 | 36 | 9 | **27** | P0 |
| F02 | Golden Evaluation Set & AI-Telemetrie | 4/5/4/3/2/2/1/2 | 32 | 11 | **21** | P0 |
| F03 | Content Conflict & Freshness Guard | 5/4/5/2/1/1/1/1 | 34 | 7 | **27** | P1 |
| F04 | Deterministische FAQ- und Service-Suche | 5/4/5/2/1/1/1/1 | 34 | 7 | **27** | P1 |
| F05 | Geführter Servicefinder | 5/4/5/2/1/1/1/1 | 34 | 7 | **27** | P1 |
| F06 | Anfrage-Triage mit Bestätigung | 4/3/4/3/2/2/3/2 | 28 | 13 | **15** | P2 |
| F07 | Grounded Website Concierge | 4/4/2/4/3/4/3/3 | 27 | 18 | **9** | P2 |
| F08 | Hybrid Retrieval mit Metadatenfiltern | 2/3/2/4/3/3/2/2 | 18 | 16 | **2** | P3 |
| F09 | Dynamic Top-K, Threshold & Diversity | 4/4/4/2/1/2/1/2 | 30 | 8 | **22** | P1 |
| F10 | Kontrolliertes Query Rewrite & Retrieval Retry | 3/3/3/3/3/3/2/2 | 23 | 14 | **9** | P2 |
| F11 | Context-/Parent-Child Retrieval | 2/3/2/4/3/3/3/3 | 19 | 17 | **2** | P3 |
| F12 | Cross-Encoder Reranking | 2/3/2/3/4/3/3/2 | 18 | 16 | **2** | P3 |
| F13 | Explizites No-answer & Human Handoff | 5/5/4/2/1/1/1/2 | 35 | 7 | **28** | P1 |
| F14 | Claim-Citation Coverage & Verification | 5/5/3/4/3/3/2/3 | 34 | 16 | **18** | P1 |
| F15 | Quellenkarten & Passage-Highlight | 4/3/3/2/1/1/2/2 | 26 | 8 | **18** | P2 |
| F16 | Erklärbarer Vertrauensindikator | 4/4/3/2/1/2/2/2 | 28 | 9 | **19** | P2 |
| F17 | Dokument-Ingestion mit Review | 3/4/2/4/4/4/4/2 | 23 | 20 | **3** | P3 |
| F18 | Versionsvergleich & Änderungserkennung | 4/4/4/3/2/2/2/2 | 30 | 12 | **18** | P2 |
| F19 | Duplicate & Similar Content Detection | 3/3/4/2/1/1/1/2 | 25 | 7 | **18** | P2 |
| F20 | Key Facts & Executive Summaries | 2/3/1/3/3/3/3/2 | 16 | 15 | **1** | P3 |
| F21 | Dokumentenvergleich für Betreiber | 2/3/2/3/2/2/3/2 | 18 | 13 | **5** | P3 |
| F22 | Service–Barber Relationship Catalog | 3/3/4/3/1/2/2/2 | 25 | 11 | **14** | P2 |
| F23 | Multi-Location Knowledge Map | 2/3/1/5/4/5/4/4 | 18 | 23 | **-5** | LAB |
| F24 | Session Conversation Memory | 3/3/2/2/3/2/3/3 | 22 | 12 | **10** | P3 |
| F25 | Opt-in Antwortpräferenzen | 2/2/3/1/1/1/1/2 | 18 | 5 | **13** | P3 |
| F26 | Content Review & Approval Workflow | 5/5/3/3/2/2/2/2 | 33 | 12 | **21** | P0 |
| F27 | Freshness Monitor & Review Reminder | 4/4/3/2/2/1/2/2 | 28 | 9 | **19** | P2 |
| F28 | Conversational Commerce Workflow | 5/5/2/5/4/4/4/4 | 33 | 22 | **11** | P2 |
| F29 | Read-only Document Analysis Assistant | 2/4/1/5/5/5/4/5 | 21 | 24 | **-3** | LAB |
| F30 | Budget-, Cache- und Model-Gateway | 4/5/3/3/3/2/2/2 | 30 | 13 | **17** | P1 |

## Abhängigkeitsadjustierung

- **F01, F02 und F26** sind P0, weil mehrere wertvolle Fähigkeiten von kanonischen Daten, Messbarkeit und kontrollierter Publikation abhängen.
- **F03/F04/F05** liefern heute direkten Nutzen ohne AI und gehen den numerisch ebenfalls attraktiven, aber bedingten RAG-Bausteinen vor.
- **F09/F14/F30** werden nur gemeinsam mit F07 entwickelt; F13 ist bereits als Nulltreffer-Handoff für die deterministische Suche nutzbar.
- **F08/F11/F12/F17/F20/F21/F23/F29** bleiben P3/LAB, bis Korpus, Nutzerfragen und Benchmarks den Aufwand belegen.
- Scores vergleichen Optionen, nicht Scheingenauigkeit; Kosten und Nutzen sind Architektur-Schätzwerte, keine Business Cases.
