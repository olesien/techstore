import Head from "next/head";
import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.scss";
import Main from "../components/Main";
import { useState } from "react";
import builderimage from "../public/images/builder.png";
import Image from "next/image";
import Link from "next/link";
import Carousel from "../components/generic/Carousel";
import VerticalItem from "../components/generic/VerticalItem";
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
    if ("error" in recentProducts) {
        return (
            <Layout
                toggleNav={() => setShowNav((prev) => !prev)}
                title="Ordrar - Techstore"
                error={recentProducts.error}
            />
        );
    }

    if ("error" in cheapProducts) {
        return (
            <Layout
                toggleNav={() => setShowNav((prev) => !prev)}
                title="Ordrar - Techstore"
                error={cheapProducts.error}
            />
        );
    }
    const [showNav, setShowNav] = useState(false);
    const items = [
        {
            title: "I9",
            image: "/images/i9.png",
            id: 1,
            price: 1000,
            saleprice: 1000,
            description: "En jäkligt snabb processor!",
        },
        {
            title: "I10",
            image: "/images/i9.png",
            id: 2,
            price: 1000,
            saleprice: 1000,
            description: "En jäkligt snabb processor!",
        },
        {
            title: "I11",
            image: "/images/i9.png",
            id: 3,
            price: 1000,
            saleprice: 1000,
            description: "En jäkligt snabb processor!",
        },
    ];
    return (
        <Layout
            toggleNav={() => setShowNav((prev) => !prev)}
            title="Hem - Techstore"
        >
            <Main showNav={showNav}>
                <div>
                    <section className={utilStyles.hero}>
                        <Link href="/builder" legacyBehavior>
                            <a>
                                <Image
                                    alt="Vercel logo"
                                    src={builderimage}
                                    width={1000}
                                    height={1000}
                                    style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                    }}
                                />
                            </a>
                        </Link>
                    </section>
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
