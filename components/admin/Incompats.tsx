import React from "react";
import adminStyles from "../../styles/Admin.module.scss";
import Autocomplete from "@mui/material/Autocomplete";
import { Prisma } from "@prisma/client";
import TextField from "@mui/material/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Incompat } from "../../pages/api/admin/addproduct";

export default function Incompats({
    incompats,
    changeValue,
    removeField,
    addField,
    productNames,
}: {
    incompats: Incompat[];
    changeValue: (
        fieldId: number,
        type: "message" | "error" | "product",
        value: string | boolean
    ) => void;
    removeField: (fieldId: number) => void;
    addField: () => void;
    productNames: (Prisma.PickArray<
        Prisma.ProductsGroupByOutputType,
        "name"[]
    > & {})[];
}) {
    return (
        <div className={adminStyles.formSection}>
            <div className={adminStyles.category}>
                {incompats.map((field, fieldIndex) => (
                    <div key={fieldIndex} className={adminStyles.field}>
                        <div>
                            <Autocomplete
                                id="free-solo-demo"
                                disablePortal
                                options={productNames.map(
                                    (option) => option.name
                                )}
                                value={field.product}
                                onChange={(e, value) => {
                                    changeValue(
                                        fieldIndex,
                                        "product",
                                        value ?? ""
                                    );
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Produkt" />
                                )}
                            />
                        </div>
                        <div>
                            <TextField
                                id="techstore-spec-message"
                                label="Meddelande"
                                variant="filled"
                                value={field.message}
                                onChange={(e) =>
                                    changeValue(
                                        fieldIndex,
                                        "message",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={field.error}
                                        onChange={() =>
                                            changeValue(
                                                fieldIndex,
                                                "error",
                                                !field.error
                                            )
                                        }
                                    />
                                }
                                label="Fel"
                            />
                        </div>
                        <div>
                            <FontAwesomeIcon
                                icon={faTrash}
                                role="button"
                                className="clickable"
                                onClick={() => removeField(fieldIndex)}
                            />
                        </div>
                    </div>
                ))}

                <div>
                    <Button
                        variant="contained"
                        component="label"
                        onClick={() => addField()}
                    >
                        <FontAwesomeIcon icon={faPlusCircle} />
                        Lägg till fält
                    </Button>
                </div>
            </div>
        </div>
    );
}
