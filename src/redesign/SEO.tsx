import Head from 'next/head';

/* ════════════════════════════════════════════════════════════════
   Per-page SEO component.
   Renders title / description / canonical / Open Graph / Twitter
   / robots / favicon / theme-color / icon set.
   ════════════════════════════════════════════════════════════════ */

// The marketing site is served at the apex ryzolve.com. Override with
// NEXT_PUBLIC_SITE_URL if it ever moves.
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ryzolve.com').replace(/\/$/, '');
const SITE_NAME = 'Ryzolve';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og/ryzolve-og.png`;

interface Props {
  title: string;
  description: string;
  /** Path under the site, e.g. "/about-us". Leading slash required. */
  path: string;
  /** Absolute or relative URL. Falls back to a brand image. */
  image?: string;
  /** Page-specific keywords. */
  keywords?: string[];
  /** Set to true on internal/preview pages. */
  noindex?: boolean;
  /** Open Graph type. Defaults to "website". */
  type?: 'website' | 'article';
}

export default function SEO({
  title,
  description,
  path,
  image,
  keywords,
  noindex,
  type = 'website',
}: Props) {
  const canonical = `${SITE_URL}${path === '/' ? '/' : path}`;
  const og = image ? (image.startsWith('http') ? image : `${SITE_URL}${image}`) : DEFAULT_OG_IMAGE;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} · ${SITE_NAME}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <link rel="canonical" href={canonical} />

      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={og} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:alt" content={`${SITE_NAME} — ${title}`} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={og} />
      <meta name="twitter:image:alt" content={`${SITE_NAME} — ${title}`} />

      {/* Brand color (shown in mobile browser chrome) */}
      <meta name="theme-color" content="#0D5992" media="(prefers-color-scheme: light)" />
      <meta name="theme-color" content="#0B0E12" media="(prefers-color-scheme: dark)" />
      <meta name="msapplication-TileColor" content="#0D5992" />
      <meta name="application-name" content={SITE_NAME} />
      <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
      <meta name="format-detection" content="telephone=no" />
    </Head>
  );
}
