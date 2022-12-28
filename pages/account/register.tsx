import React, { useState } from "react";
import useUser from "../../lib/useUser";
import Form from "../../components/Form";
import fetchJson, { FetchError } from "../../lib/fetchJson";
import styles from "../../styles/Auth.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Layout from "../../components/layout";
import Head from "next/head";
import Main from "../../components/Main";

import FormInput from "../../components/generic/FormInput";
import Button from "@mui/material/Button";

export interface Register {
    mail?: string;
    password?: string;
    password2?: string;
}

export default function Register() {
    // Register
    const { mutateUser } = useUser({
        redirectTo: "/profile-sg",
        redirectIfFound: true,
    });

    const [errorMsg, setErrorMsg] = useState("");
    const [showNav, setShowNav] = useState(false);
    const [form, setForm] = useState<Register>({});
    //Prevent spread up

    const register = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log(form);

        if (!form.password || !form.password2 || !form.mail) {
            return setErrorMsg("Du saknar fält");
        }
        if (form.password !== form.password2) {
            return setErrorMsg("Lösenorden matchar ej");
        }

        try {
            mutateUser(
                await fetchJson("/api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(form),
                })
            );
            setErrorMsg("");
        } catch (error) {
            if (error instanceof FetchError) {
                setErrorMsg(error.data.message);
            } else {
                console.error("An unexpected error happened:", error);
            }
        }
    };
    return (
        <Layout toggleNav={() => setShowNav((prev) => !prev)}>
            <Head>
                <link rel="shortcut icon" href="/Logo.svg" />
                <title>Hem - Techstore</title>
            </Head>
            <Main showNav={showNav}>
                <div className={styles.register}>
                    {/* <Form
                        errorMessage={errorMsg}
                        onSubmit={async function handleSubmit(event) {
                            event.preventDefault();

                            const body = {
                                username: event.currentTarget.username.value,
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
                                    console.error(
                                        "An unexpected error happened:",
                                        error
                                    );
                                }
                            }
                        }}
                    /> */}
                    {errorMsg && <p className="error">{errorMsg}</p>}
                    <form onSubmit={register}>
                        <FormInput
                            id={"techstore-email"}
                            title={"Epost Address"}
                            hint={"Kommer att användas för inloggning"}
                            aria={"enter-mail"}
                            type={"email"}
                            value={form.mail ?? ""}
                            onChange={(mail) =>
                                setForm((form) => ({ ...form, mail }))
                            }
                        />
                        <FormInput
                            id={"techstore-password"}
                            title={"Passord"}
                            hint={"Ditt passord kommer att bli krypterat"}
                            aria={"enter-password"}
                            type={"password"}
                            value={form.password ?? ""}
                            onChange={(password) =>
                                setForm((form) => ({ ...form, password }))
                            }
                        />
                        <FormInput
                            id={"techstore-password2"}
                            title={"Skriv in Passord igen"}
                            hint={"Skriv in det igen"}
                            aria={"enter-password-again"}
                            type={"password"}
                            value={form.password2 ?? ""}
                            onChange={(password2) =>
                                setForm((form) => ({ ...form, password2 }))
                            }
                        />
                        <div>
                            <Button type="submit" variant="outlined">
                                Registrera
                            </Button>
                        </div>
                    </form>
                </div>
            </Main>
        </Layout>
    );
}
