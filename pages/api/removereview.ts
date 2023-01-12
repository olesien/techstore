import type { User } from "./user";

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

async function addreview(req: NextApiRequest, res: NextApiResponse) {
    const { id } = await req.body;
    if (!req.session.user || req.session.user.isLoggedIn == false) {
        return res.status(403).json({ message: "Förbjuden" });
    }
    const { id: userid } = req.session.user;
    const exists = await prisma.reviews.findFirst({
        where: { userid, id },
    });
    if (!exists) {
        return res.status(403).json({ message: "Du har äger inte denna!" });
    }
    try {
        const deletedReview = await prisma.reviews.delete({
            where: {
                id,
            },
        });
        return res.status(200).json(deletedReview);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

export default withIronSessionApiRoute(addreview, sessionOptions);
