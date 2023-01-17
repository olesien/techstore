import React, { useDebugValue, useEffect, useState } from "react";

const useComputerBuilder = () => {
    const [isActive, setIsActive] = useState<boolean | undefined>(undefined);
    const [initialRender, setInitialRender] = useState(true);

    //Get Item
    useEffect(() => {
        const getIsActive = () => {
            const item = localStorage.getItem("techstore-builder-active");
            if (item) {
                const parsedItem = parse(item);
                setIsActive(parse(parsedItem));
            }
        };
        getIsActive();

        //Listen for changes live
        window.addEventListener("techstore-builder-active-change", () =>
            getIsActive()
        );

        //Unmount
        return window.removeEventListener(
            "techstore-builder-active-change",
            () => getIsActive()
        );
    }, []);

    //Set item
    useEffect(() => {
        if (initialRender) {
            setInitialRender(false);
        } else {
            localStorage.setItem(
                "techstore-builder-active",
                JSON.stringify(isActive)
            );
            console.log("Dispatch update");
            window.dispatchEvent(new Event("techstore-builder-active-change"));
        }
    }, [!!isActive]);

    const toggleIsActive = () => {
        setIsActive((isActive) => !isActive);
    };

    return { isActive, toggleIsActive, setIsActive };
};

const parse = (value: string) => {
    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
};

export default useComputerBuilder;
