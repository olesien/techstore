import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import type { User } from "./user";

function logoutRoute(req: NextApiRequest, res: NextApiResponse<User>) {
    req.session.destroy();
    res.status(200).json({
        isLoggedIn: false,
        login: "",
        avatarUrl: "",
        id: 0,
    });
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions);
