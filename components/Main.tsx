import Nav from "./Nav";
import styles from "../styles/Main.module.scss";
import useWindowDimensions from "../hooks/useWindowDimensions";
import {
    faBox,
    faChessBoard,
    faFan,
    faFloppyDisk,
    faGaugeHigh,
    faMemory,
    faMicrochip,
    faMusic,
    faPalette,
    faPlug,
} from "@fortawesome/free-solid-svg-icons";

export default function Main({
    showNav,
    children,
}: {
    showNav: boolean;
    children: JSX.Element;
}) {
    const { width } = useWindowDimensions();
    console.log(width);

    const showChildren = !showNav || Number(width) > 768;

    const links = [
        { title: "Datorchassi", link: "/category/1", icon: faBox },
        { title: "Grafikkort", link: "/category/2", icon: faPalette },
        { title: "Hårddisk Mekanisk", link: "/category/3", icon: faFloppyDisk },
        { title: "Hårddisk SSD", link: "/category/4", icon: faGaugeHigh },
        { title: "Internminne/RAM", link: "/category/5", icon: faMemory },
        { title: "Processor/CPU", link: "/category/6", icon: faMicrochip },
        { title: "Moderkort", link: "/category/7", icon: faChessBoard },
        { title: "Ljudkort", link: "/category/8", icon: faMusic },
        { title: "Nätaggregat", link: "/category/9", icon: faPlug },
        { title: "Kylning/Moddning", link: "/category/10", icon: faFan },
    ];

    return (
        <div className={styles.main}>
            <Nav showNav={showNav} links={links} />
            {showChildren ? <div>{children}</div> : <div />}
        </div>
    );
}
