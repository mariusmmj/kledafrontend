import React from "react";
import "./KledaDashboard.css";
import { Link } from "react-router-dom";
import kledaLogo from "../images/kleda.png";
import nikeLogo from "../images/nike.jpg";
import genser1 from "../images/genser1.png";
import genser2 from "../images/genser2.jpg";
import airmax from "../images/airmax270.png";
import jordanflight from "../images/jordanflight.png";
import nikesportswear from "../images/nikesportsweardame.png";

// Generic Card component
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`card ${className}`}>{children}</div>;
}

// Sidebar
export function Sidebar() {
  const general = [
    {label: "📊 Dashboard", to: "/"},
    {label: "🛒 Ordre", to: "/"}
  ];
  const categories = [
    { id: "hoodies", label: "Hettegensere og sweatshirts" },
    { id: "bukser", label: "Bukser" },
    { id: "leggings", label: "Leggings" },
    { id: "matchende-sett", label: "Matchende sett" },
    { id: "jakker", label: "Jakker" },
    { id: "overdeler-t-skjorter", label: "Overdeler og T-skjorter" },
    { id: "shorts", label: "Shorts" },
    { id: "sports-bh", label: "Sports-BH-er" },
    { id: "tilbehor", label: "Tilbehør" },
    { id: "sport", label: "Sport" },
    { id: "legg-til", label: "➕ Legg til kategori" },
  ];
  const returns = [{ label: "↺ Se returstatistikk", to: "/retur" }];
  const settings = [
    { label: "⚙️ Innstillinger", to: "/innstillinger" },
    { label: "➜ Logg ut", to: "/logout" },
  ];

  return (
      <aside className="sidebar">
        <div className="sidebar-container">
          <div className="sidebar-logo">
            <img src={kledaLogo} alt="Kleda logo" />
          </div>
          <nav>
            {/* GENERELT */}
            <p className="sidebar-title">Generelt</p>
            {general.map((item) => (
                <Link key={item.label} to={item.to} className="nav-item">
                  {item.label}
                </Link>
            ))}

            {/* KATEGORIER */}
            <p className="sidebar-title">Kategorier</p>
            {categories.map((cat) => (
                <Link
                    key={cat.id}
                    to={cat.id === "legg-til" ? "/ny-kategori" : `/kategori/${cat.id}`}
                    className="nav-item"
                >
                  {cat.label}
                </Link>
            ))}

            {/* RETURER */}
            <p className="sidebar-returer">Returer</p>
            {returns.map((item) => (
                <Link key={item.label} to={item.to} className="nav-item">
                  {item.label}
                </Link>
            ))}

            {/* INNSTILLINGER */}
            <p className="sidebar-innstillinger">Innstillinger</p>
            {settings.map((item) => (
                <Link key={item.label} to={item.to} className="nav-item">
                  {item.label}
                </Link>
            ))}
          </nav>
        </div>
      </aside>
  );
}

// Header text
function HeaderText() {
  return (
      <div className="header-row">
        <img src={nikeLogo} alt="Nike logo" className="header-nike-logo" />
        <div className="header-text">
          <h1>Hei, bruker!</h1>
          <h2>Dette er din side for nøkkeltall og innsikt i salg og omsetning</h2>
        </div>
      </div>
  );
}


// Stats cards
function StatsCards() {
  return (
    <div className="stats-container">
      <div className="stats-top">
        <p className="stats-title">Salgsresultater</p>

        <select className="stat-dropdown">
          <option>I dag</option>
          <option>Denne uke</option>
          <option>Denne måned</option>
        </select>
      </div>

      <div className="stats-cards-row">
        <Card className="stat-card text-center">
          <p className="stat-label">Omsetning</p>
          <p className="stat-value">320 612kr</p>
        </Card>

        <Card className="stat-card text-center">
          <p className="stat-label">Gjennomsnittlig verdi</p>
          <p className="stat-value">759kr</p>
        </Card>

        <Card className="stat-card text-center">
          <p className="stat-label">Konverteringsrate</p>
          <p className="stat-value">2,3 %</p>
        </Card>
      </div>
    </div>
  );
}

// Products table
function StatsProducts() {
  const products = [
    {
      img: genser1,
      title: "Nike Team Club 20 Hettegenser",
      price: "749",
      sales: "32",
      revenue: "NOK 23 968",
      profit: "+68%",
    },
    {
      img: airmax,
      title: "Nike Airmax 270",
      price: "1 849",
      sales: "20",
      revenue: "NOK 36 980",
      profit: "+47%",
    },
    {
      img: nikesportswear,
      title: "Nike Sportswear, tettsittende t-skjorte",
      price: "399",
      sales: "50",
      revenue: "NOK 19 950",
      profit: "+25%",
    },
    {
      img: jordanflight,
      title: "Jordan flight utility bukse",
      price: "1 049",
      sales: "18",
      revenue: "NOK 18 882",
      profit: "+29%",
    },
    {
      img: genser1,
      title: "Nike Club Fleece Hoodie",
      price: "899",
      sales: "27",
      revenue: "NOK 24 273",
      profit: "+34%",
    },
    {
      img: genser2,
      title: "Nike Therma-FIT Genser",
      price: "999",
      sales: "15",
      revenue: "NOK 14 985",
      profit: "+18%",
    },
    {
      img: airmax,
      title: "Nike Airmax 90",
      price: "1 599",
      sales: "22",
      revenue: "NOK 35 178",
      profit: "+41%",
    },
    {
      img: airmax,
      title: "Nike Airmax 97",
      price: "1 999",
      sales: "10",
      revenue: "NOK 19 990",
      profit: "+21%",
    },
    {
      img: nikesportswear,
      title: "Nike Sportswear Classic Tee",
      price: "349",
      sales: "65",
      revenue: "NOK 22 685",
      profit: "+32%",
    },
    {
      img: nikesportswear,
      title: "Nike Sportswear Long Sleeve",
      price: "449",
      sales: "40",
      revenue: "NOK 17 960",
      profit: "+26%",
    },
    {
      img: jordanflight,
      title: "Jordan Flight Jogger",
      price: "949",
      sales: "19",
      revenue: "NOK 18 031",
      profit: "+23%",
    },
    {
      img: jordanflight,
      title: "Jordan Flight Cargo Pants",
      price: "1 099",
      sales: "14",
      revenue: "NOK 15 386",
      profit: "+19%",
    },
    {
      img: genser1,
      title: "Nike Club Zip Hoodie",
      price: "999",
      sales: "28",
      revenue: "NOK 27 972",
      profit: "+30%",
    },
    {
      img: genser2,
      title: "Nike Therma Half-Zip",
      price: "1 049",
      sales: "12",
      revenue: "NOK 12 588",
      profit: "+17%",
    },
  ];

  return (
    <Card className="stats-products-container">
      <div className="stats-top-products">
        <p className="stats-title">Bestselgende produkter</p>

        <select className="stat-dropdown">
          <option>I dag</option>
          <option>Denne uke</option>
          <option>Denne måned</option>
        </select>
      </div>

      <div className="stats-products-column">
        <div className="stats-product-categories">
          <p>Produkt</p>
          <p>Pris</p>
          <p>Salg</p>
          <p>Inntjening</p>
        </div>

        {products.map((p) => (
          <div key={p.title} className="stats-product-row">
            <img src={p.img} alt={p.title} className="stats-product-image" />
            <p className="stats-product-title">{p.title}</p>
            <p className="stats-product-price">{p.price}</p>
            <p className="stats-product-sales">{p.sales}</p>
            <p className="stats-product-revenue">{p.revenue}</p>
            <p className="stats-product-profit">{p.profit}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

// Trending
function TrendingItem({
  title,
  up = true,
  percent,
}: {
  title: string;
  up?: boolean;
  percent: number;
}) {
  return (
    <Card className="trending-card">
      <p className="stat-label">{title}</p>

      <div className="trending-image">
        <img
          src={up ? genser1 : genser2}
          alt={up ? "Trending up" : "Trending down"}
          className="trend-icon"
        />
      </div>

      <div className="trend-row">
        <span className={up ? "trend-box up" : "trend-box down"}>
          {up ? "▲" : "▼"} {percent}%
        </span>

        <span className="trend-week">Denne uken</span>
      </div>
    </Card>
  );
}

export default function KledaDashboard() {
  return (
      <div className="dashboard">
        <div className="main-layout">
          {/* Rød: sidemeny */}
          <Sidebar />


          <div className="content-wrapper">
            {/* Blå: header som skal gå helt til høyre */}
            <HeaderText />


            <div className="content-row">
              {/* Grønn: salgsresultater + bestselgere */}
              <main className="main-content">
                <StatsCards />
                <StatsProducts />
              </main>


              <aside className="right-panel">
                <p>Trending</p>
                <TrendingItem title="På vei opp:" up percent={58} />
                <TrendingItem title="På vei ned:" up={false} percent={27} />
              </aside>
            </div>
          </div>
        </div>
      </div>
  );
}

