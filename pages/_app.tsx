import Head from "next/head";
import Script from "next/script";
import Router from "next/router";
import type { AppProps } from "next/app";
import { Fragment, useEffect } from "react";
import { Toaster } from "sonner";

// The redesign ships its own self-contained stylesheet and is the only thing
// the live pages render. No legacy template CSS/providers are loaded.
import "redesign/site.css";

// Optional, env-driven SEO/analytics wiring. Leave the env vars unset to disable.
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

function MyApp({ Component, pageProps }: AppProps) {
  // GA4 SPA page_view on client-side route changes.
  useEffect(() => {
    if (!GA_ID || !Router?.events) return;
    const onRouteChange = (url: string) => {
      const w = window as unknown as { gtag?: (...args: unknown[]) => void };
      w.gtag?.("config", GA_ID, { page_path: url });
    };
    Router.events.on("routeChangeComplete", onRouteChange);
    return () => Router.events.off("routeChangeComplete", onRouteChange);
  }, []);

  // tawk.to live chat (ported from the old site). Injected via a plain DOM script
  // after the browser is idle — keeps it off the critical path (no FCP/LCP/TBT
  // regression) and doesn't depend on next/script's lazyOnload, which doesn't
  // fire reliably under vinext.
  useEffect(() => {
    if (document.getElementById("tawk-to-script")) return;
    const w = window as unknown as {
      Tawk_API?: Record<string, unknown>;
      Tawk_LoadStart?: Date;
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idleId: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const inject = () => {
      if (document.getElementById("tawk-to-script")) return;
      w.Tawk_API = w.Tawk_API || {};
      w.Tawk_LoadStart = new Date();
      const s = document.createElement("script");
      s.id = "tawk-to-script";
      s.async = true;
      s.src = "https://embed.tawk.to/69922ad73a5ba51c3b88cf76/1jhhfemu5";
      s.charset = "UTF-8";
      s.setAttribute("crossorigin", "*");
      document.body.appendChild(s);
    };
    if (w.requestIdleCallback) idleId = w.requestIdleCallback(inject, { timeout: 4000 });
    else timer = setTimeout(inject, 1500);
    return () => {
      if (idleId != null) w.cancelIdleCallback?.(idleId);
      if (timer) clearTimeout(timer);
    };
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

      <Component {...pageProps} />
      <Toaster richColors closeButton position="bottom-right" />
    </Fragment>
  );
}

export default MyApp;
