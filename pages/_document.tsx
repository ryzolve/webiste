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

          {/* Typography */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&family=Instrument+Serif&display=swap"
            rel="stylesheet"
          />

          {/* Analytics */}
          <script src="https://t.contentsquare.net/uxa/eb7f21fdbf12f.js" async />
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
