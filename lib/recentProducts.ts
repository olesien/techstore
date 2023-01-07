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

export type RecentProduct = products & Product_addons;

export async function getRecentProducts() {
    try {
        const products = await prisma.products.findMany({
            orderBy: [
                {
                    id: "desc",
                },
            ],
            include: {
                product_images: true,
            },
            take: 5,
        });
        let avg = await prisma.reviews.groupBy({
            by: ["productid"],
            _avg: {
                rating: true,
            },
        });

        if (products.length === 0) {
            return { code: 404, error: "Not Found" };
        }

        return products.map((product) => ({
            ...product,
            id: String(product.id),
            product_images: product.product_images.map((image) => image.image),
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
