# Website Forms — Site Cutover Plan (subsystem 2 of 3)

**Target:** `website-redesign-cutover`, branch `codex/website-redesign-cutover`. Next.js 14 (CF Workers via OpenNext). Forms in `src/redesign/site.tsx`. API subsystem (1 of 3) is PR'd → ryzolve-api `feat/website-forms`.

**Goal:** repoint the home **lead-magnet** + **contact** forms from old Strapi to the new ryzolve-api `/website/*` endpoints, with Turnstile + consent + honeypot + REAL error handling (fix the fake-success bug) + double-opt-in copy.

## New API contract (already built)
- `POST {API}/website/leads` — `{ name, email, consent: true, turnstileToken, website }` (+ optional `utmSource/utmMedium/utmCampaign`). `website` = honeypot (empty for humans). 200 `{success:true}` on accept; 400 `{success:false,error}` on turnstile/validation fail. **Double opt-in:** a confirm email is sent; the guide arrives only after the user clicks confirm.
- `POST {API}/website/contact` — `{ name, email, subject, message, turnstileToken, website }`. 200 `{success:true}`.
- Base: `NEXT_PUBLIC_API_URL` (prod `https://api.ryzolve.app`). Cross-origin, no credentials.

## Tasks
1. **Scaffold:** `apiBaseUrl()` (reads `NEXT_PUBLIC_API_URL`); `postJson(path, body)` that checks `res.ok` and throws on failure (the central fix); install `@marsidev/react-turnstile`; a Turnstile widget reading `NEXT_PUBLIC_TURNSTILE_SITE_KEY`. `.env.local.example` documenting both vars (+ the CF test key `1x00000000000000000000AA` for local).
2. **Lead form** (`LeadMagnetSection`): visible required consent checkbox + hidden CSS honeypot `website` + Turnstile; submit `postJson('/website/leads', {...})`; submit disabled until token + consent; on error → real toast, no `sent`; on success → double-opt-in copy ("check your email to confirm").
3. **Contact form** (`ContactPage`): hidden honeypot + Turnstile; submit `postJson('/website/contact', {...})`; real error handling; keep "reply within one business hour" success.
4. **Cleanup + verify:** remove `strapiBaseUrl()` + redesign callers (leave legacy `src/components/`); `npm run build`; preview-verify both forms render, Turnstile loads, and a failed POST shows a REAL error (not fake success).

## Pending inputs (deploy-time)
Turnstile **site** key; confirm `NEXT_PUBLIC_API_URL`; the guide is delivered by the API (`GET /website/guide`) — no PDF in `public/`.

## Next: admin subsystem (3 of 3) — "Website" section in ryzolve-admin.
