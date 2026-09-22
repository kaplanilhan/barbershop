# 09 – Top 10 Features

Die Reihenfolge berücksichtigt zuerst konkreten Nutzerwert, danach technische Machbarkeit, RAG-Qualität, Sicherheit, Strategie, Aufwand und zuletzt Innovation. Deshalb steht nicht das innovativste Feature oben.

| Rang | Feature | Warum Top 10 | Score / Priorität | Gate |
|---:|---|---|---|---|
| 1 | **F01 Kanonische Content-/Knowledge-API** | Behebt die belegte Wahrheitslücke und ermöglicht fast alle sinnvollen Folgefeatures. | 27 / P0 | Auth/RBAC, Content Owner. |
| 2 | **F03 Content Conflict & Freshness Guard** | Sofort sichtbare Qualität ohne AI, minimale Kosten und Architekturwirkung. | 27 / P1 | Kernfaktregeln und Ownership. |
| 3 | **F04 Deterministische FAQ-/Service-Suche** | Direkter Kundennutzen und faire Baseline gegen RAG. | 27 / P1 | F01. |
| 4 | **F05 Geführter Servicefinder** | Löst Auswahlunsicherheit zuverlässiger als ein Agent und verbessert Leads. | 27 / P1 | F01 und kuratierte Regeln. |
| 5 | **F02 Golden Evaluation Set & Telemetrie** | Macht Qualität, Kosten und den tatsächlichen RAG-Mehrwert messbar. | 21 / P0 | Stabile Content-IDs. |
| 6 | **F26 Review-/Approval-Workflow** | Verhindert ungeprüfte oder automatisierte Falschpublikation; Enabler für Content und Dokumente. | 23 / P0 | Produktive Auth/RBAC/Audit. |
| 7 | **F13 No-answer & Human Handoff** | Hoher Trust-Nutzen; nutzt vorhandene Telefon-/WhatsApp-/Kontaktkanäle. | 28 / P1 | Evidenzpolicy; für Chat F07. |
| 8 | **F14 Claim-Citation Coverage** | Fundament für wirklich belegte statt nur mit Quellen dekorierte Antworten. | 18 / P1, abhängig | F01/F02/F07. |
| 9 | **F07 Grounded Website Concierge** | Größter direkte AI-Nutzerwert, aber nur wenn Suche/Logs eine echte Lücke beweisen. | 9 / P2 | Phasen-1-Gates, Datenschutz und Budget. |
| 10 | **F18 Versionsvergleich & Änderungserkennung** | Reduziert stale Informationen und unterstützt kontrollierte Pflege/Indexierung. | 18 / P2 | F01 und Versionierung. |

## Knapp außerhalb

- **F30 Gateway** ist wichtig, aber nur zusammen mit mindestens einem, besser zwei AI-Verbrauchern.
- **F06 Triage** ist wertvoll, doch das vorhandene strukturierte Formular kann den MVP vielfach günstiger abdecken.
- **F08/F12** sind bekannte RAG-Techniken, aber der heutige Korpus gibt ihnen keinen belastbaren Nutzen.
- **F28** ist ein Big Bet und baut auf mehreren Top-10-Modulen auf; es ist kein sinnvoller Startpunkt.
