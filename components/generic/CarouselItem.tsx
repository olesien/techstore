import Link from "next/link";

export default function CarouselItem({
    title,
    image,
    id,
    newImg,
}: {
    title?: string;
    image: string;
    id: number;
    newImg?: boolean;
}) {
    return (
        <div className="horizontal-flex max-width carousel-item">
            {newImg && (
                <div className="vertical-flex bold flex-1">
                    <Link href={"/product/" + id} legacyBehavior>
                        <a>{title}</a>
                    </Link>
                    <p>Nu på techstore!</p>
                </div>
            )}

            <div
                className={
                    "img-container flex-1" +
                    (newImg ? " img-container-halfsize" : " img-container-size")
                }
            >
                <img alt="Vercel logo" src={image} />
            </div>
        </div>
    );
}
