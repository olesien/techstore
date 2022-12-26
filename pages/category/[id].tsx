import { useState } from "react";
import Layout from "../../components/layout";
import Head from "next/head";
import Main from "../../components/Main";
import { GetStaticProps, GetStaticPaths } from "next";
import { getCategory, getAllCategoryIds } from "../../lib/category";

export default function Post({
    category,
}: {
    category: {
        id: number;
        title: string;
    };
}) {
    console.log(category);
    const [showNav, setShowNav] = useState(true);
    return (
        <Layout toggleNav={() => setShowNav((prev) => !prev)}>
            <Head>
                <link rel="shortcut icon" href="/Logo.svg" />
                <title>Hem - Techstore</title>
            </Head>
            <Main showNav={showNav}>
                <p>{category.title}</p>
            </Main>
        </Layout>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllCategoryIds();
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const category = await getCategory(params?.id as string);
    return {
        props: {
            category,
        },
    };
};
