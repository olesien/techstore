import useSWR from "swr";
import React from "react";
import { UserDetails } from "./api/userdetails";

export default function checkout() {
    const { data: user } = useSWR<UserDetails>("/api/userdetails");
    console.log(user);
    return <div>checkout</div>;
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
