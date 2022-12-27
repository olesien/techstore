import Head from "next/head";
import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.scss";
import Button from "@mui/material/Button";
import Main from "../components/Main";
import { useState } from "react";

export default function Home({}: {}) {
    const [showNav, setShowNav] = useState(false);
    return (
        <Layout toggleNav={() => setShowNav((prev) => !prev)}>
            <Head>
                <link rel="shortcut icon" href="/Logo.svg" />
                <title>Hem - Techstore</title>
            </Head>
            <Main showNav={showNav}>
                <section className={utilStyles.hero}>
                    <Button variant="contained" color="primary">
                        Hello World
                    </Button>
                    <p>test</p>
                </section>
            </Main>
        </Layout>
    );
}
