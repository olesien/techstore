import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/Main.module.scss";

export default function NavItem({
    title,
    link,
    icon,
}: {
    title: string;
    link: string;
    icon: IconDefinition;
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
                </a>
            </Link>
        </li>
    );
}
