import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import styles from "../styles/Main.module.scss";
import NavItemAdvanced from "./generic/NavItemAdvanced";

export default function AdvancedNav({
    links,
}: {
    links: (
        | {
              title: string;
              link: string;
              icon: IconDefinition;
              required: boolean;
              categoryId: number;
              items: {
                  id: number;
                  photo: string;
                  name: string;
                  price: string;
              }[];
          }
        | { header: string }
    )[];
}) {
    return (
        <>
            <p>Summa kostnad</p>
            <h2>15155 kr</h2>
            <div className={styles.navButtons}>
                <Button color="error">Rensa</Button>
                <Button color="success" variant="contained" size="small">
                    Till kassa
                </Button>
            </div>
            <ul>
                {links.map((link) => {
                    if ("header" in link) {
                        return (
                            <li key={0}>
                                <p>{link.header}</p>
                            </li>
                        );
                    }
                    return <NavItemAdvanced key={link.categoryId} {...link} />;
                })}
            </ul>
        </>
    );
}
