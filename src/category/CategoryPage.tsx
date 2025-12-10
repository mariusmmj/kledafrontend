// src/category/CategoryPage.tsx
import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sidebar } from "../dashboard/KledaDashboard";
import {getProductsForCategory, HOODIE_PRODUCTS, Product} from "./productsMock";
import "./CategoryPage.css";



const CATEGORY_TITLES: Record<string, { title: string; description: string }> = {
    hoodies: {
        title: "Hettegensere og sweatshirts",
        description: "Her er oversikt over alle produkter i denne kategorien",
    },
    bukser: {
        title: "Bukser",
        description: "Her er oversikt over alle bukser i denne kategorien",
    },
    leggings: {
        title: "Leggings",
        description: "Her er oversikt over alle leggings i denne kategorien",
    },
    "matchende-sett": {
        title: "Matchende sett",
        description: "Her er oversikt over alle matchende sett i denne kategorien",
    },
    jakker: {
        title: "Jakker",
        description: "Her er oversikt over alle jakker i denne kategorien",
    },
    "overdeler-t-skjorter": {
        title: "Overdeler og T-skjorter",
        description: "Her er oversikt over overdeler og T-skjorter i denne kategorien",
    },
    shorts: {
        title: "Shorts",
        description: "Her er oversikt over alle shorts i denne kategorien",
    },
    "sports-bh": {
        title: "Sports-BH-er",
        description: "Her er oversikt over alle sports-BH-er i denne kategorien",
    },
    tilbehor: {
        title: "Tilbehør",
        description: "Her er oversikt over alt tilbehør i denne kategorien",
    },
    sport: {
        title: "Sport",
        description: "Her er oversikt over alle sportsprodukter i denne kategorien",
    },
};

type SortKey = "price" | "sold" | "clicks" | "favorites" | "inCart" | "name";

type SortConfig = {
    key: SortKey;
    direction: "asc" | "desc";
};

const CategoryPage: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();

    const currentId = categoryId ?? "hoodies";



    const navigate = useNavigate();

    const handleRowClick = (id: number) => {
        navigate(`/produkt/${id}`);
    };

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

    const meta = CATEGORY_TITLES[currentId] ?? CATEGORY_TITLES["hoodies"];

    const products = getProductsForCategory(currentId);


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
                            <div key={p.id} className="category-row" onClick={() => handleRowClick(p.id)}>
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
