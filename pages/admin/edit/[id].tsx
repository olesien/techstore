import { useState } from "react";
import Layout from "../../../components/layout";
import { GetServerSideProps } from "next";
import AdminRoute from "../../../components/generic/AdminRoute";
import MainAccount from "../../../components/MainAccount";

export default function Product() {
    const [showNav, setShowNav] = useState(false);
    const title = "Test";

    return (
        <AdminRoute>
            <Layout toggleNav={() => setShowNav((prev) => !prev)} title={title}>
                <MainAccount showNav={showNav}>
                    <p>Hi</p>
                </MainAccount>
            </Layout>
        </AdminRoute>
    );
}
export const getServerSideProps: GetServerSideProps = async ({
    params,
    query,
}) => {
    return {
        props: {},
    };
};
