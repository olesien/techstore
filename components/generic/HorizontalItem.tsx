import React from "react";
import productStyles from "../../styles/Products.module.scss";
import { Product } from "../../pages/category/[id]";
import Button from "@mui/material/Button";
import InStock from "./InStock";
import Link from "next/link";
import ProductRating from "./ProductRating";
import { Basket } from "../../hooks/useBasket";

export default function HorizontalItem({
    product,
    basket,
    toBasket,
    isBuilder,
}: {
    product: Product;
    basket: Basket[];
    toBasket: (
        product: Product,
        canBuy: boolean,
        qtnty?: number,
        remove?: boolean
    ) => void;
    isBuilder: boolean;
}) {
    const basketQuantity =
        basket.find((item) => item.id === Number(product.id))?.quantity ?? 0;

    const canBuy = (Number(product.instock) ?? 0) - basketQuantity >= 1;
    return (
        <div className={productStyles.horizontalItem}>
            <div className={productStyles.horzImage}>
                <img
                    src={
                        product.product_images.length > 0
                            ? `/images/categories/${product.categoryid}/` +
                              product.product_images[0]
                            : "/images/notfound.png"
                    }
                    alt={product.name ?? "Image"}
                />
            </div>
            <div className={productStyles.horzDesc}>
                <Link href={"/product/" + product.id} legacyBehavior>
                    <a>
                        <span>{product.name}</span>
                    </a>
                </Link>
                <ProductRating rating={product.review_avg} />
                <p>{product.quickspecs}</p>
            </div>
            <div>
                <InStock instock={Number(product.instock)} />
            </div>
            {product.oldprice ? (
                <div className={productStyles.horzDiscountPrice}>
                    <p>{product.oldprice} kr</p>
                    <p>{product.price} kr</p>
                </div>
            ) : (
                <div className={productStyles.horzPrice}>
                    <p>{product.price} kr</p>
                </div>
            )}

            <div>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => toBasket(product, canBuy)}
                    disabled={!canBuy}
                >
                    {canBuy
                        ? isBuilder
                            ? "Lägg till"
                            : "Köp"
                        : (product.instock ?? 0) < 1
                        ? "Utsålt"
                        : "Max antal"}
                </Button>
            </div>
        </div>
    );
}
