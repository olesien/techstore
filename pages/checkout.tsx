import useSWR from "swr";
import React, { useEffect, useState } from "react";
import { UserDetails } from "./api/userdetails";
import mainStyles from "../styles/Main.module.scss";
import Layout from "../components/layout";
import useBasket from "../hooks/useBasket";
import { ProductByIdType } from "./api/productsbyids/[ids]";
import ProductsOverview from "../components/ProductsOverview";
import utilStyles from "../styles/utils.module.scss";
import FormInput from "../components/generic/FormInput";
import Button from "@mui/material/Button";
import fetchJson, { FetchError } from "../lib/fetchJson";
import { useRouter } from "next/router";
import { removeEmpty } from "../lib/utils";
import useComputerBuilder from "../hooks/useComputerBuilder";
const fetchURL = (url: string) => fetch(url).then((r) => r.json());

export interface Order {
    mail?: string;
    firstname?: string;
    lastname?: string;
    address?: string;
    postnumber?: string | number;
    postcity?: string;
    phonenumber?: string;
}

export default function checkout() {
    const router = useRouter();
    const {
        data: user,
        isLoading: isLoadingUser,
        error: userError,
    } = useSWR<UserDetails>("/api/userdetails");
    const { isActive } = useComputerBuilder();
    const { state: basket, trash } = useBasket();
    const { state: builderBasket, trash: trashBuilder } = useBasket(
        "techstore-builder-basket"
    );
    const basketIds = (isActive ? builderBasket : basket).map(
        (item) => item.id
    );
    const { data, isLoading, error } = useSWR(
        "/api/productsbyids/" + JSON.stringify(basketIds),
        fetchURL
    );

    const [form, setForm] = useState<Order>({});
    const [errorMsg, setErrorMsg] = useState("");
    const [errors, setErrors] = useState<Order>({});

    useEffect(() => {
        if (user) {
            setForm(removeEmpty(user));
        }
    }, [user]);

    if (isLoadingUser || userError) {
        return (
            <Layout
                nonav={true}
                title="Ordrar - Techstore"
                loading={isLoadingUser}
                error={userError}
            />
        );
    }

    if (isLoading || error) {
        return (
            <Layout
                nonav={true}
                title="Ordrar - Techstore"
                loading={isLoading}
                error={error}
            />
        );
    }

    const products = data.products.map((product: ProductByIdType) => {
        const basketItem = (isActive ? builderBasket : basket).find(
            (item) => item.id === product.id
        );
        return { ...product, quantity: basketItem?.quantity };
    });

    const sendOrder = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log(form);
        const validRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let formErrors: Order = {};

        if (!form.mail || !form.mail.match(validRegex)) {
            formErrors = {
                ...errors,
                mail: "Mailet är för kort eller är fel",
            };
        }

        if (!form.address || form.address.length < 6) {
            formErrors = {
                ...errors,
                address: "Addressen är för kort",
            };
        }

        if (!form.postnumber || String(form.postnumber).length < 6) {
            formErrors = {
                ...errors,
                postnumber: "Postnumeret är för kort",
            };
        }

        if (!form.postcity || form.postcity.length < 3) {
            formErrors = {
                ...errors,
                postcity: "Postorten är för kort",
            };
        }

        setErrors(formErrors);

        if (Object.keys(formErrors).length > 0) {
            return setErrorMsg("Kolla igenom formuläret igen");
        }

        try {
            await fetchJson("/api/addorder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ form, products }),
            });
            setErrorMsg("");
            setErrors({});
            //Redirect to order success
            router.push("/successfulorder");
            if (isActive) {
                trashBuilder();
            } else {
                trash();
            }
        } catch (error) {
            if (error instanceof FetchError) {
                setErrorMsg(error.data.message);
            } else {
                console.error("An unexpected error happened:", error);
            }
        }
    };
    return (
        <Layout nonav={true} title="Ordrar - Techstore">
            <div className={mainStyles.main}>
                <div className={mainStyles.subMain}>
                    <p>Valda produkter</p>
                    <section className={utilStyles.section}>
                        <ProductsOverview
                            products={products}
                            trash={isActive ? trashBuilder : trash}
                        />
                    </section>
                    <p>Dina detaljer</p>
                    <section
                        className={
                            utilStyles.section + " " + utilStyles.formContainer
                        }
                    >
                        <form onSubmit={sendOrder}>
                            {errorMsg && <p className="error">{errorMsg}</p>}
                            <FormInput
                                required
                                id={"techstore-email"}
                                title={"Epost Address"}
                                hint={
                                    "Efter order kommer du att få en orderbekräftelse"
                                }
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
                                        setForm((form) => ({
                                            ...form,
                                            firstname,
                                        }))
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
                                        setForm((form) => ({
                                            ...form,
                                            lastname,
                                        }))
                                    }
                                />
                            </div>
                            <FormInput
                                required
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
                                    required
                                    id={"techstore-postnumber"}
                                    title={"Postnummer"}
                                    hint={"Skriv in postnummer, t.ex 25615"}
                                    aria={"enter-postnumber"}
                                    type={"number"}
                                    error={
                                        errors.postnumber
                                            ? String(errors.postnumber)
                                            : undefined
                                    }
                                    value={
                                        form.postnumber
                                            ? String(form.postnumber)
                                            : ""
                                    }
                                    onChange={(postnumber) =>
                                        setForm((form) => ({
                                            ...form,
                                            postnumber,
                                        }))
                                    }
                                />
                                <FormInput
                                    required
                                    id={"techstore-postcity"}
                                    title={"Postort"}
                                    hint={"T.ex malmö"}
                                    aria={"enter-postcity"}
                                    type={"text"}
                                    error={errors.postcity}
                                    value={form.postcity ?? ""}
                                    onChange={(postcity) =>
                                        setForm((form) => ({
                                            ...form,
                                            postcity,
                                        }))
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
                                    setForm((form) => ({
                                        ...form,
                                        phonenumber,
                                    }))
                                }
                            />
                            <div>
                                <Button type="submit" variant="contained">
                                    Lägg order
                                </Button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </Layout>
    );
}

// export const getServerSideProps = withIronSessionSsr(
//     async function getServerSideProps({ req }) {
//         if (!req.session.user) {
//             return {
//                 props: { user: null },
//             };
//         }
//         const user = await getUserDetails(req.session.user);
//         return {
//             props: { user },
//         };
//     },
//     {
//         cookieName: "techstore_user",
//         password: "o2p13opi12jk3opi12j3jop13j1jpo132hip123",
//         // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
//         cookieOptions: {
//             secure: process.env.NODE_ENV === "production",
//         },
//     }
// );
