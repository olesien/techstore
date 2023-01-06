import { useState } from "react";
import Layout from "../../components/layout";
import Head from "next/head";
import Main from "../../components/Main";
import { GetServerSideProps } from "next";
import { getCategory, getAllCategoryIds } from "../../lib/category";
import { OtherFilters, getProducts } from "../../lib/products";
import ProductList from "../../components/ProductList";
import { categories_filters, products } from "@prisma/client";
import {
    Box,
    Chip,
    FormControl,
    MenuItem,
    Pagination,
    Slider,
    TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import productStyles from "../../styles/Products.module.scss";

export type ProductAddons = {
    product_images: string[];
    review_avg: number;
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
            activeRange: [min: number, max: number];
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
    if ("error" in data) {
        return <p>{data.error}</p>;
    }

    const [priceRange, setPriceRange] = useState([
        data.filters.price.min,
        data.filters.price.max,
    ]);
    const products = data?.products;
    const router = useRouter();
    const query = router.query;
    const changeQuery = (queryIndex: string, value: number | string) => {
        router.push({
            pathname: "/category/" + category.id,
            query: { ...query, [queryIndex]: value },
        });
    };

    const removeQuery = (queryIndex: string) => {
        let newQuery = { ...query };
        delete newQuery[queryIndex];
        router.push({
            pathname: "/category/" + category.id,
            query: newQuery,
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
        changeQuery("sortby", event.target.value);
    };

    const handlePriceChange = (event: any) => {
        setPriceRange(event.target.value);
    };
    const handlePriceChangeCommit = () => {
        changeQuery("filter-price", JSON.stringify(priceRange));
    };

    const handleFilterChange = (type: string, value: string) => {
        if (value === "unselected") {
            //Unset
            return removeQuery("filter-" + type);
        }
        changeQuery("filter-" + type, value);
    };
    const handleFilterArrayChange = (type: string, value: string[]) => {
        if (value.length === 0) {
            return removeQuery("filter-" + type);
        }
        changeQuery("filter-" + type, JSON.stringify(value));
    };

    function valuetext(value: number) {
        return `${value} kr`;
    }

    return (
        <Layout toggleNav={() => setShowNav((prev) => !prev)}>
            <Head>
                <link rel="shortcut icon" href="/Logo.svg" />
                <title>{title}</title>
            </Head>
            <Main showNav={showNav}>
                <div>
                    {/* <div className="p-1 rounded">
                        <p>{category.title}</p>
                    </div> */}

                    <div className={productStyles.filter}>
                        <Box sx={{ width: 300, padding: 1 }}>
                            <p>Pris</p>
                            <Slider
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
                            />
                        </Box>
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
                                    </FormControl>
                                </div>
                            );
                        })}
                    </div>
                    <div className={productStyles.listHeader}>
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
                    </div>
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
