import "../styles/globals.css";
import Head from "next/head";
import { TokenProvider } from "../context/TokenContext";

export default function App({ Component, pageProps }) {
  return (
    <TokenProvider>
      <Head>
        <link rel="preconnect" href="https://stijndv.com" />
        <link
          rel="stylesheet"
          href="https://stijndv.com/fonts/Eudoxus-Sans.css"
        />
      </Head>
      <Component {...pageProps} />
    </TokenProvider>
  );
}
