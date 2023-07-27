import { SessionProvider } from "next-auth/react";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
