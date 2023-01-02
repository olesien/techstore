import { categories_filters } from "@prisma/client";
import prisma from "./prisma";
type Filters = {
    priceRange: [min: number, max: number];
    otherFilters: { [index: string]: string };
};

export type OtherFilters = {
    [key: string]: {
        value: string;
        list: { content: string; id: number }[][];
    };
};

export async function getProducts(
    id: string,
    page: number,
    sortBy: number,
    filters: Filters,
    categoryFilters: categories_filters[] | undefined
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

    let product_specs = {};

    if (Object.keys(filters.otherFilters).length >= 1) {
        product_specs = {
            some: { content: { in: Object.values(filters.otherFilters) } },
        };
    }

    console.log(product_specs);

    const products = await prisma.products.findMany({
        where: {
            categoryid: Number(id),
            price,
            product_specs,
        },
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

    let filterData = await prisma.products.findMany({
        where: { categoryid: Number(id) },
        orderBy: {
            price: "desc",
        },
        include: { product_specs: true },
    });

    const otherFilters: OtherFilters = {};
    if (categoryFilters) {
        for (let i = 0; i < categoryFilters.length; i++) {
            const filter = categoryFilters[i];
            const value = filter.value;
            let list = await prisma.products.findMany({
                where: { categoryid: Number(id) },
                select: {
                    product_specs: {
                        select: { content: true, id: true },
                        where: {
                            title: value,
                        },
                    },
                },
                orderBy: {
                    price: "desc",
                },
            });
            const filteredList = list.map((product) =>
                product.product_specs.map((field) => ({
                    id: Number(field.id),
                    content: field.content,
                }))
            );
            otherFilters[value] = {
                list: filteredList,
                value: filters.otherFilters[value] ?? "unselected",
            };
        }
    }

    //console.log(products);
    //console.log(avg);
    const min = filterData[filterData.length - 1].price;
    const max = filterData[0].price;
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
            otherFilters,
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
