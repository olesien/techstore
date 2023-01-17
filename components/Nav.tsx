import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import NavItem from "./generic/NavItem";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { useState } from "react";
import useComputerBuilder from "../hooks/useComputerBuilder";

export default function Nav({
    showNav,
    links,
    renderChoice = true,
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
    renderChoice?: boolean;
}) {
    const { isActive, toggleIsActive, setIsActive } = useComputerBuilder();
    const [alignment, setAlignment] = useState("standard");
    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string
    ) => {
        if (newAlignment === "datorbyggare") {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    };
    console.log(showNav);
    return (
        <span id={showNav ? "" : "hide-nav"}>
            {renderChoice && (
                <ToggleButtonGroup
                    color="primary"
                    value={isActive ? "datorbyggare" : "standard"}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                    size="small"
                >
                    <ToggleButton value="standard">Standard</ToggleButton>
                    <ToggleButton value="datorbyggare">
                        Datorbyggare
                    </ToggleButton>
                </ToggleButtonGroup>
            )}
            <ul>
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
