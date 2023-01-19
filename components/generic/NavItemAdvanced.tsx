import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/Main.module.scss";
import { Basket as BasketType } from "../../hooks/useBasket";
import { faStarOfLife } from "@fortawesome/free-solid-svg-icons";
import { ProductByIdType } from "../../pages/api/productsbyids/[ids]";

import NavProduct from "../NavProduct";

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
            {items.map((product) => (
                <NavProduct product={product} key={product.id} trash={trash} />
            ))}
        </li>
    );
}
