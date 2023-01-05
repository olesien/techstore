import React, { useDebugValue, useEffect, useState } from "react";

export type Basket = {
    id: number;
    quantity: number;
};

const useBasket = () => {
    const [state, setState] = useState<Basket[]>([]);
    useDebugValue(state);

    //Get Item
    useEffect(() => {
        const getBasket = () => {
            const item = localStorage.getItem("techstore-basket");
            if (item) setState(parse(item));
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
            window.dispatchEvent(new Event("techstore-basket-change"));
        }
    }, [state]);

    return { state, setState };
};

const parse = (value: string) => {
    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
};

export default useBasket;
