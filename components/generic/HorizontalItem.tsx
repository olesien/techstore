import React from "react";
import productStyles from "../../styles/Product.module.scss";
import { Product } from "../../pages/category/[id]";
import Button from "@mui/material/Button";
import InStock from "./InStock";
import Link from "next/link";
import ProductRating from "./ProductRating";

export default function HorizontalItem({ product }: { product: Product }) {
    return (
        <div className={productStyles.horizontalItem}>
            <div className={productStyles.horzImage}>
                <img
                    src={
                        product.product_images.length > 0
                            ? product.product_images[0]
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
                    onClick={() => alert("Added to cart!!")}
                >
                    Köp
                </Button>
            </div>
        </div>
    );
}
