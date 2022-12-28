import React, { useState } from "react";
import useUser from "../lib/useUser";
import Form from "./Form";
import fetchJson, { FetchError } from "../lib/fetchJson";
import styles from "../styles/Auth.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Login({ closeMenu }: { closeMenu: () => void }) {
    // here we just check if user is already logged in and redirect to profile
    const { mutateUser } = useUser({
        redirectTo: "/profile-sg",
        redirectIfFound: true,
    });

    const [errorMsg, setErrorMsg] = useState("");
    //Prevent spread up
    const formClick = (e: React.MouseEvent<HTMLDivElement>) => {
        return e.stopPropagation();
    };
    return (
        <div className={styles.login} onClick={closeMenu}>
            <div>
                <div className={styles.closeMenu}>
                    <FontAwesomeIcon
                        role="button"
                        icon={faXmark}
                        onClick={closeMenu}
                    />
                </div>
                <div onClick={formClick}>
                    <Form
                        errorMessage={errorMsg}
                        onSubmit={async function handleSubmit(event) {
                            event.preventDefault();

                            const body = {
                                mail: event.currentTarget.mail.value,
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
                    />
                </div>
            </div>
        </div>
    );
}
