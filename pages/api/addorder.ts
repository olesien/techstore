import type { User } from "./user";

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { orders } from "@prisma/client";
import { ProductByIdType } from "./productsbyids/[ids]";
import { Basket as BasketType } from "../../hooks/useBasket";
import { Order } from "../checkout";

export type ProductWithBasket = (BasketType & ProductByIdType)[];

async function addorder(req: NextApiRequest, res: NextApiResponse) {
    const { form, products }: { form: Order; products: ProductWithBasket } =
        await req.body;
    console.log(form, products);

    //STEP 1: Verify account details are entered

    const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (
        !form.mail ||
        !form.mail.match(validRegex) ||
        !form.address ||
        form.address.length < 6 ||
        !form.postnumber ||
        String(form.postnumber).length < 6 ||
        !form.postcity ||
        form.postcity.length < 3
    ) {
        return res.status(400).json({ message: "The inputs are not correct" });
    }

    //STEP 2: Verify there are enough of each product

    const idArray = products.map((item) => item.id);

    const productsByIds = await prisma.products.findMany({
        select: {
            id: true,
            instock: true,
        },
        where: {
            id: {
                in: idArray,
            },
        },
    });

    const badQuantities = productsByIds.reduce(
        (list: { id: number; instock: number | null }[], product) => {
            const basket = products.find((item) => item.id === product.id);
            if (!basket) {
                list.push(product);
            } else if (!product?.instock || basket.quantity > product.instock) {
                list.push(product);
            }
            return list;
        },
        []
    );

    if (badQuantities.length > 0) {
        res.status(400).json({
            message: "One or more items are too high quantity",
            data: badQuantities,
        });
    }

    //STEP 3: Add order to orders

    try {
        let data: Partial<orders> &
            Pick<
                orders,
                "date" | "mail" | "postnumber" | "postcity" | "address"
            > = {
            date: new Date(Date.now()),
            mail: form.mail,
            postnumber: Number(form.postnumber),
            postcity: form.postcity,
            address: form.address,
        };

        if (req.session?.user && req.session?.user.isLoggedIn) {
            data.userid = req.session?.user.id;
        }

        if (form?.firstname) {
            data.firstname = form.firstname;
        }

        if (form?.lastname) {
            data.lastname = form.lastname;
        }

        if (form?.phonenumber) {
            data.phonenumber = form.phonenumber;
        }

        const order = await prisma.orders.create({
            data,
        });

        //STEP 4: Add products to orders_products

        const productList = products.map((product) => ({
            orderid: order.id,
            productid: product.id,
            quantity: product.quantity,
        }));

        const orderedProducts = await prisma.orders_products.createMany({
            data: productList,
        });

        console.log(orderedProducts);

        //STEP 5: Remove quantities from products
        products.forEach(async (product) => {
            const productWithQuantity = productsByIds.find(
                (item) => product.id === item.id
            );
            console.log(productWithQuantity);
            if (productWithQuantity && productWithQuantity?.instock) {
                const newQuantity =
                    productWithQuantity.instock - Number(product.quantity);
                const updatedProduct = await prisma.products.update({
                    where: {
                        id: product.id,
                    },
                    data: {
                        instock: newQuantity,
                    },
                });
                console.log(updatedProduct);
            } else {
                console.log(productWithQuantity, productsByIds, product);
            }
        });
        return res.json(order);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

export default withIronSessionApiRoute(addorder, sessionOptions);
