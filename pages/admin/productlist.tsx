import React, { useEffect, useState } from "react";
import AdminRoute from "../../components/generic/AdminRoute";
import Layout from "../../components/layout";
import MainAccount from "../../components/MainAccount";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import utilStyles from "../../styles/utils.module.scss";
import styles from "../../styles/Account.module.scss";
import TableBody from "@mui/material/TableBody";
import useSWR from "swr";
import { AllProductsWithErrors } from "../api/admin/productlist";
import adminStyles from "../../styles/Admin.module.scss";
import translate from "../../lib/translations";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import useQueries from "../../hooks/useQueries";

export default function productlist() {
    const { query, changeQuery } = useQueries();
    const [showNav, setShowNav] = useState(false);
    const [search, setSearch] = useState(String(query?.adminsearch ?? ""));
    useEffect(() => {
        setSearch(String(query?.adminsearch ?? ""));
    }, [query?.adminsearch]);
    const {
        data: products,
        isLoading,
        error,
    } = useSWR<AllProductsWithErrors>(
        "/api/admin/productlist" +
            (query?.adminsearch
                ? `?adminsearch=${JSON.stringify(query?.adminsearch)}`
                : "")
    );
    if (isLoading || error || !products || "message" in products) {
        return (
            <Layout
                toggleNav={() => setShowNav((prev) => !prev)}
                title="Ordrar - Techstore"
                error={error?.message}
                loading={isLoading}
            />
        );
    }
    const makeSearch = () => {
        changeQuery("adminsearch", search);
    };
    const keySubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            makeSearch();
        }
    };

    console.log(products);
    return (
        <AdminRoute>
            <Layout
                toggleNav={() => setShowNav((prev) => !prev)}
                title="Ordrar - Techstore"
            >
                <MainAccount showNav={showNav}>
                    <section
                        className={utilStyles.section + " " + styles.orders}
                    >
                        <div className={adminStyles.search}>
                            <TextField
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                id="filled-basic"
                                label="Sök bland alla produkter"
                                variant="filled"
                                size="small"
                                color="primary"
                                onKeyDown={keySubmit}
                            />
                            <Button variant="contained" onClick={makeSearch}>
                                Hitta produkt
                            </Button>
                        </div>

                        <TableContainer>
                            <Table
                                sx={{ minWidth: 650 }}
                                aria-label="simple table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Produkt</TableCell>
                                        <TableCell>Categori</TableCell>
                                        <TableCell>Lager</TableCell>
                                        <TableCell>Pris</TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products.map((product) => (
                                        <TableRow
                                            sx={{
                                                "&:last-child td, &:last-child th":
                                                    { border: 0 },
                                            }}
                                        >
                                            <TableCell
                                                className={
                                                    adminStyles.product_col
                                                }
                                            >
                                                <img
                                                    src={
                                                        `/images/categories/${product.categoryid}/` +
                                                        product
                                                            .product_images[0]
                                                            .image
                                                    }
                                                    title={
                                                        product
                                                            .product_images[0]
                                                            .name ?? "produkt"
                                                    }
                                                ></img>
                                                <div>
                                                    <Link
                                                        href={`/product/${product.id}`}
                                                        className="clickable"
                                                    >
                                                        {product.name}
                                                    </Link>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {translate(
                                                    product.categories.name
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {product.instock} st
                                            </TableCell>
                                            <TableCell>
                                                {product.price} kr{" "}
                                                {product.oldprice
                                                    ? ` (tidigare ${product.oldprice} kr)`
                                                    : ""}
                                            </TableCell>

                                            <TableCell>
                                                <Button
                                                    component={Link}
                                                    href={
                                                        "/admin/edit/" +
                                                        product.id
                                                    }
                                                    variant="contained"
                                                    size="small"
                                                >
                                                    Redigera
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </section>
                </MainAccount>
            </Layout>
        </AdminRoute>
    );
}
