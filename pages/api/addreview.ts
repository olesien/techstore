import type { User } from "./user";

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

async function addreview(req: NextApiRequest, res: NextApiResponse) {
    const { content, rating, productid } = await req.body;
    if (!req.session.user || req.session.user.isLoggedIn == false) {
        return res.status(403).json({ message: "Förbjuden" });
    }
    const { id: userid } = req.session.user;
    console.log(content, rating);
    const exists = await prisma.reviews.findFirst({
        where: { userid, productid },
    });
    if (exists) {
        return res
            .status(409)
            .json({ message: "Du har redan en recension på denna produkt!" });
    }

    if (
        !content ||
        content.length < 3 ||
        content.length > 300 ||
        !rating ||
        rating < 1 ||
        rating > 5
    ) {
        return res.status(403).json({ message: "Inkorrekt data" });
    }

    // const newUser = await prisma.users.create({
    //     data,
    // });
    try {
        const review = await prisma.reviews.create({
            data: {
                userid,
                content,
                rating,
                productid,
                timeposted: new Date(Date.now()),
            },
        });
        return res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

export default withIronSessionApiRoute(addreview, sessionOptions);
