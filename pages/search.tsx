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
    console.log(data);

    return (
        <Layout toggleNav={() => setShowNav((prev) => !prev)} title={"Sök"}>
            <Main showNav={showNav}>
                <div>
                    <div className={productStyles.filter}>
                        <Box sx={{ width: 300, padding: 1 }}>
                            <p>Pris</p>
                            {/* <Slider
                                getAriaLabel={() => "Price Range"}
                                value={priceRange}
                                onChange={handlePriceChange}
                                onChangeCommitted={handlePriceChangeCommit}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                                step={100}
                                min={data.filters.price.min}
                                max={data.filters.price.max}
                                marks={[
                                    {
                                        value: data.filters.price.min,
                                        label: data.filters.price.min + " kr",
                                    },

                                    {
                                        value: data.filters.price.max,
                                        label: data.filters.price.max + " kr",
                                    },
                                ]}
                            /> */}
                        </Box>
                    </div>
                    {/* <div className={productStyles.listHeader}>
                        <p>
                            Visar {products.length}
                            {data?.pageCount > 1
                                ? ` av ${data?.pageCount} `
                                : " "}
                            produkter
                        </p>
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
                    </div>*/}
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
