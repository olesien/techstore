import prisma from "./prisma";
import {
    product_images,
    product_specs,
    products,
    reviews,
} from "@prisma/client";

type Error = {
    code: number;
    error: string;
};
type Product_addons = {
    product_images: product_images[];
    product_specs: product_specs[];
    reviews: reviews[];
    avg: number;
};

export type ProductType = (products & Product_addons) | Error;

export async function getProduct(id: number) {
    const product = await prisma.products.findFirst({
        include: {
            product_images: true,
            product_specs: true,
            reviews: true,
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

    console.log(avg);

    return {
        ...product,
        id: Number(product.id),
        avg: avg.length > 0 ? avg[0]._avg.rating : 0,
    };
}
