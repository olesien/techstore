import React, { useEffect, useState } from "react";
import styles from "../styles/Header.module.scss";
import useSWR, { Fetcher } from "swr";
import { Basket as BasketType } from "../hooks/useBasket";
import ItemTable from "./ItemTable";
import ClipLoader from "react-spinners/ClipLoader";
import { ProductByIdType } from "../pages/api/productsbyids/[ids]";
import { Button } from "@mui/material";
import BasketOverlay from "./BasketOverlay";
const fetchURL = (url: string) => fetch(url).then((r) => r.json());

export default function Basket({
    basket,
    toggleCart,
}: {
    basket: BasketType[];
    toggleCart: () => void;
}) {
    if (basket.length === 0) {
        return (
            <BasketOverlay toggleCart={toggleCart}>
                <p>Det finns inga produkter i varukorgen just nu</p>
            </BasketOverlay>
        );
    }
    const basketIds = basket.map((item) => item.id);
    const { data, isLoading, error } = useSWR(
        "/api/productsbyids/" + JSON.stringify(basketIds),
        fetchURL
    );

    if (isLoading) {
        return (
            <BasketOverlay toggleCart={toggleCart}>
                <ClipLoader />
            </BasketOverlay>
        );
    }
    if (!data.products) {
        return (
            <BasketOverlay toggleCart={toggleCart}>
                <p>{error}</p>
            </BasketOverlay>
        );
    }

    console.log(data);

    const products = data.products.map((product: ProductByIdType) => {
        const basketItem = basket.find((item) => item.id === product.id);
        return { ...product, quantity: basketItem?.quantity };
    });

    const summedCost = (productList: (BasketType & ProductByIdType)[]) => {
        const cost = productList.reduce((total, product) => {
            return total + product.price * product.quantity;
        }, 0);
        return cost;
    };
    return (
        <BasketOverlay toggleCart={toggleCart}>
            <>
                <ItemTable products={products} />
                <div className={styles.sum}>
                    <p>Summa: </p>
                    <p>{summedCost(products)} kr</p>
                </div>
                <Button variant="contained" color="success" fullWidth>
                    Till Kassa
                </Button>
            </>
        </BasketOverlay>
    );
}
