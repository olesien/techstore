import type { User } from "./user";

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import Register from "../account/register";
import bcrypt from "bcrypt";

const saltRounds = 15;

async function registerRoute(req: NextApiRequest, res: NextApiResponse) {
    const { mail, password } = await req.body;
    bcrypt.hash(password, saltRounds, async function (err, hashedPassword) {
        // Store hash in your password DB.
        if (err) {
            return res.status(500).json({ message: "Encryption error" });
        }

        try {
            //Login

            const newUser = await prisma.users.create({
                data: {
                    mail,
                    password: hashedPassword,
                },
            });

            if (newUser) {
                const user = {
                    isLoggedIn: true,
                    login: newUser.mail,
                    avatarUrl: "",
                } as User;
                req.session.user = user;
                await req.session.save();
                res.json(user);
            } else {
                return res.status(404).json({ message: "Register failed" });
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    });
}

export default withIronSessionApiRoute(registerRoute, sessionOptions);
