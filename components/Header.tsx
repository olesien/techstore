import Link from "next/link";
import useUser from "../lib/useUser";
import { useRouter } from "next/router";
import fetchJson from "../lib/fetchJson";
import styles from "../styles/Header.module.scss";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { theme } from "../pages/_app";
import { faBars, faHome, faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header({ toggleNav }: { toggleNav: () => void }) {
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
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                    <div className="container-flex">
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
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link href="/" legacyBehavior>
                                <a>
                                    <FontAwesomeIcon icon={faHome} />
                                    <span>Home</span>
                                </a>
                            </Link>
                        </li>
                        {user?.isLoggedIn === false && (
                            <li>
                                <Link href="/login" legacyBehavior>
                                    <a>
                                        <FontAwesomeIcon icon={faSignIn} />
                                        <span>Login</span>
                                    </a>
                                </Link>
                            </li>
                        )}
                        {user?.isLoggedIn === true && (
                            <>
                                <li>
                                    <Link href="/profile-sg" legacyBehavior>
                                        <a>Profile</a>
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
                {/* </div> */}
            </div>
        </header>
    );
}
