import React, { useEffect, useState } from "react";
import useUser from "../../lib/useUser";
import Layout from "../../components/generic/Layout";
import useSWR from "swr";
import MainAccount from "../../components/generic/MainAccount";
import { OrdersWithErrors } from "../api/orders";
import styles from "../../styles/utils.module.scss";
import FormInput from "../../components/forms/FormInput";
import { Register } from "./register";
import Button from "@mui/material/Button";
import { removeEmpty } from "../../lib/utils";
import fetchJson, { FetchError } from "../../lib/fetchJson";
import { useSWRConfig } from "swr";

export default function User() {
    const [errorMsg, setErrorMsg] = useState("");
    const [errors, setErrors] = useState<Register>({});
    const [showNav, setShowNav] = useState(false);
    const [form, setForm] = useState<Register>({});
    const { mutate } = useSWRConfig();
    const { mutateUser, user } = useUser({
        redirectTo: "/account/user",
    });

    const {
        data: userDetails,
        isLoading,
        error,
    } = useSWR<OrdersWithErrors>("/api/userdetails");

    console.log(userDetails);
    useEffect(() => {
        if (userDetails) {
            setForm(removeEmpty(userDetails));
        }

        if (user) {
            setForm((oldForm) => ({ ...oldForm, mail: user.login }));
        }
    }, [userDetails, user]);

    if (isLoading || error || !userDetails || "message" in userDetails) {
        return (
            <Layout
                setShowNav={setShowNav}
                toggleNav={() => setShowNav((prev) => !prev)}
                title="Ordrar - Techstore"
                error={error}
                loading={isLoading}
            />
        );
    }

    const updateFields = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log(form);
        const validRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let formErrors: Register = {};

        if (form.mail && !form.mail.match(validRegex)) {
            formErrors = {
                ...errors,
                mail: "Mailet är för kort eller är fel",
            };
        }

        if (form.password && form.password.length < 4) {
            formErrors = {
                ...errors,
                password: "Lösenordet är för kort",
            };
        }
        if (form.password && form.password !== form.password2) {
            formErrors = {
                ...errors,
                password2: "Lösenorden matchar ej",
            };
        }

        if (form.firstname && form.firstname.length < 4) {
            formErrors = {
                ...errors,
                firstname: "Ditt förnamn är för kort",
            };
        }

        //This will not be checked on the backend as it's not really important information

        if (form.lastname && form.lastname.length < 4) {
            formErrors = {
                ...errors,
                lastname: "Ditt efternamn är för kort",
            };
        }

        if (
            form.postnumber &&
            form.postnumber.length < 4 &&
            form.postnumber.match(/^[0-9]+$/) != null
        ) {
            formErrors = {
                ...errors,
                postnumber:
                    "Ditt postnummer är för kort eller innehåller inte bara nummer",
            };
        }

        if (form.postcity && form.postcity.length < 3) {
            formErrors = {
                ...errors,
                postcity: "Din stad är för kort",
            };
        }

        if (
            form.phonenumber &&
            form.phonenumber.length < 10 &&
            form.phonenumber.match(/^[0-9]+$/) != null
        ) {
            formErrors = {
                ...errors,
                phonenumber:
                    "Ditt telefonnummer är för kort eller innehåller inte bara nummer",
            };
        }

        setErrors(formErrors);

        if (Object.keys(formErrors).length > 0) {
            return setErrorMsg("Kolla igenom formuläret igen");
        }

        try {
            mutateUser(
                await fetchJson("/api/changeuser", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(form),
                })
            );
            mutate(
                (key) => true, // which cache keys are updated
                undefined, // update cache data to `undefined`
                { revalidate: true } // do not revalidate
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
        <Layout
            setShowNav={setShowNav}
            toggleNav={() => setShowNav((prev) => !prev)}
            title="Ändra uppgifter - Techstore"
        >
            <MainAccount showNav={showNav}>
                <div className={styles.formContainer}>
                    {errorMsg && <p className="error">{errorMsg}</p>}
                    <form onSubmit={updateFields}>
                        <FormInput
                            id={"techstore-email"}
                            title={"Epost Address"}
                            hint={"Kommer att användas för inloggning"}
                            aria={"enter-mail"}
                            type={"email"}
                            error={errors.mail}
                            value={form.mail ?? ""}
                            onChange={(mail) =>
                                setForm((form) => ({ ...form, mail }))
                            }
                        />
                        <div>
                            <FormInput
                                id={"techstore-firstname"}
                                title={"Förnamn"}
                                hint={""}
                                aria={"enter-firstname"}
                                type={"text"}
                                error={errors.firstname}
                                value={form.firstname ?? ""}
                                onChange={(firstname) =>
                                    setForm((form) => ({ ...form, firstname }))
                                }
                            />
                            <FormInput
                                id={"techstore-lastname"}
                                title={"Efternamn"}
                                hint={""}
                                aria={"enter-lastname"}
                                type={"text"}
                                error={errors.lastname}
                                value={form.lastname ?? ""}
                                onChange={(lastname) =>
                                    setForm((form) => ({ ...form, lastname }))
                                }
                            />
                        </div>
                        <FormInput
                            id={"techstore-address"}
                            title={"Adress"}
                            hint={"Skriv in adress, exempelvis engatan 6A"}
                            aria={"enter-adress-example-engatan-6A"}
                            type={"text"}
                            error={errors.address}
                            value={form.address ?? ""}
                            onChange={(address) =>
                                setForm((form) => ({ ...form, address }))
                            }
                        />
                        <div>
                            <FormInput
                                id={"techstore-postnumber"}
                                title={"Postnummer"}
                                hint={"Skriv in postnummer, t.ex 25615"}
                                aria={"enter-postnumber"}
                                type={"number"}
                                error={errors.postnumber}
                                value={form.postnumber ?? ""}
                                onChange={(postnumber) =>
                                    setForm((form) => ({ ...form, postnumber }))
                                }
                            />
                            <FormInput
                                id={"techstore-postcity"}
                                title={"Postort"}
                                hint={"T.ex malmö"}
                                aria={"enter-postcity"}
                                type={"text"}
                                error={errors.postcity}
                                value={form.postcity ?? ""}
                                onChange={(postcity) =>
                                    setForm((form) => ({ ...form, postcity }))
                                }
                            />
                        </div>
                        <FormInput
                            id={"techstore-phonenumber"}
                            title={"Telefonnummer"}
                            hint={"Ditt telefon nummer"}
                            aria={"enter-phonenumber"}
                            type={"tel"}
                            error={errors.phonenumber}
                            value={form.phonenumber ?? ""}
                            onChange={(phonenumber) =>
                                setForm((form) => ({ ...form, phonenumber }))
                            }
                        />
                        <FormInput
                            id={"techstore-password"}
                            title={"Passord"}
                            hint={"Ditt passord kommer att bli krypterat"}
                            aria={"enter-password"}
                            type={"password"}
                            error={errors.password}
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
                            error={errors.password2}
                            value={form.password2 ?? ""}
                            onChange={(password2) =>
                                setForm((form) => ({ ...form, password2 }))
                            }
                        />
                        <div>
                            <Button type="submit" variant="outlined">
                                Ändra uppgifter
                            </Button>
                        </div>
                    </form>
                </div>
            </MainAccount>
        </Layout>
    );
}
