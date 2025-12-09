// src/category/CategoryPage.tsx
import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Sidebar } from "../dashboard/KledaDashboard";
import "./CategoryPage.css";
import genser1 from "../images/genser1.png";
import genser2 from "../images/genser2.jpg";

type Product = {
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

const HOODIE_PRODUCTS: Product[] = [
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

const CATEGORY_TITLES: Record<
    string,
    { title: string; description: string }
> = {
    hoodies: {
        title: "Hettegensere og sweatshirts",
        description: "Her er oversikt over alle produkter i denne kategorien",
    },
    bukser: {
        title: "Bukser",
        description: "Her er oversikt over alle bukser i denne kategorien",
    },
};

type SortKey = "price" | "sold" | "clicks" | "favorites" | "inCart" | "name";

type SortConfig = {
    key: SortKey;
    direction: "asc" | "desc";
};

const CategoryPage: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();

    const [sortConfig, setSortConfig] = useState<SortConfig>({
        key: "price",
        direction: "desc",
    });

    const handleSort = (key: SortKey) => {
        setSortConfig((prev) => {
            if (!prev || prev.key !== key) {
                // ny kolonne → start med høy → lav
                return { key, direction: "desc" };
            }
            // samme kolonne → toggl retning
            return {
                key,
                direction: prev.direction === "desc" ? "asc" : "desc",
            };
        });
    };

    const meta =
        (categoryId && CATEGORY_TITLES[categoryId]) || CATEGORY_TITLES["hoodies"];

    const products = HOODIE_PRODUCTS;

    const sortedProducts = useMemo(() => {
        const items = [...products];

        items.sort((a, b) => {
            const { key, direction } = sortConfig;

            // tekst-sortering på navn (A–Å)
            if (key === "name") {
                const aStr = `${a.brand} ${a.name}`.toLowerCase();
                const bStr = `${b.brand} ${b.name}`.toLowerCase();
                const cmp = aStr.localeCompare(bStr, "nb");
                return direction === "asc" ? cmp : -cmp;
            }

            // tall-sortering
            let aVal = 0;
            let bVal = 0;

            switch (key) {
                case "price":
                    aVal = a.price;
                    bVal = b.price;
                    break;
                case "sold":
                    aVal = a.sold;
                    bVal = b.sold;
                    break;
                case "clicks":
                    aVal = a.clicks;
                    bVal = b.clicks;
                    break;
                case "favorites":
                    aVal = a.favorites;
                    bVal = b.favorites;
                    break;
                case "inCart":
                    aVal = a.inCart;
                    bVal = b.inCart;
                    break;
            }

            const diff = aVal - bVal;
            return direction === "asc" ? diff : -diff;
        });

        return items;
    }, [products, sortConfig]);

    return (
        <div className="dashboard">
            <div className="main-layout">
                <Sidebar />

                <div className="category-wrapper">
                    {/* Tittel + beskrivelse */}
                    <header className="category-header">
                        <h1>{meta.title}</h1>
                        <p>{meta.description}</p>
                    </header>

                    {/* Filter + søk + knapp */}
                    <div className="category-controls">
                        <select className="category-period-select">
                            <option>Denne uken</option>
                            <option>Denne måneden</option>
                            <option>Dette året</option>
                        </select>

                        <div className="category-controls-right">
                            <div className="category-search">
                                <input type="text" placeholder="Søk etter produkt..." />
                                <span className="search-icon">🔍</span>
                            </div>
                            <button className="add-product-btn">+ Legg til produkt</button>
                        </div>
                    </div>

                    {/* Selve tabellen i en "card" */}
                    <div className="category-table-card">
                        {/* Header-rad */}
                        <div className="category-table-header">
                            <div className="category-header-product">
                                <span>Produkt info</span>
                                <button
                                    className={
                                        "sort-button " +
                                        (sortConfig.key === "name" ? "active" : "")
                                    }
                                    onClick={() => handleSort("name")}
                                >
                                    A - Å
                                    {sortConfig.key === "name" && (
                                        <span className="sort-arrow">
                      {sortConfig.direction === "asc" ? "▲" : "▼"}
                    </span>
                                    )}
                                </button>
                            </div>

                            <span
                                className={
                                    "category-col-label sortable " +
                                    (sortConfig.key === "price" ? "active" : "")
                                }
                                onClick={() => handleSort("price")}
                            >
                Pris
                                {sortConfig.key === "price" && (
                                    <span className="sort-arrow">
                    {sortConfig.direction === "desc" ? "▼" : "▲"}
                  </span>
                                )}
              </span>

                            <span
                                className={
                                    "category-col-label sortable " +
                                    (sortConfig.key === "sold" ? "active" : "")
                                }
                                onClick={() => handleSort("sold")}
                            >
                Solgt
                                {sortConfig.key === "sold" && (
                                    <span className="sort-arrow">
                    {sortConfig.direction === "desc" ? "▼" : "▲"}
                  </span>
                                )}
              </span>

                            <span
                                className={
                                    "category-col-label sortable " +
                                    (sortConfig.key === "clicks" ? "active" : "")
                                }
                                onClick={() => handleSort("clicks")}
                            >
                Klikk
                                {sortConfig.key === "clicks" && (
                                    <span className="sort-arrow">
                    {sortConfig.direction === "desc" ? "▼" : "▲"}
                  </span>
                                )}
              </span>

                            <span
                                className={
                                    "category-col-label sortable " +
                                    (sortConfig.key === "favorites" ? "active" : "")
                                }
                                onClick={() => handleSort("favorites")}
                            >
                Favoritter
                                {sortConfig.key === "favorites" && (
                                    <span className="sort-arrow">
                    {sortConfig.direction === "desc" ? "▼" : "▲"}
                  </span>
                                )}
              </span>

                            <span
                                className={
                                    "category-col-label sortable " +
                                    (sortConfig.key === "inCart" ? "active" : "")
                                }
                                onClick={() => handleSort("inCart")}
                            >
                I handlekurv
                                {sortConfig.key === "inCart" && (
                                    <span className="sort-arrow">
                    {sortConfig.direction === "desc" ? "▼" : "▲"}
                  </span>
                                )}
              </span>
                        </div>

                        {/* Produkt-rader */}
                        {sortedProducts.map((p) => (
                            <div key={p.id} className="category-row">
                                <div className="category-product-cell">
                                    <img src={p.img} alt={p.name} />
                                    <div className="category-product-text">
                                        <div className="category-product-title-line">
                      <span className="category-product-brand">
                        {p.brand}
                      </span>
                                            <span className="category-product-name">{p.name}</span>
                                        </div>
                                        <span className="category-product-id">
                      Id: {p.code}
                    </span>
                                    </div>
                                </div>

                                <span className="category-col numeric">
                  {p.price.toLocaleString("nb-NO")}
                </span>
                                <span className="category-col numeric">{p.sold}</span>
                                <span className="category-col numeric">{p.clicks}</span>
                                <span className="category-col numeric">{p.favorites}</span>
                                <span className="category-col numeric">{p.inCart}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
