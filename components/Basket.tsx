import React, { useEffect, useState } from "react";
import styles from "../styles/Header.module.scss";
import useSWR, { Fetcher } from "swr";
import { Basket as BasketType } from "../hooks/useBasket";
import ItemTable from "./ItemTable";
import ClipLoader from "react-spinners/ClipLoader";
import { ProductByIdType } from "../pages/api/productsbyids/[ids]";
import { Button } from "@mui/material";
const fetchURL = (url: string) => fetch(url).then((r) => r.json());

export default function Basket({
    basket,
    toggleCart,
}: {
    basket: BasketType[];
    toggleCart: () => void;
}) {
    const basketIds = basket.map((item) => item.id);
    const { data, isLoading, error } = useSWR(
        "/api/productsbyids/" + JSON.stringify(basketIds),
        fetchURL
    );
    console.log(data);

    if (isLoading) {
        return <ClipLoader />;
    }
    if (error) {
        return <p>{error}</p>;
    }

    const products = data.products.map((product: ProductByIdType) => {
        const basketItem = basket.find((item) => item.id === product.id);
        return { ...product, quantity: basketItem?.quantity };
    });
    console.log(data);

    const summedCost = (productList: (BasketType & ProductByIdType)[]) => {
        const cost = productList.reduce((total, product) => {
            return total + product.price * product.quantity;
        }, 0);
        return cost;
    };
    return (
        <div>
            <div className={styles.cartContainer}>
                <div className={styles.cart}>
                    <ItemTable products={products} />
                    <div className={styles.sum}>
                        <p>Summa: </p>
                        <p>{summedCost(products)} kr</p>
                    </div>
                    <Button variant="contained" color="success" fullWidth>
                        Till Kassa
                    </Button>
                </div>
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
