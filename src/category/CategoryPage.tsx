import React, { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sidebar } from "../dashboard/KledaDashboard";
import "./CategoryPage.css";

// Type for frontend display
type ApiProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  size: string;
  color: string;
  image: string;
  stockQuantity: number;
  brand: {
    id: number;
    name: string;
    description: string;
    country: string;
  };
  createdAt: string;
};

// Type for frontend display
type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  img: string;
  code: string;
  sold: number;
  clicks: number;
  favorites: number;
  inCart: number;
};

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

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortConfig, setSortConfig] = useState<SortConfig>({
        key: "price",
        direction: "desc",
    });

    const handleRowClick = (id: number) => {
        navigate(`/produkt/${id}`);
    };

    const handleSort = (key: SortKey) => {
        setSortConfig((prev) => {
            if (!prev || prev.key !== key) {
                return { key, direction: "desc" };
            }
            return {
                key,
                direction: prev.direction === "desc" ? "asc" : "desc",
            };
        });
    };

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:8080/api/products`);
                if (!response.ok) throw new Error("Failed to fetch products");
                const allProducts: ApiProduct[] = await response.json();

                // Map category IDs to category names
                const categoryMap: Record<string, string> = {
                    "hoodies": "Hettegensere og sweatshirts",
                    "bukser": "Bukser",
                    "leggings": "Leggings",
                    "matchende-sett": "Matchende sett",
                    "jakker": "Jakker",
                    "overdeler-t-skjorter": "Overdeler og T-skjorter",
                    "shorts": "Shorts",
                    "sports-bh": "Sports-BH-er",
                    "tilbehor": "Tilbehør",
                    "sport": "Sport"
                };

                // Filter by category and transform to frontend format
                const filtered = allProducts
                    .filter(p => p.category === categoryMap[currentId])
                    .map(p => ({
                        id: p.id,
                        name: p.name,
                        brand: p.brand.name,
                        price: Number(p.price),
                        img: p.image || "/placeholder.jpg",
                        code: `PROD-${p.id}`,
                        // Mock data for fields not yet in backend
                        sold: Math.floor(Math.random() * 100),
                        clicks: Math.floor(Math.random() * 500),
                        favorites: Math.floor(Math.random() * 50),
                        inCart: Math.floor(Math.random() * 30),
                    }));

                setProducts(filtered);
            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [currentId]);

    const meta = CATEGORY_TITLES[currentId] ?? CATEGORY_TITLES["hoodies"];

    const sortedProducts = useMemo(() => {
        const items = [...products];

        items.sort((a, b) => {
            const { key, direction } = sortConfig;

            if (key === "name") {
                const aStr = `${a.brand} ${a.name}`.toLowerCase();
                const bStr = `${b.brand} ${b.name}`.toLowerCase();
                const cmp = aStr.localeCompare(bStr, "nb");
                return direction === "asc" ? cmp : -cmp;
            }

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
                    <header className="category-header">
                        <h1>{meta.title}</h1>
                        <p>{meta.description}</p>
                    </header>

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

                    {loading ? (
                        <div className="category-table-card">
                            <p style={{ padding: "2rem", textAlign: "center" }}>Laster produkter...</p>
                        </div>
                    ) : (
                        <div className="category-table-card">
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;