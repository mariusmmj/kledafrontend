// src/category/CategoryPage.tsx
import React from "react";
import { useParams } from "react-router-dom";

const CategoryPage: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Kategoriside</h1>
            <p>Du er på kategorien: <b>{categoryId}</b></p>
            <p>(Her kan du senere legge inn tabellen med produkter osv.)</p>
        </div>
    );
};

export default CategoryPage;
