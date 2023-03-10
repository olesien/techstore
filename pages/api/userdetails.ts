import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";
import { Error } from "../../lib/fetchJson";

export type UserDetails =
    | {
          firstname: string | null;
          lastname: string | null;
          mail: string;
          postnumber: number | null;
          postcity: string | null;
          phonenumber: string | null;
          address: string | null;
      }
    | null
    | Error;

async function userDetailsRoute(
    req: NextApiRequest,
    res: NextApiResponse<UserDetails>
) {
    if (req.session.user) {
        const user = req.session.user;
        try {
            const userDetails = await prisma.users.findFirst({
                select: {
                    firstname: true,
                    lastname: true,
                    mail: true,
                    postnumber: true,
                    postcity: true,
                    phonenumber: true,
                    address: true,
                },
                where: {
                    id: user.id,
                    mail: user.login,
                },
            });

            if (!userDetails) {
                return { code: 404, error: "Hittades ej" };
            }

            return res.status(200).json(userDetails);
        } catch (err: any) {
            return res.status(500).json({
                message: err.message,
            });
        }
    } else {
        res.status(200).json(null);
    }
}

export default withIronSessionApiRoute(userDetailsRoute, sessionOptions);
