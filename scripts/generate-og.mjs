// Generates the 1200×630 Open Graph share image at public/og/ryzolve-og.png.
//
// One-off asset pipeline — `sharp` is not a project dependency. To regenerate:
//   npm i sharp --no-save && node scripts/generate-og.mjs
//
// The SVG below is the source of truth; tweak copy/colors here and re-run.

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const W = 1200;
const H = 630;

// Brand lockup — white chip behind the logo so the mark keeps its TRUE brand
// colors (navy top/bottom, coral middle) and reads on the dark background.
// Never recolor the logo; only the backing changes.
const lockup = `
  <rect x="56" y="56" width="296" height="80" rx="20" fill="#FFFFFF"/>
  <g transform="translate(80, 71) scale(0.32)">
    <path d="M216.457 46.4253H55.909L0 0H160.548L216.457 46.4253Z" fill="#0D5992"/>
    <path d="M0 99.0439H160.548L216.456 46.4253H55.9098L0 99.0439Z" fill="#FF774C"/>
    <path d="M216.443 155.821H55.8947L0 99.044H160.548L216.443 155.821Z" fill="#0D5992"/>
  </g>
  <text x="158" y="109" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="40" font-weight="700" fill="#0B0E12" letter-spacing="-0.5">Ryzolve</text>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0B2A45"/>
      <stop offset="0.55" stop-color="#0D5992"/>
      <stop offset="1" stop-color="#06223A"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.9" r="0.6">
      <stop offset="0" stop-color="#FF774C" stop-opacity="0.45"/>
      <stop offset="1" stop-color="#FF774C" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.1" cy="0.05" r="0.6">
      <stop offset="0" stop-color="#7FB2D9" stop-opacity="0.30"/>
      <stop offset="1" stop-color="#7FB2D9" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="${H}" fill="url(#glow2)"/>

  ${lockup}

  <text x="80" y="280" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="68" font-weight="800" fill="#FFFFFF" letter-spacing="-2">Provider management software</text>
  <text x="80" y="356" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="68" font-weight="800" letter-spacing="-2"><tspan fill="#FFFFFF">for Texas </tspan><tspan fill="#FFB59A">PAS agencies</tspan><tspan fill="#FFFFFF">.</tspan></text>

  <text x="80" y="430" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="32" font-weight="500" fill="#C9DDEC">Less paperwork. Fewer denials. Audit-ready by default.</text>

  <line x1="80" y1="500" x2="1120" y2="500" stroke="#FFFFFF" stroke-opacity="0.16" stroke-width="1"/>

  <text x="80" y="556" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="26" font-weight="600" fill="#FFFFFF">home.ryzolve.com</text>
  <text x="1120" y="556" text-anchor="end" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="24" font-weight="500" fill="#9FC0D8">HHSC-aligned · Home Health · Hospice · PAS</text>
</svg>`;

async function main() {
  const { default: sharp } = await import('sharp');
  // OG_OUT_DIR lets the one-off temp runner (with sharp installed elsewhere)
  // still write into the real project; defaults to project public/og.
  const outDir = process.env.OG_OUT_DIR || join(root, 'public', 'og');
  mkdirSync(outDir, { recursive: true });

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  const out = join(outDir, 'ryzolve-og.png');
  writeFileSync(out, png);
  console.log(`Wrote ${out} (${png.length} bytes, ${W}×${H})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
