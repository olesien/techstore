import React from "react";
import Layout from "../components/layout";
import mainStyles from "../styles/Main.module.scss";
import utilStyles from "../styles/utils.module.scss";
import Confetti from "react-confetti";
import useWindowDimensions from "../hooks/useWindowDimensions";

export default function successfulorder() {
    const { width, height } = useWindowDimensions();
    return (
        <Layout nonav={true} title="Ordrar - Beställt!">
            <div className={mainStyles.main}>
                <Confetti width={width} height={height} />
                <div className={utilStyles.successfulorder}>
                    <div>
                        <p>Order beställd!</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
