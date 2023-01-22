import { useState } from "react";
import Layout from "../../components/generic/Layout";
import Main, { maxQuantity } from "../../components/generic/Main";
import { GetServerSideProps } from "next";
import { getProduct, ProductType } from "../../lib/product";
import productStyles from "../../styles/Product.module.scss";
import productListStyles from "../../styles/Products.module.scss";
import Carousel from "../../components/generic/Carousel";
import { Button } from "@mui/material";
import SpecList from "../../components/product/SpecList";
import ProductRating from "../../components/product/ProductRating";
import Reviews from "../../components/product/Reviews";
import useBasket from "../../hooks/useBasket";
import useComputerBuilder from "../../hooks/useComputerBuilder";
import { formattedNumber } from "../../lib/utils";
import useCompat from "../../hooks/useCompat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleExclamation,
    faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

export default function Product({ product }: { product: ProductType }) {
    const [showNav, setShowNav] = useState(false);
    const { isActive } = useComputerBuilder();
    const { state: basket, toBasket } = useBasket();
    const { state: builderBasket, toBasket: toBuilderBasket } = useBasket(
        "techstore-builder-basket"
    );
    if ("error" in product) {
        return (
            <Layout
                setShowNav={setShowNav}
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

    const categoryQuantity = (categoryId: number) =>
        builderBasket
            .filter((item) => Number(item.categoryid) === Number(categoryId))
            .reduce((total, item) => {
                return total + item.quantity;
            }, 0);
    const categoryLimit = (categoryId: number) =>
        maxQuantity[String(categoryId)];
    const disabled =
        !!isActive &&
        categoryQuantity(product.categoryid) >=
            categoryLimit(product.categoryid);
    const { compatIssue, compatError } = useCompat(product, builderBasket);
    const compatabilityIssue = compatIssue();
    const compatabilityError = compatError();

    return (
        <Layout
            toggleNav={() => setShowNav((prev) => !prev)}
            title={title}
            setShowNav={setShowNav}
        >
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
                                        {formattedNumber(product.oldprice)} kr
                                    </h3>
                                    <h1 className={productStyles.newprice}>
                                        {formattedNumber(product.price)} kr
                                    </h1>
                                </>
                            ) : (
                                <h1>{formattedNumber(product.price)} kr</h1>
                            )}

                            {isActive &&
                                (compatabilityError ||
                                    (compatabilityIssue && (
                                        <p
                                            className={
                                                compatabilityError
                                                    ? "error"
                                                    : compatabilityIssue
                                                    ? "warning"
                                                    : ""
                                            }
                                        >
                                            {compatabilityError ? (
                                                <FontAwesomeIcon
                                                    icon={faCircleExclamation}
                                                    className="iconpadding"
                                                />
                                            ) : (
                                                compatabilityIssue && (
                                                    <FontAwesomeIcon
                                                        icon={
                                                            faTriangleExclamation
                                                        }
                                                        className="iconpadding"
                                                    />
                                                )
                                            )}
                                            {compatabilityError ??
                                                compatabilityIssue ??
                                                ""}
                                        </p>
                                    )))}

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
                                disabled={
                                    !canBuy ||
                                    (isActive && !!compatError) ||
                                    disabled
                                }
                            >
                                {canBuy && !disabled
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
