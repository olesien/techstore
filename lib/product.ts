import { ErrorWithCode } from "./fetchJson";
import prisma from "./prisma";
import {
    product_compat,
    product_images,
    product_specs,
    products,
    reviews,
    users,
} from "@prisma/client";

export type Product_addons = {
    product_compat_product_compat_productid1Toproducts: product_compat[];
    product_compat_product_compat_productid2Toproducts: product_compat[];
    product_images: product_images[];
    product_specs: product_specs[];
    product_compat: product_compat[];
    reviews: (reviews & { users: users })[];
    avg: number;
};

export type ProductType = (products & Product_addons) | ErrorWithCode;

export type Product = products & Product_addons;

export async function getProductIds() {
    try {
        const productIds = await prisma.products.findMany({
            select: { id: true },
        });
        return productIds;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export async function getProduct(id: number) {
    try {
        const product = await prisma.products.findFirst({
            include: {
                product_images: true,
                product_specs: true,
                reviews: {
                    include: {
                        users: true,
                    },
                },
                product_compat_product_compat_productid1Toproducts: true,
                product_compat_product_compat_productid2Toproducts: true,
            },
            where: {
                id,
            },
        });
        let avg = await prisma.reviews.groupBy({
            by: ["productid"],
            where: { productid: id },
            _avg: {
                rating: true,
            },
        });

        if (!product) {
            return { code: 404, error: "Not Found" };
        }

        return {
            ...product,
            id: Number(product.id),
            avg: avg.length > 0 ? avg[0]._avg.rating : 0,
            reviews: product.reviews.map((review) => ({
                ...review,
                timeposted: String(review.timeposted),
            })),
            product_compat:
                product.product_compat_product_compat_productid1Toproducts.concat(
                    product.product_compat_product_compat_productid2Toproducts
                ),
        };
    } catch (err: any) {
        return {
            code: 500,
            error: err.message,
        };
    }
}
