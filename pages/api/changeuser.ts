import type { User } from "./user";

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";
import { Register } from "./register";
import { saltRounds } from "../../lib/utils";

async function changeUser(req: NextApiRequest, res: NextApiResponse) {
    return new Promise(async (resolve) => {
        if (
            !req.session.user ||
            req.session.user.isLoggedIn == false ||
            !req.session.user?.id
        ) {
            return res.status(403).json({ message: "Förbjuden" });
        }
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
        bcrypt.hash(
            password ?? "ABC",
            saltRounds,
            async function (err, hashedPassword) {
                // Store hash in your password DB.
                if (err) {
                    resolve(500);
                    return res
                        .status(500)
                        .json({ message: "Kryptering misslyckades" });
                }

                const data: Partial<Register> = {
                    lastname: lastname ?? null,
                    address: address ?? null,
                    postnumber: postnumber ?? null,
                    phonenumber: phonenumber ?? null,
                    postcity: postcity ?? null,
                };
                if (mail) data.mail = mail;
                if (firstname) data.firstname = firstname;
                if (password) data.password = hashedPassword;

                const validRegex =
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

                if (
                    (mail && !mail.match(validRegex)) ||
                    (password && password.length < 4) ||
                    (firstname && firstname.length < 4)
                ) {
                    resolve(400);
                    return res
                        .status(400)
                        .json({ message: "Ett eller flera fält stämde ej" });
                }

                try {
                    //Check so mail does not exist?
                    const exists = await prisma.users.findFirst({
                        where: { mail },
                    });

                    if (exists && exists.id !== req.session.user?.id) {
                        resolve(403);
                        return res
                            .status(403)
                            .json({ message: "Detta mail finns redan" });
                    }

                    //Update user
                    const user = await prisma.users.update({
                        where: {
                            id: req.session.user?.id,
                        },
                        data,
                    });

                    if (user) {
                        const session = {
                            isLoggedIn: true,
                            login: user.mail,
                            avatarUrl: "",
                            id: user.id,
                            admin: user.admin,
                        } as User;
                        req.session.user = session;
                        await req.session.save();
                        resolve(200);
                        return res.status(200).json(user);
                    } else {
                        resolve(404);
                        return res
                            .status(404)
                            .json({ message: "Registrering misslyckades" });
                    }
                } catch (error) {
                    console.log(error);
                    resolve(500);
                    return res.status(500).json({
                        message: "Internt server fel inträffade",
                    });
                }
            }
        );
    });
}

export default withIronSessionApiRoute(changeUser, sessionOptions);
