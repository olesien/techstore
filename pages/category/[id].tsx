import { useState } from "react";
import Layout from "../../components/layout";
import Head from "next/head";
import Main from "../../components/Main";
import { GetStaticProps, GetStaticPaths } from "next";
import { getCategory, getAllCategoryIds } from "../../lib/category";
import { getProducts } from "../../lib/products";

export default function List({
    category,
    products,
}: {
    category: {
        id: number;
        title: string;
    };
    products: any;
}) {
    console.log(products);
    const [showNav, setShowNav] = useState(false);
    return (
        <Layout toggleNav={() => setShowNav((prev) => !prev)}>
            <Head>
                <link rel="shortcut icon" href="/Logo.svg" />
                <title>{category.title} - Techstore</title>
            </Head>
            <Main showNav={showNav}>
                <p>{category.title}</p>
            </Main>
        </Layout>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getAllCategoryIds();
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const category = await getCategory(params?.id as string);
    const products = await getProducts(params?.id as string);
    return {
        props: {
            category,
            products,
        },
    };
};
