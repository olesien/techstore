import React from "react";
import Layout from "../components/layout";
import mainStyles from "../styles/Main.module.scss";
import utilStyles from "../styles/utils.module.scss";
import Confetti from "react-confetti";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { Button } from "@mui/material";
import Link from "next/link";

export default function successfulorder() {
    const { width, height } = useWindowDimensions();
    console.log(width, height);
    return (
        <Layout nonav={true} title="Ordrar - Beställt!">
            <div className={mainStyles.main}>
                <Confetti
                    width={width ?? 0}
                    height={height ?? 0}
                    gravity={0.05}
                />
                <section className={utilStyles.successfulorder}>
                    <h1>Order beställd!</h1>
                    <p>
                        Din order har nu placerats och dina produkter kommer att
                        skickas soonTM
                    </p>
                    <Button component={Link} href="/account/orders">
                        Klicka här för att se alla ordrar
                    </Button>
                </section>
            </div>
        </Layout>
    );
}
