import { useState } from "react";
import Layout from "../../components/layout";
import Head from "next/head";
import Main from "../../components/Main";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { getCategory, getAllCategoryIds } from "../../lib/category";
import { getProducts } from "../../lib/products";
import ProductList from "../../components/ProductList";
import { products } from "@prisma/client";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

export type ProductAddons = {
    product_images: string[];
    review_avg: number;
};

export type Product = products & ProductAddons;

export default function List({
    category,
    products,
}: {
    category: {
        id: number;
        title: string;
    };
    products: Product[];
}) {
    const router = useRouter();
    const setPage = (newPage: number) => {
        router.push({
            pathname: "/category/" + category.id,
            query: { page: newPage },
        });
    };
    console.log(products);
    const [showNav, setShowNav] = useState(false);
    console.log(category.title);
    const title = `${category?.title} - Techstore`;
    return (
        <Layout toggleNav={() => setShowNav((prev) => !prev)}>
            <Head>
                <link rel="shortcut icon" href="/Logo.svg" />
                {/* <title>T</title> */}
                <title>{title}</title>
            </Head>
            <Main showNav={showNav}>
                <div>
                    <div className="p-1 section m-1 rounded">
                        <p>{category.title}</p>
                    </div>
                    {/* Pagination */}
                    <Button onClick={() => setPage(1)}>Page 1</Button>
                    <Button onClick={() => setPage(2)}>Page 2</Button>

                    <ProductList products={products} />
                </div>
            </Main>
        </Layout>
    );
}

// export const getStaticPaths: GetStaticPaths = async () => {
//     const paths = await getAllCategoryIds();
//     return {
//         paths,
//         fallback: false,
//     };
// };

export const getServerSideProps: GetServerSideProps = async ({
    params,
    query,
}) => {
    const page = Number(query?.page ?? 1);
    console.log(page);
    const category = await getCategory(params?.id as string);
    const products = await getProducts(params?.id as string, page);

    // console.log(products);
    return {
        props: {
            category,
            products,
        },
    };
};
