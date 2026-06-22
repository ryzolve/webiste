import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { Fragment, useEffect, useState } from "react";
import ThemeProvider from "theme/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

// Optional, env-driven SEO/analytics wiring. Leave the env vars unset to disable.
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// animate css
import "animate.css";
// import swiper css
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
// video player css
import "plyr-react/plyr.css";
// glightbox css
import "glightbox/dist/css/glightbox.css";
// custom scrollcue css
import "plugins/scrollcue/scrollCue.css";
// Bootstrap and custom scss
import "assets/scss/style.scss";
import "redesign/site.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  // Start with `false` so SSR/SSG renders the page (and its per-page <Head>
  // SEO tags) on first paint instead of a blank loader. The old `loading=true`
  // default meant search engines and OG scrapers saw an empty page.
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // load bootstrap functionality
      (() => {
        const bootstrap = require("bootstrap");

        // Enables multilevel dropdown
        (function (bs) {
          const CLASS_NAME = "has-child-dropdown-show";

          bs.Dropdown.prototype.toggle = (function (_original) {
            return function () {
              document.querySelectorAll("." + CLASS_NAME).forEach(function (e) {
                e.classList.remove(CLASS_NAME);
              });
              // @ts-ignore
              let dd = this._element
                .closest(".dropdown")
                .parentNode.closest(".dropdown");
              for (
                ;
                dd && dd !== document;
                dd = dd.parentNode.closest(".dropdown")
              ) {
                dd.classList.add(CLASS_NAME);
              }
              // @ts-ignore
              return _original.call(this);
            };
          })(bs.Dropdown.prototype.toggle);

          document.querySelectorAll(".dropdown").forEach(function (dd) {
            dd.addEventListener("hide.bs.dropdown", function (e) {
              // @ts-ignore
              if (this.classList.contains(CLASS_NAME)) {
                // @ts-ignore
                this.classList.remove(CLASS_NAME);
                e.preventDefault();
              }
              e.stopPropagation();
            });
          });
        })(bootstrap);
      })();
    }
  }, []);

  // scroll animation added
  useEffect(() => {
    (async () => {
      const scrollCue = (await import("plugins/scrollcue")).default;
      scrollCue.init({ interval: -400, duration: 700, percentage: 0.8 });
      scrollCue.update();
    })();
  }, [pathname]);

  useEffect(() => {
    setLoading(false);
  }, []);

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
          {/* <div className="page-loader" /> */}
          {loading ? (
            <div className="page-loader" />
          ) : (
            <Component {...pageProps} />
          )}
          <Toaster richColors closeButton position="bottom-right" />
        </ThemeProvider>
      </QueryClientProvider>
    </Fragment>
  );
}

export default MyApp;
