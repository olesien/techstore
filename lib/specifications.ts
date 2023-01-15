import prisma from "./prisma";

export async function getAllSpecTypes() {
    const specTypes = await prisma.product_specs.groupBy({
        by: ["title"],
    });
    return specTypes;
}
