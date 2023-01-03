import prisma from "./prisma";

export async function getProduct(id: number) {
    const product = await prisma.products.findFirst({
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
