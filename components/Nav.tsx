import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import NavItem from "./generic/NavItem";

export default function Nav({
    showNav,
    links,
}: {
    showNav: boolean;
    links: {
        title: string;
        link: string;
        icon: IconDefinition;
    }[];
}) {
    console.log(showNav);
    return (
        <span>
            <ul id={showNav ? "" : "hide-nav"}>
                {links.map((link, index) => (
                    <NavItem
                        key={index}
                        title={link.title}
                        link={link.link}
                        icon={link.icon}
                    />
                ))}
            </ul>
        </span>
    );
}
