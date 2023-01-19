import { product_images, products } from "@prisma/client";
import React from "react";
import headStyles from "../styles/Header.module.scss";
import styles from "../styles/Main.module.scss";
import { Basket as BasketType } from "../hooks/useBasket";
import { formattedNumber } from "../lib/utils";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function NavProduct({
    product,
    trash,
}: {
    product: BasketType &
        products & {
            product_images: product_images[];
        };
    trash: (productid?: number | undefined) => void;
}) {
    return (
        <div className={styles.product_builder_col} key={product.id}>
            <div>
                <img
                    src={
                        `/images/categories/${product.categoryid}/` +
                        product.product_images[0].image
                    }
                    title={product.product_images[0].name ?? "produkt"}
                ></img>
                <div>
                    <Link href={"/product/" + product.id} legacyBehavior>
                        <a>
                            <p className="clickable">{product.name}</p>
                        </a>
                    </Link>

                    <p>
                        {formattedNumber(product.price)} kr{" "}
                        {product.quantity > 1 &&
                            " (" + product.quantity + " st)"}
                    </p>
                </div>
            </div>
            <div>
                <span
                    className={headStyles.clickableIcon}
                    role="button"
                    onClick={() => trash(product.id)}
                >
                    <FontAwesomeIcon icon={faTrashCan} />
                </span>
            </div>
        </div>
    );
}
