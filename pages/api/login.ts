import type { User } from "./user";

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
    const { mail, password } = await req.body;

    try {
        //Login

        const userQuery = await prisma.users.findFirst({
            where: { mail },
        });

        if (userQuery) {
            bcrypt.compare(
                password,
                userQuery.password,
                async function (err, matches) {
                    // result == true
                    if (err) {
                        return res
                            .status(500)
                            .json({ message: (err as Error).message });
                    }
                    if (matches) {
                        const user = {
                            isLoggedIn: true,
                            login: userQuery.mail,
                            avatarUrl: "",
                            id: userQuery.id,
                        } as User;
                        req.session.user = user;
                        await req.session.save();
                        res.json(user);
                    } else {
                        return res
                            .status(400)
                            .json({ message: "Password is incorrect" });
                    }
                }
            );
        } else {
            return res.status(404).json({ message: "Mail not found" });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
