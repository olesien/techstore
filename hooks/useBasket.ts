import React, { useDebugValue, useEffect, useState } from "react";

export type Basket = {
    id: number;
    quantity: number;
};

const useBasket = () => {
    const [state, setState] = useState<Basket[]>([]);
    useDebugValue(state);

    const changeState = (newState: Basket[]) => {
        setState(newState);
    };

    //Get Item
    useEffect(() => {
        const item = localStorage.getItem("techstore-basket");
        if (item) setState(parse(item));
    }, []);

    //Set item
    useEffect(() => {
        if (state.length !== 0) {
            localStorage.setItem("techstore-basket", JSON.stringify(state));
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
