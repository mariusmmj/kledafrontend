import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Produktdetaljer</h1>
            <p>Viser detaljer for produkt: <strong>{productId}</strong></p>

            <p>
                Dette er en placeholder-side. Her skal vi senere vise produktinfo,
                lagerstatus, tilhørende statistikk, bilder og mulighet for å redigere produktet.
            </p>
        </div>
    );
};

export default ProductDetails;
