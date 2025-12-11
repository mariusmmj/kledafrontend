// ProductDetails.tsx - Update the existing file
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Sidebar } from "../dashboard/KledaDashboard";
import "./ProductDetails.css";

type ChartPoint = {
  period: string;
  label: string;
  sold: number;
  returned: number;
};

type ProductStats = {
  productId: number;
  productName: string;
  brandName: string;
  stats: ChartPoint[];
};

type Product = {
  id: number;
  name: string;
  brand: { name: string };
  price: number;
  category: string;
  image: string;
  stockQuantity: number;
};

type TimePeriod = "week" | "month" | "year";

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const id = Number(productId);
  const [hoveredBar, setHoveredBar] = useState<{
    label: string;
    type: "sold" | "return";
  } | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("month");
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching product:", err);
      }
    };

    if (!Number.isNaN(id)) {
      fetchProduct();
    }
  }, [id]);

  // Fetch product stats
  useEffect(() => {
    const fetchProductStats = async () => {
      if (!product) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:8080/api/products/${id}/stats?period=${selectedPeriod}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product statistics");
        }

        const data: ProductStats = await response.json();
        setChartData(data.stats);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching product stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductStats();
  }, [id, selectedPeriod, product]);

  if (Number.isNaN(id) || !product) {
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

  // Mock data
  const conversionRate = 40;
  const exchangedRate = 23;
  const seen = 800;
  const returns = 50;
  const inCart = 120;
  const clicks = 450;
  const sold = chartData.reduce((sum, point) => sum + point.sold, 0);

  // Calculate max value for y-axis
  const maxValue = chartData.length > 0
    ? Math.max(...chartData.flatMap((point) => [point.sold, point.returned]))
    : 100;
  const chartHeight = 200;
  const yAxisSteps = 5;
  const yAxisValues = Array.from({ length: yAxisSteps + 1 }, (_, i) =>
    Math.round((maxValue / yAxisSteps) * (yAxisSteps - i))
  );

  return (
    <div className="dashboard">
      <div className="main-layout">
        <Sidebar />

        <main className="product-main">
          <div className="product-main-inner">
            <section className="product-hero">
              <div className="product-image-block">
                <img
                  src={product.image || "/placeholder.jpg"}
                  alt={product.name}
                  className="product-main-image"
                />
              </div>

              <div className="product-main-info">
                <h1 className="product-title">
                  {product.brand.name} {product.name}
                </h1>
                <h2 className="product-subtitle">{product.category}</h2>

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

            <section className="product-chart-section">
              <div className="product-chart-filter-row">
                <span className="product-filter-label">Filtrering:</span>
                <button
                  className={`product-filter-btn ${
                    selectedPeriod === "week" ? "active" : ""
                  }`}
                  onClick={() => setSelectedPeriod("week")}
                >
                  Uke
                </button>
                <button
                  className={`product-filter-btn ${
                    selectedPeriod === "month" ? "active" : ""
                  }`}
                  onClick={() => setSelectedPeriod("month")}
                >
                  Måned
                </button>
                <button
                  className={`product-filter-btn ${
                    selectedPeriod === "year" ? "active" : ""
                  }`}
                  onClick={() => setSelectedPeriod("year")}
                >
                  År
                </button>
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

              {loading ? (
                <div className="product-chart-loading">Laster data...</div>
              ) : error ? (
                <div className="product-chart-error">
                  Feil ved lasting av data: {error}
                </div>
              ) : (
                <div className="product-chart">
                  <div className="chart-container">
                    <div className="chart-y-axis">
                      {yAxisValues.map((value) => (
                        <div key={value} className="y-axis-label">
                          {value}
                        </div>
                      ))}
                    </div>

                    <div className="product-chart-bars">
                      {chartData.map((point) => (
                        <div
                          key={point.period}
                          className={`chart-column ${
                            hoveredBar?.label === point.label
                              ? "column-hovered"
                              : ""
                          }`}
                        >
                          <div className="chart-bars-group">
                            <div
                              className={`chart-bar chart-bar-sold ${
                                hoveredBar?.label === point.label &&
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
                                  label: point.label,
                                  type: "sold",
                                })
                              }
                              onMouseLeave={() => setHoveredBar(null)}
                            >
                              {hoveredBar?.label === point.label &&
                                hoveredBar?.type === "sold" && (
                                  <div className="chart-tooltip">
                                    Solgt: {point.sold}
                                  </div>
                                )}
                            </div>
                            <div
                              className={`chart-bar chart-bar-return ${
                                hoveredBar?.label === point.label &&
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
                                  label: point.label,
                                  type: "return",
                                })
                              }
                              onMouseLeave={() => setHoveredBar(null)}
                            >
                              {hoveredBar?.label === point.label &&
                                hoveredBar?.type === "return" && (
                                  <div className="chart-tooltip">
                                    Retur: {point.returned}
                                  </div>
                                )}
                            </div>
                          </div>
                          <span className="chart-month-label">
                            {point.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <p className="product-chart-caption">
                Oversikt over salg og retur av dette produktet
              </p>
            </section>
          </div>
        </main>

        <aside className="product-info-panel">
          <h3 className="product-info-title">Produkt info</h3>

          <div className="product-info-list">
            <div className="product-info-item">
              <span>Antall lagt i handlekurv:</span>
              <span>{inCart}</span>
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
              <span>{sold}</span>
            </div>
            <div className="product-info-item">
              <span>Antall klikk:</span>
              <span>{clicks}</span>
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