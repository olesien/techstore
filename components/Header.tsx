import Link from "next/link";
import useUser from "../lib/useUser";
import { useRouter } from "next/router";
import fetchJson from "../lib/fetchJson";
import styles from "../styles/Header.module.scss";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { theme } from "../pages/_app";

export default function Header() {
    const { user, mutateUser } = useUser();
    const router = useRouter();

    return (
        <header className={styles.header}>
            <div>
                <Image
                    src="/Logo.svg"
                    height={60}
                    width={60}
                    alt="Techstore logo"
                />
            </div>
            <div className="container-flex space-around">
                <div className="container-flex ">
                    <TextField
                        id="filled-basic"
                        label="Search"
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
                    <Button variant="contained">Search</Button>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link href="/" legacyBehavior>
                                <a>Home</a>
                            </Link>
                        </li>
                        {user?.isLoggedIn === false && (
                            <li>
                                <Link href="/login" legacyBehavior>
                                    <a>Login</a>
                                </Link>
                            </li>
                        )}
                        {user?.isLoggedIn === true && (
                            <>
                                <li>
                                    <Link href="/profile-sg" legacyBehavior>
                                        <a>
                                            <span></span>
                                            Profile
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
                                            router.push("/login");
                                        }}
                                    >
                                        Logout
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
