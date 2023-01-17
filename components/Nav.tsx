import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import NavItem from "./generic/NavItem";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { useState } from "react";

export default function Nav({
    showNav,
    links,
}: {
    showNav: boolean;
    links: (
        | {
              title: string;
              link: string;
              icon: IconDefinition;
          }
        | { header: string }
    )[];
}) {
    const [alignment, setAlignment] = useState("standard");
    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string
    ) => {
        setAlignment(newAlignment);
    };
    console.log(showNav);
    return (
        <span>
            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                size="small"
            >
                <ToggleButton value="standard">Standard</ToggleButton>
                <ToggleButton value="datorbyggare">Datorbyggare</ToggleButton>
            </ToggleButtonGroup>
            <ul id={showNav ? "" : "hide-nav"}>
                {links.map((link, index) => {
                    if ("header" in link) {
                        return (
                            <li key={index}>
                                <p>{link.header}</p>
                            </li>
                        );
                    }
                    return (
                        <NavItem
                            key={index}
                            title={link.title}
                            link={link.link}
                            icon={link.icon}
                        />
                    );
                })}
            </ul>
        </span>
    );
}
