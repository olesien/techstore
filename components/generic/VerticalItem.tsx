import Link from "next/link";
import Image from "next/image";
import Button from "@mui/material/Button";
import utilStyles from "../../styles/utils.module.scss";
import { CheapProduct } from "../../lib/cheapProducts";

export default function VerticalItem({ product }: { product: CheapProduct }) {
    return (
        <div className="vertical-flex">
            <div className="img-container p-1">
                <img
                    alt={"Bild av " + product.name}
                    src={
                        `/images/categories/${product.categoryid}/` +
                        product.product_images[0]
                    }
                />
            </div>
            <div className="vertical-flex ">
                <Link href={"/product/" + product.id} legacyBehavior>
                    <a className="bold">{product.name}</a>
                </Link>
                <p>{product.quickspecs}</p>
            </div>
            <div className="horizontal-flex gap-1 m-1">
                <div className="vertical-flex">
                    <p className="crossed">{product.oldprice} kr</p>
                    <p className={utilStyles.discount}>{product.price} kr</p>
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
