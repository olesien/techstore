import Nav from "./Nav";
import styles from "../styles/Main.module.scss";
import useWindowDimensions from "../hooks/useWindowDimensions";

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

    return (
        <div className={styles.main}>
            <Nav showNav={showNav} />
            {showChildren ? <div>{children}</div> : <div />}
        </div>
    );
}
