import React from "react";
import useUser from "../../lib/useUser";
import { useRouter } from "next/router";

export default function AdminRoute({ children }: { children: JSX.Element }) {
    const { user } = useUser({
        redirectTo: "/account/user",
    });
    const router = useRouter();
    if (user?.isLoggedIn === false || user?.admin === false) {
        router.push("/");
        return <></>;
    }
    return <>{children}</>;
}
