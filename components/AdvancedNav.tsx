import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import styles from "../styles/Main.module.scss";
import NavItemAdvanced from "./generic/NavItemAdvanced";
import useBasket, { Basket as BasketType } from "../hooks/useBasket";
import useSWR from "swr";
import ClipLoader from "react-spinners/ClipLoader";
import { ProductByIdType } from "../pages/api/productsbyids/[ids]";
import Link from "next/link";
import { formattedNumber, summedCost } from "../lib/utils";
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
    const { state: basket, trash } = useBasket("techstore-builder-basket");
    const basketIds = basket.map((item) => item.id);
    const { data, isLoading, error } = useSWR(
        "/api/productsbyids/" + JSON.stringify(basketIds),
        fetchURL,
        { keepPreviousData: true }
    );
    const products = data
        ? data.products.map((product: ProductByIdType) => {
              const basketItem = basket.find((item) => item.id === product.id);
              return { ...product, quantity: basketItem?.quantity };
          })
        : [];
    return (
        <>
            <p>Summa kostnad</p>
            <h2>{summedCost(products)} kr</h2>
            <div className={styles.navButtons}>
                <Button color="error" onClick={() => trash()}>
                    Rensa
                </Button>
                <Button
                    color="success"
                    variant="contained"
                    size="small"
                    component={Link}
                    href="/checkout"
                >
                    Till kassa
                </Button>
            </div>
            {!data ? (
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
                                trash={trash}
                            />
                        );
                    })}
                </ul>
            )}
        </>
    );
}
