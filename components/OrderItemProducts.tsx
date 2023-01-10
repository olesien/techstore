import React from "react";
import { Order } from "../pages/api/orders";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import styles from "../styles/Account.module.scss";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import Link from "next/link";

export default function OrderItemProducts({
    products,
}: {
    products: Order["orders_products"];
}) {
    return (
        <TableContainer>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Produkt</TableCell>
                        <TableCell>Pris</TableCell>
                        <TableCell>Antal</TableCell>
                        <TableCell>Summa</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                            key={product.id}
                        >
                            <TableCell component="th" scope="row">
                                <div className={styles.product}>
                                    <img
                                        src={
                                            product.products.product_images[0]
                                                .image
                                        }
                                        title={
                                            product.products.product_images[0]
                                                .name ?? "produkt"
                                        }
                                    />
                                    <Link
                                        href={`/product/${product.productid}`}
                                    >
                                        {product.products.name}
                                    </Link>
                                </div>
                            </TableCell>
                            <TableCell>{product.item_price} kr</TableCell>
                            <TableCell>{product.quantity}x</TableCell>
                            <TableCell>
                                {product.item_price * product.quantity} kr
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
