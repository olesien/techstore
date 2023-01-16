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
    const [errorMsg, setErrorMsg] = useState("");
    const [errors, setErrors] = useState<AddProduct>({});
    const [form, setForm] = useState<AddProduct>({});
    const [photos, setPhotos] = useState<NewProduct["photos"]>([]);
    const [newCategory, setNewCategory] = useState<string>("");
    const [specs, setSpecs] = useState<NewProduct["specs"]>([
        { name: "Huvud specifikationer", items: [{ title: "", content: "" }] },
    ]);
    const router = useRouter();

    const selectFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        const selectedFiles = files as FileList;
        const fileArray = Array.from(selectedFiles);
        setPhotos((currentPhotos) => {
            fileArray.forEach((file) => {
                if (!currentPhotos.find((photo) => photo.name === file.name)) {
                    //not exists
                    currentPhotos.push(file);
                }
            });
            //Make unique and update photos
            return [...currentPhotos];
        });
    };

    const addCategory = () => {
        setSpecs((currentSpecs) => {
            const exists = currentSpecs.find(
                (spec) => spec.name === newCategory
            );
            if (exists) {
                return currentSpecs;
            } else {
                currentSpecs.push({
                    name: newCategory,
                    items: [{ title: "", content: "" }],
                });
                return [...currentSpecs];
            }
        });

        //Reset cat
        setNewCategory("");
    };

    const addField = (categoryId: number) => {
        setSpecs((categories) => {
            const category = categories.find(
                (category, index) => index === categoryId
            );
            if (category) {
                category.items.push({ title: "", content: "" });
                categories.splice(categoryId, 1, category);
            }

            return [...categories];
        });
    };

    const removeField = (categoryId: number, fieldId: number) => {
        setSpecs((categories) => {
            const category = categories.find(
                (category, index) => index === categoryId
            );
            if (category) {
                category.items.splice(fieldId, 1);
                if (category.items.length > 0) {
                    categories.splice(categoryId, 1, category);
                } else {
                    categories.splice(categoryId, 1);
                }
            }

            return [...categories];
        });
    };

    const changeValue = (
        categoryId: number,
        fieldId: number,
        type: "title" | "content",
        value: string
    ) => {
        console.log(categoryId, fieldId, type, value);
        setSpecs((categories) => {
            const category = categories.find(
                (category, index) => index === categoryId
            );
            if (category) {
                const field = category.items.find(
                    (item, index) => index === fieldId
                );
                if (field) {
                    field[type] = value;
                    category.items.splice(fieldId, 1, field);
                }

                categories.splice(categoryId, 1, category);
            }

            return [...categories];
        });
    };

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
                                <div>
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
                                            setForm((form) => ({
                                                ...form,
                                                name,
                                            }))
                                        }
                                    />
                                    <span>
                                        <TextField
                                            value={form.categoryid ?? "0"}
                                            onChange={(e) =>
                                                setForm((form) => ({
                                                    ...form,
                                                    categoryid: e.target.value,
                                                }))
                                            }
                                            select // tell TextField to render select
                                            label={"Kategori"}
                                            SelectProps={{
                                                autoWidth: true,
                                            }}
                                        >
                                            <MenuItem value={"0"}>
                                                Välj Kategori
                                            </MenuItem>
                                            {categories.map((category) => (
                                                <MenuItem
                                                    value={category.id}
                                                    key={category.id}
                                                >
                                                    {translate(category.name)}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </span>
                                </div>

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
                                <div className={adminStyles.additionSection}>
                                    <h2>Produkt Bilder</h2>
                                    <div className={adminStyles.formSection}>
                                        <Button
                                            variant="contained"
                                            component="label"
                                            size="large"
                                        >
                                            <FontAwesomeIcon icon={faUpload} />
                                            Ladda{" "}
                                            {photos.length > 0
                                                ? "upp fler"
                                                : "upp"}{" "}
                                            bilder
                                            <input
                                                // onChange={(e) =>
                                                //     setActivePhoto(
                                                //         e.target.files
                                                //     )
                                                // }
                                                onChange={selectFiles}
                                                type="file"
                                                hidden
                                                multiple={true}
                                            />
                                        </Button>
                                    </div>
                                    {photos.length > 0 && (
                                        <div>
                                            <List>
                                                {photos.map((photo, index) => (
                                                    <ListItem
                                                        key={index}
                                                        secondaryAction={
                                                            <IconButton
                                                                edge="end"
                                                                aria-label="delete"
                                                                onClick={() => {
                                                                    setPhotos(
                                                                        (
                                                                            currentPhotos
                                                                        ) =>
                                                                            currentPhotos.filter(
                                                                                (
                                                                                    current
                                                                                ) =>
                                                                                    current.name !==
                                                                                    photo.name
                                                                            )
                                                                    );
                                                                }}
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faTrash
                                                                    }
                                                                />
                                                            </IconButton>
                                                        }
                                                    >
                                                        <ListItemAvatar>
                                                            <Avatar>
                                                                <img
                                                                    src={URL.createObjectURL(
                                                                        photo
                                                                    )}
                                                                    alt="X"
                                                                />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={`${photo.name} (${photo.size})`}
                                                        />
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </div>
                                    )}
                                    {/* SPECS */}
                                    <h2>Produkt Specifikationer</h2>
                                    <div className={adminStyles.formSection}>
                                        {specs.map(
                                            (category, categoryIndex) => {
                                                return (
                                                    <div
                                                        className={
                                                            adminStyles.category
                                                        }
                                                        key={categoryIndex}
                                                    >
                                                        <h4>{category.name}</h4>
                                                        {category.items.map(
                                                            (
                                                                field,
                                                                fieldIndex
                                                            ) => (
                                                                <div
                                                                    key={
                                                                        fieldIndex
                                                                    }
                                                                    className={
                                                                        adminStyles.field
                                                                    }
                                                                >
                                                                    <div>
                                                                        <Autocomplete
                                                                            id="free-solo-demo"
                                                                            freeSolo
                                                                            options={specTypes.map(
                                                                                (
                                                                                    option
                                                                                ) =>
                                                                                    option.title
                                                                            )}
                                                                            value={
                                                                                field.title
                                                                            }
                                                                            inputValue={
                                                                                field.title
                                                                            }
                                                                            onChange={(
                                                                                e,
                                                                                value
                                                                            ) => {
                                                                                changeValue(
                                                                                    categoryIndex,
                                                                                    fieldIndex,
                                                                                    "title",
                                                                                    value ??
                                                                                        ""
                                                                                );
                                                                            }}
                                                                            onInputChange={(
                                                                                e,
                                                                                value
                                                                            ) => {
                                                                                changeValue(
                                                                                    categoryIndex,
                                                                                    fieldIndex,
                                                                                    "title",
                                                                                    value ??
                                                                                        ""
                                                                                );
                                                                            }}
                                                                            renderInput={(
                                                                                params
                                                                            ) => (
                                                                                <TextField
                                                                                    {...params}
                                                                                    label="Spec"
                                                                                />
                                                                            )}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <TextField
                                                                            id="techstore-category-title"
                                                                            label="Värde"
                                                                            variant="filled"
                                                                            value={
                                                                                field.content
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                changeValue(
                                                                                    categoryIndex,
                                                                                    fieldIndex,
                                                                                    "content",
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <FontAwesomeIcon
                                                                            icon={
                                                                                faTrash
                                                                            }
                                                                            role="button"
                                                                            className="clickable"
                                                                            onClick={() =>
                                                                                removeField(
                                                                                    categoryIndex,
                                                                                    fieldIndex
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )
                                                        )}

                                                        <div>
                                                            <Button
                                                                variant="contained"
                                                                component="label"
                                                                onClick={() =>
                                                                    addField(
                                                                        categoryIndex
                                                                    )
                                                                }
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faPlusCircle
                                                                    }
                                                                />
                                                                Lägg till fält
                                                            </Button>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )}
                                        <div className={adminStyles.addNew}>
                                            <div>
                                                <TextField
                                                    id="techstore-category-title"
                                                    label="Titel"
                                                    variant="filled"
                                                    value={newCategory}
                                                    size="small"
                                                    onChange={(e) =>
                                                        setNewCategory(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <Button
                                                    variant="contained"
                                                    component="label"
                                                    onClick={addCategory}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faPlusCircle}
                                                    />
                                                    Lägg till kategori
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
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
