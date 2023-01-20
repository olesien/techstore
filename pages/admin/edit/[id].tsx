import React, { useEffect, useState } from "react";
import AdminRoute from "../../../components/admin/AdminRoute";
import Layout from "../../../components/generic/Layout";
import MainAccount from "../../../components/generic/MainAccount";
import utilStyles from "../../../styles/utils.module.scss";
import adminStyles from "../../../styles/Admin.module.scss";
import Button from "@mui/material/Button";
import { Prisma, categories, products } from "@prisma/client";
import { getAllCategories } from "../../../lib/category";
import { getAllSpecTypes } from "../../../lib/specifications";
import fetchJson, { FetchError } from "../../../lib/fetchJson";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Specifications from "../../../components/admin/Specifications";
import ListImages from "../../../components/admin/ListImages";
import AddImages from "../../../components/admin/AddImages";
import AddProductForm from "../../../components/admin/AddProductForm";
import useProductForm from "../../../hooks/useProductForm";
import { GetServerSideProps } from "next/types";
import { Product, getProduct } from "../../../lib/product";
import { NewProduct } from "../../api/admin/addproduct";
import Incompats from "../../../components/admin/Incompats";
import { getAllProductNames } from "../../../lib/products";

export default function EditProduct({
    categories,
    specTypes,
    product,
    productNames,
}: {
    categories: Pick<categories, "id" | "name">[];
    specTypes: (Prisma.PickArray<
        Prisma.Product_specsGroupByOutputType,
        "title"[]
    > & {})[];
    productNames: (Prisma.PickArray<
        Prisma.ProductsGroupByOutputType,
        ("id" | "name")[]
    > & {})[];
    product: Product;
}) {
    const [showNav, setShowNav] = useState(false);
    const [existingPhotos, setExistingPhotos] = useState(
        product.product_images
    );
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
        setSpecs,
        selectFiles,
        addCategory,
        addField,
        removeField,
        changeValue,
        incompats,
        removeIncompatField,
        addIncompatField,
        changeIncompatValue,
        setIncompats,
    } = useProductForm();

    useEffect(() => {
        //Set main form
        setForm((form) => {
            form.name = product.name;
            form.categoryid = String(product.categoryid);
            if (product.quickspecs) {
                form.quickspecs = product.quickspecs;
            }
            if (product.description) {
                form.description = product.description;
            }
            if (product.price) {
                form.price = String(product.price);
            }
            if (product.oldprice) {
                form.oldprice = String(product.oldprice);
            }
            if (product.instock) {
                form.instock = String(product.instock);
            }
            return form;
        });
        const newSpecs = product.product_specs.reduce((specs, spec) => {
            const categoryIndex = specs.findIndex(
                (cat) =>
                    cat.name == (spec.speccategory ?? "Huvud specifikationer")
            );
            if (categoryIndex >= 0) {
                const category = specs[categoryIndex];
                category.items.push({
                    title: spec.title,
                    content: spec.content + " " + (spec.extrainfo ?? ""),
                });
                specs.splice(categoryIndex, 1, category);
            } else {
                specs.push({
                    name: spec.speccategory ?? "Huvud specifikationer",
                    items: [
                        {
                            title: spec.title,
                            content:
                                spec.content + " " + (spec.extrainfo ?? ""),
                        },
                    ],
                });
            }
            return specs;
        }, [] as NewProduct["specs"]);
        setSpecs(newSpecs);

        const incompats =
            product.product_compat_product_compat_productid1Toproducts.map(
                (incompat) => {
                    const error = incompat.error;
                    const message = incompat.message;
                    const product =
                        productNames.find(
                            (product) => product.id === incompat.productid2
                        )?.name ?? "";
                    return { error, message, product };
                }
            );
        setIncompats(incompats);
    }, [product]);

    const editProduct = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log("Adding product");

        let formData = new FormData();

        if (photos.length === 0 && existingPhotos.length === 0) {
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

        formData.append("form", JSON.stringify({ ...form, id: product.id }));
        for (let i = 0; i < photos.length; i++) {
            formData.append("photos[]", photos[i]);
        }
        formData.append("specs", JSON.stringify(specs));
        formData.append("images", JSON.stringify(existingPhotos));
        formData.append("incompats", JSON.stringify(incompats));

        //Send

        try {
            const product = (await fetchJson("/api/admin/editproduct", {
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
                        <div className={utilStyles.formContainer}>
                            {errorMsg && <p className="error">{errorMsg}</p>}
                            <form onSubmit={editProduct}>
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
                                    {existingPhotos.length > 0 && (
                                        <ListImages
                                            photos={existingPhotos}
                                            setExistingPhotos={
                                                setExistingPhotos
                                            }
                                            categoryid={product.categoryid}
                                        />
                                    )}
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

                                    <h2>Produkt inkompatabiliteter</h2>
                                    <Incompats
                                        incompats={incompats}
                                        changeValue={changeIncompatValue}
                                        removeField={removeIncompatField}
                                        addField={addIncompatField}
                                        productNames={productNames}
                                    />
                                </div>
                                <div>
                                    <Button type="submit" variant="outlined">
                                        Redigera produkt
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

export const getServerSideProps: GetServerSideProps = async ({
    params,
    query,
}) => {
    const categories = await getAllCategories();
    const specTypes = await getAllSpecTypes();
    const product = await getProduct(Number(params?.id));
    const productNames = await getAllProductNames();

    return {
        props: {
            categories,
            specTypes,
            product,
            productNames,
        },
    };
};
