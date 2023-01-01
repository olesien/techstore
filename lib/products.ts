import prisma from "./prisma";
import translate from "./translations";

export async function getProducts(id: string, page: number) {
    const products = await prisma.products.findMany({
        where: { categoryid: Number(id) },
        include: { product_images: { take: 1 } },
        skip: page * 10 - 10,
        take: 10,
    });
    let avg = await prisma.reviews.groupBy({
        by: ["productid"],
        _avg: {
            rating: true,
        },
    });
    //console.log(products);
    //console.log(avg);
    return products.map((product) => ({
        ...product,
        id: String(product.id),
        product_images: product.product_images.map((image) => image.image),
        review_avg:
            avg.find((review) => review.productid === product.id)?._avg
                .rating ?? 0,
    }));
}
