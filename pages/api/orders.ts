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

import { Error } from "../../lib/fetchJson";

export type Order =
    | orders & {
          orders_products: (orders_products & {
              products: products & {
                  product_images: product_images[];
              };
          })[];
      };

export type OrdersWithErrors = Order[] | Error;

async function ordersRoute(
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

            return res.status(200).json(userDetails);
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

export default withIronSessionApiRoute(ordersRoute, sessionOptions);
