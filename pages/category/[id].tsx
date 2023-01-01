import { useState } from "react";
import Layout from "../../components/layout";
import Head from "next/head";
import Main from "../../components/Main";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { getCategory, getAllCategoryIds } from "../../lib/category";
import { getProducts } from "../../lib/products";
import ProductList from "../../components/ProductList";
import { products } from "@prisma/client";
import {
    Button,
    MenuItem,
    Pagination,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";
import { useRouter } from "next/router";

export type ProductAddons = {
    product_images: string[];
    review_avg: number;
};

export type Product = products & ProductAddons;

export type Data = {
    page: number;
    pageCount: number;
    sortBy: number;
    products: Product[];
};

export default function List({
    category,
    data,
}: {
    category: {
        id: number;
        title: string;
    };
    data: Data;
}) {
    const [age, setAge] = useState("1");
    console.log(data);
    const products = data?.products;
    const router = useRouter();
    const query = router.query;
    const changeQuery = (queryIndex: string, value: number) => {
        router.push({
            pathname: "/category/" + category.id,
            query: { ...query, [queryIndex]: value },
        });
    };
    const [showNav, setShowNav] = useState(false);
    const title = `${category?.title} - Techstore`;

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        changeQuery("page", value);
    };

    const handleChange = (event: any) => {
        //setAge(event.target.value as string);
        changeQuery("sortby", event.target.value);
    };

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
                    <div className="p-1 right-side">
                        <TextField
                            value={String(data.sortBy)}
                            onChange={handleChange}
                            select // tell TextField to render select
                            label="Sortera"
                            size="small"
                        >
                            <MenuItem value={1}>Produkt A-Ö</MenuItem>
                            <MenuItem value={2}>Produkt Ö-A</MenuItem>
                            <MenuItem value={3}>Pris Högt - Lågt</MenuItem>
                            <MenuItem value={4}>Pris Lågt - Högt</MenuItem>
                        </TextField>
                    </div>
                    <ProductList products={products} />
                    <div className="p-1 flex center-flex">
                        <Pagination
                            count={data?.pageCount ?? 1}
                            variant="outlined"
                            color="primary"
                            showFirstButton
                            showLastButton
                            page={data?.page ?? 1}
                            onChange={handlePageChange}
                        />
                    </div>
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
    const sortBy = Number(query?.sortby ?? 1);
    console.log(page);
    const category = await getCategory(params?.id as string);
    const data = await getProducts(params?.id as string, page, sortBy);

    // console.log(products);
    return {
        props: {
            category,
            data,
        },
    };
};
