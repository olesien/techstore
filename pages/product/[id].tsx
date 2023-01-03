import { useState } from "react";
import Layout from "../../components/layout";
import Head from "next/head";
import Main from "../../components/Main";
import { GetServerSideProps } from "next";
import { getProduct } from "../../lib/product";
import { products } from "@prisma/client";
type Error = {
    code: number;
    error: string;
};

type Product = products | Error;

export default function Product({ product }: { product: Product }) {
    const [showNav, setShowNav] = useState(false);

    //404 Not found page?
    if ("error" in product) {
        return <p>{product.error}</p>;
    }
    const title = `${product.name} - Techstore`;

    return (
        <Layout toggleNav={() => setShowNav((prev) => !prev)}>
            <Head>
                <link rel="shortcut icon" href="/Logo.svg" />
                <title>{title}</title>
            </Head>
            <Main showNav={showNav}>
                <div>{product.name}</div>
            </Main>
        </Layout>
    );
}
export const getServerSideProps: GetServerSideProps = async ({
    params,
    query,
}) => {
    const product = await getProduct(Number(params?.id));
    return {
        props: { product },
    };
};
