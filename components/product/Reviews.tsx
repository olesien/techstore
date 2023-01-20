import React, { useState } from "react";
import { Product } from "../../lib/product";
import productStyles from "../../styles/Product.module.scss";
import useUser from "../../lib/useUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson, faXmark } from "@fortawesome/free-solid-svg-icons";
import ProductRating from "./ProductRating";
import { Button, TextField } from "@mui/material";
import ProductRatingSet from "./ProductRatingSet";
import fetchJson, { FetchError } from "../../lib/fetchJson";
import { timeAgo } from "../../lib/getTimeSince";
import { useRouter } from "next/router";

export default function Reviews({ product }: { product: Product }) {
    const router = useRouter();
    const { user } = useUser();
    const [showWriteReview, toggleShowWriteReview] = useState(false);
    const [content, setContent] = useState("");
    const [error, setError] = useState<string | undefined>();
    const [rating, setRating] = useState(0);
    const removeReview = async (id: number) => {
        try {
            const res = await fetchJson("/api/removereview", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                }),
            });

            //Refresh props
            router.replace(router.asPath);
        } catch (error) {
            if (error instanceof FetchError) {
                console.log(error);
            } else {
                console.error("An unexpected error happened:", error);
            }
        }
    };
    const submitReview = async () => {
        if (rating === 0) {
            return setError("Du gav aldrig en rating");
        }
        if (content.length < 3) {
            return setError("Din review är för kort");
        }
        if (content.length > 300) {
            return setError("Din review är för lång");
        }
        try {
            const res = await fetchJson("/api/addreview", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content,
                    rating,
                    productid: product.id,
                }),
            });

            setContent("");
            setRating(0);
            toggleShowWriteReview(false);

            //Refresh props
            router.replace(router.asPath);

            setError(undefined);
        } catch (error) {
            if (error instanceof FetchError) {
                setError(error.data.message);
            } else {
                console.error("An unexpected error happened:", error);
            }
        }
    };
    return (
        <>
            <ul>
                {product.reviews.length === 0 && <li>Inga recensioner ännu</li>}
                {product.reviews.map((review) => {
                    return (
                        <li key={review.id}>
                            <div className={productStyles.reviewHeader}>
                                <FontAwesomeIcon icon={faPerson} size="lg" />
                                <div>
                                    <p>{review.users.firstname}</p>
                                    <ProductRating
                                        rating={review.rating ?? 0}
                                    />
                                </div>
                                <span>
                                    <p>
                                        {review.timeposted &&
                                        String(review.timeposted) != "null"
                                            ? timeAgo(String(review.timeposted))
                                            : ""}
                                    </p>
                                    {review.userid === (user?.id ?? 0) && (
                                        <span
                                            role="button"
                                            className="clickable"
                                        >
                                            <FontAwesomeIcon
                                                icon={faXmark}
                                                onClick={() =>
                                                    removeReview(review.id)
                                                }
                                            />
                                        </span>
                                    )}
                                </span>
                            </div>
                            <div>
                                <p>{review.content}</p>
                            </div>
                        </li>
                    );
                })}
            </ul>
            {user?.isLoggedIn === false ? (
                <p>Logga in för att lägga till recension</p>
            ) : showWriteReview ? (
                <form>
                    <ProductRatingSet rating={rating} setRating={setRating} />
                    {error && <p>{error}</p>}
                    <div>
                        <TextField
                            error={!!error}
                            required={true}
                            id={"write-review"}
                            aria-describedby={"Skriv recension"}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            multiline
                            variant="filled"
                            maxRows={4}
                            sx={{
                                input: {
                                    padding: 1,
                                    marginTop: 1,
                                },
                            }}
                        />
                    </div>
                    <div className={productStyles.btnContainer}>
                        <Button
                            variant="contained"
                            onClick={() => toggleShowWriteReview(false)}
                            color="secondary"
                        >
                            Avbryt
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => submitReview()}
                        >
                            Skicka
                        </Button>
                    </div>
                </form>
            ) : (
                <Button
                    variant="contained"
                    onClick={() => toggleShowWriteReview(true)}
                >
                    Skriv recension
                </Button>
            )}
        </>
    );
}
