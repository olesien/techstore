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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import useUser from "../../lib/useUser";

export default function Product({ product }: { product: ProductType }) {
    const { user } = useUser();
    const [showNav, setShowNav] = useState(false);
    console.log(product);
    //404 Not found page?
    if ("error" in product) {
        return <p>{product.error}</p>;
    }
    const title = `${product.name} - Techstore`;

    console.log(product.avg);

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
                            >
                                Köp
                            </Button>
                        </div>
                        <div className={productStyles.reviews}>
                            <ul>
                                {product.reviews.length === 0 && (
                                    <span>Inga recensioner ännu</span>
                                )}
                                {product.reviews.map((review) => {
                                    return (
                                        <li>
                                            <div
                                                className={
                                                    productStyles.reviewHeader
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faPerson}
                                                    size="lg"
                                                />
                                                <div>
                                                    <p>Ludwig</p>
                                                    <ProductRating
                                                        rating={
                                                            review.rating ?? 0
                                                        }
                                                    />
                                                </div>
                                                <p>2 veckor</p>
                                            </div>
                                            <div>
                                                <p>{review.content}</p>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                            {user?.isLoggedIn === false ? (
                                <p>Logga in för att lägga till recension</p>
                            ) : (
                                <Button variant="contained">
                                    Lägg till recension
                                </Button>
                            )}
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
