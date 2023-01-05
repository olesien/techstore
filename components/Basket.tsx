import React from "react";
import styles from "../styles/Header.module.scss";

export default function Basket({ toggleCart }: { toggleCart: () => void }) {
    return (
        <div className={styles.cartContainer}>
            <div className={styles.cart}>Cart</div>
            <div className="overlay" onClick={toggleCart}></div>
        </div>
    );
}
