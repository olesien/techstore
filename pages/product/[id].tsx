import { useState } from "react";
import Layout from "../../components/layout";
import Head from "next/head";
import Main from "../../components/Main";
import { GetServerSideProps } from "next";
import { getProduct, ProductType } from "../../lib/product";
import productStyles from "../../styles/Product.module.scss";
import productListStyles from "../../styles/Products.module.scss";
import Carousel from "../../components/generic/Carousel";
import { Button } from "@mui/material";
import SpecList from "../../components/SpecList";
import ProductRating from "../../components/generic/ProductRating";
import useUser from "../../lib/useUser";
import Reviews from "../../components/Reviews";
import useBasket, { Basket } from "../../hooks/useBasket";

export default function Product({ product }: { product: ProductType }) {
    const { user } = useUser();
    const [showNav, setShowNav] = useState(false);
    const { state: basket, setState: updateBasket } = useBasket();
    //404 Not found page?
    if ("error" in product) {
        return <p>{product.error}</p>;
    }
    const title = `${product.name} - Techstore`;

    console.log(basket);

    const toBasket = () => {
        const filteredBasket = basket.filter(
            (item: Basket) => item.id !== product.id
        );

        if (basket.length !== filteredBasket.length) {
            //Item already exists in basket, add to quantity
            console.log("Modify");
            const basketIndex = basket.findIndex(
                (item: Basket) => item.id === product.id
            );
            let newBasket = [...basket];
            const quantity = basket[basketIndex].quantity;
            newBasket.splice(basketIndex, 1, {
                id: product.id,
                quantity: quantity + 1,
            });
            updateBasket(newBasket);
        } else {
            updateBasket([...basket, { id: product.id, quantity: 1 }]);
        }
    };

    return (
        <Layout toggleNav={() => setShowNav((prev) => !prev)}>
            <Head>
                <link rel="shortcut icon" href="/Logo.svg" />
                <title>{title}</title>
            </Head>
            <Main showNav={showNav}>
                <div className={productStyles.grid}>
                    <div className={productStyles.left}>
                        <div className={productStyles.title}>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                        </div>
                        <div className={productStyles.img}>
                            <div className="right-side">
                                <div className={productStyles.reviewPreview}>
                                    <ProductRating rating={product.avg} />
                                    <p>{product.reviews.length} recensioner</p>
                                </div>
                            </div>
                            <Carousel items={product.product_images} />
                        </div>
                    </div>
                    <div className={productStyles.bottomleft}>
                        <div className={productStyles.specs}>
                            <SpecList list={product.product_specs} />
                        </div>
                    </div>
                    <div className={productStyles.right}>
                        <div className={productStyles.stock}>
                            <p>Antal i lager</p>
                            <div className="flex align-center">
                                <div
                                    className={
                                        Number(product.instock) > 0
                                            ? productListStyles.greenCircle
                                            : productListStyles.redCircle
                                    }
                                ></div>
                                {product.instock} st
                            </div>
                        </div>
                        <div className={productStyles.buy}>
                            {product.oldprice ? (
                                <>
                                    <h3 className={productStyles.oldprice}>
                                        {product.oldprice} kr
                                    </h3>
                                    <h1 className={productStyles.newprice}>
                                        {product.price} kr
                                    </h1>
                                </>
                            ) : (
                                <h1>{product.price} kr</h1>
                            )}

                            <Button
                                variant="contained"
                                color="success"
                                fullWidth
                                className={productStyles.buyBtn}
                                onClick={() => toBasket()}
                            >
                                Köp
                            </Button>
                        </div>
                        <div className={productStyles.reviews}>
                            <Reviews product={product} />
                        </div>
                    </div>
                </div>
            </Main>
        </Layout>
    );
}
export const getServerSideProps: GetServerSideProps = async ({
    params,
    query,
}) => {
    const product = await getProduct(Number(params?.id));
    return {
        props: { product },
    };
};
