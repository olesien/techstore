import prisma from "./prisma";
import { product_images, products } from "@prisma/client";

type Error = {
    code: number;
    error: string;
};
// type Product_images = {
//     product_Images: product_images;
// };

export type ProductType = (products & product_images) | Error;

export async function getProduct(id: number) {
    const product = await prisma.products.findFirst({
        include: {
            product_images: true,
        },
        where: {
            id,
        },
    });
    if (!product) {
        return { code: 404, error: "Not Found" };
    }

    //Bigints are annoying
    return { ...product, id: Number(product.id) };
}
