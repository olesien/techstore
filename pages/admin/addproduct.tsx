import React, { useState } from "react";
import AdminRoute from "../../components/generic/AdminRoute";
import Layout from "../../components/layout";
import MainAccount from "../../components/MainAccount";
import utilStyles from "../../styles/utils.module.scss";
import adminStyles from "../../styles/Admin.module.scss";
import useQueries from "../../hooks/useQueries";
import Button from "@mui/material/Button";
import FormInput from "../../components/generic/FormInput";
import { Prisma, categories, products } from "@prisma/client";
import { getAllCategories } from "../../lib/category";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import translate from "../../lib/translations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCross,
    faPlusCircle,
    faTrash,
    faUpload,
} from "@fortawesome/free-solid-svg-icons";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Autocomplete from "@mui/material/Autocomplete";
import { getAllSpecTypes } from "../../lib/specifications";
import fetchJson, { FetchError } from "../../lib/fetchJson";
import { AddProduct, NewProduct } from "../api/admin/addproduct";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Specifications from "../../components/admin/Specifications";
import ListImages from "../../components/admin/ListImages";
import AddImages from "../../components/admin/AddImages";
import AddProductForm from "../../components/admin/AddProductForm";
import useProductForm from "../../hooks/useProductForm";

export default function productlist({
    categories,
    specTypes,
}: {
    categories: Pick<categories, "id" | "name">[];
    specTypes: (Prisma.PickArray<
        Prisma.Product_specsGroupByOutputType,
        "title"[]
    > & {})[];
}) {
    const [showNav, setShowNav] = useState(false);
    const router = useRouter();
    const {
        errorMsg,
        setErrorMsg,
        errors,
        form,
        setForm,
        photos,
        setPhotos,
        newCategory,
        setNewCategory,
        specs,
        selectFiles,
        addCategory,
        addField,
        removeField,
        changeValue,
    } = useProductForm();

    const addProduct = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log("Adding product");

        let formData = new FormData();

        if (photos.length === 0) {
            return setErrorMsg("Du måste ha minst en bild");
        }

        if (
            specs[0].items[0].content === "" ||
            specs[0].items[0].title === ""
        ) {
            return setErrorMsg(
                "Du måste ha minst en spec (och den måste vara definerad)"
            );
        }

        formData.append("form", JSON.stringify(form));
        for (let i = 0; i < photos.length; i++) {
            formData.append("photos[]", photos[i]);
        }
        formData.append("specs", JSON.stringify(specs));

        //Send

        try {
            const product = (await fetchJson("/api/admin/addproduct", {
                method: "POST",
                body: formData,
            })) as { product?: products };
            if (product && "id" in product) {
                toast("Produkt tillagd!");
                router.push("/product/" + product.id);
                setErrorMsg("");
            }
        } catch (error) {
            if (error instanceof FetchError) {
                setErrorMsg(error.data.message);
            } else {
                console.error("An unexpected error happened:", error);
            }
        }
    };

    return (
        <AdminRoute>
            <Layout
                toggleNav={() => setShowNav((prev) => !prev)}
                title="Ordrar - Techstore"
            >
                <MainAccount showNav={showNav}>
                    <section className={utilStyles.section}>
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
                                <AddProductForm
                                    errors={errors}
                                    form={form}
                                    setForm={setForm}
                                    categories={categories}
                                />
                                <div className={adminStyles.additionSection}>
                                    <h2>Produkt Bilder</h2>
                                    <AddImages
                                        selectFiles={selectFiles}
                                        photosLength={photos.length}
                                    />
                                    {photos.length > 0 && (
                                        <ListImages
                                            photos={photos}
                                            setPhotos={setPhotos}
                                        />
                                    )}
                                    {/* SPECS */}
                                    <h2>Produkt Specifikationer</h2>
                                    <Specifications
                                        specs={specs}
                                        specTypes={specTypes}
                                        changeValue={changeValue}
                                        removeField={removeField}
                                        addField={addField}
                                        setNewCategory={setNewCategory}
                                        newCategory={newCategory}
                                        addCategory={addCategory}
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
    const specTypes = await getAllSpecTypes();

    return {
        props: {
            categories,
            specTypes,
        },
    };
}
