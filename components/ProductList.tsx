import React from "react";
import HorizontalItem from "./generic/HorizontalItem";
import { Product } from "../pages/category/[id]";
import productStyles from "../styles/Products.module.scss";
import useBasket from "../hooks/useBasket";

export default function ProductList({ products }: { products: Product[] }) {
    const { state: basket, toBasket } = useBasket();
    return (
        <div className={productStyles.list}>
            {products.length === 0 && <p>Inga produkter kunde hittas</p>}
            {products.map((product) => (
                <HorizontalItem
                    key={Number(product.id)}
                    product={product}
                    basket={basket}
                    toBasket={toBasket}
                />
            ))}
        </div>
    );
}
