import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import KledaDashboard from "./dashboard/KledaDashboard";
import CategoryPage from "./category/CategoryPage";

export default function App() {
    return (
        <Router>
            <Routes>

                {/* Dashboard */}
                <Route path="/" element={<KledaDashboard />} />

                {/* Kategoriside */}
                <Route path="/kategori/:categoryId" element={<CategoryPage />} />
            </Routes>
        </Router>
    );
}
