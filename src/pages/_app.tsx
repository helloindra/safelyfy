import "../styles/globals.css"
import type { AppProps } from "next/app"
import { NextUIProvider, createTheme } from "@nextui-org/react"
import { RecoilRoot } from "recoil"

function MyApp({ Component, pageProps }: AppProps) {
    const theme = createTheme({
        type: "light", // it could be "light" or "dark"
        theme: {
            colors: {
                primary: "#4f46e5",
                secondary: "#64748b",
            },
            fonts: {
                sans: "'Inter', sans-serif",
            },
            fontSizes: {
                xs: "0.75rem" /* 12px */,
                sm: "0.875rem" /* 14px */,
                base: "0.95rem" /* 16px */,
                md: "1rem" /* 16px */,
                lg: "1.125rem" /* 18px */,
                xl: "1.25rem" /* 20px */,
                xl2: "1.5rem" /* 24px */,
                xl3: "1.875rem" /* 30px */,
                xl4: "2.25rem" /* 36px */,
                xl5: "3rem" /* 48px */,
                xl6: "3.75rem" /* 60px */,
                xl7: "4.5rem" /* 72px */,
                xl8: "6rem" /* 96px */,
                xl9: "8rem" /* 128px */,
            },
        },
    })

    return (
        <RecoilRoot>
            <NextUIProvider theme={theme}>
                <Component {...pageProps} />
            </NextUIProvider>
        </RecoilRoot>
    )
}

export default MyApp
