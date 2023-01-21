import React, { useState } from "react";
import Layout from "../components/generic/Layout";
import Main from "../components/generic/Main";
import { GetServerSideProps } from "next";
import { getProductsBySearch } from "../lib/productsbysearch";
import { Data } from "./category/[id]";
import useQueries from "../hooks/useQueries";
import RenderList from "../components/products/RenderList";

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
            setShowNav={setShowNav}
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
