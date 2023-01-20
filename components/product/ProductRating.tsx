import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function ProductRating({ rating }: { rating: number }) {
    return (
        <span>
            <FontAwesomeIcon
                icon={faStar}
                className={rating >= 0.5 ? "star-filled" : "star-notfilled"}
            />
            <FontAwesomeIcon
                icon={faStar}
                className={rating >= 1.5 ? "star-filled" : "star-notfilled"}
            />
            <FontAwesomeIcon
                icon={faStar}
                className={rating >= 2.5 ? "star-filled" : "star-notfilled"}
            />
            <FontAwesomeIcon
                icon={faStar}
                className={rating >= 3.5 ? "star-filled" : "star-notfilled"}
            />
            <FontAwesomeIcon
                icon={faStar}
                className={rating >= 4.5 ? "star-filled" : "star-notfilled"}
            />
        </span>
    );
}
