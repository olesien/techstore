import React from "react";
import styles from "../styles/Header.module.scss";

export default function BasketOverlay({
    children,
    toggleCart,
}: {
    children: JSX.Element;
    toggleCart: () => void;
}) {
    return (
        <div>
            <div className={styles.cartContainer}>
                <div className={styles.cart}>{children}</div>
            </div>
            <div
                className="overlay"
                onClick={toggleCart}
                role="button"
                title="overlay"
            ></div>
        </div>
    );
}
