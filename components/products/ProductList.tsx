import React from "react";
import HorizontalItem from "./HorizontalItem";
import { Product } from "../../pages/category/[id]";
import productStyles from "../../styles/Products.module.scss";
import useBasket from "../../hooks/useBasket";
import useComputerBuilder from "../../hooks/useComputerBuilder";
import { maxQuantity } from "../generic/Main";

export default function ProductList({ products }: { products: Product[] }) {
    const { isActive } = useComputerBuilder();
    const { state: basket, toBasket } = useBasket();
    const { state: builderBasket, toBasket: toBuilderBasket } = useBasket(
        "techstore-builder-basket"
    );

    const categoryQuantity = (categoryId: number) =>
        builderBasket
            .filter((item) => Number(item.categoryid) === Number(categoryId))
            .reduce((total, item) => {
                return total + item.quantity;
            }, 0);
    const categoryLimit = (categoryId: number) =>
        maxQuantity[String(categoryId)];
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
                    disabled={
                        !!isActive &&
                        categoryQuantity(product.categoryid) >=
                            categoryLimit(product.categoryid)
                    }
                />
            ))}
        </div>
    );
}
