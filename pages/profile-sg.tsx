import React from "react";
import useUser from "../lib/useUser";

// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts
export default function SgProfile() {
    const { user } = useUser({
        redirectTo: "/login",
    });

    return (
        <div>
            <h1>Your name is: {user?.login}</h1>
        </div>
    );
}
