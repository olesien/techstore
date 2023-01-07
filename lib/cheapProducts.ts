import prisma from "./prisma";
import {
    product_images,
    product_specs,
    products,
    reviews,
    users,
} from "@prisma/client";

type Product_addons = {
    product_images: string[];
    avg: number;
};

export type CheapProduct = products & Product_addons;

export async function getCheapProducts() {
    try {
        const products: CheapProduct[] = await prisma.$queryRaw`
        SELECT p.* , JSON_ARRAYAGG(pi.image) AS product_images FROM products p INNER JOIN product_images pi ON p.id = pi.productid WHERE p.oldprice IS NOT NULL GROUP BY p.id ORDER BY p.oldprice - price LIMIT 3
        `;
        let avg = await prisma.reviews.groupBy({
            by: ["productid"],
            _avg: {
                rating: true,
            },
        });

        if (products.length === 0) {
            return { code: 404, error: "Not Found" };
        }
        console.log("-----------------------------");
        console.log(products);
        return products.map((product) => ({
            ...product,
            review_avg:
                avg.find((review) => review.productid === product.id)?._avg
                    .rating ?? 0,
        }));
    } catch (err: any) {
        return {
            code: 500,
            error: err.message,
        };
    }
}
