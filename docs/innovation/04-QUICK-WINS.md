# 04 – Quick Wins

Diese Auswahl löst belegte Nutzer- oder Qualitätsprobleme, ohne eine AI-Plattform vorwegzunehmen. Aufwand sind grobe Team-Schätzungen nach Abschluss der notwendigen Security-Baseline, keine Zusage.

| Rang | Feature | Konkretes Problem / MVP | Wert | Aufwand / Risiko | Messung |
|---:|---|---|---|---|---|
| 1 | **F03 Content Conflict & Freshness Guard** | Repo-weite Kernfakten wie Telefon, Domain, Zeiten und Preise regelbasiert vergleichen; CI-Report. | Verhindert heute bereits sichtbare Fehlinformation. | 2–4 Personentage; gering. | Konflikte auf 0; False Positives; Zeit bis Korrektur. |
| 2 | **F04 Deterministische FAQ-/Service-Suche** | 15–30 kuratierte Intents, Nulltreffer-Fallback und direkte Links/Aktionen. | Information schneller finden; bildet RAG-Benchmark. | 3–5 Personentage nach F01; gering. | Task Success, Zero-result, p95, Action Clicks. |
| 3 | **F05 Geführter Servicefinder** | 3–5 regelbasierte Fragen; Ergebnis erklärt und Anfrage vorausgefüllt. | Weniger Auswahlunsicherheit und Rückfragen. | 3–5 Personentage; gering. | Completion, Akzeptanz, Abbruch, qualifizierte Leads. |
| 4 | **F13 Ehrliches No-answer/Handoff** | Für Suche sofort „nicht gefunden“ plus Telefon/WhatsApp/Kontakt; später gleiche Policy für RAG. | Keine erfundenen Antworten, reibungsarme Eskalation. | 1–2 Personentage; gering. | False Refusal, Handoff-Erfolg, Nulltreffer. |
| 5 | **F02 Golden Set – erster Slice** | 30 reale Fragen mit erwarteter Antwort/Quelle, inkl. No-answer und adversarial. | Jede spätere AI-Entscheidung wird messbar. | 2–4 Personentage Product/Content; gering. | Abdeckung kritischer Intents, Baseline Task Success. |

## Warum nicht „schnell ein Chatbot“?

Selbst ein kleiner LLM-Chat braucht korrekte Daten, Quellenanker, No-answer, Quoten, Datenschutz und Evaluation. Ohne diese Grundlagen wäre die sichtbare UI schnell, das Produkt aber nicht vertrauenswürdig. Quick Win bedeutet hier deshalb **schneller validierter Nutzwert**, nicht möglichst schneller AI-Einsatz.
