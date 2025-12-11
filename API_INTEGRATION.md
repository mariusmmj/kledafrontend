# API Integrasjonsguide

## Oppsett

Backend-koblingen er nå konfigurert og klar til bruk.

### Filer opprettet:

1. **`.env`** - Miljøvariabler for API URL
2. **`src/types/api.ts`** - TypeScript types for alle API-data
3. **`src/services/api.ts`** - API-klient med alle endpoints
4. **`src/services/apiTest.ts`** - Test-funksjon for å verifisere tilkobling

## Bruke API i komponenter

### Eksempel: Hente brands

```typescript
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Brand } from '../types/api';

function MyComponent() {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchBrands() {
            try {
                const data = await api.getBrands();
                setBrands(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        }
        fetchBrands();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {brands.map(brand => (
                <div key={brand.id}>{brand.name}</div>
            ))}
        </div>
    );
}
```

### Eksempel: Login

```typescript
import { api } from '../services/api';

async function handleLogin(username: string, password: string) {
    try {
        const response = await api.login(username, password);
        console.log('Logged in:', response);
        // Lagre brukerinfo, redirect, etc.
    } catch (error) {
        console.error('Login failed:', error);
    }
}
```

### Eksempel: Hente analytics

```typescript
const analytics = await api.getBrandAnalytics(1); // Brand ID 1 (Nike)
console.log('Total sales:', analytics.totalSales);
console.log('Revenue:', analytics.totalRevenue);
console.log('Return rate:', analytics.returnRate);
```

## Tilgjengelige API-funksjoner

### Autentisering
- `api.checkUsername(username)` - Sjekk om brukernavn er tilgjengelig
- `api.register(username, password, brand)` - Registrer ny bruker
- `api.login(username, password)` - Logg inn

### Brands
- `api.getBrands()` - Hent alle brands
- `api.getBrandById(id)` - Hent en spesifikk brand
- `api.getBrandAnalytics(id)` - Hent analytics for en brand
- `api.getBrandSales(id)` - Hent salg for en brand
- `api.getBrandReturns(id)` - Hent returer for en brand
- `api.getBrandCarts(id)` - Hent handlevogner for en brand

### Produkter
- `api.getProducts(brandId?)` - Hent alle produkter (valgfri filter på brand)
- `api.getProductById(id)` - Hent et spesifikt produkt

### Salg og handlevogner
- `api.getSales()` - Hent alle salg
- `api.getCarts()` - Hent alle handlevogner
- `api.getReturns()` - Hent alle returer

## Teste tilkoblingen

Du kan teste API-tilkoblingen ved å kjøre:

```typescript
import { testConnection } from '../services/apiTest';

// I en komponent eller console
testConnection();
```

## Feilhåndtering

API-klienten har innebygd feilhåndtering som:
- Logger feil til console
- Kaster exception ved HTTP-feil
- Returnerer feilmelding fra backend hvis tilgjengelig

Bruk try-catch for å håndtere feil i komponentene dine.

## Backend må kjøre

Husk at backend må kjøre på `http://localhost:8080` før du kan bruke API-klienten.

Start backend med:
```bash
cd KledaDashboardBackend
mvn spring-boot:run
```

