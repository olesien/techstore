import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import useBasket, { Basket } from "../hooks/useBasket";
import { ProductByIdType } from "../pages/api/productsbyids/[ids]";
import styles from "../styles/Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import InStock from "./generic/InStock";
import Link from "next/link";
import { formattedNumber } from "../lib/utils";

export default function ItemTable({
    products,
}: {
    products: (Basket & ProductByIdType)[];
}) {
    const { state: basket, toBasket, trash } = useBasket();

    return (
        <TableContainer>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Produkt</TableCell>
                        <TableCell>Antal</TableCell>
                        <TableCell>Pris</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => {
                        const basketQuantity =
                            basket.find((item) => item.id === product.id)
                                ?.quantity ?? 0;
                        const canBuy =
                            (product.instock ?? 0) - basketQuantity >= 1;
                        return (
                            <TableRow
                                key={product.id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell className={styles.product_col}>
                                    <img
                                        src={
                                            `/images/categories/${product.categoryid}/` +
                                            product.product_images[0].image
                                        }
                                        title={
                                            product.product_images[0].name ??
                                            "produkt"
                                        }
                                    ></img>
                                    <div>
                                        <Link
                                            href={"/product/" + product.id}
                                            legacyBehavior
                                        >
                                            <a>
                                                <span className="clickable">
                                                    {product.name}
                                                </span>
                                            </a>
                                        </Link>

                                        <InStock
                                            instock={product.instock ?? 0}
                                        />
                                    </div>
                                </TableCell>
                                <TableCell className={styles.quantity_col}>
                                    <div>
                                        <span
                                            className={styles.clickableIcon}
                                            role="button"
                                            onClick={() =>
                                                toBasket(
                                                    product,
                                                    basketQuantity > 0,
                                                    1,
                                                    true
                                                )
                                            }
                                        >
                                            <FontAwesomeIcon
                                                icon={faMinus}
                                                size="sm"
                                            />
                                        </span>
                                        <span>{product.quantity}</span>
                                        <span
                                            className={styles.clickableIcon}
                                            role="button"
                                            onClick={() =>
                                                toBasket(product, canBuy)
                                            }
                                        >
                                            <FontAwesomeIcon
                                                icon={faPlus}
                                                size="sm"
                                            />
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className={styles.price_col}>
                                    <div>
                                        <span>
                                            {formattedNumber(product.price)} kr
                                        </span>
                                        <span
                                            className={styles.clickableIcon}
                                            role="button"
                                            onClick={() => trash(product.id)}
                                        >
                                            <FontAwesomeIcon
                                                icon={faTrashCan}
                                                size="lg"
                                            />
                                        </span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
