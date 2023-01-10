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
    faTruck,
    faUserGear,
} from "@fortawesome/free-solid-svg-icons";

export default function MainAccount({
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
        { title: "Ordrar", link: "/account/orders", icon: faTruck },
        { title: "Kunduppgifter", link: "/account/user", icon: faUserGear },
    ];

    return (
        <div className={styles.main}>
            <Nav showNav={showNav} links={links} />
            {showChildren ? <div>{children}</div> : <div />}
        </div>
    );
}
