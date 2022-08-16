import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/layout/header/Header";
import { wrapper } from "../store/index";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Header />
            <div id="portal" />
            <Component {...pageProps} />
        </>
    );
}

export default wrapper.withRedux(MyApp);
