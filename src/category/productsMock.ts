import genser1 from "../images/genser1.png";
import genser2 from "../images/genser2.jpg";

export type Product = {
    id: number;
    brand: string;
    name: string;
    code: string;
    price: number;
    sold: number;
    clicks: number;
    favorites: number;
    inCart: number;
    img: string;
};

// ----------------------Hoodies-------------------------

export const HOODIE_PRODUCTS: Product[] = [
    {
        id: 1,
        brand: "Nike Club",
        name: "Full-Zip Hoodie",
        code: "123456789",
        price: 749,
        sold: 18,
        clicks: 420,
        favorites: 67,
        inCart: 54,
        img: genser1,
    },
    {
        id: 2,
        brand: "Nike Club",
        name: "Pullover hoodie",
        code: "987654321",
        price: 699,
        sold: 22,
        clicks: 510,
        favorites: 81,
        inCart: 63,
        img: genser2,
    },
    {
        id: 3,
        brand: "Nike Club",
        name: "Training Sweatshirt",
        code: "111222333",
        price: 599,
        sold: 15,
        clicks: 370,
        favorites: 41,
        inCart: 43,
        img: genser1,
    },
    {
        id: 4,
        brand: "Nike Sportswear",
        name: "Essential Hoodie",
        code: "444555666",
        price: 649,
        sold: 17,
        clicks: 390,
        favorites: 58,
        inCart: 47,
        img: genser2,
    },
    {
        id: 5,
        brand: "Nike Club",
        name: "Full-Zip Hoodie",
        code: "223344556",
        price: 749,
        sold: 21,
        clicks: 450,
        favorites: 73,
        inCart: 51,
        img: genser1,
    },
    {
        id: 6,
        brand: "Nike Club",
        name: "Pullover hoodie",
        code: "998877665",
        price: 699,
        sold: 19,
        clicks: 490,
        favorites: 76,
        inCart: 60,
        img: genser2,
    },
    {
        id: 7,
        brand: "Nike Club",
        name: "Training Sweatshirt",
        code: "112358132",
        price: 599,
        sold: 13,
        clicks: 340,
        favorites: 38,
        inCart: 40,
        img: genser1,
    },
    {
        id: 8,
        brand: "Nike Sportswear",
        name: "Essential Hoodie",
        code: "777888999",
        price: 649,
        sold: 20,
        clicks: 415,
        favorites: 62,
        inCart: 49,
        img: genser2,
    },
    {
        id: 9,
        brand: "Nike Club",
        name: "Full-Zip Hoodie",
        code: "123123123",
        price: 749,
        sold: 24,
        clicks: 480,
        favorites: 69,
        inCart: 56,
        img: genser1,
    },
    {
        id: 10,
        brand: "Nike Club",
        name: "Pullover hoodie",
        code: "321321321",
        price: 699,
        sold: 17,
        clicks: 430,
        favorites: 79,
        inCart: 58,
        img: genser2,
    },
    {
        id: 11,
        brand: "Nike Club",
        name: "Training Sweatshirt",
        code: "159753486",
        price: 599,
        sold: 11,
        clicks: 300,
        favorites: 36,
        inCart: 34,
        img: genser1,
    },
    {
        id: 12,
        brand: "Nike Sportswear",
        name: "Essential Hoodie",
        code: "456789123",
        price: 649,
        sold: 16,
        clicks: 365,
        favorites: 55,
        inCart: 42,
        img: genser2,
    },
    {
        id: 13,
        brand: "Nike Club",
        name: "Full-Zip Hoodie",
        code: "999888777",
        price: 749,
        sold: 23,
        clicks: 505,
        favorites: 71,
        inCart: 52,
        img: genser1,
    },
    {
        id: 14,
        brand: "Nike Club",
        name: "Pullover hoodie",
        code: "888777666",
        price: 699,
        sold: 21,
        clicks: 520,
        favorites: 85,
        inCart: 68,
        img: genser2,
    },
    {
        id: 15,
        brand: "Nike Club",
        name: "Training Sweatshirt",
        code: "777666555",
        price: 599,
        sold: 10,
        clicks: 280,
        favorites: 33,
        inCart: 30,
        img: genser1,
    },
    {
        id: 16,
        brand: "Nike Sportswear",
        name: "Essential Hoodie",
        code: "666555444",
        price: 649,
        sold: 14,
        clicks: 350,
        favorites: 49,
        inCart: 37,
        img: genser2,
    },
    {
        id: 17,
        brand: "Nike Club",
        name: "Full-Zip Hoodie",
        code: "555444333",
        price: 749,
        sold: 20,
        clicks: 410,
        favorites: 60,
        inCart: 48,
        img: genser1,
    },
    {
        id: 18,
        brand: "Nike Club",
        name: "Pullover hoodie",
        code: "444333222",
        price: 699,
        sold: 18,
        clicks: 495,
        favorites: 77,
        inCart: 64,
        img: genser2,
    },
    {
        id: 19,
        brand: "Nike Club",
        name: "Training Sweatshirt",
        code: "333222111",
        price: 599,
        sold: 12,
        clicks: 310,
        favorites: 35,
        inCart: 33,
        img: genser1,
    },
    {
        id: 20,
        brand: "Nike Sportswear",
        name: "Essential Hoodie",
        code: "222111000",
        price: 649,
        sold: 19,
        clicks: 380,
        favorites: 57,
        inCart: 46,
        img: genser2,
    },
];

// ----------------------Bukse-------------------------
const BUKSE_PRODUCTS: Product[] = [
    {
        id: 101,
        brand: "Nike Sportswear",
        name: "Tech Fleece Joggers",
        code: "BKS-001",
        price: 899,
        sold: 35,
        clicks: 210,
        favorites: 48,
        inCart: 22,
        img: genser2, // bytt til bukse-bilde senere
    },
];

const LEGGINGS_PRODUCTS: Product[] = [
    {
        id: 102,
        brand: "Nike Pro",
        name: "Training Leggings",
        code: "LEG-001",
        price: 599,
        sold: 52,
        clicks: 330,
        favorites: 60,
        inCart: 30,
        img: genser1,
    },
];

const MATCHENDE_SETT_PRODUCTS: Product[] = [
    {
        id: 103,
        brand: "Nike Club",
        name: "Hoodie & Jogger Set",
        code: "SET-001",
        price: 1299,
        sold: 18,
        clicks: 190,
        favorites: 40,
        inCart: 15,
        img: genser2,
    },
];

const JAKKE_PRODUCTS: Product[] = [
    {
        id: 104,
        brand: "Nike",
        name: "Windrunner Jacket",
        code: "JAKKE-001",
        price: 1199,
        sold: 27,
        clicks: 260,
        favorites: 55,
        inCart: 19,
        img: genser1,
    },
];

const OVERDELER_TSKJORTE_PRODUCTS: Product[] = [
    {
        id: 105,
        brand: "Nike Sportswear",
        name: "Dry-Fit T-shirt",
        code: "TOP-001",
        price: 349,
        sold: 80,
        clicks: 420,
        favorites: 90,
        inCart: 45,
        img: genser2,
    },
];

const SHORTS_PRODUCTS: Product[] = [
    {
        id: 106,
        brand: "Nike",
        name: "Training Shorts",
        code: "SH-001",
        price: 399,
        sold: 40,
        clicks: 230,
        favorites: 35,
        inCart: 20,
        img: genser1,
    },
];

const SPORTS_BH_PRODUCTS: Product[] = [
    {
        id: 107,
        brand: "Nike Pro",
        name: "Sports Bra",
        code: "SBH-001",
        price: 449,
        sold: 32,
        clicks: 210,
        favorites: 50,
        inCart: 18,
        img: genser2,
    },
];

const TILBEHOR_PRODUCTS: Product[] = [
    {
        id: 108,
        brand: "Nike",
        name: "Training Socks 3-pack",
        code: "ACC-001",
        price: 199,
        sold: 120,
        clicks: 310,
        favorites: 65,
        inCart: 40,
        img: genser1,
    },
];

const SPORT_PRODUCTS: Product[] = [
    {
        id: 109,
        brand: "Nike",
        name: "Gym Training Pack",
        code: "SPORT-001",
        price: 1599,
        sold: 14,
        clicks: 180,
        favorites: 28,
        inCart: 10,
        img: genser2,
    },
];

// Samle alle produkter per kategori-id
export const PRODUCTS_BY_CATEGORY: Record<string, Product[]> = {
    hoodies: HOODIE_PRODUCTS,
    bukser: BUKSE_PRODUCTS,
    leggings: LEGGINGS_PRODUCTS,
    "matchende-sett": MATCHENDE_SETT_PRODUCTS,
    jakker: JAKKE_PRODUCTS,
    "overdeler-t-skjorter": OVERDELER_TSKJORTE_PRODUCTS,
    shorts: SHORTS_PRODUCTS,
    "sports-bh": SPORTS_BH_PRODUCTS,
    tilbehor: TILBEHOR_PRODUCTS,
    sport: SPORT_PRODUCTS,
};


export function getProductsForCategory(categoryId: string): Product[] {
    return PRODUCTS_BY_CATEGORY[categoryId] ?? HOODIE_PRODUCTS;
}


export function getProductById(id: number): Product | undefined {

    const all = [
        ...HOODIE_PRODUCTS,
        ...BUKSE_PRODUCTS,
        ...LEGGINGS_PRODUCTS,
        ...MATCHENDE_SETT_PRODUCTS,
        ...JAKKE_PRODUCTS,
        ...OVERDELER_TSKJORTE_PRODUCTS,
        ...SHORTS_PRODUCTS,
        ...SPORTS_BH_PRODUCTS,
        ...TILBEHOR_PRODUCTS,
        ...SPORT_PRODUCTS,
    ];
    return all.find((p) => p.id === id);
}



