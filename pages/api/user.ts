import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";

export type User = {
    isLoggedIn: boolean;
    login: string;
    avatarUrl: string;
    id: number;
    admin: boolean;
};

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
    if (req.session.user) {
        res.status(200).json({
            ...req.session.user,
            isLoggedIn: true,
        });
    } else {
        res.status(200).json({
            isLoggedIn: false,
            login: "",
            avatarUrl: "",
            id: 0,
            admin: false,
        });
    }
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
