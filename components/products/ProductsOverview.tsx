import React from "react";
import { ProductByIdType } from "../../pages/api/productsbyids/[ids]";
import { Basket as BasketType } from "../../hooks/useBasket";
import styles from "../../styles/Header.module.scss";
import ItemTable from "./../products/ItemTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { summedCost } from "../../lib/utils";

export default function ProductsOverview({
    products,
    trash,
}: {
    products: (BasketType & ProductByIdType)[];
    trash: () => void;
}) {
    return (
        <div className={styles.productoverview}>
            <ItemTable products={products} />
            <div className={styles.sum}>
                <p>Summa: </p>
                <p>{summedCost(products)} kr</p>
                <span
                    className={styles.clickableIcon}
                    role="button"
                    onClick={() => trash()}
                >
                    <FontAwesomeIcon icon={faTrashCan} size="lg" />
                </span>
            </div>
        </div>
    );
}
