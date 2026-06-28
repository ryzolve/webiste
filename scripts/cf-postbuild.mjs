// Append long-cache rules for self-hosted fonts + static images to the
// vinext-generated dist/client/_headers. vinext only emits the /_next/static/*
// immutable rule (content-hashed); our public assets (fonts, images) otherwise
// fall back to Wrangler's default `max-age=0, must-revalidate`, which re-fetches
// the 48KB font on every visit and keeps PSI's "efficient cache lifetimes"
// insight flagged. Runs after `vinext build`; idempotent.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const path = 'dist/client/_headers';

if (!existsSync(path)) {
  console.error('[cf-postbuild] dist/client/_headers missing — did `vinext build` run first?');
  process.exit(0); // don't fail the build; vinext still deploys, just without our extra rules
}

let headers = readFileSync(path, 'utf8');

if (headers.includes('/fonts/')) {
  console.log('[cf-postbuild] font cache rules already present — skipping');
} else {
  headers =
    headers.trimEnd() +
    `

# Self-hosted fonts — stable filenames, safe to cache hard (rename the file to bust)
/fonts/*
  Cache-Control: public, max-age=31536000, immutable

# Static images
/img/*
  Cache-Control: public, max-age=2592000
`;
  writeFileSync(path, headers);
  console.log('[cf-postbuild] appended /fonts (immutable) + /img cache rules to _headers');
}
