import useSWR from "swr";
import React from "react";
import { UserDetails } from "./api/userdetails";
import Head from "next/head";
import mainStyles from "../styles/Main.module.scss";
import Layout from "../components/layout";
import useBasket from "../hooks/useBasket";
const fetchURL = (url: string) => fetch(url).then((r) => r.json());

export default function checkout() {
    const { data: user } = useSWR<UserDetails>("/api/userdetails");
    const {
        state: basket,
        setState: updateBasket,
        getCount,
        trash,
    } = useBasket();
    const basketIds = basket.map((item) => item.id);
    const { data, isLoading, error } = useSWR(
        "/api/productsbyids/" + JSON.stringify(basketIds),
        fetchURL
    );
    console.log(user);
    return (
        <Layout nonav={true} title="Ordrar - Techstore">
            <div className={mainStyles.main}>hi</div>
        </Layout>
    );
}

// export const getServerSideProps = withIronSessionSsr(
//     async function getServerSideProps({ req }) {
//         if (!req.session.user) {
//             return {
//                 props: { user: null },
//             };
//         }
//         const user = await getUserDetails(req.session.user);
//         return {
//             props: { user },
//         };
//     },
//     {
//         cookieName: "techstore_user",
//         password: "o2p13opi12jk3opi12j3jop13j1jpo132hip123",
//         // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
//         cookieOptions: {
//             secure: process.env.NODE_ENV === "production",
//         },
//     }
// );
