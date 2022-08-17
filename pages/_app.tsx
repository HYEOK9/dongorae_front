import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppLayout from "../components/layout/AppLayout";
import { wrapper } from "../store/index";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta name="viewport" content="viewport-fit=cover" />
            </Head>
            <AppLayout>
                <div id="portal" />
                <Component {...pageProps} />
            </AppLayout>
        </>
    );
}

export default wrapper.withRedux(MyApp);
