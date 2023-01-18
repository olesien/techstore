import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/Main.module.scss";
import { faStarOfLife } from "@fortawesome/free-solid-svg-icons";

export default function NavItem({
    title,
    link,
    icon,
    required,
    items,
}: {
    title: string;
    link: string;
    icon: IconDefinition;
    required: boolean;
    items: { id: number; photo: string; name: string; price: string }[];
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
        </li>
    );
}
