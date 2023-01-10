import React from "react";
import Layout from "../components/layout";
import mainStyles from "../styles/Main.module.scss";

export default function successfulorder() {
    return (
        <Layout nonav={true} title="Ordrar - Beställt!">
            <div className={mainStyles.main}>
                <p>Order beställd!</p>
            </div>
        </Layout>
    );
}
