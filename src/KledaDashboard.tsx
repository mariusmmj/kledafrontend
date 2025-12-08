import React from "react";
import "./KledaDashboard.css";
import kledaLogo from "./images/kleda.png";
import nikeLogo from "./images/nike.jpg";
import genser1 from "./images/genser1.png";
import genser2 from "./images/genser2.jpg";
import airmax from "./images/airmax270.png";
import jordanflight from "./images/jordanflight.png";
import nikesportswear from "./images/nikesportsweardame.png";

// Generic Card component
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`card ${className}`}>{children}</div>;
}

// Sidebar
function Sidebar() {
  const general = ["📊 Dashboard", "🛒 Ordre"];
  const categories = [
    "Hettegensere og sweatshirts",
    "Bukser",
    "Leggings",
    "Matchende sett",
    "Jakker",
    "Overdeler og T-skjorter",
    "Shorts",
    "Sports-BH-er",
    "Tilbehør",
    "Sport",
    "➕ Legg til kategori",
  ];
  const returns = ["↺ Se returstatistikk"];
  const settings = ["⚙️ Innstillinger", "➜ Logg ut"];

  return (
    <aside className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-logo">
          <img src={kledaLogo} alt="Kleda logo" />
        </div>
        <nav>
          <p className="sidebar-title">Generelt</p>
          {general.map((it) => (
            <div key={it} className="nav-item">{it}</div>
          ))}

          <p className="sidebar-title">Kategorier</p>
          {categories.map((it) => (
            <div key={it} className="nav-item">{it}</div>
          ))}

          <p className="sidebar-returer">Returer</p>
          {returns.map((it) => (
            <div key={it} className="nav-item">{it}</div>
          ))}

          <p className="sidebar-innstillinger">Innstillinger</p>
          {settings.map((it) => (
            <div key={it} className="nav-item">{it}</div>
          ))}
        </nav>
      </div>
    </aside>
  );
}

// Header text
function HeaderText() {
  return (
    <>
      <h1>Hei, bruker!</h1>
      <h2>Dette er din side for nøkkeltall og innsikt i salg og omsetning</h2>
    </>
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

// Nike-bar
function NikeSidebar() {
  return (
    <aside className="nike-sidebar">
      <div className="nike-sidebar-container">
        <img src={nikeLogo} alt="Nike logo" className="nike-logo-img" />
      </div>
    </aside>
  );
}

export default function KledaDashboard() {
  return (
    <div className="dashboard">
      <div className="main-layout">
        <Sidebar />
        <NikeSidebar />

        <main className="main-content">
          <HeaderText />
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
  );
}
