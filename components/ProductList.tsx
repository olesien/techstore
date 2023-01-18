import React from "react";
import HorizontalItem from "./generic/HorizontalItem";
import { Product } from "../pages/category/[id]";
import productStyles from "../styles/Products.module.scss";
import useBasket from "../hooks/useBasket";
import useComputerBuilder from "../hooks/useComputerBuilder";

export default function ProductList({ products }: { products: Product[] }) {
    const { isActive } = useComputerBuilder();
    const { state: basket, toBasket } = useBasket(
        isActive ? "techstore-builder-basket" : "techstore-basket"
    );
    return (
        <div className={productStyles.list}>
            {products.length === 0 && <p>Inga produkter kunde hittas</p>}
            {products.map((product) => (
                <HorizontalItem
                    key={Number(product.id)}
                    product={product}
                    basket={basket}
                    toBasket={toBasket}
                    isBuilder={!!isActive}
                />
            ))}
        </div>
    );
}
