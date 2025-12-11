import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Sidebar } from "../dashboard/KledaDashboard";
import { getProductById } from "../category/productsMock";
import "./ProductDetails.css";

type ChartPoint = {
  month: string;
  sold: number;
  returned: number;
};

const chartData: ChartPoint[] = [
  { month: "Jan", sold: 500, returned: 300 },
  { month: "Feb", sold: 450, returned: 250 },
  { month: "Mar", sold: 200, returned: 80 },
  { month: "Apr", sold: 550, returned: 150 },
  { month: "Mai", sold: 700, returned: 250 },
  { month: "Jun", sold: 620, returned: 220 },
  { month: "Jul", sold: 300, returned: 90 },
  { month: "Aug", sold: 480, returned: 180 },
  { month: "Sep", sold: 580, returned: 200 },
  { month: "Okt", sold: 650, returned: 240 },
  { month: "Nov", sold: 750, returned: 280 },
  { month: "Des", sold: 800, returned: 320 },
];

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const id = Number(productId);
  const [hoveredBar, setHoveredBar] = useState<{
    month: string;
    type: "sold" | "return";
  } | null>(null);

  const product = Number.isNaN(id) ? undefined : getProductById(id);

  if (!product) {
    return (
      <div className="dashboard">
        <div className="main-layout">
          <Sidebar />
          <main className="product-main">
            <div className="product-main-inner">
              <h1>Produkt ikke funnet</h1>
              <p>Fant ikke noe produkt med id: {productId}</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const conversionRate = 40; // mock
  const exchangedRate = 23; // mock
  const seen = 800; // mock
  const returns = 50; // mock

  // Beregn maksverdi for y-aksen
  const maxValue = Math.max(
    ...chartData.flatMap((point) => [point.sold, point.returned])
  );
  const chartHeight = 200;
  const yAxisSteps = 5;
  const yAxisValues = Array.from({ length: yAxisSteps + 1 }, (_, i) =>
    Math.round((maxValue / yAxisSteps) * (yAxisSteps - i))
  );

  return (
    <div className="dashboard">
      <div className="main-layout">
        <Sidebar />

        {/* Midt-innholdet */}
        <main className="product-main">
          <div className="product-main-inner">
            {/* Øvre del: bilde + tekst */}
            <section className="product-hero">
              <div className="product-image-block">
                <img
                  src={product.img}
                  alt={product.name}
                  className="product-main-image"
                />
              </div>

              <div className="product-main-info">
                <h1 className="product-title">
                  {product.brand} {product.name}
                </h1>
                <h2 className="product-subtitle">NSW Club</h2>

                <div className="product-select-row">
                  <span className="product-select-label">Farge</span>
                  <select className="product-select">
                    <option>Black</option>
                    <option>Grey</option>
                    <option>Blue</option>
                  </select>
                </div>

                <div className="product-select-row">
                  <span className="product-select-label">Str</span>
                  <select className="product-select">
                    <option>XS</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                  </select>
                </div>

                <button className="product-return-link">
                  Se detaljert returstatestikk
                </button>
              </div>
            </section>

            {/* Diagram-delen */}
            <section className="product-chart-section">
              <div className="product-chart-filter-row">
                <span className="product-filter-label">Filtrering:</span>
                <button className="product-filter-btn active">Uke</button>
                <button className="product-filter-btn">Måned</button>
                <button className="product-filter-btn">År</button>
              </div>

              <div className="product-chart-legend-row">
                <div className="legend-item">
                  <span className="legend-color legend-sold" />
                  <span>Solgt</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color legend-return" />
                  <span>Retur</span>
                </div>
              </div>

              <div className="product-chart">
                <div className="chart-container">
                  {/* Y-akse */}
                  <div className="chart-y-axis">
                    {yAxisValues.map((value) => (
                      <div key={value} className="y-axis-label">
                        {value}
                      </div>
                    ))}
                  </div>

                  {/* Grafen */}
                  <div className="product-chart-bars">
                    {chartData.map((point) => (
                      <div
                        key={point.month}
                        className={`chart-column ${
                          hoveredBar?.month === point.month
                            ? "column-hovered"
                            : ""
                        }`}
                      >
                        <div className="chart-bars-group">
                          <div
                            className={`chart-bar chart-bar-sold ${
                              hoveredBar?.month === point.month &&
                              hoveredBar?.type === "sold"
                                ? "hovered"
                                : ""
                            }`}
                            style={{
                              height: `${
                                (point.sold / maxValue) * chartHeight
                              }px`,
                            }}
                            onMouseEnter={() =>
                              setHoveredBar({
                                month: point.month,
                                type: "sold",
                              })
                            }
                            onMouseLeave={() => setHoveredBar(null)}
                          >
                            {hoveredBar?.month === point.month &&
                              hoveredBar?.type === "sold" && (
                                <div className="chart-tooltip">
                                  Solgt: {point.sold}
                                </div>
                              )}
                          </div>
                          <div
                            className={`chart-bar chart-bar-return ${
                              hoveredBar?.month === point.month &&
                              hoveredBar?.type === "return"
                                ? "hovered"
                                : ""
                            }`}
                            style={{
                              height: `${
                                (point.returned / maxValue) * chartHeight
                              }px`,
                            }}
                            onMouseEnter={() =>
                              setHoveredBar({
                                month: point.month,
                                type: "return",
                              })
                            }
                            onMouseLeave={() => setHoveredBar(null)}
                          >
                            {hoveredBar?.month === point.month &&
                              hoveredBar?.type === "return" && (
                                <div className="chart-tooltip">
                                  Retur: {point.returned}
                                </div>
                              )}
                          </div>
                        </div>
                        <span className="chart-month-label">{point.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <p className="product-chart-caption">
                Oversikt over salg og retur av dette produktet
              </p>
            </section>
          </div>
        </main>

        {/* Høyre infopanel */}
        <aside className="product-info-panel">
          <h3 className="product-info-title">Produkt info</h3>

          <div className="product-info-list">
            <div className="product-info-item">
              <span>Antall lagt i handlekurv:</span>
              <span>{product.inCart}</span>
            </div>
            <div className="product-info-item">
              <span>Konverteringsrate prosentdel:</span>
              <span>{conversionRate}%</span>
            </div>
            <div className="product-info-item">
              <span>Byttet:</span>
              <span>{exchangedRate}%</span>
            </div>
            <div className="product-info-item">
              <span>Antall solgt:</span>
              <span>{product.sold}</span>
            </div>
            <div className="product-info-item">
              <span>Antall klikk:</span>
              <span>{product.clicks}</span>
            </div>
            <div className="product-info-item">
              <span>Antall sett:</span>
              <span>{seen}</span>
            </div>
            <div className="product-info-item">
              <span>Antall retur:</span>
              <span>{returns}</span>
            </div>
          </div>

          <button className="product-export-btn">
            Eksporter rapport
            <span className="export-icon">⭳</span>
          </button>
        </aside>
      </div>
    </div>
  );
};

export default ProductDetails;
