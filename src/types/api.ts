export interface Brand {
    id: number;
    name: string;
    description: string;
    country: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    size: string;
    color: string;
    stockQuantity: number;
    brand: Brand;
    createdAt: string;
}

export interface BrandAnalytics {
    brandId: number;
    brandName: string;
    totalSales: number;
    totalRevenue: number;
    totalReturns: number;
    totalRefunded: number;
    productsInCarts: number;
    uniqueProductCount: number;
    averageOrderValue: number;
    returnRate: number;
    conversionRate: number;
}

export interface Sale {
    id: number;
    product: Product;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    customerId: string;
    saleDate: string;
}

export interface CartItem {
    id: number;
    customerId: string;
    product: Product;
    quantity: number;
    addedAt: string;
    isActive: boolean;
}

export interface AuthRequest {
    username: string;
    password: string;
}

export interface AuthResponse {
    userId: number;
    username: string;
}

export interface ReturnItem {
    id: number;
    sale: Sale;
    returnDate: string;
    returnReason: string;
    refundAmount: number;
}

