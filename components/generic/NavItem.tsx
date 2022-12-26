import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function NavItem({
    title,
    link,
    icon,
}: {
    title: string;
    link: string;
    icon: IconDefinition;
}) {
    return (
        <li>
            <Link href={link} legacyBehavior>
                <a>
                    <FontAwesomeIcon icon={icon} />
                    <span>{title}</span>
                </a>
            </Link>
        </li>
    );
}
