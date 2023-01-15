import React, { useState } from "react";
import AdminRoute from "../../components/generic/AdminRoute";
import Layout from "../../components/layout";
import MainAccount from "../../components/MainAccount";
import utilStyles from "../../styles/utils.module.scss";
import adminStyles from "../../styles/Admin.module.scss";
import useQueries from "../../hooks/useQueries";
import Button from "@mui/material/Button";
import FormInput from "../../components/generic/FormInput";
import { categories } from "@prisma/client";
import { getAllCategories } from "../../lib/category";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import translate from "../../lib/translations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
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

export interface Product {
    name?: string;
    categoryid?: string;
    quickspecs?: string;
    description?: string;
    price?: string;
    oldprice?: string;
    instock?: string;
}
function generate(element: React.ReactElement) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        })
    );
}

export default function productlist({
    categories,
}: {
    categories: Pick<categories, "id" | "name">[];
}) {
    const [showNav, setShowNav] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [errors, setErrors] = useState<Product>({});
    const [form, setForm] = useState<Product>({});
    const [photos, setPhotos] = useState<File[]>([]);
    const [newCategory, setNewCategory] = useState<string>("");
    const [specs, setSpecs] = useState<
        { name: string; items: { title: string; content: string }[] }[]
    >([{ name: "", items: [] }]);

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
                currentSpecs.push({ name: newCategory, items: [] });
                return [...currentSpecs];
            }
        });

        //Reset cat
        setNewCategory("");
    };

    const addProduct = () => {
        console.log(form);
    };
    console.log(categories);
    console.log(photos);

    return (
        <AdminRoute>
            <Layout
                toggleNav={() => setShowNav((prev) => !prev)}
                title="Ordrar - Techstore"
            >
                <MainAccount showNav={showNav}>
                    <section className={utilStyles.section}>
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
                                <div className={adminStyles.uploadSection}>
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
                                                                icon={faTrash}
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
                                    <div className={adminStyles.formSection}>
                                        <p>Produkt Bilder</p>
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
                                    {/* SPECS */}
                                    <div className={adminStyles.formSection}>
                                        <p>Produkt Specifikationer</p>
                                        {specs.map((category) => {
                                            return <div>{category.name}</div>;
                                        })}
                                        <div
                                            className={
                                                adminStyles.addNewCategory
                                            }
                                        >
                                            <div
                                                className={
                                                    adminStyles.categoryInput
                                                }
                                            >
                                                <FormInput
                                                    type="text"
                                                    hint=""
                                                    id={
                                                        "techstore-category-title"
                                                    }
                                                    title={"Titel"}
                                                    aria={
                                                        "enter-productspec-title"
                                                    }
                                                    error={undefined}
                                                    value={newCategory}
                                                    onChange={(newCategory) =>
                                                        setNewCategory(
                                                            newCategory
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

    return {
        props: {
            categories,
        },
    };
}
