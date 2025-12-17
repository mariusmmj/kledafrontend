# Kleda Frontend

En React-applikasjon for å administrere produkter, kategorier og salgsstatistikk for Kleda.

### Installasjon

1. Installer avhengigheter:
```bash
npm install
```

2. Start applikasjonen:
```bash
npm start
```

Applikasjonen åpnes på [http://localhost:3000]

## Prosjektstruktur

### Hovedfiler

- **src/App.tsx** - Hovedkomponenten som setter opp routing med React Router
- **src/index.tsx** - Inngangspunkt som renderer App-komponenten

### Ruter

Applikasjonen har følgende ruter:

- `/` - Login-side
- `/dashboard` - Dashboard med oversikt over salg og produkter
- `/kategori/:categoryId` - Viser produkter i en kategori
- `/produkt/:productId` - Detaljert produktvisning
- `/retur` - Returside med oversikt over returer
- `/retur/produkt/:productId` - Individuell returside for et spesifikt produkt

### Komponenter og sider

#### Login (`src/login/`)

- **LoginPage.tsx** - Enkel innloggingsside med brukernavn og passord
- Navigerer til dashboard etter innlogging (mock-autentisering)

#### Dashboard (`src/dashboard/`)

- **KledaDashboard.tsx** - Hovedside etter innlogging
- Inneholder:
  - **Sidebar** - Navigasjonsmeny med kategorier og innstillinger
  - **StatsCards** - Viser omsetning, gjennomsnittlig verdi og konverteringsrate
  - **StatsProducts** - Tabell med toppselgende produkter
  - **CategoryCard** - Kort for hver produktkategori
- Viser salgsdata og nøkkeltall (mock-data)

#### Kategori (`src/category/`)

- **CategoryPage.tsx** - Viser alle produkter i en kategori
- Produkttabell med sortering på pris, solgte enheter, klikk, favoritter osv.
- Klikk på produktrad for å se detaljer
- **productsMock.ts** - Mock-data for produkter i ulike kategorier

#### Produktdetaljer (`src/productDetails/`)

- **ProductDetails.tsx** - Detaljert visning av et enkelt produkt
- Viser produktbilde, info, farger og størrelser
- Inneholder søylediagram for solgte vs returnerte enheter per måned
- Statistikk: konverteringsrate, bytteandel, antall visninger og returer

#### Retur (`src/return/`)

- **ReturnPage.tsx** - Oversikt over returer med statistikk og søk
- **ReturnIndividualProduct.tsx** - Detaljert returinformasjon for et spesifikt produkt
- Viser returårsaker, tidslinjer og refusjonsbeløp

### Data

- **productsMock.ts** - Inneholder mock-produkter for alle kategorier
- Kategorier: hoodies, bukser, leggings, matchende sett, jakker, overdeler, shorts, sports-BH, tilbehør, sport

### Bilder

- **src/images/** - Produktbilder og logoer brukt i applikasjonen

## Teknologi

- React med TypeScript
- React Router for navigasjon
- CSS for styling
