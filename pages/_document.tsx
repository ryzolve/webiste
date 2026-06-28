import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

export default class ryzolve extends Document {
  render() {
    return (
      <Html lang="en" style={{ scrollBehavior: "smooth" }}>
        <Head>
          {/* Favicons */}
          <link rel="icon" type="image/svg+xml" href="/img/favicon.svg" />
          <link rel="icon" type="image/png" sizes="96x96" href="/img/favicon.png" />
          <link rel="shortcut icon" href="/img/favicon.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/img/favicon.png" />
          <link rel="mask-icon" href="/img/favicon.svg" color="#0D5992" />
          <link rel="manifest" href="/site.webmanifest" />

          {/* Typography — self-hosted (see @font-face in site.css). Preload the
              variable Inter file: it's the body + hero font, so it's on the
              critical render path and worth fetching at high priority. */}
          <link
            rel="preload"
            href="/fonts/redesign/inter-var.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// ======================================================================

ryzolve.getInitialProps = async (ctx: DocumentContext) => {
  const originalRenderPage = ctx.renderPage;

  // Run the React rendering logic synchronously
  ctx.renderPage = () =>
    originalRenderPage({
      // Useful for wrapping the whole react tree
      enhanceApp: (App) => App,
      // Useful for wrapping in a per-page basis
      enhanceComponent: (Component) => Component,
    });

  // Run the parent `getInitialProps`, it now includes the custom `renderPage`
  const initialProps = await Document.getInitialProps(ctx);

  return { ...initialProps };
};
