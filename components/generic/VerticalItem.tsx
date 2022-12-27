import Link from "next/link";
import Image from "next/image";
import Button from "@mui/material/Button";
import utilStyles from "../../styles/utils.module.scss";

export default function VerticalItem({
    title,
    image,
    id,
    price,
    saleprice,
    description,
}: {
    title: string;
    image: string;
    id: number;
    price: number;
    saleprice: number;
    description: string;
}) {
    return (
        <div className="vertical-flex">
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
            <div className="vertical-flex">
                <Link href={"/product/" + id} legacyBehavior>
                    <a className="bold">{title}</a>
                </Link>
                <p>{description}</p>
            </div>
            <div className="horizontal-flex gap-1">
                <div className="vertical-flex">
                    <p className="crossed">{price} kr</p>
                    <p className={utilStyles.discount}>{saleprice} kr</p>
                </div>
                <div>
                    <Button variant={"contained"} color={"success"}>
                        Visa
                    </Button>
                </div>
            </div>
        </div>
    );
}
