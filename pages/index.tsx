import Head from "next/head";
import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Button from "@mui/material/Button";
import Main from "../components/Main";

export default function Home({}: {}) {
    return (
        <Layout>
            <Head>
                <link rel="shortcut icon" href="/Logo.svg" />
                <title>Hem - Techstore</title>
            </Head>
            <Main>
                <section className={utilStyles.headingMd}>
                    <Button variant="contained" color="primary">
                        Hello World
                    </Button>
                    <p>test</p>
                </section>
            </Main>
        </Layout>
    );
}
