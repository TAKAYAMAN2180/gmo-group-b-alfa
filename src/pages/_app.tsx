import type {AppProps} from 'next/app'
import {SessionProvider} from "next-auth/react";
import "../../public/bootstrap/css/bootstrap.min.css";

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
            </SessionProvider>
        </>
    )
}

export default MyApp
