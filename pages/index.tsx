import Head from "next/head";
import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Button from "@mui/material/Button";

export default function Home({}: {}) {
    return (
        <Layout>
            <Head>
                <title>Test</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <Button variant="contained">Hello World</Button>
                <p>test</p>
            </section>
        </Layout>
    );
}
