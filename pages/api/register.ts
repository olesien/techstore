import type { User } from "./user";

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";
import { saltRounds } from "../../lib/utils";

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
            return res.status(500).json({ message: "Kryptering misslyckades" });
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
                .json({ message: "Ett eller flera fält stämde ej" });
        }

        try {
            //Register

            //Check so mail does not exist?
            const exists = await prisma.users.findFirst({
                where: { mail },
            });

            if (exists) {
                return res
                    .status(403)
                    .json({ message: "Detta mail finns redan" });
            }

            //Create user
            const newUser = await prisma.users.create({
                data,
            });

            if (newUser) {
                const user = {
                    isLoggedIn: true,
                    login: newUser.mail,
                    avatarUrl: "",
                    id: newUser.id,
                    admin: false,
                } as User;
                req.session.user = user;
                await req.session.save();
                res.status(200).json(user);
            } else {
                return res
                    .status(404)
                    .json({ message: "Registrering misslyckades" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internt server fel inträffade" });
        }
    });
}

export default withIronSessionApiRoute(registerRoute, sessionOptions);
