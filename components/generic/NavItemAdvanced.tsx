import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/Main.module.scss";
import headStyles from "../../styles/Header.module.scss";
import { Basket as BasketType } from "../../hooks/useBasket";
import { faStarOfLife, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ProductByIdType } from "../../pages/api/productsbyids/[ids]";

export default function NavItem({
    title,
    link,
    icon,
    required,
    items,
    trash,
}: {
    title: string;
    link: string;
    icon: IconDefinition;
    required: boolean;
    items: (BasketType & ProductByIdType)[];
    trash: (productid?: number | undefined) => void;
}) {
    const router = useRouter();
    return (
        <li className={router.asPath == link ? styles.active : ""}>
            <Link href={link} legacyBehavior>
                <a>
                    <div>
                        <FontAwesomeIcon icon={icon} size={"1x"} />
                        <span>{title}</span>
                    </div>
                    {required && (
                        <div>
                            <FontAwesomeIcon
                                icon={faStarOfLife}
                                size="xs"
                                className="error"
                            />
                        </div>
                    )}
                </a>
            </Link>

            {/* List items */}
            {items.map((product) => {
                return (
                    <div
                        className={styles.product_builder_col}
                        key={product.id}
                    >
                        <div>
                            <img
                                src={
                                    `/images/categories/${product.categoryid}/` +
                                    product.product_images[0].image
                                }
                                title={
                                    product.product_images[0].name ?? "produkt"
                                }
                            ></img>
                            <div>
                                <Link
                                    href={"/product/" + product.id}
                                    legacyBehavior
                                >
                                    <a>
                                        <p className="clickable">
                                            {product.name}
                                        </p>
                                    </a>
                                </Link>

                                <p>{product.price} kr</p>
                            </div>
                        </div>
                        <div>
                            <span
                                className={headStyles.clickableIcon}
                                role="button"
                                onClick={() => trash(product.id)}
                            >
                                <FontAwesomeIcon icon={faTrashCan} />
                            </span>
                        </div>
                    </div>
                );
            })}
        </li>
    );
}
