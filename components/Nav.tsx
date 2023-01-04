import {
    faBox,
    faChessBoard,
    faCompactDisc,
    faFan,
    faFloppyDisk,
    faGaugeHigh,
    faMemory,
    faMicrochip,
    faMusic,
    faPalette,
    faPlug,
} from "@fortawesome/free-solid-svg-icons";
import NavItem from "./generic/NavItem";

export default function Nav({ showNav }: { showNav: boolean }) {
    console.log(showNav);
    return (
        <span>
            <ul id={showNav ? "" : "hide-nav"}>
                <NavItem
                    title="Datorchassi"
                    link={"/category/1"}
                    icon={faBox}
                />
                <NavItem
                    title="Grafikkort"
                    link={"/category/2"}
                    icon={faPalette}
                />
                <NavItem
                    title="Hårddisk Mekanisk"
                    link={"/category/3"}
                    icon={faFloppyDisk}
                />
                <NavItem
                    title="Hårddisk SSD"
                    link={"/category/4"}
                    icon={faGaugeHigh}
                />
                <NavItem
                    title="Internminne/RAM"
                    link={"/category/5"}
                    icon={faMemory}
                />
                <NavItem
                    title="Processor/CPU"
                    link={"/category/6"}
                    icon={faMicrochip}
                />
                <NavItem
                    title="Moderkort"
                    link={"/category/7"}
                    icon={faChessBoard}
                />
                <NavItem title="Ljudkort" link={"/category/8"} icon={faMusic} />
                <NavItem
                    title="Nätaggregat"
                    link={"/category/9"}
                    icon={faPlug}
                />
                <NavItem
                    title="Kylning/Moddning"
                    link={"/category/10"}
                    icon={faFan}
                />
                <NavItem
                    title="DVD"
                    link={"/category/11"}
                    icon={faCompactDisc}
                />
            </ul>
        </span>
    );
}
