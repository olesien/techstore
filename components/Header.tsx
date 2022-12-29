import Link from "next/link";
import useUser from "../lib/useUser";
import { useRouter } from "next/router";
import fetchJson from "../lib/fetchJson";
import styles from "../styles/Header.module.scss";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { theme } from "../pages/_app";
import {
    faBars,
    faHome,
    faRightFromBracket,
    faSignIn,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Login from "./login";
import { useState } from "react";

export default function Header({ toggleNav }: { toggleNav: () => void }) {
    const [loginVisible, setLoginVisible] = useState(false);
    const { user, mutateUser } = useUser();
    const router = useRouter();

    return (
        <header className={styles.header}>
            <div className={styles.headContainer}>
                <div>
                    <Link href="/" legacyBehavior>
                        <a>
                            <Image
                                src="/Logo.svg"
                                height={75}
                                width={75}
                                alt="Techstore logo"
                            />
                        </a>
                    </Link>
                </div>
                {/* <div className="container-flex space-around"> */}
                <div className={styles.containerFlex}>
                    <div className={styles.hamburger} onClick={toggleNav}>
                        <FontAwesomeIcon icon={faBars} size={"1x"} />
                    </div>
                    <div className="container-flex">
                        <TextField
                            id="filled-basic"
                            label="Sök bland produkter"
                            variant="filled"
                            size="small"
                            color="primary"
                            sx={{
                                input: {
                                    color: theme.status.contrast,
                                    background: theme.status.header,
                                    borderRadius: 1,
                                },
                            }}
                        />
                        <Button variant="contained">Sök</Button>
                    </div>
                </div>
                <nav>
                    <ul>
                        {/* <li>
                            <Link href="/" legacyBehavior>
                                <a>
                                    <FontAwesomeIcon
                                        icon={faHome}
                                        size={"1x"}
                                    />
                                    <span>Home</span>
                                </a>
                            </Link>
                        </li> */}
                        {user?.isLoggedIn === false && (
                            <li
                                role="button"
                                className="button horizontal-flex gap-04"
                                onClick={() =>
                                    setLoginVisible(
                                        (loginVisible) => !loginVisible
                                    )
                                }
                            >
                                {/* <Link href="/login" legacyBehavior>
                                    <a> */}
                                <FontAwesomeIcon icon={faSignIn} />
                                <span>Logga In</span>
                                {/* </a>
                                </Link> */}
                            </li>
                        )}
                        {user?.isLoggedIn === true && (
                            <>
                                <li>
                                    <Link href="/account/orders" legacyBehavior>
                                        <a>
                                            <FontAwesomeIcon icon={faUser} />
                                            <span>Konto</span>
                                        </a>
                                    </Link>
                                </li>

                                <li>
                                    <a
                                        href="/api/logout"
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            mutateUser(
                                                await fetchJson("/api/logout", {
                                                    method: "POST",
                                                }),
                                                false
                                            );
                                            router.push("/");
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faRightFromBracket}
                                        />
                                        <span>Logga ut</span>
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
                {/* </div> */}
            </div>
            {loginVisible && user?.isLoggedIn !== true && (
                <Login closeMenu={() => setLoginVisible(false)} />
            )}
        </header>
    );
}
