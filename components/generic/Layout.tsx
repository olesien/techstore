import Head from "next/head";
import Header from "./Header";
import ClipLoader from "react-spinners/ClipLoader";

export default function layout({
    toggleNav,
    children,
    title,
    nonav,
    loading,
    error,
}: {
    toggleNav?: () => void;
    children?: React.ReactNode;
    title: string;
    nonav?: boolean;
    loading?: boolean;
    error?: string;
}) {
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
