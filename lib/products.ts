import prisma from "./prisma";
import translate from "./translations";

export async function getProducts(id: string) {
    const products = await prisma.products.findMany({
        where: { categoryid: Number(id) },
    });
    return products.map((product) => ({ ...product, id: String(product.id) }));
}
