import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { ChangeEventHandler } from "react";
export default function FormInput({
    id,
    title,
    hint,
    aria,
    type,
    value,
    onChange,
}: {
    id: string;
    title: string;
    hint: string;
    aria: string;
    type: "email" | "password" | "text" | "number" | "tel";
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <div>
            <FormControl>
                <InputLabel htmlFor={id}>{title}</InputLabel>
                <Input
                    id={id}
                    aria-describedby={aria}
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    sx={{
                        input: {
                            padding: 1,
                            marginTop: 1,
                        },
                    }}
                />
                <FormHelperText id={aria}>{hint}</FormHelperText>
            </FormControl>
        </div>
    );
}
