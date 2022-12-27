import Link from "next/link";
import Image from "next/image";

export default function CarouselItem({
    title,
    image,
    id,
}: {
    title: string;
    image: string;
    id: number;
}) {
    return (
        <div className="horizontal-flex">
            <div className="vertical-flex">
                <Link href={"/product/" + id} legacyBehavior>
                    <a>{title}</a>
                </Link>
                <p>Nu på techstore!</p>
            </div>
            <Image
                alt="Vercel logo"
                src={image}
                width={300}
                height={400}
                style={{
                    maxWidth: "100%",
                    height: "auto",
                }}
            />
        </div>
    );
}
