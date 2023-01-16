import React from "react";
import adminStyles from "../../styles/Admin.module.scss";
import { NewProduct } from "../../pages/api/admin/addproduct";
import Autocomplete from "@mui/material/Autocomplete";
import { Prisma } from "@prisma/client";
import TextField from "@mui/material/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";

export default function Specifications({
    specs,
    specTypes,
    changeValue,
    removeField,
    addField,
    setNewCategory,
    newCategory,
    addCategory,
}: {
    specs: NewProduct["specs"];
    specTypes: (Prisma.PickArray<
        Prisma.Product_specsGroupByOutputType,
        "title"[]
    > & {})[];
    changeValue: (
        categoryId: number,
        fieldId: number,
        type: "title" | "content",
        value: string
    ) => void;
    removeField: (categoryId: number, fieldId: number) => void;
    addField: (categoryId: number) => void;
    setNewCategory: React.Dispatch<React.SetStateAction<string>>;
    newCategory: string;
    addCategory: () => void;
}) {
    return (
        <div className={adminStyles.formSection}>
            {specs.map((category, categoryIndex) => {
                return (
                    <div className={adminStyles.category} key={categoryIndex}>
                        <h4>{category.name}</h4>
                        {category.items.map((field, fieldIndex) => (
                            <div key={fieldIndex} className={adminStyles.field}>
                                <div>
                                    <Autocomplete
                                        id="free-solo-demo"
                                        freeSolo
                                        options={specTypes.map(
                                            (option) => option.title
                                        )}
                                        value={field.title}
                                        inputValue={field.title}
                                        onChange={(e, value) => {
                                            changeValue(
                                                categoryIndex,
                                                fieldIndex,
                                                "title",
                                                value ?? ""
                                            );
                                        }}
                                        onInputChange={(e, value) => {
                                            changeValue(
                                                categoryIndex,
                                                fieldIndex,
                                                "title",
                                                value ?? ""
                                            );
                                        }}
                                        renderInput={(params) => (
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
                                        value={field.content}
                                        onChange={(e) =>
                                            changeValue(
                                                categoryIndex,
                                                fieldIndex,
                                                "content",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div>
                                    <FontAwesomeIcon
                                        icon={faTrash}
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
                        ))}

                        <div>
                            <Button
                                variant="contained"
                                component="label"
                                onClick={() => addField(categoryIndex)}
                            >
                                <FontAwesomeIcon icon={faPlusCircle} />
                                Lägg till fält
                            </Button>
                        </div>
                    </div>
                );
            })}
            <div className={adminStyles.addNew}>
                <div>
                    <TextField
                        id="techstore-category-title"
                        label="Titel"
                        variant="filled"
                        value={newCategory}
                        size="small"
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                </div>
                <div>
                    <Button
                        variant="contained"
                        component="label"
                        onClick={addCategory}
                    >
                        <FontAwesomeIcon icon={faPlusCircle} />
                        Lägg till kategori
                    </Button>
                </div>
            </div>
        </div>
    );
}
