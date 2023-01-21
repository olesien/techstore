import Layout from "../components/generic/Layout";
import utilStyles from "../styles/utils.module.scss";
import Main from "../components/generic/Main";
import { useState } from "react";
import Carousel from "../components/generic/Carousel";
import VerticalItem from "../components/products/VerticalItem";
import { RecentProduct, getRecentProducts } from "../lib/recentProducts";
import { CheapProduct, getCheapProducts } from "../lib/cheapProducts";
type Error = {
    code: number;
    error: string;
};

export default function Home({
    recentProducts,
    cheapProducts,
}: {
    recentProducts: RecentProduct[] | Error;
    cheapProducts: CheapProduct[] | Error;
}) {
    const [showNav, setShowNav] = useState(false);
    if ("error" in recentProducts) {
        return (
            <Layout
                setShowNav={setShowNav}
                toggleNav={() => setShowNav((prev) => !prev)}
                title="Ordrar - Techstore"
                error={recentProducts.error}
            />
        );
    }

    if ("error" in cheapProducts) {
        return (
            <Layout
                setShowNav={setShowNav}
                toggleNav={() => setShowNav((prev) => !prev)}
                title="Ordrar - Techstore"
                error={cheapProducts.error}
            />
        );
    }

    return (
        <Layout
            setShowNav={setShowNav}
            toggleNav={() => setShowNav((prev) => !prev)}
            title="Hem - Techstore"
        >
            <Main showNav={showNav}>
                <div className={utilStyles.homepage}>
                    <p>Nya Produkter</p>
                    <section className={utilStyles.section}>
                        <Carousel
                            items={recentProducts.map((product) => ({
                                id: product.id,
                                image:
                                    `/images/categories/${product.categoryid}/` +
                                    product.product_images[0],
                                title: product.name,
                            }))}
                            newImg={true}
                        />
                    </section>
                    <p>Kampanjer</p>
                    <section className={utilStyles.section}>
                        <ul className={utilStyles.productList}>
                            {cheapProducts.map((product) => (
                                <VerticalItem
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </ul>
                    </section>
                </div>
            </Main>
        </Layout>
    );
}

export async function getStaticProps() {
    const recentProducts = await getRecentProducts();
    const cheapProducts = await getCheapProducts();

    return {
        props: {
            recentProducts,
            cheapProducts,
        },
    };
}
