import type { PostHog } from "posthog-js";

/**
 * Product analytics (PostHog) for the marketing site.
 *
 * Same PostHog project as learn.ryzolve.app and agency.ryzolve.app; every
 * event carries `app: "website"` so the three can be split apart. The key is a
 * public, write-only token, so it lives in code rather than a build env var.
 *
 * ON FOR PRODUCTION HOSTNAMES ONLY — preview deploys and `next dev` send
 * nothing.
 *
 * LOADED LATE ON PURPOSE. This page was tuned from mobile PageSpeed 30 to 70+,
 * and ~95KB (gzipped) of analytics parsed inside the measured window would undo part of
 * that. _app.tsx starts it after the load event once the browser is idle, or
 * on the first tap/keypress — whichever comes first.
 */

const POSTHOG_KEY = "phc_B7oirbByxLkLa2tmPZzRoCCdEg4CwSumt3rgRUVcC2io";
const POSTHOG_HOST = "https://us.i.posthog.com";
const PRODUCTION_HOSTS = new Set(["ryzolve.com", "www.ryzolve.com"]);

let client: Promise<PostHog | null> | null = null;

export function loadAnalytics(): Promise<PostHog | null> {
  if (client) return client;
  if (
    typeof window === "undefined" ||
    !PRODUCTION_HOSTS.has(window.location.hostname) ||
    POSTHOG_KEY.startsWith("phc_REPLACE")
  ) {
    client = Promise.resolve(null);
    return client;
  }
  client = import("posthog-js")
    .then(({ default: posthog }) => {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        // Pageviews on client-side route changes too (history_change), scripts
        // injected into <head>. Not the later snapshots, which stream network
        // request bodies into replays (lead and contact form payloads).
        defaults: "2026-05-30",
        // Visitors are anonymous here: events, no person profiles.
        person_profiles: "identified_only",
        session_recording: {
          // Lead and contact forms carry names, emails and phone numbers.
          maskAllInputs: true,
        },
      });
      posthog.register({ app: "website" });
      return posthog;
    })
    .catch(() => null);
  return client;
}
