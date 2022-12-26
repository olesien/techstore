import fs from "fs";
import path from "path";
const categoryDirectory = path.join(process.cwd(), "category");
export function getAllCategoryIds() {
    const categories = [{ id: 1, title: "test" }];
    return categories.map((category) => {
        return {
            params: {
                id: String(category.id),
            },
        };
    });
}

export async function getCategory(id: string) {
    // Combine the data with the id and contentHtml
    return {
        id: Number(id),
        title: "Hi",
    };
}
