import { categories_filters, reviews } from "@prisma/client";
import prisma from "./prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

export type OtherFilters = {
    [key: string]: {
        value: string;
        list: { content: string; id: number }[];
    };
};

export async function getProductsBySearch(
    query: string,
    page: number,
    sortBy: number
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

    try {
        const products = await prisma.products.findMany({
            where: {
                name: {
                    search: query,
                },
            },
            include: {
                product_images: { take: 1 },
                product_compat_product_compat_productid1Toproducts: true,
                product_compat_product_compat_productid2Toproducts: true,
            },
            skip: page * 10 - 10,
            take: 10,
            orderBy,
        });

        const pageCount = Math.ceil((await prisma.users.count()) / 10);
        const avg = await prisma.reviews.groupBy({
            by: ["productid"],
            _avg: {
                rating: true,
            },
        });

        return {
            page,
            pageCount,
            sortBy,
            products: products.map((product) => ({
                ...product,
                product_images: product.product_images.map(
                    (image) => image.image
                ),
                review_avg:
                    avg.find((review) => review.productid === product.id)?._avg
                        .rating ?? 0,
                product_compat:
                    product.product_compat_product_compat_productid1Toproducts.concat(
                        product.product_compat_product_compat_productid2Toproducts
                    ),
            })),
        };
    } catch (err: any) {
        return {
            code: 500,
            error: err.message,
        };
    }
}
