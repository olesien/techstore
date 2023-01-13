import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";
import { categories, product_images, products } from "@prisma/client";
type Error = {
    message: string;
};

export type AllProducts = products & {
    product_images: product_images[];
    categories: categories;
};
export type AllProductsWithErrors = AllProducts[] | Error;

async function productListRoute(
    req: NextApiRequest,
    res: NextApiResponse<AllProductsWithErrors>
) {
    if (req.session.user && req.session.user.admin) {
        try {
            const products = await prisma.products.findMany({
                include: { product_images: { take: 1 }, categories: true },
            });

            return res.status(200).json(products);
        } catch (err: any) {
            return res.status(500).json({
                message: err.message,
            });
        }
    } else {
        return res.status(403).json({
            message: "Förbjuden",
        });
    }
}

export default withIronSessionApiRoute(productListRoute, sessionOptions);
