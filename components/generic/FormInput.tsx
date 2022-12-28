import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { ChangeEventHandler } from "react";
export default function FormInput({
    required,
    id,
    title,
    hint,
    aria,
    type,
    error,
    value,
    onChange,
}: {
    required?: boolean;
    id: string;
    title: string;
    hint: string;
    aria: string;
    type: "email" | "password" | "text" | "number" | "tel";
    error: string | undefined;
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <div>
            <FormControl
                error={!!error}
                required={!!required}
                // margin={"normal"}
            >
                <InputLabel htmlFor={id}>{error ?? title}</InputLabel>
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
