import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function ProductRatingSet({
    rating,
    setRating,
}: {
    rating: number;
    setRating: (rating: number) => void;
}) {
    return (
        <span>
            <FontAwesomeIcon
                icon={faStar}
                className={rating >= 0.5 ? "star-filled" : "star-notfilled"}
                onClick={() => setRating(1)}
            />
            <FontAwesomeIcon
                icon={faStar}
                className={rating >= 1.5 ? "star-filled" : "star-notfilled"}
                onClick={() => setRating(2)}
            />
            <FontAwesomeIcon
                icon={faStar}
                className={rating >= 2.5 ? "star-filled" : "star-notfilled"}
                onClick={() => setRating(3)}
            />
            <FontAwesomeIcon
                icon={faStar}
                className={rating >= 3.5 ? "star-filled" : "star-notfilled"}
                onClick={() => setRating(4)}
            />
            <FontAwesomeIcon
                icon={faStar}
                className={rating >= 4.5 ? "star-filled" : "star-notfilled"}
                onClick={() => setRating(5)}
            />
        </span>
    );
}
