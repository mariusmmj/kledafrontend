import { Brand, Product, BrandAnalytics, Sale, CartItem, ReturnItem } from '../types/api';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

// Helper function for error handling
async function fetchWithErrorHandling(url: string, options?: RequestInit) {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

export const api = {
    // Auth
    checkUsername: async (username: string): Promise<boolean> => {
        return fetchWithErrorHandling(`${API_BASE_URL}/api/auth/check-username?username=${username}`);
    },

    register: async (username: string, password: string, brand: string) => {
        return fetchWithErrorHandling(`${API_BASE_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, brand }),
        });
    },

    login: async (username: string, password: string) => {
        return fetchWithErrorHandling(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
    },

    // Brands
    getBrands: async (): Promise<Brand[]> => {
        return fetchWithErrorHandling(`${API_BASE_URL}/api/brands`);
    },

    getBrandById: async (id: number): Promise<Brand> => {
        return fetchWithErrorHandling(`${API_BASE_URL}/api/brands/${id}`);
    },

    getBrandAnalytics: async (id: number): Promise<BrandAnalytics> => {
        return fetchWithErrorHandling(`${API_BASE_URL}/api/brands/${id}/analytics`);
    },

    getBrandSales: async (id: number): Promise<Sale[]> => {
        return fetchWithErrorHandling(`${API_BASE_URL}/api/brands/${id}/sales`);
    },

    getBrandReturns: async (id: number): Promise<ReturnItem[]> => {
        return fetchWithErrorHandling(`${API_BASE_URL}/api/brands/${id}/returns`);
    },

    getBrandCarts: async (id: number): Promise<CartItem[]> => {
        return fetchWithErrorHandling(`${API_BASE_URL}/api/brands/${id}/carts`);
    },

    // Products
    getProducts: async (brandId?: number): Promise<Product[]> => {
        const url = brandId
            ? `${API_BASE_URL}/api/products?brandId=${brandId}`
            : `${API_BASE_URL}/api/products`;
        return fetchWithErrorHandling(url);
    },

    getProductById: async (id: number): Promise<Product> => {
        return fetchWithErrorHandling(`${API_BASE_URL}/api/products/${id}`);
    },

    // Sales
    getSales: async (): Promise<Sale[]> => {
        return fetchWithErrorHandling(`${API_BASE_URL}/api/sales`);
    },

    // Carts
    getCarts: async (): Promise<CartItem[]> => {
        return fetchWithErrorHandling(`${API_BASE_URL}/api/carts`);
    },

    // Returns
    getReturns: async (): Promise<ReturnItem[]> => {
        return fetchWithErrorHandling(`${API_BASE_URL}/api/returns`);
    },
};

