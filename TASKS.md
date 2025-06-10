# Classic Cuts Barbershop - Entwicklungsplan (Abhängigkeits-optimiert)

## 🚨 DRINGEND - PRIO SEHR HOCH: Online-Buchung entfernen

### 0. Code-Bereinigung: Online-Booking-System entfernen
```
Status: ✅ ERLEDIGT ✅
Abhängigkeiten: Keine - muss vor allem anderen erledigt werden
```
- [x] **Terminbuchungs-Code entfernen**
  - [x] `/termin` Route und Seite löschen
  - [x] `/test-booking` Route und Seite löschen  
  - [x] Booking-APIs entfernen: `/api/appointments/*`
  - [x] E-Mail-Service für Buchungsbestätigungen entfernen
  - [x] Verfügbarkeits-APIs entfernen: `/api/availability`
  - [x] Alle Booking-bezogenen Komponenten löschen
  - [x] Navigation Links zu Booking-Seiten entfernen
  - [x] Prisma Schema: Appointments Tabelle entfernen
  - [x] Booking-bezogene Dependencies aus package.json entfernen
  - [x] Auth-System komplett entfernt
  - [x] Middleware entfernt
  - [x] Komplettes `/api` Verzeichnis entfernt
  - [x] Alle Test-Verzeichnisse entfernt

- [x] **Ersatz-Funktionalität implementieren**
  - [x] Kontakt-Seite für Terminvereinbarung per Telefon/E-Mail ausbauen
  - [x] "Termin vereinbaren" Call-to-Action auf Telefon/WhatsApp umleiten
  - [x] Öffnungszeiten prominent anzeigen
  - [x] Telefonnummer und WhatsApp-Link auf allen Seiten verfügbar machen

---

## 🏗️ Phase 1A: Infrastruktur & Grundlagen (ANGEPASST)

### 1. Projekt-Setup & Grundlagen ✅
```
Abhängigkeiten: Keine - kann sofort beginnen
```
- [x] **Next.js Projekt initialisieren**
  - [x] TypeScript konfigurieren
  - [x] Tailwind CSS einrichten
  - [x] Grundlegende Ordnerstruktur erstellen

- [ ] **Vereinfachte Datenbank (nur bei Bedarf)**
  - [ ] Nur für Admin-Features (Services, Barber-Profile)
  - [ ] Keine Appointment-Tabellen
  - [ ] Fokus auf Content-Management

### 2. Vereinfachtes Auth-System (OPTIONAL)
```
Abhängigkeiten: Nur wenn Admin-Panel benötigt wird
```
- [ ] **Nur Admin-Login** (falls Content-Management gewünscht)
  - [ ] Einfacher Admin-Login für Content-Updates
  - [ ] Keine Kunden-Registrierung
  - [ ] Keine Barber-Accounts

## 🏗️ Phase 1B: Website-Funktionen (NEU FOKUSSIERT)

### 3. Content-Management APIs (OPTIONAL)
```
Abhängigkeiten: ✅ Vereinfachte Datenbank (falls gewünscht)
```
- [ ] **Services API** (nur falls dynamische Verwaltung gewünscht)
  - [ ] Services verwalten für Website-Anzeige
  - [ ] Preise und Beschreibungen aktualisierbar

- [ ] **Team API** (nur falls dynamische Verwaltung gewünscht)
  - [ ] Barber-Profile verwalten
  - [ ] Fotos und Beschreibungen aktualisierbar

### 4. Kontakt & Kommunikation (PRIORITÄT HOCH)
```
Abhängigkeiten: Keine - sofort umsetzbar
```
- [x] **Erweiterte Kontakt-Funktionen**
  - [x] WhatsApp-Integration prominent
  - [x] Telefon-Click-to-Call optimieren
  - [x] Kontaktformular für allgemeine Anfragen
  - [x] Google Maps Integration verbessern
  - [x] Öffnungszeiten-Widget

- [x] **Call-to-Action Optimierung**
  - [x] "Jetzt anrufen" Buttons überall
  - [x] WhatsApp-Button floating/fixed
  - [x] Telefonnummer in Header/Footer prominent
  - [x] "Termin vereinbaren" → Telefon/WhatsApp umleiten

## 🏗️ Phase 1C: Website-Optimierung

### 5. SEO & Performance (PRIORITÄT HOCH)
```
Abhängigkeiten: ✅ Basis-Website ohne Booking
```
- [x] **SEO-Optimierung**
  - [x] Local SEO für Barbershop
  - [x] Google Business Profil optimieren
  - [x] Meta-Tags für alle Services
  - [x] Schema.org Markup für Geschäft

- [x] **Performance & UX**
  - [x] Mobile-First Design optimieren
  - [x] Loading Performance verbessern
  - [x] Barrierefreiheit sicherstellen

### 6. Content & Marketing
```
Abhängigkeiten: ✅ Basis-Website
```
- [x] **Content-Erstellung**
  - [x] Service-Beschreibungen optimieren
  - [x] Team-Profile ausarbeiten
  - [x] Über-uns Seite verbessern
  - [x] FAQ-Sektion hinzufügen

- [x] **Social Media Integration**
  - [x] Instagram-Feed einbinden
  - [x] Google Reviews anzeigen
  - [x] Social Media Links prominent

---

## 🚀 Phase 2: Erweiterte Website-Features

### 7. Admin-Panel (NUR BEI BEDARF)
```
Abhängigkeiten: ✅ Auth-System + ✅ Content-APIs
```
- [x] **Content-Management**
  - [x] Services verwalten
  - [x] Team-Profile bearbeiten
  - [x] Öffnungszeiten ändern
  - [x] Preise aktualisieren

## 🎨 Phase 3: Deployment & Optimierung

### 9. Production-Setup
```
Abhängigkeiten: ✅ Fertige Website ohne Booking
```
- [x] **Hosting & Domain**
  - [x] Domain registrieren
  - [x] Hosting einrichten (Vercel/Netlify)
  - [x] SSL-Zertifikat
  - [x] CDN für Images

- [x] **Sicherheit & DSGVO**
  - [x] Cookie-Banner
  - [x] Datenschutzerklärung anpassen
  - [x] Impressum aktualisieren

### 10. Final Polish & Launch
```
Abhängigkeiten: ✅ Production-Setup
```
- [ ] **Launch-Vorbereitung**
  - [ ] Cross-Browser Testing
  - [ ] Mobile Testing
  - [ ] Speed Optimization
  - [ ] Final Content-Review

- [ ] **Launch & Marketing**
  - [ ] Google Business Profil mit Website verknüpfen
  - [ ] Social Media Ankündigung
  - [ ] Local SEO aktivieren

---

## 📊 Optional: Zukünftige Erweiterungen

### 11. Erweiterte Features (bei Bedarf)
```
Abhängigkeiten: ✅ Erfolgreiche Website-Launch
```
- [ ] **Nice-to-Have Features**
  - [ ] Blog-Section für Tipps & Trends
  - [ ] Bildergalerie erweitern
  - [ ] Kundenbewertungen-System
  - [ ] Mehrsprachig (DE/EN)

- [ ] **Business Tools** (falls später doch gewünscht)
  - [ ] Einfacher Kalender nur für Barber-Ansicht
  - [ ] Kunden-Notizen System
  - [ ] Inventar-Management

---

## 🎯 Neue Startreihenfolge (OHNE ONLINE-BOOKING):

1. **✅ ERLEDIGT**: Punkt 0 - Online-Booking Code entfernen
2. **✅ ERLEDIGT**: Punkt 4 - Kontakt & Kommunikation optimieren  
3. **Woche 2**: Punkt 5 - SEO & Performance
4. **Woche 3**: Punkt 6 - Content & Marketing
5. **Woche 4**: Punkt 9 - Production-Setup
6. **Woche 5**: Punkt 10 - Launch

**💡 Neuer Fokus**: 
- Telefon & WhatsApp als primäre Kontaktwege
- Website als Marketing-Tool & Information-Hub
- Kein komplexes Backend nötig
- Schnellerer Launch möglich! 