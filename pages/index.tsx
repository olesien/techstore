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

export default function Home({}: {}) {
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
        <Layout toggleNav={() => setShowNav((prev) => !prev)}>
            <Head>
                <link rel="shortcut icon" href="/Logo.svg" />
                <title>Hem - Techstore</title>
            </Head>
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
                            items={[
                                { title: "I9", image: "/images/i9.png", id: 1 },
                                {
                                    title: "I10",
                                    image: "/images/i9.png",
                                    id: 2,
                                },
                            ]}
                        />
                    </section>
                    <p>Kampanjer</p>
                    <section className={utilStyles.section}>
                        <ul className={utilStyles.productList}>
                            {items.map((item) => (
                                <VerticalItem {...item} />
                            ))}
                        </ul>
                    </section>
                </div>
            </Main>
        </Layout>
    );
}
