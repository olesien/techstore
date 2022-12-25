import "../styles/globals.scss";
import { AppProps } from "next/app";
import { SWRConfig } from "swr";
import fetchJson from "../lib/fetchJson";
import { createTheme, ThemeProvider } from "@mui/material/styles";

declare module "@mui/material/styles" {
    interface Theme {
        status: {
            danger: React.CSSProperties["color"];
            background: React.CSSProperties["color"];
            yellow: React.CSSProperties["color"];
            elementBackground: React.CSSProperties["color"];
        };
    }

    interface Palette {
        neutral: Palette["primary"];
    }

    interface PaletteOptions {
        neutral: PaletteOptions["primary"];
    }

    interface PaletteColor {
        darker?: string;
    }

    interface SimplePaletteColorOptions {
        darker?: string;
    }

    interface ThemeOptions {
        status: {
            danger: React.CSSProperties["color"];
            background: React.CSSProperties["color"];
            yellow: React.CSSProperties["color"];
            elementBackground: React.CSSProperties["color"];
        };
    }
}

// const theme = createTheme({
//     palette: {
//         primary: {
//             // Purple and green play nicely together.
//             main: "#4870FF",
//         },
//         // alert: {
//         //     // This is green.A700 as hex.
//         //     main: "#C99B26",
//         // },
//     },
// });

export const theme = createTheme({
    status: {
        danger: "#DA3535",
        background: "#E9E9E9",
        elementBackground: "#9D9D9D",
        yellow: "#FFB82F",
    },
    palette: {
        primary: {
            main: "#4870FF",
            contrastText: "#fff",
        },
        neutral: {
            main: "#FFF",
            contrastText: "#000",
        },
    },
});

export default function App({ Component, pageProps }: AppProps) {
    return (
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
            </SWRConfig>
        </ThemeProvider>
    );
}
