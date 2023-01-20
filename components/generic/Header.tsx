import Link from "next/link";
import useUser from "../../lib/useUser";
import { useRouter } from "next/router";
import fetchJson from "../../lib/fetchJson";
import styles from "../../styles/Header.module.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { theme } from "../../pages/_app";
import {
    faBars,
    faBasketShopping,
    faRightFromBracket,
    faSignIn,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Login from "../auth/Login";
import { useEffect, useState } from "react";
import Basket from "../basket/Basket";
import useBasket, { Basket as BasketType } from "../../hooks/useBasket";
import useQueries from "../../hooks/useQueries";

export default function Header({
    toggleNav,
    nonav,
}: {
    toggleNav?: () => void;
    nonav?: boolean;
}) {
    const { query } = useQueries();
    const [loginVisible, setLoginVisible] = useState(false);
    const [visibleCart, setVisibleCart] = useState(false);
    const [search, setSearch] = useState(query?.query ?? "");
    const { user, mutateUser } = useUser();
    const router = useRouter();
    const {
        state: basket,
        setState: updateBasket,
        getCount,
        trash,
    } = useBasket();

    const toggleCart = () => {
        setVisibleCart((prevVisibility) => !prevVisibility);
    };
    const keySubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            makeSearch();
        }
    };
    const makeSearch = () => {
        router.push(`/search?query=${search}`);
    };

    useEffect(() => {
        if (visibleCart) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "inherit";
        }
    }, [visibleCart]);

    return (
        <header className={styles.header}>
            <div className={styles.headContainer}>
                <div>
                    <Link href="/" legacyBehavior>
                        <a>
                            <img src="/Logo.svg" alt="Techstore logo" />
                        </a>
                    </Link>
                </div>
                <div className={styles.containerFlex}>
                    <div>
                        {!nonav && (
                            <div
                                className={styles.hamburger}
                                onClick={toggleNav}
                            >
                                <FontAwesomeIcon icon={faBars} size={"1x"} />
                            </div>
                        )}
                    </div>

                    <div className="container-flex">
                        <TextField
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
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
                            onKeyDown={keySubmit}
                        />
                        <Button variant="contained" onClick={makeSearch}>
                            Sök
                        </Button>
                    </div>
                </div>
                <nav>
                    <ul>
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
                                <FontAwesomeIcon icon={faSignIn} />
                                <span>Logga In</span>
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
                        <li>
                            <Button variant="text" onClick={() => toggleCart()}>
                                <FontAwesomeIcon icon={faBasketShopping} />
                                <span>
                                    Kundvagn
                                    {basket.length > 0
                                        ? ` (${getCount(basket)})`
                                        : ""}
                                </span>
                            </Button>
                            {visibleCart && (
                                <Basket
                                    basket={basket}
                                    toggleCart={() => toggleCart()}
                                    trash={trash}
                                />
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
            {loginVisible && user?.isLoggedIn !== true && (
                <Login closeMenu={() => setLoginVisible(false)} />
            )}
        </header>
    );
}
