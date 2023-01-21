import Head from "next/head";
import Header from "./Header";
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Layout({
    setShowNav,
    toggleNav,
    children,
    title,
    nonav,
    loading,
    error,
}: {
    setShowNav?: React.Dispatch<React.SetStateAction<boolean>>;
    toggleNav?: () => void;
    children?: React.ReactNode;
    title: string;
    nonav?: boolean;
    loading?: boolean;
    error?: string;
}) {
    const router = useRouter();
    useEffect(() => {
        if (setShowNav) {
            setShowNav(false);
        }
    }, [router?.asPath]);
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/Logo.svg" />
                <title>{title}</title>
            </Head>
            <Header toggleNav={toggleNav} nonav={nonav} />

            <main>
                <div className="container">
                    {loading ? (
                        <div className="loading">
                            <ClipLoader />
                        </div>
                    ) : error ? (
                        <div className="error">
                            <p>{error}</p>
                        </div>
                    ) : (
                        children
                    )}
                </div>
            </main>
        </>
    );
}
