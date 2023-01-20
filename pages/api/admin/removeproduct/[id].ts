import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next/types";
import { sessionOptions } from "../../../../lib/session";
import prisma from "../../../../lib/prisma";
import fs from "fs";
async function removeProductRoute(req: NextApiRequest, res: NextApiResponse) {
    if (req.session.user && req.session.user.admin) {
        const { id } = req.query;
        const productId = Number(id);
        try {
            //Because deletedPics does not return the actual data...
            const pics = await prisma.product_images.findMany({
                where: {
                    productid: productId,
                },
            });

            //Delete specs
            const deletedPics = await prisma.product_images.deleteMany({
                where: {
                    productid: productId,
                },
            });

            //Delete specs
            const deletedSpecs = await prisma.product_specs.deleteMany({
                where: {
                    productid: productId,
                },
            });

            //Delete compats
            const deletedCompats = await prisma.product_compat.deleteMany({
                where: {
                    productid1: productId,
                },
            });
            const deletedCompats2 = await prisma.product_compat.deleteMany({
                where: {
                    productid2: productId,
                },
            });
            //Delete product
            const deletedProduct = await prisma.products.delete({
                where: {
                    id: productId,
                },
            });

            //Delete from FS
            for (let i = 0; i < pics.length; i++) {
                const pic = pics[i];
                const fileName = pic.image;
                const category = deletedProduct.categoryid;
                fs.unlink(
                    `./public/images/categories/${category}/${fileName}`,
                    (err) => {
                        if (err) throw err;
                    }
                );
            }

            return res.status(200).json(deletedProduct);
        } catch (err: any) {
            console.log(err);
            return res.status(500).json({ message: err?.message });
        }
    } else {
        console.log("Tillåtelse nekades.");
    }
}
export default withIronSessionApiRoute(removeProductRoute, sessionOptions);
