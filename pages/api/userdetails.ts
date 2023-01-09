import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";
type Error = {
    code: number;
    error: string;
};

export type UserDetails =
    | {
          id: number;
          name: string | null;
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
        // in a real world application you might read the user id from the session and then do a database request
        // to get more information on the user if needed
        const user = req.session.user;
        try {
            const userDetails = await prisma.users.findFirst({
                select: {
                    id: true,
                    name: true,
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
                return { code: 404, error: "Not Found" };
            }

            return res.json(userDetails);
        } catch (err: any) {
            return res.json({
                code: 500,
                error: err.message,
            });
        }
    } else {
        res.json(null);
    }
}

export default withIronSessionApiRoute(userDetailsRoute, sessionOptions);
