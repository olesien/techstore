import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import styles from "../styles/Main.module.scss";
import NavItemAdvanced from "./generic/NavItemAdvanced";
import useBasket, { Basket as BasketType } from "../hooks/useBasket";
import useSWR from "swr";
import ClipLoader from "react-spinners/ClipLoader";
import { ProductByIdType } from "../pages/api/productsbyids/[ids]";
const fetchURL = (url: string) => fetch(url).then((r) => r.json());

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
          }
        | { header: string }
    )[];
}) {
    const { state: basket } = useBasket("techstore-builder-basket");
    const basketIds = basket.map((item) => item.id);
    const { data, isLoading, error } = useSWR(
        "/api/productsbyids/" + JSON.stringify(basketIds),
        fetchURL
    );
    console.log(data);
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
            {isLoading || !data ? (
                <ClipLoader
                    loading={true}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            ) : error ? (
                <p>{error}</p>
            ) : (
                <ul>
                    {links.map((link) => {
                        if ("header" in link) {
                            return (
                                <li key={0}>
                                    <p>{link.header}</p>
                                </li>
                            );
                        }
                        return (
                            <NavItemAdvanced
                                key={link.categoryId}
                                {...link}
                                items={data.products.filter(
                                    (product: BasketType & ProductByIdType) =>
                                        product.categoryid === link.categoryId
                                )}
                            />
                        );
                    })}
                </ul>
            )}
        </>
    );
}