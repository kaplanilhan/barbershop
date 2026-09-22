# 02 – Feature-Ideen

## Methodik und Swarm-Cross-Review

Die zwölf geforderten Rollen wurden in unabhängigen Analyse-Strängen simuliert: Produkt/RAG/Evaluation, Agentic/Knowledge/Security sowie UX/Trust/Document/Memory/Automation/Cost. Erst danach wurden Überschneidungen konsolidiert. Der Cross-Review verwarf insbesondere eigenständige „Agents“ für Routing, Citation, Verification und Retry: Für dieses Produkt sind Pipeline-Schritte, Regeln oder State Machines sicherer. Ebenso wurden FAQ-Suche und Content-Normalisierung nicht künstlich als RAG bezeichnet.

**Prämisse:** Alle AI-Funktionen sind Greenfield. „Architekturänderungen“ beschreibt deshalb den später nötigen Eingriff, nicht eine in dieser Analyse vorgenommene Änderung. AI-Kosten sind relativ zur aktuellen Baseline von null AI-Calls. Der kleinste MVP steht jeweils explizit dabei.

## Konsolidiertes Portfolio (30 Ideen)


### F01 – Kanonische Content- und Knowledge-API

- **Kategorie / Kurzbeschreibung:** Foundation. Versionierte Single Source of Truth für Services, Preise, Zeiten, Team und FAQ.
- **Problem / Nutzerwert:** Heute widersprechen sich hart codierte Fakten; jede AI würde diese Konflikte verstärken. Der Unterschied ist für Nutzer sichtbar, sofern dieses Problem tatsächlich auftritt.
- **Funktionsweise / kleinster MVP:** UI und spätere Assistenten lesen freigegebene Datensätze mit stabilen IDs, Gültigkeit und Provenienz. **MVP:** Services, FAQ, Kontakt und Öffnungszeiten normalisieren; read-only API; Versions-/Owner-Felder.
- **Betroffene Komponenten:** Contentmodell, Admin, öffentliche Seiten, API
- **Technische Voraussetzungen:** Content Owner; echte Admin-Auth; Feld-/Freigabemodell
- **Architekturänderungen:** Mittel: persistenter Store und Read API statt verstreuter Konstanten.
- **RAG-Auswirkungen:** Schafft erst einen verlässlichen Korpus; noch kein Retrieval.
- **Security-Auswirkungen:** RBAC, Input-Encoding, Audit und Publish-Freigabe.
- **Performance-Auswirkungen:** Ein zusätzlicher Cache-fähiger Read; statische Generierung möglich.
- **AI-Kosten pro Vorgang:** 0 LLM-/Embedding-Calls; geringe Infrastrukturkosten.
- **Risiken:** Fehlmigration, stale Cache, ungeklärte Ownership.
- **Abhängigkeiten:** Auth/RBAC als Gate.
- **Alternative ohne LLM:** Ist die empfohlene MVP-Variante.
- **Alternative ohne Agent:** Kein Agent.
- **Erfolgsmessung:** 0 Konflikte; Freshness-SLA; Anteil zentral gerenderter Flächen.
- **Aufwand / Innovationslevel:** 2/5; LEVEL 1
- **Score / Priorität:** **27**; **P0**. Ratings und Rechnung: `03-FEATURE-SCORING.md`.


### F02 – Golden Evaluation Set & AI-Telemetrie

- **Kategorie / Kurzbeschreibung:** Evaluation. Versionierte reale, mehrdeutige, unanswerable und adversariale Fragen als Qualitätsgate.
- **Problem / Nutzerwert:** Ohne Baseline kann RAG-Mehrwert nicht gegen Suche/Rules belegt werden. Der Unterschied ist für Nutzer sichtbar, sofern dieses Problem tatsächlich auftritt.
- **Funktionsweise / kleinster MVP:** Offline-Läufe messen Antworten, Quellen, Latenz und Kosten; Produktion erfasst PII-arm Aggregate. **MVP:** 30–50 kuratierte Fragen, erwartete Fakten/Quellen und deterministische Baseline.
- **Betroffene Komponenten:** Eval-Harness, CI, Observability
- **Technische Voraussetzungen:** F01 Content-IDs; Rubrik; Content Owner
- **Architekturänderungen:** Niedrig bis mittel; keine Laufzeitarchitektur nötig.
- **RAG-Auswirkungen:** Misst später Recall/Precision/Faithfulness.
- **Security-Auswirkungen:** Testdaten anonymisieren; Logs redigieren und begrenzen.
- **Performance-Auswirkungen:** Offline-Last; keine Nutzerlatenz.
- **AI-Kosten pro Vorgang:** Offline Modellkosten erst beim RAG-Pilot.
- **Risiken:** Unrepräsentatives Set, Metric Gaming.
- **Abhängigkeiten:** F01 für stabile Referenzen.
- **Alternative ohne LLM:** Regel-/Suchbaseline ist Pflicht.
- **Alternative ohne Agent:** Kein Agent.
- **Erfolgsmessung:** Task Success, Recall@k, Precision@k, Faithfulness, Citation Accuracy, No-answer F1, p95, €/Task.
- **Aufwand / Innovationslevel:** 3/5; LEVEL 1
- **Score / Priorität:** **21**; **P0**. Ratings und Rechnung: `03-FEATURE-SCORING.md`.


### F03 – Content Conflict & Freshness Guard

- **Kategorie / Kurzbeschreibung:** Trust. Deterministische Checks für Telefon, Domain, Zeiten, Preise und abgelaufene Inhalte.
- **Problem / Nutzerwert:** Bereits heute stehen widersprüchliche Kernfakten im Repository. Der Unterschied ist für Nutzer sichtbar, sofern dieses Problem tatsächlich auftritt.
- **Funktionsweise / kleinster MVP:** Validierungsregeln blockieren oder markieren Publikation; Owner bestätigt Ausnahmen. **MVP:** Checks für fünf Kernfakten im CI plus Review-Report.
- **Betroffene Komponenten:** Content Store, CI/Admin, Alerts
- **Technische Voraussetzungen:** F01 oder zunächst Build-Time-Regeln
- **Architekturänderungen:** Gering; Scheduler erst später.
- **RAG-Auswirkungen:** Verhindert falschen Index-Input.
- **Security-Auswirkungen:** Nur Metadaten loggen; Review-Rechte.
- **Performance-Auswirkungen:** Build/offline; vernachlässigbare Requestkosten.
- **AI-Kosten pro Vorgang:** 0 AI-Kosten.
- **Risiken:** False Positives, Alarmmüdigkeit.
- **Abhängigkeiten:** F01 für Vollversion.
- **Alternative ohne LLM:** Vollständig regelbasiert.
- **Alternative ohne Agent:** Kein Agent.
- **Erfolgsmessung:** Echte Konflikte, False-positive-Rate, MTTR, überfällige Inhalte.
- **Aufwand / Innovationslevel:** 2/5; LEVEL 1
- **Score / Priorität:** **27**; **P1**. Ratings und Rechnung: `03-FEATURE-SCORING.md`.


### F04 – Deterministische FAQ- und Service-Suche

- **Kategorie / Kurzbeschreibung:** RAG/UX. Keyword-, Synonym- und Intent-Suche mit direkten Aktionen.
- **Problem / Nutzerwert:** Kunden müssen statische Seiten durchsuchen oder anrufen. Der Unterschied ist für Nutzer sichtbar, sofern dieses Problem tatsächlich auftritt.
- **Funktionsweise / kleinster MVP:** Kuratierte Intents suchen strukturierte Inhalte; Nulltreffer führt zu Kontakt. **MVP:** 15–30 Intents, Suche, verlinkte Quelle/Aktion, aggregierte Telemetrie.
- **Betroffene Komponenten:** FAQ UI, Search Route, Content API
- **Technische Voraussetzungen:** F01; Suchbegriffe; Analytics
- **Architekturänderungen:** Gering; kein Vektorindex.
- **RAG-Auswirkungen:** Dient als Benchmark und kann RAG unnötig machen.
- **Security-Auswirkungen:** Abuse-Limits; keine PII in Queries speichern.
- **Performance-Auswirkungen:** Sehr schnell und cachefähig.
- **AI-Kosten pro Vorgang:** 0 AI-Kosten.
- **Risiken:** Synonymlücken; falsche Analytics-Interpretation.
- **Abhängigkeiten:** F01 empfohlen.
- **Alternative ohne LLM:** Dies ist die Lösung.
- **Alternative ohne Agent:** Kein Agent.
- **Erfolgsmessung:** Task Success, Zero-result-Rate, p95, Action-Click, Kontaktdeflection.
- **Aufwand / Innovationslevel:** 2/5; LEVEL 1
- **Score / Priorität:** **27**; **P1**. Ratings und Rechnung: `03-FEATURE-SCORING.md`.


### F05 – Geführter Servicefinder

- **Kategorie / Kurzbeschreibung:** UX. Entscheidungsbaum zu passendem Service und vorausgefüllter Anfrage.
- **Problem / Nutzerwert:** Nutzer kennen Servicebezeichnungen oder Dauer/Budget nicht. Der Unterschied ist für Nutzer sichtbar, sofern dieses Problem tatsächlich auftritt.
- **Funktionsweise / kleinster MVP:** Regeln fragen Ziel, Zeit und Budget ab; Ergebnis verweist auf vorhandene Angebote. **MVP:** 3–5 Fragen, erklärtes Ergebnis, vorausgefülltes aber editierbares Formular.
- **Betroffene Komponenten:** Services UI, Kontaktformular, Content API
- **Technische Voraussetzungen:** F01; kuratierte Entscheidungsregeln
- **Architekturänderungen:** Gering; UI-State, keine neue AI-Plattform.
- **RAG-Auswirkungen:** Kein Retrieval nötig.
- **Security-Auswirkungen:** Datensparsam; Eingaben nicht als Profil speichern.
- **Performance-Auswirkungen:** Clientnah und schnell.
- **AI-Kosten pro Vorgang:** 0 AI-Kosten.
- **Risiken:** Übervereinfachte Empfehlungen.
- **Abhängigkeiten:** F01.
- **Alternative ohne LLM:** Regelbaum ist bevorzugt.
- **Alternative ohne Agent:** Kein Agent.
- **Erfolgsmessung:** Completion, Auswahlakzeptanz, Abbruch, qualifizierte Anfragen.
- **Aufwand / Innovationslevel:** 2/5; LEVEL 1
- **Score / Priorität:** **27**; **P1**. Ratings und Rechnung: `03-FEATURE-SCORING.md`.


### F06 – Anfrage-Triage mit Bestätigung

- **Kategorie / Kurzbeschreibung:** Agentic/Workflow. Extrahiert Service, Datum, Uhrzeit und Intent aus Freitext, Nutzer bestätigt.
- **Problem / Nutzerwert:** Unstrukturierte Anfragen erzeugen Rückfragen. Der Unterschied ist für Nutzer sichtbar, sofern dieses Problem tatsächlich auftritt.
- **Funktionsweise / kleinster MVP:** Zuerst Parser/Regeln, optional LLM-Fallback; validierte Felder gehen erst nach Bestätigung an Kontakt-API. **MVP:** Regelbasierte Extraktion und editierbare Zusammenfassung; kein Kalender-Write.
- **Betroffene Komponenten:** Kontakt UI/API, Validation, Audit
- **Technische Voraussetzungen:** Kanonische Services; robuste Quoten; HTML-Encoding
- **Architekturänderungen:** Mittel: zustandsbehafteter Intake-Workflow.
- **RAG-Auswirkungen:** Kann Fakten aus F01 nutzen, ist aber kein RAG.
- **Security-Auswirkungen:** PII-Minimierung, Prompt-Injection-Abgrenzung, Confirm-before-send.
- **Performance-Auswirkungen:** Regelpfad schnell; Fallback ein Modellcall.
- **AI-Kosten pro Vorgang:** 0× Regelpfad, 1× nur Fallback.
- **Risiken:** Fehlextraktion, Datumsmehrdeutigkeit.
- **Abhängigkeiten:** F01; Security-Baseline.
- **Alternative ohne LLM:** Formularfelder/Regex decken MVP.
- **Alternative ohne Agent:** Kein Agent; State Machine.
- **Erfolgsmessung:** Pflichtfeldgenauigkeit, Bestätigungsänderungen, Completion, Rückfragen.
- **Aufwand / Innovationslevel:** 3/5; LEVEL 2
- **Score / Priorität:** **15**; **P2**. Ratings und Rechnung: `03-FEATURE-SCORING.md`.


### F07 – Grounded Website Concierge

- **Kategorie / Kurzbeschreibung:** RAG. Natürlichsprachliches Q&A mit Quellen und ehrlichem No-answer.
- **Problem / Nutzerwert:** Bei wachsendem Content reichen Navigation und Keywords eventuell nicht. Der Unterschied ist für Nutzer sichtbar, sofern dieses Problem tatsächlich auftritt.
- **Funktionsweise / kleinster MVP:** Read-only Retrieval liefert freigegebene Passagen; Modell antwortet ausschließlich daraus und bietet Handoff. **MVP:** FAQ/Services read-only, Quellenkarten, Handoff; keine Memory/Tools.
- **Betroffene Komponenten:** Chat UI, Retrieval API, Model Gateway, Content Store
- **Technische Voraussetzungen:** F01/F02; nachgewiesene Suchlücke; Datenschutzentscheidung
- **Architekturänderungen:** Hoch: komplett neue RAG-Laufzeit.
- **RAG-Auswirkungen:** Ein Retrieval plus Generation; strukturierter Lookup bevorzugt.
- **Security-Auswirkungen:** Injection-Abwehr, Quoten, keine Tool-Writes, PII-Redaction.
- **Performance-Auswirkungen:** Ziel p95 definieren; Streaming/Cache möglich.
- **AI-Kosten pro Vorgang:** 1 Retrieval + 1 LLM pro nicht gecachtem Turn.
- **Risiken:** Halluzination, falsche Preise, Kostenmissbrauch.
- **Abhängigkeiten:** F01,F02,F13,F14.
- **Alternative ohne LLM:** F04 ist Pflichtbaseline.
- **Alternative ohne Agent:** Kein Agent; begrenzte Pipeline.
- **Erfolgsmessung:** Task Success, Faithfulness, Citation Accuracy, No-answer F1, p95, €/Erfolg.
- **Aufwand / Innovationslevel:** 4/5; LEVEL 2
- **Score / Priorität:** **9**; **P2**. Ratings und Rechnung: `03-FEATURE-SCORING.md`.


### F08 – Hybrid Retrieval mit Metadatenfiltern

- **Kategorie / Kurzbeschreibung:** RAG. Lexikalische Exact Matches plus Dense Search, gefiltert nach Typ, Locale und Gültigkeit.
- **Problem / Nutzerwert:** Ein später heterogener Korpus kann Paraphrasen und exakte Namen zugleich enthalten. Der Unterschied ist für Nutzer sichtbar, sofern dieses Problem tatsächlich auftritt.
- **Funktionsweise / kleinster MVP:** Sparse/dense Kandidaten fusionieren; unpublished/expired Content wird vor Ranking ausgeschlossen. **MVP:** Offline A/B gegen lexical-only; kein Produktionsrollout ohne signifikanten Uplift.
- **Betroffene Komponenten:** Search Index, Embeddings, Metadata Layer
- **Technische Voraussetzungen:** Genügend großer Korpus; F01/F02; F07-Pilot
- **Architekturänderungen:** Hoch: zwei Indizes/Fusion.
- **RAG-Auswirkungen:** Verbessert Recall nur bei belegter Lücke.
- **Security-Auswirkungen:** ACL/Status muss vor Retrieval wirken.
- **Performance-Auswirkungen:** Zwei Suchen, parallelisierbar; Indexspeicher.
- **AI-Kosten pro Vorgang:** Embedding bei Änderung; zwei Retrievalcalls.
- **Risiken:** Komplexität ohne Qualitätsgewinn.
- **Abhängigkeiten:** F07 und Benchmarklücke.
- **Alternative ohne LLM:** F04/DB-Volltextsuche.
- **Alternative ohne Agent:** Kein Agent.
- **Erfolgsmessung:** Recall@k, nDCG/MRR, Filter-Leakage, p95, €/Query.
- **Aufwand / Innovationslevel:** 4/5; LEVEL 2
- **Score / Priorität:** **2**; **P3**. Ratings und Rechnung: `03-FEATURE-SCORING.md`.


### F09 – Dynamic Top-K, Threshold & Diversity

- **Kategorie / Kurzbeschreibung:** RAG. Kalibrierte Auswahl ausreichend relevanter und nicht redundanter Kontexte.
- **Problem / Nutzerwert:** Fixes Top-K kann irrelevanten Kontext und Tokenkosten erzeugen. Der Unterschied ist für Nutzer sichtbar, sofern dieses Problem tatsächlich auftritt.
- **Funktionsweise / kleinster MVP:** Scoreschwelle, K-Grenzen und Deduplizierung pro Dokument; Fallback bei leerem Set. **MVP:** Offline Schwellen kalibrieren; max/min K und Dedupe.
- **Betroffene Komponenten:** Retrieval/Context Builder
- **Technische Voraussetzungen:** F02/F07; kalibrierbare Scores
- **Architekturänderungen:** Gering innerhalb bestehender RAG-Pipeline.
- **RAG-Auswirkungen:** Weniger Noise/Token, bessere No-answer-Signale.
- **Security-Auswirkungen:** Threshold darf ACL nie ersetzen.
- **Performance-Auswirkungen:** Kann Kontext und Latenz senken.
- **AI-Kosten pro Vorgang:** Keine extra LLM-Calls; weniger Tokens.
- **Risiken:** False Refusals bei schlechter Kalibrierung.
- **Abhängigkeiten:** F07.
- **Alternative ohne LLM:** Regelbasiert.
- **Alternative ohne Agent:** Kein Agent.
- **Erfolgsmessung:** No-answer Precision/Recall, Context Tokens, Faithfulness, p95.
- **Aufwand / Innovationslevel:** 2/5; LEVEL 1
- **Score / Priorität:** **22**; **P1**. Ratings und Rechnung: `03-FEATURE-SCORING.md`.


### F10 – Kontrolliertes Query Rewrite & Retrieval Retry

- **Kategorie / Kurzbeschreibung:** RAG. Einmalige Normalisierung/zweite Suche nur nach schwachem Ersttreffer.
- **Problem / Nutzerwert:** Umgangssprache oder Tippfehler können Recall senken. Der Unterschied ist für Nutzer sichtbar, sofern dieses Problem tatsächlich auftritt.
- **Funktionsweise / kleinster MVP:** Regelsynonyme zuerst; optional LLM-Rewrite; harter Retry-Cap. **MVP:** Nur Regeln und maximal ein Retry; LLM erst nach Messung.
- **Betroffene Komponenten:** Query Pipeline, Retrieval, Telemetry
- **Technische Voraussetzungen:** F02/F07; Retry-Trigger
- **Architekturänderungen:** Mittel.
- **RAG-Auswirkungen:** Bis zu zweite Retrievalrunde.
- **Security-Auswirkungen:** Prompttext bleibt untrusted; keine neuen Rechte.
- **Performance-Auswirkungen:** Worst case etwa doppelte Retrievallatenz.
- **AI-Kosten pro Vorgang:** Regelpfad 0; optional +1 LLM und +1 Retrieval.
- **Risiken:** Query drift, Kostenanstieg.
- **Abhängigkeiten:** F07,F09.
- **Alternative ohne LLM:** Synonymtabelle/Fuzzy Match.
- **Alternative ohne Agent:** Kein Agent; begrenzter Workflow.
- **Erfolgsmessung:** Recovery-Uplift, Retry-Rate, Query drift, Zusatzlatenz/-kosten.
- **Aufwand / Innovationslevel:** 3/5; LEVEL 2
- **Score / Priorität:** **9**; **P2**. Ratings und Rechnung: `03-FEATURE-SCORING.md`.


### F11 – Context-/Parent-Child Retrieval

- **Kategorie / Kurzbeschreibung:** RAG. Trefferabschnitt mit engem Elternkontext statt isolierter Chunks.
- **Problem / Nutzerwert:** Bei längeren Policies können Chunks Bedeutung verlieren. Der Unterschied ist für Nutzer sichtbar, sofern dieses Problem tatsächlich auftritt.
- **Funktionsweise / kleinster MVP:** Indexiert Abschnitte und lädt geprüften Parent-Kontext nach. **MVP:** Nur ein Policy-Dokumenttyp, Vergleich gegen einfache Sections.
- **Betroffene Komponenten:** Ingestion, Chunk Store, Retrieval
- **Technische Voraussetzungen:** Lange strukturierte Dokumente; stabile Hierarchie
- **Architekturänderungen:** Mittel bis hoch; parent/child IDs.
- **RAG-Auswirkungen:** Bessere Kontextkohärenz; aktuell kein geeigneter Korpus.
- **Security-Auswirkungen:** ACL erbt strikt; keine benachbarten gesperrten Abschnitte.
- **Performance-Auswirkungen:** Mehr Storage und Fetch; weniger Rewrites möglich.
- **AI-Kosten pro Vorgang:** Embeddings pro Child; keine Extra-LLM-Calls.
- **Risiken:** Context bloat, fehlerhafte Vererbung.
- **Abhängigkeiten:** F01,F07 und längere Dokumente.
- **Alternative ohne LLM:** Section-basierte Volltextsuche.
- **Alternative ohne Agent:** Kein Agent.
- **Erfolgsmessung:** Faithfulness, Recall, Tokens, Parent leakage tests.
- **Aufwand / Innovationslevel:** 4/5; LEVEL 2
- **Score / Priorität:** **2**; **P3**. Ratings und Rechnung: `03-FEATURE-SCORING.md`.


### F12 – Cross-Encoder Reranking

- **Kategorie / Kurzbeschreibung:** RAG. Rerankt kleine Kandidatenmenge vor Kontextaufbau.
- **Problem / Nutzerwert:** First-stage Ranking kann bei großem Korpus unpräzise sein. Der Unterschied ist für Nutzer sichtbar, sofern dieses Problem tatsächlich auftritt.
- **Funktionsweise / kleinster MVP:** Top-N durch spezialisiertes Modell; nur bei gemessenem Precision-Gap. **MVP:** Offline Shadow-Test; nur aktivieren bei definiertem Uplift.
- **Betroffene Komponenten:** Retrieval/Reranker Gateway
- **Technische Voraussetzungen:** F02,F08; genügend Kandidaten
- **Architekturänderungen:** Mittel; zusätzlicher Modelldienst.
- **RAG-Auswirkungen:** Multi-stage Retrieval.
- **Security-Auswirkungen:** Query/Content an Modellanbieter; Region/Retention prüfen.
- **Performance-Auswirkungen:** Zusätzliche p95 und Compute, batchbar.
- **AI-Kosten pro Vorgang:** +1 Rerankcall; hoher Multiplikator relativ zu heute.
- **Risiken:** Keine Verbesserung bei winzigem Korpus.
- **Abhängigkeiten:** F08-Benchmark.
- **Alternative ohne LLM:** Regel-/BM25-Ranking.
- **Alternative ohne Agent:** Kein Agent.
- **Erfolgsmessung:** nDCG@k, Precision@k, p95 delta, €/successful task.
- **Aufwand / Innovationslevel:** 3/5; LEVEL 2
- **Score / Priorität:** **2**; **P3**. Ratings und Rechnung: `03-FEATURE-SCORING.md`.


### F13 – Explizites No-answer & Human Handoff

- **Kategorie / Kurzbeschreibung:** Trust/UX. Antwortet bei fehlender Evidenz nicht und bietet Telefon, WhatsApp oder Formular.
- **Problem / Nutzerwert:** Falsche Betriebsfakten sind schädlicher als eine Übergabe. Der Unterschied ist für Nutzer sichtbar, sofern dieses Problem tatsächlich auftritt.
- **Funktionsweise / kleinster MVP:** Deterministische Evidenz-/Intentregeln plus erklärter Handoff; kein pseudo-genauer Wahrheitswert. **MVP:** Evidenzkategorien anzeigen und bestehende Kontaktkanäle anbieten.
- **Betroffene Komponenten:** Concierge UI, Quality Gate
- **Technische Voraussetzungen:** F02; für RAG F07/F09
- **Architekturänderungen:** Gering; Teil der Antwortpolicy.
- **RAG-Auswirkungen:** Senkt unsupported Answers.
- **Security-Auswirkungen:** Keine ungefragte Weitergabe des Chatverlaufs.
- **Performance-Auswirkungen:** Spart Modellcalls bei Nulltreffer.
- **AI-Kosten pro Vorgang:** Keine zusätzlichen Calls.
- **Risiken:** Zu aggressive Ablehnung.
- **Abhängigkeiten:** Für RAG: F07/F09.
- **Alternative ohne LLM:** Direkter FAQ-Nulltreffer-Handoff.
- **Alternative ohne Agent:** Kein Agent.
- **Erfolgsmessung:** No-answer F1, False Refusal, Handoff success, unsupported rate.
- **Aufwand / Innovationslevel:** 2/5; LEVEL 1
- **Score / Priorität:** **28**; **P1**. Ratings und Rechnung: `03-FEATURE-SCORING.md`.


### F14 – Claim-Citation Coverage & Verification

- **Kategorie / Kurzbeschreibung:** Trust. Jeder Tatsachenclaim erhält Passage/Content-ID; ungestützte Claims werden entfernt/markiert.
- **Problem / Nutzerwert:** Quellenliste allein beweist nicht, dass Antwortclaims belegt sind. Der Unterschied ist für Nutzer sichtbar, sofern dieses Problem tatsächlich auftritt.
- **Funktionsweise / kleinster MVP:** Strukturierte Claims und deterministische Coverage; optional semantischer Verifier für Grenzfälle. **MVP:** Strukturiertes Ausgabeformat, deterministische Source-ID-Coverage, keine Prozent-Wahrheit.
- **Betroffene Komponenten:** Generation Contract, Verifier, Citation UI
- **Technische Voraussetzungen:** F01,F02,F07; stabile Passage-IDs
- **Architekturänderungen:** Mittel bis hoch.
- **RAG-Auswirkungen:** Grounding-Gate nach Generation.
- **Security-Auswirkungen:** Quellenrechte erneut prüfen; Verifierdaten minimieren.
- **Performance-Auswirkungen:** Regelpfad billig; Verifier erhöht Latenz.
- **AI-Kosten pro Vorgang:** 0 extra im MVP; optional +1 LLM.
- **Risiken:** Verifier irrt; false confidence.
- **Abhängigkeiten:** F07.
- **Alternative ohne LLM:** Templateantworten aus strukturierten Feldern.
- **Alternative ohne Agent:** Kein separater Agent; Pipeline-Step.
- **Erfolgsmessung:** Citation Precision/Recall, Claim Coverage, false-pass, Zusatzlatenz.
- **Aufwand / Innovationslevel:** 4/5; LEVEL 3
- **Score / Priorität:** **18**; **P1**. Ratings und Rechnung: `03-FEATURE-SCORING.md`.


### F15 – Quellenkarten & Passage-Highlight

- **Kategorie / Kurzbeschreibung:** UX. Öffnet sichtbare Quelle direkt an relevanter Stelle.
- **Problem / Nutzerwert:** Nutzer können generische Quellenangaben schlecht prüfen. Der Unterschied ist für Nutzer sichtbar, sofern dieses Problem tatsächlich auftritt.
- **Funktionsweise / kleinster MVP:** Antwort referenziert stabile Passage-ID; Vorschau zeigt Titel, Aktualität und Highlight. **MVP:** Titel, updatedAt, 1 Highlight, Link zur vollständigen Seite.
- **Betroffene Komponenten:** Chat UI, Content Renderer
- **Technische Voraussetzungen:** F01/F07; Passage Anchors
- **Architekturänderungen:** Mittel, primär UI/Contentmodell.
- **RAG-Auswirkungen:** Macht Grounding überprüfbar.
- **Security-Auswirkungen:** ACL vor Snippet; HTML sicher rendern.
- **Performance-Auswirkungen:** Kein zusätzlicher Modellcall; kleine Fetches.
- **AI-Kosten pro Vorgang:** 0 zusätzliche AI-Calls.
- **Risiken:** Offsets brechen bei Versionen.
- **Abhängigkeiten:** F07,F14.
- **Alternative ohne LLM:** FAQ-Link und Abschnittsanker.
- **Alternative ohne Agent:** Kein Agent.
- **Erfolgsmessung:** Source-open rate, verification time, Citation Helpfulness.
- **Aufwand / Innovationslevel:** 2/5; LEVEL 2
- **Score / Priorität:** **18**; **P2**. Ratings und Rechnung: `03-FEATURE-SCORING.md`.


### F16 – Erklärbarer Vertrauensindikator

- **Kategorie / Kurzbeschreibung:** Trust/UX. Zeigt Faktoren wie Quellenabdeckung, Aktualität und Retrievalstatus statt „87 % wahr“.
- **Problem / Nutzerwert:** Nutzer benötigen Unsicherheit, mathematische Scheingenauigkeit schadet. Der Unterschied ist für Nutzer sichtbar, sofern dieses Problem tatsächlich auftritt.
- **Funktionsweise / kleinster MVP:** Regelbasierte Labels „gut belegt/teilweise/nicht belegt“ mit aufklappbarer Herleitung. **MVP:** Drei Labels mit sichtbaren Gründen; kein numerischer Score.
- **Betroffene Komponenten:** Quality Gate, Citation UI
- **Technische Voraussetzungen:** F13/F14; validierte UX-Texte
- **Architekturänderungen:** Gering bis mittel.
- **RAG-Auswirkungen:** Visualisiert, verändert Retrieval nicht.
- **Security-Auswirkungen:** Keine Überversprechen; barrierefreie Erklärung.
- **Performance-Auswirkungen:** Keine AI-Last.
- **AI-Kosten pro Vorgang:** 0 zusätzliche AI-Calls.
- **Risiken:** Automation bias, missverstandene Labels.
- **Abhängigkeiten:** F14.
- **Alternative ohne LLM:** Ja, vollständig regelbasiert.
- **Alternative ohne Agent:** Kein Agent.
- **Erfolgsmessung:** Verständnistest, Fehlkalibrierung, Source opens, Trust survey.
- **Aufwand / Innovationslevel:** 2/5; LEVEL 2
- **Score / Priorität:** **19**; **P2**. Ratings und Rechnung: `03-FEATURE-SCORING.md`.


### F17 – Dokument-Ingestion mit Review

- **Kategorie / Kurzbeschreibung:** Document Intelligence. Upload/Import mit Owner, Typ, Gültigkeit, Version und Freigabe.
- **Problem / Nutzerwert:** RAG hat derzeit überhaupt keinen Dokumentbestand. Der Unterschied ist für Nutzer sichtbar, sofern dieses Problem tatsächlich auftritt.
- **Funktionsweise / kleinster MVP:** Parse in Quarantäne; Metadatenpflicht; Vorschau und Human Approval vor Publish/Index. **MVP:** Ein erlaubter Dateityp, Quarantäne, Vorschau, manuelle Freigabe; kein Auto-Publish.
- **Betroffene Komponenten:** Admin, Storage, Parser, Jobs, Index
- **Technische Voraussetzungen:** Echter Dokument-Use-Case; Auth/RBAC/Audit
- **Architekturänderungen:** Hoch, neue Storage-/Job-Infrastruktur.
- **RAG-Auswirkungen:** Ermöglicht erst dokumentbasiertes RAG.
- **Security-Auswirkungen:** Malware/Injection, Dateityp-/Größenlimits, ACL, Quarantäne.
- **Performance-Auswirkungen:** Asynchron; Speicher/Parsing/Embedding.
- **AI-Kosten pro Vorgang:** Embedding pro geänderter Version; kein Request-LLM.
- **Risiken:** Parserfehler, bösartige Inhalte, stale Index.
- **Abhängigkeiten:** F01/F02 und Security-Gate.
- **Alternative ohne LLM:** Manuell kuratierte strukturierte Eingabe.
- **Alternative ohne Agent:** Kein Agent.
- **Erfolgsmessung:** Parse success, metadata completeness, approval SLA, index freshness.
- **Aufwand / Innovationslevel:** 4/5; LEVEL 1
- **Score / Priorität:** **3**; **P3**. Ratings und Rechnung: `03-FEATURE-SCORING.md`.


### F18 – Versionsvergleich & Änderungserkennung

- **Kategorie / Kurzbeschreibung:** Document Intelligence. Zeigt semantisch relevante Änderungen zwischen freigegebenen Versionen.
- **Problem / Nutzerwert:** Preis-/Zeit-/Policy-Änderungen gehen in Kopien verloren. Der Unterschied ist für Nutzer sichtbar, sofern dieses Problem tatsächlich auftritt.
- **Funktionsweise / kleinster MVP:** Deterministischer Text-/Felddiff; optional LLM-Zusammenfassung nach Freigabe. **MVP:** Feld- und Textdiff, Owner-Ack, Reindex-Flag.
- **Betroffene Komponenten:** Content Versions, Admin Review
- **Technische Voraussetzungen:** F01 oder F17
- **Architekturänderungen:** Mittel.
- **RAG-Auswirkungen:** Löst Reindex nur für Änderungen aus.
- **Security-Auswirkungen:** Reviewer-Rechte/Audit; alte Inhalte nicht leaken.
- **Performance-Auswirkungen:** Offline, inkrementell.
- **AI-Kosten pro Vorgang:** 0 im MVP; optional 1 LLM/Version.
- **Risiken:** Noise bei Formatänderungen.
- **Abhängigkeiten:** F01.
- **Alternative ohne LLM:** Diff/strukturierter Feldvergleich.
- **Alternative ohne Agent:** Kein Agent.
- **Erfolgsmessung:** Change detection precision, Reviewzeit, stale incidents.
- **Aufwand / Innovationslevel:** 3/5; LEVEL 2
- **Score / Priorität:** **18**; **P2**. Ratings und Rechnung: `03-FEATURE-SCORING.md`.


### F19 – Duplicate & Similar Content Detection

- **Kategorie / Kurzbeschreibung:** Document Intelligence. Findet doppelte oder stark ähnliche FAQ-/Dokumenteinträge.
- **Problem / Nutzerwert:** Duplikate erzeugen widersprüchliche Antworten und Indexrauschen. Der Unterschied ist für Nutzer sichtbar, sofern dieses Problem tatsächlich auftritt.
- **Funktionsweise / kleinster MVP:** Exact Hash + normalisierte Ähnlichkeit; Embeddings erst bei großem Korpus. **MVP:** Exact/near-exact Report; Menschen entscheiden Merge.
- **Betroffene Komponenten:** Content Admin, Ingestion
- **Technische Voraussetzungen:** F01/F17
- **Architekturänderungen:** Niedrig bis mittel.
- **RAG-Auswirkungen:** Reduziert redundante Chunks.
- **Security-Auswirkungen:** Keine zusätzlichen Datenanbieter im MVP.
- **Performance-Auswirkungen:** Offline; günstig.
- **AI-Kosten pro Vorgang:** 0 im MVP; optional Embedding bei Änderung.
- **Risiken:** False merges.
- **Abhängigkeiten:** Content Store.
- **Alternative ohne LLM:** Hash/n-gram similarity.
- **Alternative ohne Agent:** Kein Agent.
- **Erfolgsmessung:** Duplicate precision/recall, Indexreduktion, Konflikte.
- **Aufwand / Innovationslevel:** 2/5; LEVEL 1
- **Score / Priorität:** **18**; **P2**. Ratings und Rechnung: `03-FEATURE-SCORING.md`.


### F20 – Key Facts & Executive Summaries

- **Kategorie / Kurzbeschreibung:** Document Intelligence. Erzeugt überprüfbare Kernaussagen für lange Policies.
- **Problem / Nutzerwert:** Lange Dokumente wären langsam konsumierbar; aktuell existieren sie nicht. Der Unterschied ist für Nutzer sichtbar, sofern dieses Problem tatsächlich auftritt.
- **Funktionsweise / kleinster MVP:** Offline Generierung pro Version, jeder Fakt mit Quelle, Human Approval. **MVP:** Ein Dokumenttyp, 5 belegte Facts, Reviewpflicht.
- **Betroffene Komponenten:** Ingestion, Summary Store, Admin Review
- **Technische Voraussetzungen:** F17; lange Dokumente; F14-Prinzipien
- **Architekturänderungen:** Mittel.
- **RAG-Auswirkungen:** Summary kann Retrieval-Hinweis sein, nie alleinige Wahrheit.
- **Security-Auswirkungen:** Injection; kein Auto-Publish; ACL-Vererbung.
- **Performance-Auswirkungen:** Asynchron/cachebar.
- **AI-Kosten pro Vorgang:** 1 LLM pro Version.
- **Risiken:** Auslassungen, veraltete Summary.
- **Abhängigkeiten:** F17,F14.
- **Alternative ohne LLM:** Redaktionelles Template.
- **Alternative ohne Agent:** Kein Agent.
- **Erfolgsmessung:** Factual consistency, edit rate, approval rate, cost/version.
- **Aufwand / Innovationslevel:** 3/5; LEVEL 2
- **Score / Priorität:** **1**; **P3**. Ratings und Rechnung: `03-FEATURE-SCORING.md`.


### F21 – Dokumentenvergleich für Betreiber

- **Kategorie / Kurzbeschreibung:** Document Intelligence. Vergleicht ausgewählte Versionen/Policies tabellarisch.
- **Problem / Nutzerwert:** Betreiber erkennen Unterschiede sonst manuell. Der Unterschied ist für Nutzer sichtbar, sofern dieses Problem tatsächlich auftritt.
- **Funktionsweise / kleinster MVP:** Deterministische Feld-/Diffansicht; LLM formuliert optional belegte Zusammenfassung. **MVP:** Zwei Versionen, strukturierter Diff, Export ohne LLM.
- **Betroffene Komponenten:** Admin UI, Version Store
- **Technische Voraussetzungen:** F18; echter Mehrdokumentbedarf
- **Architekturänderungen:** Mittel.
- **RAG-Auswirkungen:** Kein Retrieval nötig im MVP.
- **Security-Auswirkungen:** Nur autorisierte Dokumente gemeinsam verarbeiten.
- **Performance-Auswirkungen:** Offline/on demand; zwei Dokumentfetches.
- **AI-Kosten pro Vorgang:** 0 MVP, optional 1 LLM/Vergleich.
- **Risiken:** Falsche Gleichsetzung, Leakage.
- **Abhängigkeiten:** F18.
- **Alternative ohne LLM:** Diff-UI.
- **Alternative ohne Agent:** Kein Agent.
- **Erfolgsmessung:** Comparison task time, finding recall, user corrections.
- **Aufwand / Innovationslevel:** 3/5; LEVEL 2
- **Score / Priorität:** **5**; **P3**. Ratings und Rechnung: `03-FEATURE-SCORING.md`.


### F22 – Service–Barber Relationship Catalog

- **Kategorie / Kurzbeschreibung:** Knowledge. Strukturierte Zuordnung von Services, Spezialisierungen und später Verfügbarkeit.
- **Problem / Nutzerwert:** Heutige getrennte statische Daten erlauben keine belastbare Zuordnung. Der Unterschied ist für Nutzer sichtbar, sofern dieses Problem tatsächlich auftritt.
- **Funktionsweise / kleinster MVP:** Relationale Tabellen/Joins und Filter; Graph erst bei belegtem Mehrsprungproblem. **MVP:** Service↔Barber↔Specialty mit Adminfreigabe und UI-Filter.
- **Betroffene Komponenten:** Data Model, Servicefinder, Admin
- **Technische Voraussetzungen:** F01; definierte Fachregeln
- **Architekturänderungen:** Mittel; relationale Erweiterung.
- **RAG-Auswirkungen:** Metadata-Filter können Relationen nutzen.
- **Security-Auswirkungen:** Publish-/Edit-RBAC; keine sensiblen Mitarbeiterprofile.
- **Performance-Auswirkungen:** DB-Queries, günstig.
- **AI-Kosten pro Vorgang:** 0 AI-Kosten.
- **Risiken:** Pflegeaufwand, falsche Zuordnungen.
- **Abhängigkeiten:** F01.
- **Alternative ohne LLM:** Relationale Logik ist bevorzugt.
- **Alternative ohne Agent:** Kein Agent.
- **Erfolgsmessung:** Zuordnungsabdeckung, Beratungs-Task-Success, Pflegefehler.
- **Aufwand / Innovationslevel:** 3/5; LEVEL 2
- **Score / Priorität:** **14**; **P2**. Ratings und Rechnung: `03-FEATURE-SCORING.md`.


### F23 – Multi-Location Knowledge Map

- **Kategorie / Kurzbeschreibung:** Knowledge Graph. Standort-, Service-, Mitarbeiter- und Policy-Beziehungen filialübergreifend.
- **Problem / Nutzerwert:** Nur eine spätere Expansion könnte komplexe Relationship-Fragen erzeugen. Der Unterschied ist für Nutzer sichtbar, sofern dieses Problem tatsächlich auftritt.
- **Funktionsweise / kleinster MVP:** MVP relational; Graph nur wenn gemessene Queries Joins/Traversal wirklich überfordern. **MVP:** Zwei Standorte relational modellieren; kein Graph bis Abbruchkriterium widerlegt.
- **Betroffene Komponenten:** Graph/Relational Store, Retrieval, ACL
- **Technische Voraussetzungen:** Mehrere Filialen, großer Korpus, Beziehungsevaluation
- **Architekturänderungen:** Sehr hoch in Vollversion.
- **RAG-Auswirkungen:** Vector+Graph nur für echte Cross-Document-Fragen.
- **Security-Auswirkungen:** Standort-/Tenant-Leakage, komplexe ACL.
- **Performance-Auswirkungen:** Mehrere Retrievalschritte und Speicher.
- **AI-Kosten pro Vorgang:** Mehrere DB/Retrievalcalls; optional LLM.
- **Risiken:** Overengineering, Datenqualität.
- **Abhängigkeiten:** F22; Expansion.
- **Alternative ohne LLM:** Relationale Joins.
- **Alternative ohne Agent:** Kein Agent erforderlich.
- **Erfolgsmessung:** Relationship query success, >1-hop query share, ACL tests, p95.
- **Aufwand / Innovationslevel:** 5/5; LEVEL 4
- **Score / Priorität:** **-5**; **LAB**. Ratings und Rechnung: `03-FEATURE-SCORING.md`.


### F24 – Session Conversation Memory

- **Kategorie / Kurzbeschreibung:** Personalization. Begrenzte letzte Turns mit sichtbarem Löschen und TTL.
- **Problem / Nutzerwert:** Follow-ups müssten sonst Kontext wiederholen; heute gibt es keinen Chat. Der Unterschied ist für Nutzer sichtbar, sofern dieses Problem tatsächlich auftritt.
- **Funktionsweise / kleinster MVP:** Opaque Session, Tokenlimit, Zusammenfassung nur falls nötig, explizites Reset. **MVP:** Maximal 3 Turns, 30-Minuten-TTL, Reset; kein Nutzerprofil.
- **Betroffene Komponenten:** Chat, Session Store, Privacy Controls
- **Technische Voraussetzungen:** F07; gemessener Follow-up-Bedarf
- **Architekturänderungen:** Mittel.
- **RAG-Auswirkungen:** History beeinflusst Query/Antwort, nicht Content-Rechte.
- **Security-Auswirkungen:** PII-Redaction, Isolation, TTL, Löschtest.
- **Performance-Auswirkungen:** Mehr Prompttokens; Storezugriff.
- **AI-Kosten pro Vorgang:** Keine Extra-Calls, aber steigende Inputtokens.
- **Risiken:** Falsche Erinnerung, Cross-session leakage.
- **Abhängigkeiten:** F07.
- **Alternative ohne LLM:** UI übernimmt ausgewählte Filter/letzte Frage.
- **Alternative ohne Agent:** Kein Agent; normaler Session State.
- **Erfolgsmessung:** Follow-up success, tokens/turn, deletion/expiry and isolation tests.
- **Aufwand / Innovationslevel:** 2/5; LEVEL 1
- **Score / Priorität:** **10**; **P3**. Ratings und Rechnung: `03-FEATURE-SCORING.md`.


### F25 – Opt-in Antwortpräferenzen

- **Kategorie / Kurzbeschreibung:** Personalization. Speichert nur Sprache und Detailgrad transparent und löschbar.
- **Problem / Nutzerwert:** Wiederholte Nutzer möchten konsistente Darstellung; Nutzen aktuell klein. Der Unterschied ist für Nutzer sichtbar, sofern dieses Problem tatsächlich auftritt.
- **Funktionsweise / kleinster MVP:** Local-first oder Account Store nach Einwilligung; niemals Stil-/Gesundheitsprofile inferieren. **MVP:** Lokale Sprache/kurz-ausführlich-Einstellung mit Reset.
- **Betroffene Komponenten:** UI Settings, optional Preference Store
- **Technische Voraussetzungen:** Nutzerkonto nur falls ohnehin benötigt
- **Architekturänderungen:** Gering lokal, mittel serverseitig.
- **RAG-Auswirkungen:** Beeinflusst Darstellung, nicht Retrievalrechte.
- **Security-Auswirkungen:** Consent, Export/Delete, Cache-Key-Isolation.
- **Performance-Auswirkungen:** Keine relevante Latenz.
- **AI-Kosten pro Vorgang:** 0 AI-Calls; ggf. unterschiedliche Antworttokens.
- **Risiken:** Profilbildung ohne Nutzen.
- **Abhängigkeiten:** Q&A und validierter Bedarf.
- **Alternative ohne LLM:** Ja.
- **Alternative ohne Agent:** Kein Agent.
- **Erfolgsmessung:** Opt-in/use rate, delete success, satisfaction, leakage tests.
- **Aufwand / Innovationslevel:** 1/5; LEVEL 1
- **Score / Priorität:** **13**; **P3**. Ratings und Rechnung: `03-FEATURE-SCORING.md`.


### F26 – Content Review & Approval Workflow

- **Kategorie / Kurzbeschreibung:** Automation. Deterministische Zustände Draft→Review→Published mit Audit und Rollback.
- **Problem / Nutzerwert:** Automatisch oder manuell geänderte Inhalte dürfen nicht ungeprüft live gehen. Der Unterschied ist für Nutzer sichtbar, sofern dieses Problem tatsächlich auftritt.
- **Funktionsweise / kleinster MVP:** State Machine erzwingt Rollen, Vier-Augen-Freigabe und immutable Events. **MVP:** Draft/Review/Publish/Rollback, zwei Rollen, Audit; keine Auto-Freigabe.
- **Betroffene Komponenten:** Admin, Content Store, Audit
- **Technische Voraussetzungen:** Echte Auth/RBAC; F01
- **Architekturänderungen:** Mittel; Hintergrundjobs optional.
- **RAG-Auswirkungen:** Nur freigegebene Versionen werden indexiert.
- **Security-Auswirkungen:** Least privilege, separation of duties, Audit retention.
- **Performance-Auswirkungen:** Keine Request-AI-Last.
- **AI-Kosten pro Vorgang:** 0 AI-Kosten.
- **Risiken:** Prozessfriktion, falsche Rollen.
- **Abhängigkeiten:** F01/Auth.
- **Alternative ohne LLM:** State Machine ist Lösung.
- **Alternative ohne Agent:** Kein Agent.
- **Erfolgsmessung:** Unauthorized publishes=0, approval SLA, rollback success.
- **Aufwand / Innovationslevel:** 3/5; LEVEL 1
- **Score / Priorität:** **21**; **P0**. Ratings und Rechnung: `03-FEATURE-SCORING.md`.


### F27 – Freshness Monitor & Review Reminder

- **Kategorie / Kurzbeschreibung:** Automation. Periodische Checks und deduplizierte Erinnerung an Content Owner.
- **Problem / Nutzerwert:** Gültigkeitsdaten werden sonst übersehen. Der Unterschied ist für Nutzer sichtbar, sofern dieses Problem tatsächlich auftritt.
- **Funktionsweise / kleinster MVP:** Scheduler fragt Metadaten ab und erzeugt Review-Tasks; kein automatisches Umschreiben. **MVP:** Täglicher Report, einmalige Erinnerung, Eskalation an Content Owner.
- **Betroffene Komponenten:** Scheduler, Notifications, Content Store
- **Technische Voraussetzungen:** F01 Owner/validUntil; F26
- **Architekturänderungen:** Mittel; kleiner Job-/Notificationpfad.
- **RAG-Auswirkungen:** Kann stale Inhalte vor Retrieval sperren.
- **Security-Auswirkungen:** Nur Metadaten in Notifications; Rechteprüfung.
- **Performance-Auswirkungen:** Täglicher Batch, geringe Last.
- **AI-Kosten pro Vorgang:** 0 AI-Kosten.
- **Risiken:** Alert fatigue.
- **Abhängigkeiten:** F01,F26.
- **Alternative ohne LLM:** Regelbasiert.
- **Alternative ohne Agent:** Kein Agent.
- **Erfolgsmessung:** Overdue count, review MTTR, alert precision.
- **Aufwand / Innovationslevel:** 2/5; LEVEL 2
- **Score / Priorität:** **19**; **P2**. Ratings und Rechnung: `03-FEATURE-SCORING.md`.


### F28 – Conversational Commerce Workflow

- **Kategorie / Kurzbeschreibung:** Agentic. Begrenzter Dialog kombiniert Finder, Q&A, Triage und Handoff.
- **Problem / Nutzerwert:** Nutzer wechseln heute zwischen Seiten, FAQ und Kontaktkanälen. Der Unterschied ist für Nutzer sichtbar, sofern dieses Problem tatsächlich auftritt.
- **Funktionsweise / kleinster MVP:** Router wählt deterministische Intents; LLM formuliert optional; jeder Write benötigt Bestätigung. **MVP:** FAQ/Serviceauswahl → editierbare Anfrage → explizites Senden; keine Buchungszusage.
- **Betroffene Komponenten:** F04-F07,F13, Contact
- **Technische Voraussetzungen:** Kanonische Daten, Evals, Security, produktiver Bedarf
- **Architekturänderungen:** Hoch; Orchestrierung/State Machine, kein freier Planner.
- **RAG-Auswirkungen:** RAG nur für offene Wissensfragen.
- **Security-Auswirkungen:** Allowlisted read-only Tools; confirm-before-send; Quoten/Audit.
- **Performance-Auswirkungen:** Mehrere Schritte, harte Call-/Zeitbudgets.
- **AI-Kosten pro Vorgang:** 0–1 LLM/Turn; kein paralleler Agentenswarm.
- **Risiken:** Flow-Komplexität, Halluzination, Drop-off.
- **Abhängigkeiten:** F01,F02,F04,F05,F06,F13.
- **Alternative ohne LLM:** Mehrstufige Formulare/Intent-Rules.
- **Alternative ohne Agent:** Kein autonomer Agent; Workflow/Router.
- **Erfolgsmessung:** End-to-end Task Success, Conversion, Handoff, p95, cost/session.
- **Aufwand / Innovationslevel:** 5/5; LEVEL 3
- **Score / Priorität:** **11**; **P2**. Ratings und Rechnung: `03-FEATURE-SCORING.md`.


### F29 – Read-only Document Analysis Assistant

- **Kategorie / Kurzbeschreibung:** Agentic. Analysiert freigegebene lange Dokumente in begrenzten Schritten.
- **Problem / Nutzerwert:** Nur ein künftiger Policy-Korpus könnte Vergleich/Fragen über mehrere Abschnitte erfordern. Der Unterschied ist für Nutzer sichtbar, sofern dieses Problem tatsächlich auftritt.
- **Funktionsweise / kleinster MVP:** Planner mit maximal 3 read-only Retrievalschritten; Zitate und Abbruchbudget. **MVP:** Offline Benchmark mit 20 komplexen Fragen; keine Produktionstools.
- **Betroffene Komponenten:** Retrieval, Planner, Verification
- **Technische Voraussetzungen:** F17, F02, echter komplexer Task
- **Architekturänderungen:** Sehr hoch; Agent Runtime erst hier gerechtfertigt.
- **RAG-Auswirkungen:** Multi-step Retrieval/decomposition.
- **Security-Auswirkungen:** Indirect Injection, ACL je Schritt, keine externen Tools/Writes.
- **Performance-Auswirkungen:** 2–3× Retrieval/LLM; parallel nur sichere Reads.
- **AI-Kosten pro Vorgang:** Hoher AI-Kostenmultiplikator.
- **Risiken:** Runaway, Quellenmix, kaum Bedarf.
- **Abhängigkeiten:** F07,F14,F17 plus Benchmark.
- **Alternative ohne LLM:** Geführte Filter und Dokumentvergleich.
- **Alternative ohne Agent:** Ja, aber nur wenn Task-Benchmark Single-pass deutlich schlägt.
- **Erfolgsmessung:** Complex task success, step count, citations, p95, €/task, abort rate.
- **Aufwand / Innovationslevel:** 5/5; LEVEL 4
- **Score / Priorität:** **-3**; **LAB**. Ratings und Rechnung: `03-FEATURE-SCORING.md`.


### F30 – Budget-, Cache- und Model-Gateway

- **Kategorie / Kurzbeschreibung:** Platform/Performance. Zentrale Limits, deterministischer Router, versionierter Cache und Kostenmessung.
- **Problem / Nutzerwert:** Mehrere AI-Features könnten Kosten, Anbieter und PII uneinheitlich behandeln. Der Unterschied ist für Nutzer sichtbar, sofern dieses Problem tatsächlich auftritt.
- **Funktionsweise / kleinster MVP:** Statische/FAQ-Treffer zuerst; LLM nur Rest; timeouts, quotas, circuit breaker. **MVP:** Nur beim RAG-Pilot: provider wrapper, budgets, telemetry, content-version cache.
- **Betroffene Komponenten:** AI Endpoints, Telemetry, Cache
- **Technische Voraussetzungen:** Mindestens zwei beschlossene AI-Verbraucher
- **Architekturänderungen:** Mittel; nicht vor AI-Entscheid bauen.
- **RAG-Auswirkungen:** Steuert Generation/Rerank/Verifier.
- **Security-Auswirkungen:** Providerpolicy, Secret-Handling, PII-freie Cachekeys.
- **Performance-Auswirkungen:** Senkt Calls/Latenz bei Hits; Gateway-Hop.
- **AI-Kosten pro Vorgang:** Kann 1× auf 0× bei Cachehit senken.
- **Risiken:** Zentraler Ausfallpunkt, Cache leakage.
- **Abhängigkeiten:** F07 plus zweiter AI-Use-Case.
- **Alternative ohne LLM:** Regelrouter/FAQ bleibt vorgelagert.
- **Alternative ohne Agent:** Kein Agent.
- **Erfolgsmessung:** Cache hit, p95, calls/query, €/Task, quota failures.
- **Aufwand / Innovationslevel:** 3/5; LEVEL 2
- **Score / Priorität:** **17**; **P1**. Ratings und Rechnung: `03-FEATURE-SCORING.md`.
