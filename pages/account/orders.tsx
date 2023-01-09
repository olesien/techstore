import React, { useState } from "react";
import useUser from "../../lib/useUser";
import Layout from "../../components/layout";
import Head from "next/head";
import Main from "../../components/Main";

// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts
export default function SgProfile() {
    const [showNav, setShowNav] = useState(false);
    const { user } = useUser({
        redirectTo: "/",
    });

    return (
        <Layout
            toggleNav={() => setShowNav((prev) => !prev)}
            title="Ordrar - Techstore"
        >
            <Main showNav={showNav}>
                <h1>Your name is: {user?.login}</h1>
            </Main>
        </Layout>
    );
}
