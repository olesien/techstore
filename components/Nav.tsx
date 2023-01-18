import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import NavItem from "./generic/NavItem";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import useComputerBuilder from "../hooks/useComputerBuilder";

export default function Nav({
    links,
}: {
    links: (
        | {
              title: string;
              link: string;
              icon: IconDefinition;
              categoryId: number;
          }
        | { header: string }
    )[];
}) {
    return (
        <ul>
            {links.map((link) => {
                if ("header" in link) {
                    return (
                        <li key={0}>
                            <p>{link.header}</p>
                        </li>
                    );
                }
                return (
                    <NavItem
                        key={link.categoryId}
                        title={link.title}
                        link={link.link}
                        icon={link.icon}
                    />
                );
            })}
        </ul>
    );
}
