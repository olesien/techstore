import type { User } from "./user";

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";

const saltRounds = 15;

export interface Register {
    mail: string;
    password: string;
    firstname: string;
    lastname?: string;
    address?: string;
    postnumber?: number;
    postcity?: string;
    phonenumber?: string;
}

async function registerRoute(req: NextApiRequest, res: NextApiResponse) {
    const {
        mail,
        firstname,
        lastname,
        address,
        postnumber,
        postcity,
        phonenumber,
        password,
    } = await req.body;
    bcrypt.hash(password, saltRounds, async function (err, hashedPassword) {
        // Store hash in your password DB.
        if (err) {
            return res.status(500).json({ message: "Encryption error" });
        }

        const data: Register = { mail, password: hashedPassword, firstname };
        if (lastname) data.lastname = lastname;
        if (address) data.address = address;
        if (postnumber) data.postnumber = Number(postnumber);
        if (phonenumber) data.phonenumber = phonenumber;
        if (postcity) data.postcity = postcity;

        const validRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (
            !mail ||
            !mail.match(validRegex) ||
            !password ||
            password.length < 4 ||
            !firstname ||
            firstname.length < 4
        ) {
            return res
                .status(400)
                .json({ message: "The inputs are not correct" });
        }

        try {
            //Login

            //Check so mail does not exist?

            const newUser = await prisma.users.create({
                data,
            });

            if (newUser) {
                const user = {
                    isLoggedIn: true,
                    login: newUser.mail,
                    avatarUrl: "",
                    id: newUser.id,
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
