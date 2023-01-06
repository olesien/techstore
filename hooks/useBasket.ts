import React, { useDebugValue, useEffect, useState } from "react";

export type Basket = {
    id: number;
    quantity: number;
};

const useBasket = () => {
    const [state, setState] = useState<Basket[]>([]);
    useDebugValue(state);
    const getCount = (basket: Basket[]) => {
        return basket.reduce((count, item) => count + item.quantity, 0);
    };

    //Get Item
    useEffect(() => {
        const getBasket = () => {
            const item = localStorage.getItem("techstore-basket");
            if (item) {
                const parsedItem = parse(item);
                //Flatten arrays and compare
                if (getCount(parsedItem) !== getCount(state)) {
                    setState(parse(parsedItem));
                }
            }
        };
        getBasket();

        //Listen for changes live
        window.addEventListener("techstore-basket-change", () => getBasket());

        //Unmount
        return window.removeEventListener("techstore-basket-change", () =>
            getBasket()
        );
    }, []);

    //Set item
    useEffect(() => {
        if (state.length !== 0) {
            localStorage.setItem("techstore-basket", JSON.stringify(state));
            console.log("Dispatch update");
            window.dispatchEvent(new Event("techstore-basket-change"));
        }
    }, [getCount(state)]);

    return { state, setState, getCount };
};

const parse = (value: string) => {
    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
};

export default useBasket;
