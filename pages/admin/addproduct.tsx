import React, { useState } from "react";
import AdminRoute from "../../components/generic/AdminRoute";
import Layout from "../../components/layout";
import MainAccount from "../../components/MainAccount";
import utilStyles from "../../styles/utils.module.scss";
import styles from "../../styles/Account.module.scss";
import useQueries from "../../hooks/useQueries";
import Button from "@mui/material/Button";
import useUser from "../../lib/useUser";
import FormInput from "../../components/generic/FormInput";
import { categories } from "@prisma/client";
import { getAllCategories } from "../../lib/category";

export interface Product {
    name?: string;
    categoryid?: string;
    quickspecs?: string;
    description?: string;
    price?: string;
    oldprice?: string;
    instock?: string;
}

export default function productlist({
    categories,
}: {
    categories: Pick<categories, "id" | "name">;
}) {
    const { query, changeQuery } = useQueries();
    const [showNav, setShowNav] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [errors, setErrors] = useState<Product>({});
    const [form, setForm] = useState<Product>({});

    const addProduct = () => {
        console.log(form);
    };
    console.log(categories);

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
                        {/* - > Content
                        Product Name
                        Product Description 
                        Product Quickspecs
                        Product price 
                        Product discount price (optional)
                        Category dropdown
                        Amount in stock
                        
                        Image uploader
                        <- List of uploaded images, with X icon to delete ->
                        Input field click to upload file
                        
                        Product specs
                        At the top you can click plus to add the non-categorized specs
                        Dropdown to select title -> Input field for name
                        Below you can click another plus to add a category. When clicked you can input an name, then a plus appears to right to add a spec under said category
                        
                        Product Compat
                        Plus icon to the right of title, when clicked adds:
                        Dropdown of all products we have, along with a SEARCH in input, this will select productid. Then an input field with some feedback, and checkbox for "error", otherwise treated as warning*/}

                        <div className={utilStyles.formContainer}>
                            {errorMsg && <p className="error">{errorMsg}</p>}
                            <form onSubmit={addProduct}>
                                <FormInput
                                    type={"text"}
                                    required
                                    id={"techstore-productname"}
                                    title={"Produkt namn"}
                                    hint={"Namnet på produkter"}
                                    aria={"enter-product-name"}
                                    error={errors.name}
                                    value={form.name ?? ""}
                                    onChange={(name) =>
                                        setForm((form) => ({ ...form, name }))
                                    }
                                />
                                <FormInput
                                    type={"text"}
                                    multiline
                                    required
                                    id={"techstore-description"}
                                    title={"Produktbeskrivning"}
                                    hint={"Max 4 rader"}
                                    aria={"enter-product-description"}
                                    error={errors.description}
                                    value={form.description ?? ""}
                                    onChange={(description) =>
                                        setForm((form) => ({
                                            ...form,
                                            description,
                                        }))
                                    }
                                />
                                <FormInput
                                    type={"text"}
                                    required
                                    id={"techstore-quickspecs"}
                                    title={"En rad specifikationer"}
                                    hint={
                                        "Exempelvis i9 | 16 kärnor | 8 trådar"
                                    }
                                    aria={"enter-product-quickspecs"}
                                    error={errors.quickspecs}
                                    value={form.quickspecs ?? ""}
                                    onChange={(quickspecs) =>
                                        setForm((form) => ({
                                            ...form,
                                            quickspecs,
                                        }))
                                    }
                                />
                                <FormInput
                                    type={"number"}
                                    hint={""}
                                    required
                                    id={"techstore-product-quantity"}
                                    title={"Produkter i lager"}
                                    aria={"enter-product-quantity"}
                                    error={errors.instock}
                                    value={form.instock ?? ""}
                                    onChange={(instock) =>
                                        setForm((form) => ({
                                            ...form,
                                            instock,
                                        }))
                                    }
                                />
                                <div>
                                    <FormInput
                                        required
                                        id={"techstore-currentprice"}
                                        title={"Nuvarande pris"}
                                        hint={""}
                                        aria={"enter-current-price"}
                                        type={"number"}
                                        error={errors.price}
                                        value={form.price ?? ""}
                                        onChange={(price) =>
                                            setForm((form) => ({
                                                ...form,
                                                price,
                                            }))
                                        }
                                    />
                                    <FormInput
                                        id={"techstore-oldprice"}
                                        title={"Äldre pris"}
                                        hint={
                                            "Om denna är satt så kommer nuvarande pris att fungera som ett kampanj pris."
                                        }
                                        aria={"enter-oldprice"}
                                        type={"number"}
                                        error={errors.oldprice}
                                        value={form.oldprice ?? ""}
                                        onChange={(oldprice) =>
                                            setForm((form) => ({
                                                ...form,
                                                oldprice,
                                            }))
                                        }
                                    />
                                </div>
                                <div>
                                    <Button type="submit" variant="outlined">
                                        Lägg till produkt
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </section>
                </MainAccount>
            </Layout>
        </AdminRoute>
    );
}

export async function getStaticProps() {
    const categories = await getAllCategories();

    return {
        props: {
            categories,
        },
    };
}
