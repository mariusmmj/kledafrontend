import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import KledaDashboard from "./dashboard/KledaDashboard";
import CategoryPage from "./category/CategoryPage";
import LoginPage from "./login/LoginPage";

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
            </Routes>
        </Router>
    );
};

export default App;
