import { ProductByIdType } from "./../pages/api/productsbyids/[ids]";
import React, { useDebugValue, useEffect, useState } from "react";
import { Product as Product2 } from "../lib/product";
import { Product } from "../pages/category/[id]";

export type Basket = {
    id: number;
    quantity: number;
};

const useBasket = (variant = "techstore-basket") => {
    const [state, setState] = useState<Basket[]>([]);
    const [initialRender, setInitialRender] = useState(true);
    useDebugValue(state);
    const getCount = (basket: Basket[]) => {
        return basket.reduce((count, item) => count + item.quantity, 0);
    };

    //Get Item
    useEffect(() => {
        const getBasket = () => {
            const item = localStorage.getItem(variant);
            if (item) {
                const parsedItem = parse(item);
                //Flatten arrays and compare
                if (getCount(parsedItem) !== getCount(state)) {
                    setState(parse(parsedItem));
                }
            } else {
                //Does not exist
                setState([]);
            }
        };
        getBasket();

        //Listen for changes live
        window.addEventListener(variant + "-change", () => getBasket());

        //Unmount
        return window.removeEventListener(variant + "-change", () =>
            getBasket()
        );
    }, []);

    //Set item
    useEffect(() => {
        if (initialRender) {
            setInitialRender(false);
        } else {
            if (state.length !== 0) {
                localStorage.setItem(variant, JSON.stringify(state));
                console.log("Dispatch update");
                window.dispatchEvent(new Event(variant + "-change"));
            } else {
                //Remove
                const exists = localStorage.getItem(variant);
                if (exists) {
                    localStorage.removeItem(variant);
                    window.dispatchEvent(new Event(variant + "-change"));
                }
            }
        }
    }, [getCount(state)]);

    const toBasket = (
        product: Product2 | Product | (Basket & ProductByIdType),
        canBuy: boolean,
        qtnty = 1,
        remove = false
    ) => {
        if (!canBuy) return;
        const filteredBasket = state.filter(
            (item: Basket) => item.id !== Number(product.id)
        );

        if (state.length !== filteredBasket.length) {
            //Item already exists in basket, add to quantity
            const basketIndex = state.findIndex(
                (item: Basket) => item.id === Number(product.id)
            );
            let newBasket = [...state];
            const quantity = state[basketIndex].quantity;
            const newTotal = quantity + (remove ? -qtnty : qtnty);
            console.log(newTotal);
            if (newTotal === 0) {
                console.log("removing");
                newBasket.splice(basketIndex, 1);
            } else {
                newBasket.splice(basketIndex, 1, {
                    id: Number(product.id),
                    quantity: newTotal,
                });
            }

            console.log(newBasket);

            setState(newBasket);
        } else if (!remove) {
            setState([...state, { id: Number(product.id), quantity: qtnty }]);
        }
    };
    const trash = (productid?: number) => {
        if (!productid || state.length < 2) {
            setState([]);
        } else {
            setState((basket) =>
                basket.filter((item) => Number(item.id) !== productid)
            );
        }
    };

    return { state, setState, getCount, toBasket, trash };
};

const parse = (value: string) => {
    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
};

export default useBasket;
