import Head from "next/head";
import Header from "./Header";

export default function layout({
    toggleNav,
    children,
}: {
    toggleNav: () => void;
    children: React.ReactNode;
}) {
    return (
        <>
            <Head>
                <title>With Iron Session</title>
            </Head>
            <Header toggleNav={toggleNav} />

            <main>
                <div className="container">{children}</div>
            </main>
        </>
    );
}
