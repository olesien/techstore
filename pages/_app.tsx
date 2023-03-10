import "../styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import { AppProps } from "next/app";
import { SWRConfig } from "swr";
import fetchJson from "../lib/fetchJson";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../config/createEmotionCache";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ToastContainer } from "react-toastify";
//Bug prevention
config.autoAddCss = false;

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

declare module "@mui/material/styles" {
    interface Theme {
        status: {
            danger: React.CSSProperties["color"];
            background: React.CSSProperties["color"];
            yellow: React.CSSProperties["color"];
            elementBackground: React.CSSProperties["color"];
            header: React.CSSProperties["color"];
            contrast: React.CSSProperties["color"];
        };
    }

    interface Palette {
        neutral: Palette["primary"];
        secondary: Palette["primary"];
    }

    interface PaletteColor {
        darker?: string;
    }

    interface SimplePaletteColorOptions {
        darker?: string;
    }
    // interface PaletteColorOptions: {

    // }

    interface ThemeOptions {
        status: {
            danger: React.CSSProperties["color"];
            background: React.CSSProperties["color"];
            yellow: React.CSSProperties["color"];
            elementBackground: React.CSSProperties["color"];
            header: React.CSSProperties["color"];
            contrast: React.CSSProperties["color"];
        };
    }
}
export const theme = createTheme({
    status: {
        danger: "#DA3535",
        background: "#f0f0f0",
        elementBackground: "#9D9D9D",
        yellow: "#FFB82F",
        header: "#dedede",
        contrast: "#000",
    },
    palette: {
        primary: {
            main: "#4870FF",
            contrastText: "#fff",
        },
        secondary: {
            main: "#FFF",
            contrastText: "#000",
        },
    },
});

export default function App({
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
}: MyAppProps) {
    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
                <SWRConfig
                    value={{
                        fetcher: fetchJson,
                        onError: (err) => {
                            console.error(err);
                        },
                    }}
                >
                    <Component {...pageProps} />
                    <ToastContainer
                        position="top-right"
                        autoClose={4000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        draggable={false}
                        closeOnClick
                        pauseOnHover
                    />
                </SWRConfig>
            </ThemeProvider>
        </CacheProvider>
    );
}
