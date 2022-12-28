import type { User } from "./user";

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
    const { mail } = await req.body;

    try {
        //Login

        const userQuery = await prisma.users.findFirst({
            where: { mail },
        });

        if (userQuery) {
            const user = {
                isLoggedIn: true,
                login: userQuery.mail,
                avatarUrl: "",
            } as User;
            req.session.user = user;
            await req.session.save();
            res.json(user);
        } else {
            return res.status(404).json({ message: "Not found" });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
