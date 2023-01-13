import React, { useState } from "react";
import AdminRoute from "../../components/generic/AdminRoute";
import Layout from "../../components/layout";
import MainAccount from "../../components/MainAccount";
import utilStyles from "../../styles/utils.module.scss";
import styles from "../../styles/Account.module.scss";
import useQueries from "../../hooks/useQueries";

export default function productlist() {
    const { query, changeQuery } = useQueries();
    const [showNav, setShowNav] = useState(false);

    return (
        <AdminRoute>
            <Layout
                toggleNav={() => setShowNav((prev) => !prev)}
                title="Ordrar - Techstore"
            >
                <MainAccount showNav={showNav}>
                    <section
                        className={utilStyles.section + " " + styles.orders}
                    >
                        <p>Lägg till produkt</p>
                    </section>
                </MainAccount>
            </Layout>
        </AdminRoute>
    );
}
