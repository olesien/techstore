import React from "react";
import HorizontalItem from "./generic/HorizontalItem";
import { Product } from "../pages/category/[id]";
import productStyles from "../styles/Products.module.scss";
import useBasket from "../hooks/useBasket";
import useComputerBuilder from "../hooks/useComputerBuilder";
import { maxQuantity } from "./Main";

export default function ProductList({
    products,
    categoryId,
}: {
    products: Product[];
    categoryId: number;
}) {
    const categoryLimit = maxQuantity[String(categoryId)];
    const { isActive } = useComputerBuilder();
    const { state: basket, toBasket } = useBasket();
    const { state: builderBasket, toBasket: toBuilderBasket } = useBasket(
        "techstore-builder-basket"
    );

    const categoryQuantity = builderBasket
        .filter((item) => Number(item.categoryid) === Number(categoryId))
        .reduce((total, item) => {
            return total + item.quantity;
        }, 0);
    return (
        <div className={productStyles.list}>
            {products.length === 0 && <p>Inga produkter kunde hittas</p>}
            {products.map((product) => (
                <HorizontalItem
                    key={Number(product.id)}
                    product={product}
                    basket={isActive ? builderBasket : basket}
                    toBasket={isActive ? toBuilderBasket : toBasket}
                    isBuilder={!!isActive}
                    disabled={categoryQuantity >= categoryLimit}
                />
            ))}
        </div>
    );
}
