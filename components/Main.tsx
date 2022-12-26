import Nav from "./Nav";
import styles from "../styles/Main.module.scss";

export default function Main({ children }: { children: JSX.Element }) {
    return (
        <div className={styles.main}>
            <Nav />
            <div>{children}</div>
        </div>
    );
}
