import React from "react";
import productStyles from "../styles/Products.module.scss";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import ProductList from "./ProductList";
import { Data, Product } from "../pages/category/[id]";
import Pagination from "@mui/material/Pagination";

export default function RenderList({
    products,
    data,
    changeQuery,
    categoryId,
}: {
    products: Product[];
    data: Partial<Data> & Pick<Data, "page" | "pageCount">;
    changeQuery: (queryIndex: string, value: number | string) => void;
    categoryId: number;
}) {
    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        changeQuery("page", value);
    };

    const handleChange = (event: any) => {
        changeQuery("sortby", event.target.value);
    };
    return (
        <>
            <div className={productStyles.listHeader}>
                <p>
                    Visar {products.length}
                    {data?.pageCount > 1 ? ` av ${data?.pageCount} ` : " "}
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
            <ProductList products={products} categoryId={categoryId} />
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
        </>
    );
}
