import React from "react";
import productStyles from "../../styles/Products.module.scss";
import { Product } from "../../pages/category/[id]";
import Button from "@mui/material/Button";
import InStock from "../generic/InStock";
import Link from "next/link";
import ProductRating from "../product/ProductRating";
import { Basket } from "../../hooks/useBasket";
import { formattedNumber } from "../../lib/utils";
import useCompat from "../../hooks/useCompat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleExclamation,
    faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

export default function HorizontalItem({
    product,
    basket,
    toBasket,
    isBuilder,
    disabled,
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
    disabled: boolean;
}) {
    const basketQuantity =
        basket.find((item) => item.id === Number(product.id))?.quantity ?? 0;

    const canBuy = (Number(product.instock) ?? 0) - basketQuantity >= 1;
    //Check if it's incompat
    const { compatIssue, compatError } = useCompat(product, basket);
    const compatabilityIssue = compatIssue();
    const compatabilityError = compatError();

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
                <p
                    className={
                        compatabilityError
                            ? "error"
                            : compatabilityIssue
                            ? "warning"
                            : ""
                    }
                >
                    {compatabilityError ? (
                        <FontAwesomeIcon
                            icon={faCircleExclamation}
                            className="iconpadding"
                        />
                    ) : (
                        compatabilityIssue && (
                            <FontAwesomeIcon
                                icon={faTriangleExclamation}
                                className="iconpadding"
                            />
                        )
                    )}
                    {isBuilder
                        ? compatabilityError ??
                          compatabilityIssue ??
                          product.quickspecs
                        : product.quickspecs}
                </p>
            </div>
            <div>
                <InStock instock={Number(product.instock)} />
            </div>
            {product.oldprice ? (
                <div className={productStyles.horzDiscountPrice}>
                    <p>{formattedNumber(product.oldprice)} kr</p>
                    <p>{formattedNumber(product.price)} kr</p>
                </div>
            ) : (
                <div className={productStyles.horzPrice}>
                    <p>{formattedNumber(product.price)} kr</p>
                </div>
            )}

            <div>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => toBasket(product, canBuy)}
                    disabled={!canBuy || !!compatabilityError || disabled}
                >
                    {canBuy && !disabled
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
