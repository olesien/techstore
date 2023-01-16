import { categories, product_images } from "@prisma/client";
import React, { useState } from "react";
import { AddProduct, NewProduct } from "../pages/api/admin/addproduct";

export default function useProductForm() {
    const [errorMsg, setErrorMsg] = useState("");
    const [errors, setErrors] = useState<AddProduct>({});
    const [form, setForm] = useState<AddProduct>({});
    const [photos, setPhotos] = useState<NewProduct["photos"]>([]);
    const [newCategory, setNewCategory] = useState<string>("");
    const [specs, setSpecs] = useState<NewProduct["specs"]>([
        { name: "Huvud specifikationer", items: [{ title: "", content: "" }] },
    ]);

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
    return {
        errorMsg,
        setErrorMsg,
        errors,
        setErrors,
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
    };
}
