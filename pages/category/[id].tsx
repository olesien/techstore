import { useState } from "react";
import Layout from "../../components/generic/Layout";
import Main from "../../components/generic/Main";
import { GetServerSideProps } from "next";
import { getCategory } from "../../lib/category";
import { OtherFilters, getProducts } from "../../lib/products";
import { categories_filters, product_compat, products } from "@prisma/client";
import { Box, Chip, FormControl, MenuItem, TextField } from "@mui/material";
import productStyles from "../../styles/Products.module.scss";
import useQueries from "../../hooks/useQueries";
import SliderWithValue from "../../components/products/SliderWithValue";
import RenderList from "../../components/products/RenderList";

export type ProductAddons = {
    product_images: string[];
    review_avg: number;
    product_compat: product_compat[];
};

export type Product = products & ProductAddons;

export type Data = {
    page: number;
    pageCount: number;
    sortBy: number;
    filters: {
        price: {
            min: number;
            max: number;
            activeRange: number[];
        };
        otherFilters: OtherFilters;
    };
    products: Product[];
};

type Error = {
    code: number;
    error: string;
};

export default function List({
    category,
    data,
}: {
    category: {
        id: number;
        title: string;
        filters: categories_filters[];
    };
    data: Data | Error;
}) {
    const [showNav, setShowNav] = useState(false);
    const { changeQuery, removeQuery } = useQueries();
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

    const title = `${category?.title} - Techstore`;

    const handleFilterChange = (type: string, value: string) => {
        if (value === "unselected") {
            //Unset
            return removeQuery("filter-" + type);
        }
        changeQuery("filter-" + type, value);
    };
    const handleFilterArrayChange = (
        type: string,
        value: (string | number)[]
    ) => {
        if (value.length === 0) {
            return removeQuery("filter-" + type);
        }
        changeQuery("filter-" + type, JSON.stringify(value));
    };

    return (
        <Layout toggleNav={() => setShowNav((prev) => !prev)} title={title}>
            <Main showNav={showNav}>
                <div>
                    <div className={productStyles.filter}>
                        <SliderWithValue
                            filter={{
                                id: 1,
                                title: "Pris",
                                value: "price",
                            }}
                            filterData={{
                                value: data.filters.price.activeRange,
                                list: [
                                    {
                                        content: data.filters.price.min,
                                        id: 1,
                                    },
                                    {
                                        content: data.filters.price.max,
                                        id: 2,
                                    },
                                ],
                            }}
                            handleCommit={handleFilterArrayChange}
                            type="kr"
                        />
                        {category.filters.map((filter) => {
                            const filterData =
                                data.filters.otherFilters[filter.value];
                            return (
                                <div
                                    className={productStyles.filterOption}
                                    key={filter.id}
                                >
                                    <FormControl fullWidth>
                                        {filter.type === "select" && (
                                            <TextField
                                                value={filterData.value}
                                                onChange={(e) =>
                                                    handleFilterChange(
                                                        filter.value,
                                                        e.target.value
                                                    )
                                                }
                                                select // tell TextField to render select
                                                label={filter.title}
                                                key={filter.id}
                                                SelectProps={{
                                                    autoWidth: true,
                                                }}
                                            >
                                                <MenuItem value={"unselected"}>
                                                    Välj {filter.title}
                                                </MenuItem>
                                                {filterData.list
                                                    .filter((filter) => filter)
                                                    .map((filter) => (
                                                        <MenuItem
                                                            value={
                                                                filter.content
                                                            }
                                                            key={filter.id}
                                                        >
                                                            {filter.content}
                                                        </MenuItem>
                                                    ))}
                                            </TextField>
                                        )}
                                        {filter.type === "multiselect" && (
                                            <TextField
                                                select // tell TextField to render select
                                                label={filter.title}
                                                key={filter.id}
                                                SelectProps={{
                                                    displayEmpty: true,
                                                    autoWidth: true,
                                                    multiple: true,
                                                    value: filterData.value,
                                                    onChange: (e) => {
                                                        handleFilterArrayChange(
                                                            filter.value,
                                                            e.target
                                                                .value as string[]
                                                        );
                                                    },
                                                    renderValue: (selected) => (
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                flexWrap:
                                                                    "wrap",
                                                                gap: 0.5,
                                                            }}
                                                        >
                                                            {(
                                                                selected as string[]
                                                            ).map((value) => {
                                                                return (
                                                                    <Chip
                                                                        key={
                                                                            value
                                                                        }
                                                                        label={
                                                                            value
                                                                        }
                                                                        color="primary"
                                                                        size="small"
                                                                    />
                                                                );
                                                            })}
                                                        </Box>
                                                    ),
                                                }}
                                            >
                                                {filterData.list
                                                    .filter((filter) => filter)
                                                    .map((filter) => (
                                                        <MenuItem
                                                            value={
                                                                filter.content
                                                            }
                                                            key={filter.id}
                                                        >
                                                            {filter.content}
                                                        </MenuItem>
                                                    ))}
                                            </TextField>
                                        )}
                                        {filter.type === "slider" && (
                                            <SliderWithValue
                                                filter={filter}
                                                filterData={filterData}
                                                handleCommit={(index, values) =>
                                                    handleFilterArrayChange(
                                                        index,
                                                        values.map((value) =>
                                                            String(value)
                                                        )
                                                    )
                                                }
                                                type="st"
                                            />
                                        )}
                                    </FormControl>
                                </div>
                            );
                        })}
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

function isJson(str: string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export const getServerSideProps: GetServerSideProps = async ({
    params,
    query,
}) => {
    const page = Number(query?.page ?? 1);
    const sortBy = Number(query?.sortby ?? 1);
    const priceQuery = query["filter-price"] ?? JSON.stringify([0, 0]);
    const priceRange = JSON.parse(String(priceQuery));
    const otherFilters = Object.keys(query)
        .filter((key) => key !== "filter-price" && key.includes("filter"))
        .reduce((obj, key) => {
            return {
                ...obj,
                [key.split("-")[1]]: isJson(query[key] as string)
                    ? JSON.parse(String(query[key]))
                    : query[key],
            };
        }, {});
    const filters = {
        priceRange,
        otherFilters,
    };
    const category = await getCategory(params?.id as string);
    const data = await getProducts(
        params?.id as string,
        page,
        sortBy,
        filters,
        category?.filters
    );
    return {
        props: {
            category,
            data,
        },
    };
};
