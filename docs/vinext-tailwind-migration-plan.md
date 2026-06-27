# Ryzolve website — vinext + Tailwind migration plan

_Last updated: 2026-06-27_

## Goal

Move the marketing site to a clean, standardized stack:

- **Runtime/build:** Next.js (pages router) on OpenNext → **vinext** (Cloudflare's Vite-based Next.js reimplementation), deployed to Cloudflare Workers via `vinext deploy`.
- **Styling:** the hand-written `src/redesign/site.css` (~3,000 lines of `rz-*` classes) → **Tailwind utility classes**. Custom CSS only where genuinely required — the WebGL shader canvas and a handful of keyframe animations Tailwind can't express.
- **Rendering:** every page **SSR** (uniform), instead of today's static/SSR mix.
- **No Bootstrap, ever.** (Already removed from the live build.)

The live site must stay **pixel-identical** through the whole migration. Each step is verified (`next build`/`vinext build` + in-browser screenshot) before pushing.

## Current state (the "from")

- Live path is already clean and isolated: `pages/*` → `src/redesign/*` (7 files) → `redesign/site.css`. No old-template code in the live bundle.
- Dead trees (`src/components` ~139 files, `src/queries`, `src/assets/scss`, `theme/themeOptions`, etc.) remain in the repo, unreferenced. Deletion is deferred (Phase 3).
- Deploy: push to `ryzolve-website/main` → CF Workers Build → Worker. The build command lives in the Cloudflare dashboard.

## Decisions locked

- ✅ Retire `scripts/verify-redesign.mjs` (custom guardrail, already drifting; superseded by `next build` + visual checks).
- ✅ All pages SSR for uniformity (minor per-request cost, negligible at this traffic).
- ✅ Tailwind-only; keep custom CSS for shaders + essential keyframes.
- ✅ Keep dead trees for now; delete in Phase 3.

## Phases

### Phase 1 — vinext runtime swap + uniform SSR
1. `npx vinext check` — non-destructive compatibility scan; record blockers (Next 14 → 16 API surface, getServerSideProps, `_document` getInitialProps, dynamic import, next/script).
2. `npx vinext init` — installs `vinext vite @vitejs/plugin-react`, generates `vite.config.ts`, `worker/index.ts`, fresh `wrangler.jsonc`; adds `"type": "module"`; renames CJS config (`next.config.js` → `.cjs`).
3. Swap scripts to `vinext dev/build/start` + `vinext deploy`. Remove the OpenNext layer (`open-next.config.ts`, `scripts/prepare-cloudflare-assets.mjs`, `*:cloudflare` scripts, `@opennextjs/cloudflare`, `.open-next` ignores).
4. Force SSR on the currently-static pages (add `getServerSideProps` returning `{ props: {} }`): `/`, `/document-management`, `/compliance-regulation`, `/claims-and-bills`, `/about-us`, `/contact`, `/calendly`, `/blank`, `/404`. (Training routes + sitemap already SSR.)
5. **Verify:** `vinext build` clean; run locally; screenshot every page = identical; SSR routes + forms + shaders work.
6. **Deploy item (user):** update the Cloudflare dashboard build command to the vinext build/deploy, and confirm the new worker entry. Until this is done, pushes won't deploy correctly.
7. Commit + deploy; confirm live.

**Rollback:** OpenNext config is in git history; revert the commit to restore the working OpenNext deploy.

### Phase 2 — Tailwind conversion (incremental)
1. Install + configure Tailwind (`tailwind.config`, `postcss.config.cjs`, base directives). Map the existing design tokens (brand navy `#0D5992`, coral `#FF774C`, off-white `#FAFAF7`, ink, spacing, radii, fonts) into the Tailwind theme so utilities match the current design exactly.
2. Keep a small `shaders.css` (or equivalent) for: the WebGL canvas wrapper, the `@keyframes` (word-swap, blob drift, line-reveal, marquee, count-up), and anything not expressible as utilities.
3. Convert **page by page / section by section** — replace `rz-*` classes with utilities in `site.tsx`, deleting the corresponding `site.css` rules as each section lands. Screenshot-diff each converted section against the current live look before moving on.
4. When `site.css` is reduced to only the shader/keyframe remainder, delete the rest.
5. **Verify:** build clean + full visual pass on every page/breakpoint.

**Rollback:** per-section commits; revert any section that regresses.

### Phase 3 — dead-tree cleanup (deferred)
Delete the unreferenced old template once Phases 1–2 are stable: `src/components`, `src/queries`, `src/hooks`, `src/assets/scss`, `theme/themeOptions`, unused `package.json` deps (bootstrap, swiper, plyr, glightbox, scrollcue, MUI/emotion, react-query, animate.css, etc.).

## Risks / watch items
- **vinext is experimental** (Next 16-targeted, ~94% API coverage). `vinext check` gates Phase 1.
- **Next 14 → 16 API gap** — `_document` getInitialProps and a few patterns need validation under vinext.
- **CF dashboard build command** must change in lockstep with Phase 1, or the deploy breaks (user action).
- **Tailwind fidelity** — the design must stay pixel-identical; token mapping up front + per-section visual diffs are the guardrail.
- **Google Fonts** load from CDN under vinext (we already use `<link>`, not `next/font`) — fine.

## Out of scope (for now)
- Deleting the dead template trees (Phase 3, later).
- Content/copy changes — purely a stack + styling migration; the rendered site stays the same.
