import Head from "next/head";
import Script from "next/script";
import type { AppProps } from "next/app";
import { Fragment, useEffect } from "react";
import ThemeProvider from "theme/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

// The redesign ships its own self-contained stylesheet. The legacy template
// CSS (bootstrap SCSS, swiper/plyr/glightbox/scrollcue, animate.css) and the
// bootstrap dropdown init are intentionally not loaded — the live pages use
// none of them. Those files still exist in the repo for now.
import "redesign/site.css";

// Optional, env-driven SEO/analytics wiring. Leave the env vars unset to disable.
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  // GA4 SPA page_view on client-side route changes.
  useEffect(() => {
    if (!GA_ID) return;
    const onRouteChange = (url: string) => {
      const w = window as unknown as { gtag?: (...args: unknown[]) => void };
      w.gtag?.("config", GA_ID, { page_path: url });
    };
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Router = require("next/router").default;
    Router.events.on("routeChangeComplete", onRouteChange);
    return () => Router.events.off("routeChangeComplete", onRouteChange);
  }, []);

  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        {/* Default title — pages override via next/head */}
        <title>Ryzolve — Provider Management Software for Texas Care Agencies</title>
        <meta
          name="description"
          content="Provider management software for PAS, Home Health, and Hospice agencies. Less paperwork. Fewer denials. Audit-ready by default."
        />
        {GSC_VERIFICATION && (
          <meta name="google-site-verification" content={GSC_VERIFICATION} />
        )}
      </Head>

      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', { send_page_view: true });`}
          </Script>
        </>
      )}

      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Component {...pageProps} />
          <Toaster richColors closeButton position="bottom-right" />
        </ThemeProvider>
      </QueryClientProvider>
    </Fragment>
  );
}

export default MyApp;
