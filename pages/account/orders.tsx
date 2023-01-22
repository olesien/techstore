import React, { useState } from "react";
import useUser from "../../lib/useUser";
import Layout from "../../components/generic/Layout";
import useSWR from "swr";
import MainAccount from "../../components/generic/MainAccount";
import { OrdersWithErrors } from "../api/orders";
import utilStyles from "../../styles/utils.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styles from "../../styles/Account.module.scss";
import OrderItem from "../../components/order/OrderItem";

export default function Orders() {
    const [showNav, setShowNav] = useState(false);
    const { user } = useUser({
        redirectTo: "/",
    });
    const {
        data: orders,
        isLoading,
        error,
    } = useSWR<OrdersWithErrors>("/api/orders");

    if (isLoading || error || !orders || "message" in orders) {
        return (
            <Layout
                setShowNav={setShowNav}
                toggleNav={() => setShowNav((prev) => !prev)}
                title="Ordrar - Techstore"
                error={error}
                loading={isLoading}
            />
        );
    }

    return (
        <Layout
            setShowNav={setShowNav}
            toggleNav={() => setShowNav((prev) => !prev)}
            title="Ordrar - Techstore"
        >
            <MainAccount showNav={showNav}>
                <section className={utilStyles.section + " " + styles.orders}>
                    <TableContainer className="table">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                                {orders.map((order) => (
                                    <OrderItem order={order} key={order.id} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </section>
            </MainAccount>
        </Layout>
    );
}
