import React from "react";
import productStyles from "../../styles/Products.module.scss";
import { Product } from "../../pages/category/[id]";
import Button from "@mui/material/Button";
import InStock from "./InStock";
import Link from "next/link";
import ProductRating from "./ProductRating";
import { Basket } from "../../hooks/useBasket";
import { product_compat } from "@prisma/client";

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
    //Check if it's incompat
    const checkCompat = (
        quickspecs: string,
        product_compat: product_compat[]
    ) => {
        const issues = product_compat.filter(
            (compat) =>
                basket.find((item) => item.id === compat.productid2) ||
                basket.find((item) => item.id === compat.productid1)
        );
        if (issues.length > 0) {
            return issues[0].message;
        }
        return quickspecs;
    };

    console.log(product);
    console.log(basket);
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
                <p>
                    {isBuilder
                        ? checkCompat(
                              product.quickspecs ?? "",
                              product.product_compat
                          )
                        : product.quickspecs}
                </p>
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
