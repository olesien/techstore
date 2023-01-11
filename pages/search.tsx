import React, { useState } from "react";
import Layout from "../components/layout";
import Main from "../components/Main";
import productStyles from "../styles/Products.module.scss";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { GetServerSideProps } from "next";
import { getProductsBySearch } from "../lib/productsbysearch";
import { Data } from "./category/[id]";
import RenderList from "../components/RenderList";
import useQueries from "../hooks/useQueries";

type Error = {
    code: number;
    error: string;
};

export default function search({
    data,
}: {
    data: Pick<Data, "page" | "pageCount" | "sortBy" | "products"> | Error;
}) {
    const [showNav, setShowNav] = useState(false);
    const { query, changeQuery } = useQueries();
    console.log(data);
    if ("error" in data) {
        return (
            <Layout
                toggleNav={() => setShowNav((prev) => !prev)}
                title="Ordrar - Techstore"
                error={data.error}
            />
        );
    }
    const products = data?.products;

    return (
        <Layout
            toggleNav={() => setShowNav((prev) => !prev)}
            title={"Sökträffar på " + query?.query ?? ""}
        >
            <Main showNav={showNav}>
                <div>
                    <div className="text-center p-1">
                        <p>Resultat för "{query?.query ?? ""}"</p>
                    </div>
                    <RenderList
                        data={data}
                        products={products}
                        changeQuery={changeQuery}
                    />
                </div>
            </Main>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async ({
    params,
    query,
}) => {
    const q = String(query?.query ?? "");
    const sortBy = Number(query?.sortby ?? 1);
    const page = Number(query?.page ?? 1);

    const data = await getProductsBySearch(q, page, sortBy);
    return {
        props: {
            data,
        },
    };
};
