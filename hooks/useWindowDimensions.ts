import { useState, useEffect } from "react";

export default function () {
    const [windowSize, setWindowSize] = useState<{
        width: undefined | number;
        height: undefined | number;
    }>({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        //Initial
        // setWindowSize({
        //     width: window.innerWidth,
        //     height: window.innerHeight,
        // });

        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
}
