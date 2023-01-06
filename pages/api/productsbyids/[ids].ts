import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import {
    product_images,
    product_specs,
    products,
    reviews,
    users,
} from "@prisma/client";

type Error = {
    code: number;
    error: string;
};

export type ProductByIdTypeError =
    | (products & { product_images: product_images[] })
    | Error;

export type ProductByIdType = products & { product_images: product_images[] };

async function productsByIds(req: NextApiRequest, res: NextApiResponse) {
    const { ids } = req.query;
    if (!ids) return res.json({ code: 404, error: "Not Found" });
    const idArray = JSON.parse(String(ids)) as number[];
    console.log(idArray);
    //return res.json({ code: 404, error: "Not Found" });
    if (idArray.length === 0)
        return res.json({ code: 404, error: "Not Found" });
    console.log(ids);
    const products = await prisma.products.findMany({
        include: {
            product_images: { take: 1 },
        },
        where: {
            id: {
                in: idArray,
            },
        },
    });

    if (products.length < 1) {
        return { code: 404, error: "Not Found" };
    }

    return res.json({
        products,
    });
}

export default productsByIds;
