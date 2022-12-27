import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import CarouselItem from "./CarouselItem";

export default function Carousel({
    items,
}: {
    items: { title: string; image: string; id: number }[];
}) {
    const [carouselIndex, setCarouselIndex] = useState(0);
    if (items.length === 0) return <></>;
    return (
        <div className="horizontal-flex carousel-flex">
            <div
                className="horizontal-flex button"
                role="button"
                onClick={() =>
                    setCarouselIndex((oldIndex) =>
                        oldIndex > 0 ? oldIndex - 1 : items.length - 1
                    )
                }
            >
                <FontAwesomeIcon icon={faChevronLeft} size={"2x"} />
            </div>
            <CarouselItem
                title={items[carouselIndex].title}
                image={items[carouselIndex].image}
                id={items[carouselIndex].id}
            />
            <div
                className="horizontal-flex button"
                role="button"
                onClick={() =>
                    setCarouselIndex((oldIndex) =>
                        oldIndex >= items.length - 1 ? 0 : oldIndex + 1
                    )
                }
            >
                <FontAwesomeIcon icon={faChevronRight} size={"2x"} />
            </div>
        </div>
    );
}
