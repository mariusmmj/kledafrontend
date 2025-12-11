// Test API Connection
// Du kan kjøre denne testen ved å importere testConnection() i en komponent
// og kalle den i useEffect eller ved en knappeklikk

import { api } from './api';

export async function testConnection() {
    console.log('🔄 Testing API connection...');

    try {
        // Test 1: Hent brands
        console.log('Test 1: Fetching brands...');
        const brands = await api.getBrands();
        console.log(' Brands:', brands);

        if (brands && brands.length > 0) {
            const brandId = brands[0].id;

            // Test 2: Hent brand analytics
            console.log(`Test 2: Fetching analytics for brand ${brandId}...`);
            const analytics = await api.getBrandAnalytics(brandId);
            console.log(' Analytics:', analytics);

            // Test 3: Hent products
            console.log(`Test 3: Fetching products for brand ${brandId}...`);
            const products = await api.getProducts(brandId);
            console.log(' Products:', products);
        }

        console.log(' All tests passed!');
        return true;
    } catch (error) {
        console.error(' API test failed:', error);
        return false;
    }
}

