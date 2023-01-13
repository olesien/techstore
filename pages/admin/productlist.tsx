import React, { useState } from "react";
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

export default function productlist() {
    const [showNav, setShowNav] = useState(false);
    const {
        data: products,
        isLoading,
        error,
    } = useSWR<AllProductsWithErrors>("/api/admin/productlist");
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
                        <TableContainer>
                            <Table
                                sx={{ minWidth: 650 }}
                                aria-label="simple table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Datum</TableCell>
                                        <TableCell>Ordernummer</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Ordervärde</TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* {orders.map((order) => (
                                    <OrderItem order={order} key={order.id} />
                                ))} */}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </section>
                </MainAccount>
            </Layout>
        </AdminRoute>
    );
}
