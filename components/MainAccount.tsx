import Nav from "./Nav";
import styles from "../styles/Main.module.scss";
import useWindowDimensions from "../hooks/useWindowDimensions";
import {
    faBox,
    faChessBoard,
    faFan,
    faFloppyDisk,
    faGaugeHigh,
    faList,
    faMemory,
    faMicrochip,
    faMusic,
    faPalette,
    faPlug,
    faPlus,
    faTruck,
    faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import useUser from "../lib/useUser";

export default function MainAccount({
    showNav,
    children,
}: {
    showNav: boolean;
    children: JSX.Element;
}) {
    const { width } = useWindowDimensions();
    const { user } = useUser({
        redirectTo: "/",
    });

    if (!user || !user.isLoggedIn) return <></>;

    const showChildren = !showNav || Number(width) > 768;

    const links = [
        { title: "Ordrar", link: "/account/orders", icon: faTruck },
        { title: "Kunduppgifter", link: "/account/user", icon: faUserGear },
    ];

    const adminLinks = [
        { title: "Ordrar", link: "/account/orders", icon: faTruck },
        { title: "Kunduppgifter", link: "/account/user", icon: faUserGear },
        { header: "Admin" },
        { title: "Alla produkter", link: "/admin/productlist", icon: faList },
        { title: "Lägg till produkt", link: "/admin/addproduct", icon: faPlus },
    ];

    return (
        <div className={styles.main}>
            <Nav
                showNav={showNav}
                links={user.admin ? adminLinks : links}
                renderChoice={false}
            />
            {showChildren ? <div>{children}</div> : <div />}
        </div>
    );
}
