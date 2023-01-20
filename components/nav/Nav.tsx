import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import NavItem from "../nav/NavItem";

export default function Nav({
    links,
}: {
    links: (
        | {
              title: string;
              link: string;
              icon: IconDefinition;
              categoryId?: number;
          }
        | { header: string }
    )[];
}) {
    return (
        <ul>
            {links.map((link, index) => {
                if ("header" in link) {
                    return (
                        <li key={0}>
                            <p>{link.header}</p>
                        </li>
                    );
                }
                return (
                    <NavItem
                        key={link?.categoryId ?? index + 1}
                        title={link.title}
                        link={link.link}
                        icon={link.icon}
                    />
                );
            })}
        </ul>
    );
}
