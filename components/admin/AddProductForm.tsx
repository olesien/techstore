import React from "react";
import FormInput from "../generic/FormInput";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { AddProduct } from "../../pages/api/admin/addproduct";
import translate from "../../lib/translations";
import { categories } from "@prisma/client";

export default function AddProductForm({
    errors,
    form,
    setForm,
    categories,
}: {
    errors: AddProduct;
    form: AddProduct;
    setForm: React.Dispatch<React.SetStateAction<AddProduct>>;
    categories: Pick<categories, "id" | "name">[];
}) {
    return (
        <>
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
                        <MenuItem value={"0"}>Välj Kategori</MenuItem>
                        {categories.map((category) => (
                            <MenuItem value={category.id} key={category.id}>
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
                hint={"Exempelvis i9 | 16 kärnor | 8 trådar"}
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
        </>
    );
}
