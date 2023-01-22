import { Product_addons } from "../lib/product";
import { Product } from "../pages/category/[id]";
import { Basket } from "./useBasket";
import { products } from "@prisma/client";

export default function useCompat(
    product: Product | (products & (products & Product_addons)),
    basket: Basket[]
) {
    const compatIssue = () => {
        const issues = product.product_compat
            .filter(
                (compat) =>
                    !compat.error &&
                    (basket.find(
                        (item) =>
                            item.id === compat.productid2 &&
                            compat.productid2 !== product.id
                    ) ||
                        (basket.find((item) => item.id === compat.productid1) &&
                            compat.productid1 !== product.id))
            )
            .sort((a, b) => (a.error && !b.error ? 1 : -1));
        if (issues.length > 0) {
            return issues[0].message;
        }
        return undefined;
    };

    const compatError = () => {
        const issues = product.product_compat
            .filter(
                (compat) =>
                    compat.error &&
                    (basket.find(
                        (item) =>
                            item.id === compat.productid2 &&
                            compat.productid2 !== product.id
                    ) ||
                        (basket.find((item) => item.id === compat.productid1) &&
                            compat.productid1 !== product.id))
            )
            .sort((a, b) => (a.error && !b.error ? 1 : -1));
        if (issues.length > 0) {
            return issues[0].message;
        }
        return undefined;
    };
    return { compatIssue, compatError };
}
