import React, { useState } from "react";
import { Order } from "../../pages/api/orders";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/Account.module.scss";
import OrderItemProducts from "../order/OrderItemProducts";

const getDateString = (timestamp: string) =>
    dayjs(timestamp).format("YYYY-MM-DD");

export default function OrderItem({ order }: { order: Order }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const totalCount = order.orders_products.reduce((total, product) => {
        return total + product.quantity * product.item_price;
    }, 0);
    return (
        <>
            <TableRow
                sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                }}
            >
                <TableCell component="th" scope="row">
                    {getDateString(String(order.date))}
                </TableCell>
                <TableCell>{order.id}</TableCell>
                <TableCell>
                    <div className={styles.status}>
                        <div
                            className={
                                order.status === "Mottagen"
                                    ? "gray-box"
                                    : "green-box"
                            }
                        ></div>
                        {order.status}
                    </div>
                </TableCell>
                <TableCell>{totalCount} kr</TableCell>
                <TableCell>
                    <div
                        role="button"
                        className={styles.toggle}
                        onClick={() =>
                            setIsCollapsed((isCollapsed) => !isCollapsed)
                        }
                    >
                        {isCollapsed ? (
                            <>
                                <span>Göm</span>
                                <FontAwesomeIcon icon={faArrowUp} />
                            </>
                        ) : (
                            <>
                                <span>Visa</span>
                                <FontAwesomeIcon icon={faArrowDown} />
                            </>
                        )}
                    </div>
                </TableCell>
            </TableRow>
            {isCollapsed ? (
                <TableRow>
                    <TableCell colSpan={5}>
                        <OrderItemProducts products={order.orders_products} />
                    </TableCell>
                </TableRow>
            ) : (
                <></>
            )}
        </>
    );
}
