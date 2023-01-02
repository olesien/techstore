import prisma from "./prisma";
import translate from "./translations";
export async function getAllCategoryIds() {
    // const categories = [{ id: 1, title: "test" }];
    const categoryIds = await prisma.categories.findMany();
    return categoryIds.map((category) => {
        return {
            params: {
                id: String(category.id),
            },
        };
    });
}

export async function getCategory(id: string) {
    // Combine the data with the id and contentHtml
    const category = await prisma.categories.findFirst({
        where: { id: Number(id) },
        include: { categories_filters: true },
    });
    if (!category) {
        return {
            id: 0,
            title: "Odefinerat",
        };
    }
    return {
        id: String(category.id),
        title: translate(category.name),
        filters: category.categories_filters,
    };
}
