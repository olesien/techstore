import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";
import {
    orders,
    orders_products,
    product_images,
    products,
} from "@prisma/client";
type Error = {
    message: string;
};

export type Order =
    | orders & {
          orders_products: (orders_products & {
              products: products & {
                  product_images: product_images[];
              };
          })[];
      };

export type OrdersWithErrors = Order[] | Error;

async function userDetailsRoute(
    req: NextApiRequest,
    res: NextApiResponse<OrdersWithErrors>
) {
    if (req.session.user) {
        const user = req.session.user;
        try {
            const userDetails = await prisma.orders.findMany({
                include: {
                    orders_products: {
                        include: {
                            products: {
                                include: { product_images: { take: 1 } },
                            },
                        },
                    },
                },
                orderBy: {
                    id: "desc",
                },
                where: {
                    userid: user.id,
                },
            });

            return res.json(userDetails);
        } catch (err: any) {
            return res.status(200).json({
                message: err.message,
            });
        }
    } else {
        return res.status(403).json({
            message: "Forbidden",
        });
    }
}

export default withIronSessionApiRoute(userDetailsRoute, sessionOptions);
