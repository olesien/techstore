import Head from "next/head";
import Header from "./Header";

export default function layout({
    toggleNav,
    children,
    nonav,
    title,
}: {
    toggleNav?: () => void;
    children: React.ReactNode;
    nonav?: boolean;
    title: string;
}) {
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/Logo.svg" />
                <title>{title}</title>
            </Head>
            <Header toggleNav={toggleNav} nonav={nonav} />

            <main>
                <div className="container">{children}</div>
            </main>
        </>
    );
}
