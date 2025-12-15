import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../dashboard/KledaDashboard";
import "../dashboard/KledaDashboard.css";
import "./ReturnPage.css";
import genser1 from "../images/genser1.png";
import bukse1 from "../images/bukse1.avif";

// Mini Pie Chart Component
const MiniPieChart: React.FC<{ wrong: number; material: number; other: number }> = ({ wrong, material, other }) => {
    const total = wrong + material + other;
    const wrongPercent = (wrong / total) * 100;
    const materialPercent = (material / total) * 100;
    const otherPercent = (other / total) * 100;

    let cumulativePercent = 0;
    
    const createArc = (percent: number, startPercent: number) => {
        const startAngle = (startPercent / 100) * 2 * Math.PI - Math.PI / 2;
        const endAngle = ((startPercent + percent) / 100) * 2 * Math.PI - Math.PI / 2;
        const x1 = 20 + 18 * Math.cos(startAngle);
        const y1 = 20 + 18 * Math.sin(startAngle);
        const x2 = 20 + 18 * Math.cos(endAngle);
        const y2 = 20 + 18 * Math.sin(endAngle);
        const largeArc = percent > 50 ? 1 : 0;
        
        return `M 20 20 L ${x1} ${y1} A 18 18 0 ${largeArc} 1 ${x2} ${y2} Z`;
    };

    return (
        <svg width="40" height="40" viewBox="0 0 40 40" className="mini-pie-chart">
            <path d={createArc(wrongPercent, 0)} fill="#c9a29a" />
            <path d={createArc(materialPercent, wrongPercent)} fill="#111827" />
            <path d={createArc(otherPercent, wrongPercent + materialPercent)} fill="#6b7280" />
        </svg>
    );
};

// Mini Line Chart Component
const MiniLineChart: React.FC<{ data: number[] }> = ({ data }) => {
    const width = 100;
    const height = 40;
    const padding = 8;
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue || 1;
    
    const points = data.map((value, index) => {
        const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
        const y = height - padding - ((value - minValue) / range) * (height - 2 * padding);
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg width="100" height="40" viewBox="0 0 100 40" className="mini-line-chart">
            {/* Y-axis (vertical line) */}
            <line 
                x1={padding} 
                y1={padding} 
                x2={padding} 
                y2={height - padding} 
                stroke="#d1d5db" 
                strokeWidth="1.5"
            />
            {/* X-axis (horizontal line) */}
            <line 
                x1={padding} 
                y1={height - padding} 
                x2={width - padding} 
                y2={height - padding} 
                stroke="#d1d5db" 
                strokeWidth="1.5"
            />
            {/* Line chart */}
            <polyline
                points={points}
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* Data points */}
            {data.map((value, index) => {
                const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
                const y = height - padding - ((value - minValue) / range) * (height - 2 * padding);
                return <circle key={index} cx={x} cy={y} r="2" fill="#10b981" />;
            })}
        </svg>
    );
};

const ReturnPage: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<"general" | "product">("general");
    const [showProductDropdown, setShowProductDropdown] = useState(false);

    const products = [
        { id: 1, name: "Nike Hettegenser", image: genser1 },
        { id: 2, name: "Adidas Bukse", image: bukse1 }
    ];

    return (
        <div className="main-layout">
            <Sidebar />
            <div className="return-content">
                <div className="return-wrapper">
                    <div className="return-header">
                        <h1 className="return-title">Returer</h1>
                        <div className="return-buttons">
                            <button 
                                className={`return-btn ${activeTab === "general" ? "active" : ""}`}
                            >
                                Generell retur
                            </button>
                            <div className="dropdown-wrapper">
                                <button 
                                    className={`return-btn return-dropdown`}
                                    onClick={() => setShowProductDropdown(!showProductDropdown)}
                                >
                                    Retur for produkt ▼
                                </button>
                                {showProductDropdown && (
                                    <div className="product-dropdown">
                                        {products.map((product) => (
                                            <div 
                                                key={product.id} 
                                                className="product-dropdown-item"
                                                onClick={() => {
                                                    setShowProductDropdown(false);
                                                    navigate(`/retur/produkt/${product.id}`);
                                                }}
                                            >
                                                <img src={product.image} alt={product.name} className="product-dropdown-img" />
                                                {product.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="return-table-container">
                        <div className="table-with-labels">
                            <div className="table-row-labels">
                                <div className="row-label"></div>
                                <div className="row-label">Returer siste 30 dager</div>
                                <div className="row-label">Retur i kr</div>
                                <div className="row-label">Byttet størrelse</div>
                                <div className="row-label">Årsak til retur</div>
                                <div className="row-label">Utvikling de siste årene</div>
                            </div>
                            <table className="return-table">
                                <thead>
                                    <tr>
                                        <th>Klær</th>
                                        <th>Sko</th>
                                        <th>Tilbehør</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>8%</td>
                                        <td>3%</td>
                                        <td>22%</td>
                                    </tr>
                                    <tr>
                                        <td>1500</td>
                                        <td>10 000</td>
                                        <td>8000</td>
                                    </tr>
                                    <tr>
                                        <td>32%</td>
                                        <td>82%</td>
                                        <td>12%</td>
                                    </tr>
                                    <tr className="pie-chart-row">
                                        <td><MiniPieChart wrong={40} material={35} other={25} /></td>
                                        <td><MiniPieChart wrong={50} material={30} other={20} /></td>
                                        <td><MiniPieChart wrong={30} material={45} other={25} /></td>
                                    </tr>
                                    <tr className="line-chart-row">
                                        <td><MiniLineChart data={[5, 8, 6, 12, 10, 15, 13]} /></td>
                                        <td><MiniLineChart data={[10, 8, 12, 9, 14, 11, 16]} /></td>
                                        <td><MiniLineChart data={[3, 5, 4, 8, 7, 10, 12]} /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="pie-chart-legend">
                            <div className="legend-item">
                                <span className="legend-color" style={{ background: '#c9a29a' }}></span>
                                <span>Feil størrelse</span>
                            </div>
                            <div className="legend-item">
                                <span className="legend-color" style={{ background: '#111827' }}></span>
                                <span>Dårlig materiale</span>
                            </div>
                            <div className="legend-item">
                                <span className="legend-color" style={{ background: '#6b7280' }}></span>
                                <span>Annet</span>
                            </div>
                        </div>
                        <button className="return-export-btn">
                            Eksporter rapport
                            <span className="export-icon">⭳</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReturnPage;
