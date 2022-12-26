import Nav from "./Nav";
import styles from "../styles/Main.module.scss";

export default function Main({
    showNav,
    children,
}: {
    showNav: boolean;
    children: JSX.Element;
}) {
    return (
        <div className={styles.main}>
            <Nav showNav={showNav} />
            <div>{children}</div>
        </div>
    );
}
