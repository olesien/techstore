import React from "react";
import productStyles from "../../styles/Products.module.scss";

export default function InStock({ instock }: { instock: number }) {
    return (
        <div className={productStyles.horzInStock}>
            <div
                className={
                    instock > 0
                        ? productStyles.greenCircle
                        : productStyles.redCircle
                }
            ></div>
            {instock} st
        </div>
    );
}
