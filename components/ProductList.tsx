import React from "react";
import HorizontalItem from "./generic/HorizontalItem";
import { Product } from "../pages/category/[id]";
import productStyles from "../styles/Product.module.scss";

export default function ProductList({ products }: { products: Product[] }) {
    return (
        <div className={productStyles.list}>
            {products.map((product) => (
                <HorizontalItem key={Number(product.id)} product={product} />
            ))}
        </div>
    );
}
