# Barbershop Website

Eine moderne Website für einen Barbershop, erstellt mit Next.js und Tailwind CSS.

## Funktionen

- Responsive Design
- Terminbuchungssystem
- Serviceübersicht
- Moderne UI/UX

## Installation

1. Klonen Sie das Repository:
```bash
git clone https://github.com/your-username/barbershop.git
cd barbershop
```

2. Installieren Sie die Abhängigkeiten:
```bash
npm install
```

3. Starten Sie den Entwicklungsserver:
```bash
npm run dev
```

4. Öffnen Sie [http://localhost:3000](http://localhost:3000) in Ihrem Browser.

## Technologien

- Next.js 14
- React 18
- Tailwind CSS
- TypeScript

## Projektstruktur

```
barbershop/
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── services/
│   │   │   └── page.tsx
│   │   └── termin/
│   │       └── page.tsx
│   ├── components/
│   └── styles/
├── public/
│   └── images/
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Entwicklung

- `npm run dev` - Startet den Entwicklungsserver
- `npm run build` - Erstellt die Produktionsversion
- `npm run start` - Startet die Produktionsversion
- `npm run lint` - Führt Linting durch 