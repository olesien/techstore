import { useState } from "react";
import Layout from "../../components/layout";
import Head from "next/head";
import Main from "../../components/Main";
import { GetServerSideProps } from "next";
import { getProduct, ProductType } from "../../lib/product";

import productStyles from "../../styles/Product.module.scss";
import productListStyles from "../../styles/Products.module.scss";
import Carousel from "../../components/generic/Carousel";

export default function Product({ product }: { product: ProductType }) {
    const [showNav, setShowNav] = useState(false);

    //404 Not found page?
    if ("error" in product) {
        return <p>{product.error}</p>;
    }
    const title = `${product.name} - Techstore`;

    return (
        <Layout toggleNav={() => setShowNav((prev) => !prev)}>
            <Head>
                <link rel="shortcut icon" href="/Logo.svg" />
                <title>{title}</title>
            </Head>
            <Main showNav={showNav}>
                <div className={productStyles.grid}>
                    <div className={productStyles.title}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                    </div>
                    <div className={productStyles.img}>
                        <Carousel items={product.product_images} />
                    </div>
                    <div className={productStyles.specs}>SPECS</div>
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
                    <div className={productStyles.buy}>BUY</div>
                    <div className={productStyles.review}>REVIEW</div>
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
