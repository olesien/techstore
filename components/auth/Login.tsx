import React, { useState } from "react";
import useUser from "../../lib/useUser";
import fetchJson, { FetchError } from "../../lib/fetchJson";
import styles from "../../styles/Auth.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import FormInput from "../forms/FormInput";
import Button from "@mui/material/Button";
import Link from "next/link";

export interface Login {
    mail?: string;
    password?: string;
}

export default function Login({ closeMenu }: { closeMenu: () => void }) {
    // here we just check if user is already logged in and redirect to profile
    const [form, setForm] = useState<Login>({});
    const { mutateUser } = useUser({
        redirectTo: "/",
        redirectIfFound: true,
    });

    const [errorMsg, setErrorMsg] = useState("");
    const [errors, setErrors] = useState<Login>({});
    //Prevent spread up

    const login = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        let formErrors: Login = {};
        const validRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!form.mail || !form.mail.match(validRegex)) {
            formErrors = {
                ...errors,
                mail: "Mailet kan inte stämma",
            };
        }

        if (!form.password || form.password.length < 4) {
            formErrors = {
                ...errors,
                password: "Lösenordet är för kort",
            };
        }

        setErrors(formErrors);

        if (Object.keys(formErrors).length > 0) {
            return setErrorMsg("Kolla igenom formuläret igen");
        }

        const body = {
            mail: form.mail,
            password: form.password,
        };

        try {
            mutateUser(
                await fetchJson("/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                })
            );
        } catch (error) {
            if (error instanceof FetchError) {
                setErrorMsg(error.data.message);
            } else {
                console.error("An unexpected error happened:", error);
            }
        }
    };
    return (
        <div className={styles.login}>
            <div>
                {errorMsg && <p className="error">{errorMsg}</p>}
                <div className={styles.closeMenu}>
                    <FontAwesomeIcon
                        role="button"
                        icon={faXmark}
                        onClick={closeMenu}
                    />
                </div>
                <div>
                    <form onSubmit={login}>
                        <FormInput
                            required
                            id={"techstore-email"}
                            title={"Epost Address"}
                            hint={""}
                            aria={"enter-mail"}
                            type={"email"}
                            value={form.mail ?? ""}
                            error={errors.mail}
                            onChange={(mail) =>
                                setForm((form) => ({ ...form, mail }))
                            }
                        />
                        <FormInput
                            required
                            id={"techstore-password"}
                            title={"Passord"}
                            hint={""}
                            aria={"enter-password"}
                            type={"password"}
                            value={form.password ?? ""}
                            error={errors.password}
                            onChange={(password) =>
                                setForm((form) => ({ ...form, password }))
                            }
                        />
                        <div className="flex space-around">
                            <p>
                                Har du inget konto?
                                <Link href={"/account/register"} legacyBehavior>
                                    <a>
                                        <span>Registrera här</span>
                                    </a>
                                </Link>
                            </p>
                            <Button type="submit" variant="outlined">
                                Logga in
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
