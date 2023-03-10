import React from "react";
import useSWR from "swr";
import { Basket as BasketType } from "../../hooks/useBasket";
import ClipLoader from "react-spinners/ClipLoader";
import { ProductByIdType } from "../../pages/api/productsbyids/[ids]";
import { Button } from "@mui/material";
import BasketOverlay from "../basket/BasketOverlay";
import Link from "next/link";
import { fetchURL } from "../../lib/utils";
import ProductsOverview from "../products/ProductsOverview";

export default function Basket({
    basket,
    toggleCart,
    trash,
}: {
    basket: BasketType[];
    toggleCart: () => void;
    trash: () => void;
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

    const products = data.products.map((product: ProductByIdType) => {
        const basketItem = basket.find((item) => item.id === product.id);
        return { ...product, quantity: basketItem?.quantity };
    });

    return (
        <BasketOverlay toggleCart={toggleCart}>
            <>
                <ProductsOverview products={products} trash={trash} />
                <Button
                    component={Link}
                    href="/checkout"
                    variant="contained"
                    color="success"
                    fullWidth
                >
                    Till Kassa
                </Button>
            </>
        </BasketOverlay>
    );
}
