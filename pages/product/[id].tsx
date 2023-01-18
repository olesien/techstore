import { useState } from "react";
import Layout from "../../components/layout";
import Main from "../../components/Main";
import { GetServerSideProps } from "next";
import { getProduct, ProductType } from "../../lib/product";
import productStyles from "../../styles/Product.module.scss";
import productListStyles from "../../styles/Products.module.scss";
import Carousel from "../../components/generic/Carousel";
import { Button } from "@mui/material";
import SpecList from "../../components/SpecList";
import ProductRating from "../../components/generic/ProductRating";
import Reviews from "../../components/Reviews";
import useBasket from "../../hooks/useBasket";
import useComputerBuilder from "../../hooks/useComputerBuilder";

export default function Product({ product }: { product: ProductType }) {
    const [showNav, setShowNav] = useState(false);
    const { isActive } = useComputerBuilder();
    const { state: basket, toBasket } = useBasket();
    const { state: builderBasket, toBasket: toBuilderBasket } = useBasket(
        "techstore-builder-basket"
    );
    //404 Not found page?
    if ("error" in product) {
        return (
            <Layout
                toggleNav={() => setShowNav((prev) => !prev)}
                title="Ordrar - Techstore"
                error={product.error}
            />
        );
    }
    const title = `${product.name} - Techstore`;

    const basketQuantity =
        basket.find((item) => item.id === product.id)?.quantity ?? 0;

    const canBuy = (product.instock ?? 0) - basketQuantity >= 1;

    const checkCompat = () => {
        if (!isActive) return undefined;
        const issues = product.product_compat
            .filter(
                (compat) =>
                    builderBasket.find(
                        (item) => item.id === compat.productid2
                    ) ||
                    builderBasket.find((item) => item.id === compat.productid1)
            )
            .sort((a, b) => (a.error && !b.error ? 1 : -1));
        if (issues.length > 0) {
            return issues[0].message;
        }
        return undefined;
    };

    return (
        <Layout toggleNav={() => setShowNav((prev) => !prev)} title={title}>
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
                            <Carousel
                                items={product.product_images.map((img) => ({
                                    ...img,
                                    image:
                                        `/images/categories/${product.categoryid}/` +
                                        img.image,
                                }))}
                            />
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

                            {!!checkCompat() && <p>{checkCompat()}</p>}

                            <Button
                                variant="contained"
                                color="success"
                                fullWidth
                                className={productStyles.buyBtn}
                                onClick={() =>
                                    isActive
                                        ? toBuilderBasket(product, canBuy)
                                        : toBasket(product, canBuy)
                                }
                                disabled={!canBuy || !!checkCompat()}
                            >
                                {canBuy
                                    ? isActive
                                        ? "Lägg till"
                                        : "Köp"
                                    : (product.instock ?? 0) < 1
                                    ? "Utsålt"
                                    : "Max antal"}
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
