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
    if (!ids) return res.status(400).json({ message: "No ids passed" });
    const idArray = JSON.parse(String(ids)) as number[];
    console.log(idArray);
    //return res.json({ code: 404, error: "Not Found" });
    if (idArray.length === 0)
        return res.status(404).json({ message: "Not found" });
    console.log(ids);
    try {
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
            return res.status(404).json({ message: "Not found" });
        }

        return res.json({
            products,
        });
    } catch (err: any) {
        console.log(err);
        return res.status(500).json({ message: err?.message });
    }
}

export default productsByIds;
