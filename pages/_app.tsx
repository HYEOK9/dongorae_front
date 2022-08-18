import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppLayout from "../components/layout/AppLayout";
import { wrapper } from "../store/index";
import Head from "next/head";
import Script from "next/script";

const APPKEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta name="viewport" content="viewport-fit=cover" />
            </Head>
            <Script
                src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${APPKEY}&libraries=services,clusterer&autoload=false`}
                strategy="beforeInteractive"
            />

            <AppLayout>
                <div id="portal" />
                <Component {...pageProps} />
            </AppLayout>
        </>
    );
}

export default wrapper.withRedux(MyApp);
