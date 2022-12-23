import type { User } from "./user";

import { Octokit } from "octokit";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
const octokit = new Octokit();

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
    const { username } = await req.body;

    try {
        //Login

        const userQuery = await prisma.users.findFirst({
            where: { name: username },
        });

        if (userQuery) {
            const user = {
                isLoggedIn: true,
                login: userQuery.name,
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
