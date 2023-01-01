import prisma from "./prisma";
import translate from "./translations";

export async function getProducts(id: string, page: number, sortBy: number) {
    let orderBy:
        | { [key: string]: string | number }
        | { [key: string]: string | number }[] = {
        name: "asc",
    };
    if (sortBy == 2) {
        // asc
        orderBy = {
            name: "desc",
        };
    } else if (sortBy == 3) {
        //price desc
        orderBy = [
            {
                price: "desc",
            },
            {
                discountprice: "desc",
            },
        ];
    } else if (sortBy == 3) {
        //price desc

        orderBy = [
            {
                discountprice: "asc",
            },
            {
                price: "asc",
            },
        ];
    }
    const products = await prisma.products.findMany({
        where: { categoryid: Number(id) },
        include: { product_images: { take: 1 } },
        skip: page * 10 - 10,
        take: 10,
        orderBy,
    });
    const pageCount = Math.ceil((await prisma.users.count()) / 10);
    let avg = await prisma.reviews.groupBy({
        by: ["productid"],
        _avg: {
            rating: true,
        },
    });

    //console.log(products);
    //console.log(avg);
    return {
        page,
        pageCount,
        sortBy,
        products: products.map((product) => ({
            ...product,
            id: String(product.id),
            product_images: product.product_images.map((image) => image.image),
            review_avg:
                avg.find((review) => review.productid === product.id)?._avg
                    .rating ?? 0,
        })),
    };
}
