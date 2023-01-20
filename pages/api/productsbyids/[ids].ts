import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { product_images, products } from "@prisma/client";

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
    if (!ids)
        return res.status(400).json({ message: "Inga idn skickades med" });
    const idArray = JSON.parse(String(ids)) as number[];
    console.log(idArray);
    if (idArray.length === 0) return res.status(200).json({ products: [] });
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
            return res.status(404).json({ message: "Hittades ej" });
        }

        return res.status(200).json({
            products,
        });
    } catch (err: any) {
        console.log(err);
        return res.status(500).json({ message: err?.message });
    }
}

export default productsByIds;
