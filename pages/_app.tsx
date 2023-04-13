import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Montserrat } from "@next/font/google";
const mainFont = Montserrat({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' key='favicon' />
        <style>{`
          body {
            font-family: ${mainFont.style.fontFamily};
          }
        `}</style>
      </Head>

      <Component {...pageProps} />
    </>
  );
}
