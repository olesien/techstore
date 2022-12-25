import Link from "next/link";
import useUser from "../lib/useUser";
import { useRouter } from "next/router";
import fetchJson from "../lib/fetchJson";
import styles from "../styles/Header.module.scss";
import Image from "next/image";

export default function Header() {
    const { user, mutateUser } = useUser();
    const router = useRouter();

    return (
        <header className={styles.header}>
            <Image
                src="/Logo.svg"
                height={60}
                width={60}
                alt="Techstore logo"
            />
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
            {/* <style jsx>{`
                ul {
                    display: flex;
                    list-style: none;
                    margin-left: 0;
                    padding-left: 0;
                }

                li {
                    margin-right: 1rem;
                    display: flex;
                }

                li:first-child {
                    margin-left: auto;
                }

                a {
                    color: #fff;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                }

                a img {
                    margin-right: 1em;
                }

                header {
                    padding: 0.2rem;
                    color: #fff;
                    background-color: #333;
                }
            `}</style> */}
        </header>
    );
}
