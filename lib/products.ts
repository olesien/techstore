import prisma from "./prisma";
type Filters = {
    priceRange: [min: number, max: number];
};

export async function getProducts(
    id: string,
    page: number,
    sortBy: number,
    filters: Filters
) {
    let orderBy:
        | { [key: string]: string | number }
        | { [key: string]: string | number }[] = {
        name: "asc",
    };
    if (sortBy === 2) {
        // asc
        orderBy = {
            name: "desc",
        };
    } else if (sortBy === 3) {
        //price desc
        orderBy = [
            {
                price: "desc",
            },
        ];
    } else if (sortBy === 4) {
        //price desc

        orderBy = [
            {
                price: "asc",
            },
        ];
    }

    let price = {};
    if (filters.priceRange[0] !== 0 && filters.priceRange[1] !== 0) {
        price = {
            lte: filters.priceRange[1],
            gte: filters.priceRange[0],
        };
    }
    const products = await prisma.products.findMany({
        where: { categoryid: Number(id), price },
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

    let prices = await prisma.products.findMany({
        where: { categoryid: Number(id) },
        distinct: "price",
        orderBy: {
            price: "desc",
        },
    });

    //console.log(products);
    //console.log(avg);
    const min = prices[prices.length - 1].price;
    const max = prices[0].price;
    console.log(min, max);
    console.log(filters.priceRange[1] === 0 ? [min, max] : filters.priceRange);
    return {
        page,
        pageCount,
        sortBy,
        filters: {
            price: {
                min,
                max,
                activeRange:
                    filters.priceRange[1] === 0
                        ? [min, max]
                        : filters.priceRange,
            },
        },
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
