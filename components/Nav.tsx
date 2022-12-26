import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faPalette } from "@fortawesome/free-solid-svg-icons";

export default function Nav() {
    return (
        <ul>
            <li>
                <Link href="/category/1" legacyBehavior>
                    <a>
                        <FontAwesomeIcon icon={faBox} />
                        <span>Datorchassi</span>
                    </a>
                </Link>
            </li>
            <li>
                <Link href="/category/1" legacyBehavior>
                    <a>
                        <FontAwesomeIcon icon={faPalette} />
                        <span>Grafikkort</span>
                    </a>
                </Link>
            </li>
        </ul>
    );
}
