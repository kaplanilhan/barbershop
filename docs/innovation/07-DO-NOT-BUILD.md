# 07 – Do Not Build (jetzt)

| Verlockende Idee | Ablehnung im aktuellen Projekt | Revisit-Trigger |
|---|---|---|
| Generischer Planner-/Research-/Critic-Multi-Agent-Swarm | Keine komplexe Tool-/Research-Aufgabe, hoher Call-, Latenz- und Fehler-Multiplikator; Orchestrierung wäre Selbstzweck. | Messbarer komplexer Benchmark, den begrenzte Workflows deutlich verfehlen. |
| Autonomer Agent mit E-Mail-, Kalender- oder Publish-Schreibrechten | Prompt Injection oder Modellfehler könnten externe Aktionen auslösen; Auth, Idempotenz und Audit fehlen. | Deterministischer Domain-Service plus Human Approval und bestandene Abuse-Tests. |
| GraphRAG/Knowledge Graph | Kleiner statischer Korpus und Single-Shop-Domäne haben kein belegtes Relationship-Problem; relationale Daten reichen. | Mehrere Standorte, >10 % relevante Multi-Hop-Queries und Benchmarkvorteil gegenüber SQL. |
| Semantische Vektorsuche über heutige FAQ | Acht hardcodierte Fragen und wenige Services rechtfertigen Index, Embeddings und Betrieb nicht. | Korpuswachstum plus gemessene lexikalische Recall-Lücke. |
| LLM-Reranking / zweiter Verifier vor Retrieval-Benchmark | Verdoppelt oder erhöht Calls ohne nachgewiesenen Qualitätsgewinn. | F02 zeigt konkrete Ranking-/Entailment-Lücke und Kostenbudget ist akzeptiert. |
| Vollautonomes Deep Research | Nutzerfragen betreffen lokale, kontrollierte Fakten; Web-Recherche würde unverifizierte externe Quellen und hohe Kosten einführen. | Reale Research-Persona, kuratierte Quellen, read-only Sandbox und Erfolgstest. |
| Langfristiges Kunden-/Stil-Memory | Kein Nutzerkonto oder belegter Wiederholungsnutzen; hohes Privacy-, Stale- und Cross-user-Leakage-Risiko. | Expliziter Opt-in-Use-Case, Löschung/Export/TTL, Identity und messbarer Komfortgewinn. |
| „Organizational Memory“ als Vektorspeicher aller Chats | Gespräche sind nicht automatisch Wahrheit; PII und falsche Erinnerungen würden den Wissensbestand kontaminieren. | Kuratierter, freigegebener Knowledge-Capture-Workflow mit Provenienz. |
| Komplexe Fine-Tuning-Pipeline | Kein Trainingsdatensatz und kein belegtes modellbedingtes Problem; Retrieval/Rules sind überprüfbarer. | Genügend hochwertige Daten und Baseline zeigt reproduzierbare, durch Prompt/RAG nicht lösbare Lücke. |
| Beliebige Dokumentuploads mit Auto-Publish | Keine sichere Auth/ACL/Parser-Quarantäne; indirekte Prompt Injection und falsche Inhalte würden sofort wirksam. | F17 mit Allowlist, Malwareprüfung, Preview und Human Approval. |
| Echtzeit-Event-/Streamingarchitektur | Öffnungszeiten/Services ändern sich selten; Batch/On-publish genügt. | Definierte Echtzeit-SLA und Ereignisvolumen, das Scheduler nicht erfüllt. |
| Eigene Multi-Tenant-Plattform | Produkt ist ein einzelner Shop; Tenant Isolation wäre teuer und ungeprüft. | Tatsächliches SaaS-/Franchise-Modell mit vertraglichen Isolationsanforderungen. |
| Numerischer „Antwort ist zu 93 % wahr“-Score | Modell-/Retrievalscores sind keine kalibrierte Wahrheit und fördern Automation Bias. | Nicht als Wahrheitsscore revisitieren; stattdessen immer erklärbare Evidenzfaktoren nutzen. |
| Emotion-/Gesichts-/Gesundheitsprofiling für Stilberatung | Kein notwendiger Nutzen, hohe Sensitivität/Bias/Consent-Risiken. | Im aktuellen Produkt nicht vorgesehen; einfache Nutzerwahl genügt. |

Diese Liste bedeutet „nicht jetzt“, außer bei Profiling/irreführendem Wahrheitsscore, die auch strategisch nicht empfohlen werden. Jeder Revisit benötigt Problembeleg, Eval und Security Review.
