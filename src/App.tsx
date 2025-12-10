import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import KledaDashboard from "./dashboard/KledaDashboard";
import CategoryPage from "./category/CategoryPage";
import LoginPage from "./login/LoginPage";
import ProductDetails from "./productDetails/ProductDetails";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* Login er hovedinngangen */}
                <Route path="/" element={<LoginPage />} />

                {/* Dashboard etter innlogging */}
                <Route path="/dashboard" element={<KledaDashboard />} />

                {/* Kategorisider */}
                <Route path="/kategori/:categoryId" element={<CategoryPage />} />

                {/* Produktdetalje side */}
                <Route path="/produkt/:productId" element={<ProductDetails />} />
            </Routes>
        </Router>
    );
};

export default App;
