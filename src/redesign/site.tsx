import Link from 'next/link';
import dynamic from 'next/dynamic';
import { FormEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import { toast } from 'sonner';

import SEO from './SEO';
import {
  BreadcrumbJsonLd,
  CourseJsonLd,
  FaqJsonLd,
  LocalBusinessJsonLd,
  OrganizationJsonLd,
  ServiceJsonLd,
  WebSiteJsonLd,
} from './structured-data';

// Client-only — WebGL needs window. No static import of ./ShaderCanvas (we pass a
// preset id, not the GLSL source) so the heavy component stays in its own chunk.
const LazyShaderCanvas = dynamic(() => import('./ShaderCanvas'), { ssr: false });

type ShaderProps = {
  shader: string;
  palette: [string, string, string, string];
  opacity?: number;
  className?: string;
};

// Defer the shader chunk load + WebGL init until the browser is idle, so none of
// it competes with the critical render / hydration (the shaders were the main
// driver of the page's huge TBT). Kept on every device — the section's CSS
// gradient shows underneath until the canvas fades in a beat later.
function ShaderCanvas(props: ShaderProps) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const w = window as typeof window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idleId: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (w.requestIdleCallback) {
      idleId = w.requestIdleCallback(() => setReady(true), { timeout: 2500 });
    } else {
      timer = setTimeout(() => setReady(true), 400);
    }
    return () => {
      if (idleId != null) w.cancelIdleCallback?.(idleId);
      if (timer) clearTimeout(timer);
    };
  }, []);
  return ready ? <LazyShaderCanvas {...props} /> : null;
}

import {
  agencyInServiceSignupHref,
  fallbackAdministratorCourses,
  fallbackInServicePlans,
  trainingCourseDetailHref,
  trainingCoursePurchaseHref,
  trainingBaseUrl,
  type InServicePlanCard,
  type TrainingCourseCard,
} from './training-courses';

import {
  about,
  blank,
  company,
  contact,
  footer,
  home,
  homeTrainingCta,
  leadMagnet,
  nav,
  platformPricing,
  products,
  proofPoints,
  sharedServices,
  testimonials,
  training,
  whatWeDo,
  type ProductSlug,
} from './content';

type ActiveKey =
  | ProductSlug
  | 'home'
  | 'products'
  | 'training'
  | 'about-us'
  | 'contact'
  | 'calendly'
  | 'blank';

function apiBaseUrl() {
  return (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');
}

async function postJson(path: string, body: Record<string, unknown>) {
  const res = await fetch(apiBaseUrl() + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    let errMsg = 'Request failed';
    try {
      const json = await res.json();
      if (json && json.error) errMsg = json.error;
    } catch {
      // non-JSON body — keep default message
    }
    throw new Error(errMsg);
  }
  return res.json();
}

/* ════════════════════════════════════════════════════════════════
   Brand mark + product icons
   ════════════════════════════════════════════════════════════════ */

export function RyzolveMark({
  className = '',
  accent = '#FF774C',
}: {
  className?: string;
  /** Middle band color. Top + bottom bands use `currentColor`. */
  accent?: string;
}) {
  return (
    <svg className={`rz-mark ${className}`} viewBox="0 0 217 156" fill="none" aria-hidden="true">
      <path d="M216.457 46.4253H55.909L0 0H160.548L216.457 46.4253Z" fill="currentColor" />
      <path d="M0 99.0439H160.548L216.456 46.4253H55.9098L0 99.0439Z" fill={accent} />
      <path d="M216.443 155.821H55.8947L0 99.044H160.548L216.443 155.821Z" fill="currentColor" />
    </svg>
  );
}

type IconKind =
  | 'document'
  | 'shield'
  | 'card'
  | 'training'
  | 'calendar'
  | 'claim'
  | 'dollar'
  | 'clipboard'
  | 'user';

function ProductIcon({ kind, size = 22 }: { kind: IconKind; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none' as const };
  switch (kind) {
    case 'document':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M6 3h9l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M15 3v4h4M8 12h8M8 16h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M12 3 4 6v6c0 4.5 3.4 8.4 8 9 4.6-.6 8-4.5 8-9V6l-8-3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="m8.5 12 2.5 2.5L15.5 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'card':
      return (
        <svg {...common} aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 10h18M7 15h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 'training':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M2 9l10-4 10 4-10 4L2 9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M6 11v4c0 1.5 2.7 3 6 3s6-1.5 6-3v-4M21 10v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 'calendar':
      return (
        <svg {...common} aria-hidden="true">
          <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="m8.5 15 2.1 2.1 4.9-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'claim':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M7 3h8l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M15 3v5h4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M12 11v6M14 12.2c-.5-.8-1.5-1.1-2.5-.8-1.2.4-1.5 1.8-.2 2.4l1.5.7c1.3.6 1 2-.2 2.4-1 .3-2-.1-2.6-.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'dollar':
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M12 7.5v9M14.6 9.2c-.6-.8-1.6-1.2-2.7-1.1-1.4.1-2.4.9-2.4 2s.8 1.6 2.6 2.1c1.9.6 2.8 1.1 2.8 2.3s-1.1 2.1-2.7 2.1c-1.3 0-2.5-.5-3.2-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'clipboard':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M8.5 5h-2A1.5 1.5 0 0 0 5 6.5v13A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 17.5 5h-2" stroke="currentColor" strokeWidth="1.6" />
          <rect x="8.5" y="3" width="7" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M9 12h6M9 16h4M15.5 16.2l1.2 1.2 2.3-2.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'user':
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="12" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.6" />
          <path d="M5 20c.6-3.7 3.1-5.7 7-5.7s6.4 2 7 5.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
  }
}

function serviceToIcon(slug: string): IconKind {
  if (slug === 'compliance-regulation' || slug.includes('compliant')) return 'shield';
  if (slug === 'claims-and-bills' || slug.includes('profits')) return 'card';
  if (slug === 'training') return 'training';
  return 'document';
}

/* ════════════════════════════════════════════════════════════════
   Buttons
   ════════════════════════════════════════════════════════════════ */

type BtnVariant = 'primary' | 'secondary' | 'coral' | 'light' | 'ghost';

function CTA({
  href,
  variant = 'primary',
  children,
  icon = '→',
  block = false,
  newTab = false,
  className,
}: {
  href: string;
  variant?: BtnVariant;
  children: ReactNode;
  icon?: ReactNode | false;
  block?: boolean;
  newTab?: boolean;
  className?: string;
}) {
  const cls = ['rz-btn', `rz-btn-${variant}`, block && 'rz-btn-block', className]
    .filter(Boolean)
    .join(' ');
  const isExternal = /^https?:\/\//.test(href) || newTab;
  if (isExternal) {
    return (
      <a className={cls} href={href} target={newTab ? '_blank' : undefined} rel={newTab ? 'noopener noreferrer' : undefined}>
        <span>{children}</span>
        {icon !== false && <span className="rz-btn-arrow" aria-hidden="true">{icon}</span>}
      </a>
    );
  }
  return (
    <Link className={cls} href={href}>
      <span>{children}</span>
      {icon !== false && <span className="rz-btn-arrow" aria-hidden="true">{icon}</span>}
    </Link>
  );
}

function ButtonBtn({
  onClick,
  variant = 'primary',
  type = 'button',
  children,
  icon = '→',
  block = false,
  disabled,
}: {
  onClick?: () => void;
  variant?: BtnVariant;
  type?: 'button' | 'submit';
  children: ReactNode;
  icon?: ReactNode | false;
  block?: boolean;
  disabled?: boolean;
}) {
  const cls = ['rz-btn', `rz-btn-${variant}`, block && 'rz-btn-block'].filter(Boolean).join(' ');
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      <span>{children}</span>
      {icon !== false && <span className="rz-btn-arrow" aria-hidden="true">{icon}</span>}
    </button>
  );
}

/* ════════════════════════════════════════════════════════════════
   Animated word swap (hero)
   ════════════════════════════════════════════════════════════════ */

function AnimatedWords({ words }: { words: string[] }) {
  const cycle = words.length * 2400;
  return (
    <span className="rz-word-frame" aria-live="polite" style={{ ['--rz-word-count' as never]: words.length }}>
      <span className="rz-word-ghost">{words[0]}</span>
      {words.map((word, i) => (
        <span
          key={word}
          className="rz-word"
          style={{ animationDelay: `${i * 2400}ms`, animationDuration: `${cycle}ms` }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}

/* ════════════════════════════════════════════════════════════════
   Header / Footer / Layout
   ════════════════════════════════════════════════════════════════ */

function Header({ active }: { active: ActiveKey }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const trainingUrl = trainingBaseUrl();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const productsActive = active === 'products' || nav.products.some((p) => p.slug === active);

  // Shared nav-link utilities. `!text-*` beats the global `a { color: inherit }`
  // reset; the active underline is a Tailwind `after:` pseudo-element.
  const navLink =
    'relative inline-flex items-center gap-1 whitespace-nowrap py-1.5 text-sm font-medium hover:!text-ink';
  const navLinkActive =
    "!text-ink font-semibold after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-[1px] after:bg-blue after:content-['']";

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setProductsOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function openProducts() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setProductsOpen(true);
  }
  function scheduleCloseProducts() {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setProductsOpen(false), 180);
  }

  return (
    <>
      <div className="flex items-center justify-center gap-3.5 bg-ink px-8 py-2.5 text-[13px] tracking-[0.01em] text-white max-[640px]:flex-col max-[640px]:gap-1 max-[640px]:px-4 max-[640px]:text-center">
        <strong className="font-normal opacity-[0.92]">
          Built for Texas PAS agencies that want less paperwork, cleaner compliance, and better
          operational control.
        </strong>
        <Link href="/calendly" className="font-medium !text-coral">
          Book a demo →
        </Link>
      </div>
      <header className="sticky top-0 z-[80] border-b border-rule bg-bg px-14 py-5 max-[1080px]:px-6 max-[1080px]:py-4">
        <div className="mx-auto grid w-full max-w-[1328px] grid-cols-[1fr_auto_1fr] items-center gap-6 max-[1080px]:grid-cols-[1fr_auto]">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 justify-self-start text-[18px] font-semibold tracking-[-0.3px]"
            aria-label="Ryzolve home"
          >
            <RyzolveMark />
            <span>Ryzolve</span>
          </Link>

          <button
            className="hidden cursor-pointer max-[1080px]:inline-flex max-[1080px]:items-center max-[1080px]:gap-2 max-[1080px]:rounded-full max-[1080px]:border max-[1080px]:border-rule max-[1080px]:bg-paper max-[1080px]:px-3.5 max-[1080px]:py-2.5 max-[1080px]:text-sm max-[1080px]:font-medium max-[1080px]:!text-ink"
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
          >
            Menu
          </button>

          <nav
            className={`relative flex items-center justify-self-center gap-8 rounded-full border border-rule bg-paper px-6 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.02)] ${
              mobileOpen
                ? 'max-[1080px]:col-[1/-1] max-[1080px]:mt-2 max-[1080px]:w-full max-[1080px]:flex-col max-[1080px]:items-stretch max-[1080px]:gap-3 max-[1080px]:rounded-[18px] max-[1080px]:p-[18px]'
                : 'max-[1080px]:hidden'
            }`}
            aria-label="Main navigation"
          >
            {nav.links
              .filter((item) => item.slug === 'home')
              .map((item) => (
                <Link key={item.href} className={active === item.slug ? `${navLink} ${navLinkActive}` : `${navLink} !text-ink-2`} href={item.href}>
                  {item.label}
                </Link>
              ))}
            <div
              className="relative data-[open=true]:after:pointer-events-auto data-[open=true]:after:absolute data-[open=true]:after:top-full data-[open=true]:after:-inset-x-6 data-[open=true]:after:h-[18px] data-[open=true]:after:content-['']"
              data-open={productsOpen}
              ref={wrapRef}
              onMouseEnter={openProducts}
              onMouseLeave={scheduleCloseProducts}
            >
              <button
                type="button"
                onClick={() => setProductsOpen((v) => !v)}
                aria-expanded={productsOpen}
                className={`relative inline-flex cursor-pointer items-center gap-1 whitespace-nowrap border-0 bg-transparent py-1.5 text-sm font-medium text-ink-2 hover:text-ink ${
                  productsActive
                    ? "text-ink font-semibold after:absolute after:left-0 after:right-[14px] after:-bottom-0.5 after:h-0.5 after:rounded-[1px] after:bg-blue after:content-['']"
                    : ''
                }`}
              >
                Our Products
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  aria-hidden="true"
                  className={`mt-px transition-transform duration-[160ms] ${productsOpen ? 'rotate-180' : ''}`}
                >
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
              </button>
                <div
                  className={`absolute left-[-16px] top-[calc(100%+14px)] z-[60] w-[380px] origin-top rounded-2xl border border-rule bg-paper p-2 shadow-[0_24px_56px_rgba(13,14,18,0.10)] transition-[opacity,transform] duration-150 ease-out max-[1080px]:static max-[1080px]:mt-2 max-[1080px]:w-full max-[1080px]:shadow-none ${
                    productsOpen
                      ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
                      : 'pointer-events-none -translate-y-1 scale-95 opacity-0 max-[1080px]:hidden'
                  }`}
                  role="menu"
                  aria-hidden={!productsOpen}
                >
                  {nav.products.map((p) => (
                    <Link
                      key={p.href}
                      href={p.href}
                      role="menuitem"
                      className="flex items-start gap-3.5 rounded-[10px] p-3.5 transition-[background] duration-[120ms] hover:bg-bg"
                    >
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] bg-blue-soft text-blue-deep">
                        <ProductIcon kind={serviceToIcon(p.slug)} size={18} />
                      </span>
                      <div className="min-w-0">
                        <strong className="block text-sm font-semibold tracking-[-0.2px] text-ink">{p.label}</strong>
                        <span className="mt-0.5 block text-xs leading-[1.45] text-muted">{p.short}</span>
                      </div>
                    </Link>
                  ))}
                  <hr className="my-1.5 border-t border-rule" />
                  <Link href="/#products" className="block px-3.5 py-2.5 text-[13px] font-medium !text-blue">See all products →</Link>
                </div>
            </div>
            {nav.links
              .filter((item) => item.slug !== 'home')
              .map((item) => (
                <Link key={item.href} className={active === item.slug ? `${navLink} ${navLinkActive}` : `${navLink} !text-ink-2`} href={item.href}>
                  {item.label}
                </Link>
              ))}
          </nav>

          <div
            className={`flex items-center gap-2 justify-self-end ${
              mobileOpen
                ? 'max-[1080px]:col-[1/-1] max-[1080px]:mt-2 max-[1080px]:w-full max-[1080px]:flex-col max-[1080px]:items-stretch max-[1080px]:gap-3 max-[1080px]:rounded-[18px] max-[1080px]:border max-[1080px]:border-rule max-[1080px]:bg-paper max-[1080px]:p-[18px]'
                : 'max-[1080px]:hidden'
            }`}
          >
            <a href={`${trainingUrl}/auth/login`} className="whitespace-nowrap rounded-full px-3.5 py-2.5 text-sm font-medium !text-ink">Training login</a>
            <a href={company.providerLoginUrl} className="inline-flex items-center gap-1.5 rounded-full bg-blue px-5 py-[11px] text-sm font-medium !text-white">
              Login
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </header>
    </>
  );
}

function Footer() {
  return (
    <footer className="bg-ink px-14 pt-20 pb-8 text-white max-[640px]:px-[18px]">
      <div className="mx-auto grid max-w-[1328px] grid-cols-[1.6fr_1fr_1fr_1.2fr] gap-14 border-b border-white/10 pb-14 max-[1080px]:grid-cols-1 max-[1080px]:gap-9">
        <section>
          <div className="flex items-center gap-3">
            <span
              className="inline-flex h-[34px] w-11 flex-none items-center justify-center rounded-lg bg-white text-blue shadow-[0_10px_28px_rgba(0,0,0,0.22)]"
              aria-hidden="true"
            >
              <RyzolveMark className="h-[23px] w-8" />
            </span>
            <span className="text-[19px] font-semibold tracking-[-0.3px] text-white">Ryzolve</span>
          </div>
          <p className="mt-[18px] max-w-[360px] text-base leading-[1.55] tracking-[-0.1px] text-white/72">
            {footer.intro}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <CTA href="/calendly" variant="coral" className="px-5 py-3 text-sm">Book a demo</CTA>
            <CTA href={company.providerLoginUrl} variant="ghost" icon={false} className="px-5 py-3 text-sm">Login</CTA>
          </div>
        </section>
        <section>
          <h4 className="mb-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Products</h4>
          {nav.products.map((p) => (
            <Link key={p.href} href={p.href} className="block py-1.5 text-sm opacity-[0.85] hover:opacity-100">{p.label}</Link>
          ))}
          <Link href="/training" className="block py-1.5 text-sm opacity-[0.85] hover:opacity-100">Training</Link>
        </section>
        <section>
          <h4 className="mb-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Company</h4>
          <Link href="/about-us" className="block py-1.5 text-sm opacity-[0.85] hover:opacity-100">About</Link>
          <Link href="/contact" className="block py-1.5 text-sm opacity-[0.85] hover:opacity-100">Contact</Link>
          <Link href="/training" className="block py-1.5 text-sm opacity-[0.85] hover:opacity-100">Training</Link>
          <Link href="/calendly" className="block py-1.5 text-sm opacity-[0.85] hover:opacity-100">Book a demo</Link>
        </section>
        <section>
          <h4 className="mb-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Get in touch</h4>
          <div className="text-sm leading-[1.7] text-white/85">
            {company.address}
            <br />
            <br />
            <a href={`tel:${company.phone}`}>{company.phoneDisplay}</a>
            <br />
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </div>
          {/* Social links hidden until client-provided social profiles are ready.
          <div className="rz-social-row">
            {footer.social.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.fullLabel} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </div>
          */}
        </section>
      </div>
      <div className="mx-auto mt-7 flex max-w-[1328px] items-center justify-between text-xs text-white/50">
        <div>© {new Date().getFullYear()} {company.name}. All rights reserved.</div>
        <div className="flex gap-6 font-mono text-[11px]">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({
  active,
  children,
}: {
  active: ActiveKey;
  children: ReactNode;
}) {
  return (
    <div className="rz-site">
      <Header active={active} />
      {children}
      <Footer />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   Section header
   ════════════════════════════════════════════════════════════════ */

function SectionHeader({
  eyebrow,
  eyebrowColor = 'blue',
  title,
  description,
  center = false,
  dark = false,
  className,
}: {
  eyebrow?: string;
  eyebrowColor?: 'blue' | 'coral';
  title: ReactNode;
  description?: string;
  center?: boolean;
  dark?: boolean;
  className?: string;
}) {
  const cls = [
    'rz-shead',
    center && 'rz-shead-center',
    dark && 'rz-shead-dark',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const eyebrowCls = ['rz-eyebrow', eyebrowColor === 'coral' && 'rz-eyebrow-coral'].filter(Boolean).join(' ');
  return (
    <div className={cls}>
      {eyebrow && <p className={eyebrowCls}>{eyebrow}</p>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   Hero illustration (faithful SVG)
   ════════════════════════════════════════════════════════════════ */

const heroPainPoints = ['Missed clock-ins', 'Paper forms', 'Claim follow-ups', 'Survey stress'];
const heroGainPoints = ['EVV-connected workflows', 'Digital records', 'Claim visibility', 'Audit-ready files'];

function HeroIllo() {
  return (
    <div className="rz-hero-illo rz-hero-ops">
      <div className="rz-ops-card rz-funnel">
        <div className="rz-funnel-scatter" aria-label="Before Ryzolve: scattered tools">
          <span className="rz-funnel-tag rz-funnel-tag-coral">Before · 5 disconnected tools</span>
          <div className="rz-funnel-chips">
            {heroPainPoints.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <div className="rz-funnel-hub" aria-hidden="true">
          <span className="rz-funnel-hub-badge">5 → 1</span>
          <span className="rz-funnel-hub-label">one operating flow</span>
        </div>

        <div className="rz-funnel-result" aria-label="With Ryzolve: organized outcomes">
          <span className="rz-funnel-tag rz-funnel-tag-blue">With Ryzolve</span>
          <div className="rz-funnel-rows">
            {heroGainPoints.map((item) => (
              <div className="rz-funnel-row" key={item}>
                <span className="rz-funnel-check" aria-hidden="true">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <Link href="/calendly" className="rz-ops-next">
          <span>Simple next step</span>
          Schedule a 15-minute demo →
        </Link>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   Home page sections
   ════════════════════════════════════════════════════════════════ */

function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-bg px-14 pt-12 pb-24 max-[1080px]:px-7 max-[640px]:px-[18px]">
      <div className="rz-shader-bg z-0" aria-hidden="true">
        {/* SHADER_FLOW @ 0.45 — matches RZ_Hero in main-sections.jsx */}
        <ShaderCanvas
          shader="flow"
          palette={['#0D5992', '#FF774C', '#083E69', '#FAFAF7']}
          opacity={0.45}
        />
      </div>
      <div className="relative z-[2] mx-auto grid max-w-[1328px] grid-cols-[1.05fr_1fr] items-center gap-12 max-[1080px]:grid-cols-1 max-[1080px]:gap-9">
        <div>
          <span className="rz-pill">{home.hero.eyebrow}</span>
          <h1 className="mt-6 text-[clamp(48px,6vw,76px)] font-semibold leading-[1.02] tracking-[-2.4px] text-ink max-[640px]:tracking-[-1.5px]">
            Stop chasing paperwork. <span className="rz-text-blue">Run your agency</span> with
            confidence.
            {home.hero.animatedWords.length > 0 && (
              <>
                <br className="block" />
                <AnimatedWords words={home.hero.animatedWords} />
              </>
            )}
          </h1>
          <p className="mt-6 mb-9 max-w-[560px] text-[19px] leading-[1.55] text-ink-2">{home.hero.subtitle}</p>
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <CTA href="/calendly">Book a demo</CTA>
            <CTA href="#products" variant="secondary" icon={false}>See How Ryzolve Works</CTA>
          </div>
          <div className="flex flex-wrap gap-7 text-[13px] text-muted">
            {home.hero.trust.map((item) => (
              <span key={item}>✓ {item}</span>
            ))}
          </div>
        </div>
        <HeroIllo />
      </div>
    </section>
  );
}

function ProofBand() {
  return (
    <section className="border-y border-rule bg-paper px-14 py-10 max-[640px]:px-[18px]">
      <div className="rz-wrap grid grid-cols-4 gap-8 max-[1080px]:grid-cols-2 max-[640px]:grid-cols-1">
        {proofPoints.map((p) => (
          <div key={p.label}>
            <strong className="block text-[34px] font-bold leading-none tracking-[-1.2px] text-ink">{p.stat}</strong>
            <b className="mt-2 block text-sm font-semibold text-ink">{p.label}</b>
            <span className="mt-0.5 block text-xs text-muted">{p.sub}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CountUp({ to, duration = 1600, decimals = 0 }: { to: number; duration?: number; decimals?: number }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let start = 0;
    let started = false;
    const animate = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setV(to * eased);
      if (t < 1) raf = requestAnimationFrame(animate);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            raf = requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [to, duration]);
  return <span ref={ref}>{v.toFixed(decimals)}</span>;
}

function StatsBand() {
  return (
    <section className="rz-stats-band">
      {/* SHADER_LIQUID — the cosmic metaball the design actually uses, with the
          canonical palette [accentDeep, accent, coral, white] from main-fx.jsx. */}
      <div className="rz-shader-bg" aria-hidden="true">
        <ShaderCanvas
          shader="liquid"
          palette={['#083E69', '#0D5992', '#FF774C', '#FFFFFF']}
          opacity={1}
        />
      </div>
      <div className="rz-wrap">
        <span className="rz-stats-badge">
          <span className="rz-stats-badge-dot" aria-hidden="true" />
          By the numbers
        </span>
        <h2>
          Eight years of building from inside an agency. <em>Distilled</em> into one platform.
        </h2>
        <p>
          Built and re-built around what HHSC actually surveys for — not a generic EHR bolted onto a state form. Numbers across our founding-customer cohort.
        </p>
        <div className="rz-stats-grid">
          <div className="rz-stat-card">
            <strong>
              <CountUp to={4} duration={1400} /><span className="rz-stat-suffix">+ yrs</span>
            </strong>
            <span className="rz-stat-label">Zero penalties · founding customers</span>
          </div>
          <div className="rz-stat-card">
            <strong>
              <CountUp to={99.2} duration={1800} decimals={1} /><span className="rz-stat-suffix">%</span>
            </strong>
            <span className="rz-stat-label">First-pass claim acceptance</span>
          </div>
          <div className="rz-stat-card">
            <strong>
              <CountUp to={86} duration={1600} /><span className="rz-stat-suffix">%</span>
            </strong>
            <span className="rz-stat-label">Drop in denials, year one</span>
          </div>
          <div className="rz-stat-card">
            <strong>
              <span className="rz-stat-coral">$</span>
              <CountUp to={1.4} duration={1600} decimals={1} /><span className="rz-stat-suffix">M+</span>
            </strong>
            <span className="rz-stat-label">Recovered revenue, agency avg</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section id="products" className="rz-section rz-benefits">
      <div className="rz-wrap">
        <div className="mb-[42px] grid grid-cols-[minmax(0,0.92fr)_minmax(340px,1fr)] items-start gap-14 max-[1080px]:grid-cols-1 max-[1080px]:gap-6 max-[640px]:mb-[30px]">
          <div className="border-r border-rule pr-12 max-[1080px]:border-r-0 max-[1080px]:pr-0">
            <p className="rz-eyebrow">{home.benefits.eyebrow}</p>
            <h2 className="m-0 max-w-[760px] text-[clamp(36px,4.5vw,52px)] font-semibold leading-[1.05] tracking-[-1.5px] text-ink max-[640px]:text-[clamp(34px,10vw,42px)] max-[640px]:tracking-[-1.2px]">
              Run your Texas PAS agency on <span className="rz-text-blue">one platform.</span>
            </h2>
            <p className="mt-[18px] text-[17px] leading-[1.58] text-ink-2 max-[640px]:text-[16px]">{home.benefits.description}</p>
          </div>
          <p className="mt-[26px] text-[17px] leading-[1.68] text-ink-2 max-[1080px]:mt-0 max-[1080px]:max-w-[820px] max-[640px]:text-[16px] max-[640px]:leading-[1.58]">{home.benefits.lead}</p>
        </div>
        <div className="grid grid-cols-3 gap-6 max-[1080px]:grid-cols-2 max-[640px]:grid-cols-1">
          {home.benefits.cards.map((card, index) => (
            <article key={card.title} className="rz-platform-card">
              <div className="rz-platform-card-head">
                <span className="rz-icon-square rz-icon-square-deep">
                  <ProductIcon kind={card.icon as IconKind} size={22} />
                </span>
                <span className="rz-step-tag">STEP 0{index + 1}</span>
              </div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfterSection() {
  return (
    <section className="rz-section rz-before-after">
      <div className="rz-shader-bg" aria-hidden="true">
        <ShaderCanvas
          shader="liquid"
          palette={['#083E69', '#0D5992', '#FF774C', '#FFFFFF']}
          opacity={1}
        />
      </div>
      <div className="rz-wrap relative z-[2]">
        <SectionHeader
          eyebrow={home.beforeAfter.eyebrow}
          title={<>Replace scattered processes with <span className="rz-text-blue">one connected workflow.</span></>}
          center
          dark
        />
        <div className="relative mx-auto grid max-w-[1120px] grid-cols-2 items-start gap-[18px] max-[1080px]:gap-[14px] max-[640px]:grid-cols-1">
          <div className="rz-ba-panel rz-ba-panel-out">
            <div className="rz-ba-panel-head rz-ba-panel-head-out">
              <span className="rz-before-mark rz-before-mark-x" aria-hidden="true">×</span>
              <span>{home.beforeAfter.withoutTitle}</span>
            </div>
            <div className="rz-ba-notes">
              {home.beforeAfter.without.map((problem) => (
                <div className="rz-ba-note" key={problem}>
                  <span className="rz-ba-note-dot" aria-hidden="true" />
                  <p>{problem}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rz-ba-panel rz-ba-panel-in">
            <div className="rz-ba-panel-head rz-ba-panel-head-in">
              <span className="rz-before-mark rz-before-mark-check" aria-hidden="true">✓</span>
              <span>{home.beforeAfter.withTitle}</span>
            </div>
            <div className="rz-ba-wins">
              {home.beforeAfter.with.map((outcome) => (
                <div className="rz-ba-win" key={outcome}>
                  <span className="rz-ba-win-check" aria-hidden="true">✓</span>
                  <p>{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeSolutions() {
  return (
    <section className="rz-section rz-solutions rz-solutions-home">
      <div className="rz-wrap rz-solutions-board">
        <div className="rz-solutions-copy">
          <p className="rz-eyebrow">{home.solutions.eyebrow}</p>
          <h2>{home.solutions.title}</h2>
          <p>{home.solutions.description}</p>
          <div className="rz-solutions-actions">
            <CTA href="/calendly">Book a Demo</CTA>
          </div>
        </div>
        <div className="rz-solutions-ledger">
          <div className="rz-solutions-ledger-head">
            <span className="rz-icon-square rz-icon-square-deep">
              <ProductIcon kind="shield" size={22} />
            </span>
            <div>
              <span className="rz-panel-eyebrow">Agency outcomes</span>
              <div className="rz-panel-title">{home.solutions.subheading}</div>
            </div>
          </div>
          <div className="rz-solutions-metrics">
            {home.solutions.bullets.map((bullet, i) => {
              const meta = home.solutions.bulletStats[i] ?? { value: '—', unit: '' };
              return (
                <div className="rz-solutions-metric-row" key={bullet}>
                  <span className="rz-solutions-metric-index">0{i + 1}</span>
                  <div className="rz-solutions-metric-value">
                    <b>{meta.value}</b>
                    <span>{meta.unit}</span>
                  </div>
                  <p>{bullet}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeStrategy() {
  return (
    <section className="rz-section bg-bg">
      <div className="rz-wrap">
        <SectionHeader
          eyebrow={home.strategy.eyebrow}
          title={<>Each module <span className="rz-text-blue">earns its keep.</span> Together, they remove a category of work from your week.</>}
          description={home.strategy.description}
        />
        <div className="grid grid-cols-3 gap-6 max-[1080px]:grid-cols-2 max-[640px]:grid-cols-1">
          {home.strategy.steps.map((step, i) => (
            <Link key={step.title} href={step.href} className="rz-strategy-card">
              <div className="rz-strategy-card-head">
                <span className="rz-icon-square rz-icon-square-deep">
                  <ProductIcon kind={(['document', 'shield', 'card'] as IconKind[])[i]} size={22} />
                </span>
                <span className="rz-step-tag">STEP 0{i + 1}</span>
              </div>
              <h3>{step.title}</h3>
              <ul className="rz-check-list">
                {step.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <span className="rz-card-foot">
                See module <span className="rz-btn-arrow" aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeHowItWorks() {
  return (
    <section className="rz-section border-y border-rule bg-paper">
      <div className="rz-wrap">
        <SectionHeader
          eyebrow={home.howItWorks.eyebrow}
          title={<>Managing claims and paperwork should be <span className="rz-text-blue">easier.</span></>}
        />
        <div className="grid grid-cols-3 gap-6 max-[1080px]:grid-cols-2 max-[640px]:grid-cols-1">
          {home.howItWorks.steps.map((step, i) => (
            <article className="rz-how-card" key={step.title}>
              <div className="rz-how-head">
                <span className="rz-n">0{i + 1}</span>
                <span className="rz-n-circle">{i + 1}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <CTA href="/calendly">Book a demo</CTA>
        </div>
      </div>
    </section>
  );
}

function HomeTrainingCta() {
  const paths = [
    { title: 'Administrator Training', description: homeTrainingCta.highlights[0], tags: ['8h First-time', '12h Renewal', '16h New Admins'] },
    { title: 'In-Service Training', description: homeTrainingCta.highlights[1], tags: ['Starter', 'Growth', 'Unlimited'] },
  ];

  return (
    <section id="training-cta" className="rz-section rz-training-cta">
      <div className="rz-wrap relative z-[1] grid grid-cols-[minmax(0,1.18fr)_minmax(280px,0.82fr)] items-center gap-14 max-[1080px]:grid-cols-1 max-[1080px]:gap-9">
        <div>
          <p className="rz-eyebrow rz-eyebrow-coral">{homeTrainingCta.eyebrow}</p>
          <h2 className="m-0 text-[clamp(38px,5vw,62px)] font-bold leading-[1.02] tracking-[-1.7px] text-white">
            Administrator Training and In-Service Training,{' '}
            <span className="rz-text-blue">clearly separated.</span>
          </h2>
          <p className="mt-5 max-w-[720px] text-[18px] leading-[1.6] text-white/[0.78]">{homeTrainingCta.description}</p>
          <div className="mt-[30px] flex flex-wrap gap-3">
            <CTA href="/training" variant="coral">{homeTrainingCta.primaryCta}</CTA>
            <CTA href="/training#admin-training" variant="light">{homeTrainingCta.secondaryCta}</CTA>
          </div>
          <p className="mt-[18px] max-w-[620px] text-[13.5px] leading-[1.55] text-white/[0.58]">{homeTrainingCta.supporting}</p>
        </div>
        <div className="grid gap-4" aria-label="Training options">
          {paths.map((path) => (
            <article key={path.title} className="rz-training-path-mini">
              <span className="rz-training-path-mini-icon" aria-hidden="true">✓</span>
              <h3>{path.title}</h3>
              <p>{path.description}</p>
              <div>
                {path.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PAS platform plans — ported from the old website's home pricing table.
   Same behavior as the old site: feature comparison with prices hidden
   (enablePricing off), and "Choose Plan" opens a lead-capture modal that
   posts to the website contact endpoint with the plan as the subject. */

function PlanLeadModal({ plan, onClose }: { plan: string; onClose: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = turnstileToken !== '' && !submitting;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      await postJson('/website/contact', {
        name: form.name,
        email: form.email,
        subject: `Plan inquiry — ${plan}`,
        message: form.message,
        turnstileToken,
        website: honeypot,
      });
      toast.success('Thank you! We will be in touch shortly.');
      onClose();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-ink/45 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="rz-plan-modal-title"
        className="relative w-full max-w-[440px] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <form className="rz-form-card" onSubmit={submit}>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-[20px] leading-none !text-muted hover:bg-rule-soft hover:!text-ink"
          >
            ×
          </button>
          <h3 id="rz-plan-modal-title" style={{ marginTop: 0 }}>
            Get started with {plan}
          </h3>
          <p className="rz-form-helper" style={{ marginTop: -6, marginBottom: 14 }}>
            Tell us a little about your agency and we&apos;ll reach out to set you up.
          </p>
          {/* Honeypot — hidden from real users, catches bots */}
          <input
            name="website"
            type="text"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <label className="rz-field">
            <span className="rz-field-label">Your name</span>
            <input className="rz-input" required placeholder="Jane Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </label>
          <label className="rz-field">
            <span className="rz-field-label">Work email</span>
            <input className="rz-input" required type="email" placeholder="jane@agency.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </label>
          <label className="rz-field">
            <span className="rz-field-label">Message</span>
            <textarea
              className="rz-input"
              required
              rows={4}
              placeholder="Tell us about your agency — clients served, current tools, timeline…"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </label>
          <div style={{ margin: '4px 0 12px' }}>
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
              onSuccess={setTurnstileToken}
              onExpire={() => setTurnstileToken('')}
              onError={() => setTurnstileToken('')}
            />
          </div>
          <div className="rz-submit-row">
            <ButtonBtn type="submit" block disabled={!canSubmit} icon={false}>
              {submitting ? 'Sending…' : 'Request plan details'}
            </ButtonBtn>
          </div>
          {!turnstileToken && !submitting && (
            <p className="rz-form-helper rz-form-helper-center" style={{ color: 'var(--rz-muted)' }}>
              Please complete the verification above.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

function PlanFeatureMark({ included }: { included: boolean }) {
  return included ? (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="mx-auto text-blue">
      <circle cx="10" cy="10" r="9" fill="currentColor" />
      <path d="m6.5 10 2.2 2.2L13.5 7.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="mx-auto text-coral">
      <circle cx="10" cy="10" r="9" fill="currentColor" />
      <path d="m7 7 6 6M13 7l-6 6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function PlatformPricingSection() {
  const [leadPlan, setLeadPlan] = useState<string | null>(null);
  const p = platformPricing;
  return (
    <section id="pricing" className="rz-section">
      <div className="rz-wrap">
        <div className="mx-auto mb-10 max-w-[760px] text-center">
          <p className="rz-eyebrow">{p.eyebrow}</p>
          <h2>{p.title}</h2>
          <p className="mt-3 text-[17px] font-medium text-ink-2">{p.subtitle}</p>
          <p className="mt-2 text-muted">{p.lead}</p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-rule bg-paper shadow-[0_1px_2px_rgba(11,14,18,0.04)]">
          <table className="w-full min-w-[720px] border-collapse text-left text-[15px]">
            <thead>
              <tr className="border-b border-rule">
                <th className="px-5 py-4 font-semibold text-ink">Features</th>
                {p.plans.map((plan) => (
                  <th key={plan.name} className="px-5 py-4 text-center font-semibold text-ink">
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {p.enablePricing && (
                <tr className="border-b border-rule-soft">
                  <td className="px-5 py-4 text-ink-2">Monthly</td>
                  {p.plans.map((plan) => (
                    <td key={plan.name} className="px-5 py-4 text-center text-ink-2">
                      {plan.customPricing ? 'Custom' : `$${plan.monthly}`}
                    </td>
                  ))}
                </tr>
              )}
              <tr className="border-b border-rule-soft">
                <td className="px-5 py-4 text-ink-2">Suggested For</td>
                {p.plans.map((plan) => (
                  <td key={plan.name} className="px-5 py-4 text-center text-ink-2">
                    {plan.suggestedFor}
                  </td>
                ))}
              </tr>
              {p.featureRows.map((feature) => (
                <tr key={feature} className="border-b border-rule-soft">
                  <td className="px-5 py-4 text-ink-2">{feature}</td>
                  {p.plans.map((plan) => (
                    <td key={plan.name} className="px-5 py-4 text-center">
                      <PlanFeatureMark included={plan.features.includes(feature)} />
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-b border-rule-soft">
                <td className="px-5 py-4 text-ink-2">Support</td>
                {p.plans.map((plan) => (
                  <td key={plan.name} className="px-5 py-4 text-center text-ink-2">
                    {plan.support}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-5 py-5" />
                {p.plans.map((plan) => (
                  <td key={plan.name} className="px-4 py-5 text-center">
                    <ButtonBtn variant="coral" icon={false} onClick={() => setLeadPlan(plan.name)}>
                      Choose Plan
                    </ButtonBtn>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mx-auto mt-6 max-w-[820px] text-center text-[14px] text-muted">
          <strong className="text-ink-2">Note</strong>: {p.note}
        </p>
      </div>
      {leadPlan && <PlanLeadModal plan={leadPlan} onClose={() => setLeadPlan(null)} />}
    </section>
  );
}

function TestimonialsSection() {
  const video = testimonials.items.find((t) => t.media) ?? testimonials.items[0];
  const quotes = testimonials.items.filter((t) => !t.media).slice(0, 2);
  return (
    <section className="rz-section rz-tm">
      <div className="rz-wrap">
        <SectionHeader
          eyebrow={testimonials.eyebrow}
          title={testimonials.title}
          center
        />
        <div className="grid grid-cols-[minmax(320px,0.9fr)_minmax(0,1.1fr)] items-stretch gap-6 max-[1080px]:grid-cols-2 max-[640px]:grid-cols-1">
          <div className="rz-tm-video">
            <span className="rz-tm-tag">Watch · 2 min</span>
            <h3>{video.cardTitle ?? 'How Ryzolve streamlines a Texas PAS agency.'}</h3>
            <p>{video.cardSub ?? video.quote}</p>
            <div className="rz-tm-video-action">
              <a className="rz-tm-play" href={video.media ?? '#'} target="_blank" rel="noopener noreferrer" aria-label={`Watch ${video.name}`}>
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M5 3l12 7-12 7z" fill="currentColor" />
                </svg>
                <span className="rz-tm-play-label">Watch video</span>
              </a>
              <span>Opens YouTube</span>
            </div>
            <div className="rz-tm-video-meta">
              <div>
                <b>{video.name}</b>
                <span>{video.role}</span>
              </div>
            </div>
          </div>
          <div className="rz-tm-quotes">
            {quotes.map((q) => (
              <div className="rz-tm-quote" key={q.name}>
                <div className="rz-tm-mark">&ldquo;</div>
                <blockquote>{q.quote}</blockquote>
                <div className="rz-tm-author">
                  <span className="rz-tm-avatar">{q.name.charAt(0)}</span>
                  <div>
                    <b>{q.name}</b>
                    <span>{q.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeTrainingBand() {
  const trainingUrl = trainingBaseUrl();
  return (
    <section className="rz-training-band">
      <div className="rz-training-band-inner">
        <div>
          <p className="rz-eyebrow rz-eyebrow-coral">Ryzolve Training</p>
          <h2>{training.title}</h2>
          <p>{training.description}</p>
          <div className="rz-hero-actions">
            <CTA href="/training" variant="coral">Browse the 3 courses</CTA>
            <CTA href={`${trainingUrl}/auth/login`} variant="ghost" icon={false}>Training login</CTA>
          </div>
        </div>
        <div className="rz-training-courses-mini">
          {[
            { h: '8', tag: 'First-time' },
            { h: '12', tag: 'Renewal' },
            { h: '16', tag: 'Onboarding' },
          ].map((c) => (
            <div className="rz-mini-course-card" key={c.h}>
              <b>
                {c.h}
                <span>h</span>
              </b>
              <span>{c.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LeadMagnetSection() {
  const [form, setForm] = useState({ name: '', email: '' });
  const [honeypot, setHoneypot] = useState('');
  const [consent, setConsent] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = consent && turnstileToken !== '' && !submitting;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      await postJson('/website/leads', {
        name: form.name,
        email: form.email,
        consent,
        turnstileToken,
        website: honeypot,
      });
      toast.success('Check your email to confirm!');
      setSent(true);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="rz-section rz-lead">
      <div className="rz-lead-card">
        <div>
          <p className="rz-eyebrow">Free guide</p>
          <h2>{leadMagnet.title}</h2>
          <p>{leadMagnet.description}</p>
          <ul className="rz-lead-bullets">
            <li>What HHSC actually looks for</li>
            <li>The 7 most common audit triggers</li>
            <li>A weekly 60-minute prep checklist</li>
          </ul>
        </div>
        <div>
          {sent ? (
            <div className="rz-form-card rz-form-success">
              <div className="rz-success-mark">✓</div>
              <h3>Almost there!</h3>
              <p>Check {form.email || 'your inbox'} — confirm your email and we&apos;ll send your guide right over.</p>
            </div>
          ) : (
            <form className="rz-form-card" onSubmit={submit}>
              {/* Honeypot — hidden from real users, catches bots */}
              <input
                name="website"
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              <label className="rz-field">
                <span className="rz-field-label">Your name</span>
                <input className="rz-input" required placeholder="Jane Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </label>
              <label className="rz-field">
                <span className="rz-field-label">Work email</span>
                <input className="rz-input" required type="email" placeholder="jane@agency.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </label>
              <label className="rz-field" style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  style={{ marginTop: 3, flexShrink: 0, accentColor: 'var(--rz-blue)' }}
                />
                <span className="rz-field-label" style={{ margin: 0, fontSize: 12, fontWeight: 400, lineHeight: 1.5 }}>
                  I agree to receive the guide and occasional emails from Ryzolve. Unsubscribe anytime. <span className="rz-req">*</span>
                </span>
              </label>
              <div style={{ margin: '4px 0 12px' }}>
                <Turnstile
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
                  onSuccess={setTurnstileToken}
                  onExpire={() => setTurnstileToken('')}
                  onError={() => setTurnstileToken('')}
                />
              </div>
              <div className="rz-submit-row">
                <ButtonBtn type="submit" block disabled={!canSubmit} icon={false}>
                  {submitting ? 'Sending…' : leadMagnet.button}
                </ButtonBtn>
              </div>
              {(!consent || !turnstileToken) && !submitting && (
                <p className="rz-form-helper rz-form-helper-center" style={{ color: 'var(--rz-muted)' }}>
                  {!consent ? 'Please check the consent box above to continue.' : 'Please complete the verification above.'}
                </p>
              )}
              {consent && turnstileToken && (
                <p className="rz-form-helper rz-form-helper-center">No spam. Unsubscribe anytime.</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <SiteLayout active="home">
      <SEO
        title="Provider Management Software for PAS, Home Health & Hospice"
        description="Ryzolve is provider management software for Texas PAS, Home Health, and Hospice agencies. Cut paperwork, reduce denials, stay HHSC audit-ready — in one platform."
        path="/"
        keywords={[
          'provider management software',
          'PAS software',
          'home health software',
          'hospice software',
          'HHSC compliance',
          'Texas home care',
          'claims management',
          'document management',
        ]}
      />
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      <LocalBusinessJsonLd />
      <main>
        <HomeHero />
        <ProofBand />
        <BenefitsSection />
        <BeforeAfterSection />
        <HomeStrategy />
        <HomeHowItWorks />
        <HomeTrainingCta />
        <PlatformPricingSection />
        <TestimonialsSection />
        <LeadMagnetSection />
      </main>
    </SiteLayout>
  );
}

/* ════════════════════════════════════════════════════════════════
   Product pages
   ════════════════════════════════════════════════════════════════ */

function ProductHero({ slug }: { slug: ProductSlug }) {
  const product = products[slug];
  return (
    <section className="rz-prod-hero">
      <span className="rz-tr-hero-blob rz-tr-hero-blob-a" aria-hidden="true" />
      <span className="rz-tr-hero-blob rz-tr-hero-blob-b" aria-hidden="true" />
      <div className="rz-prod-hero-inner">
        <p className="rz-breadcrumb rz-about-breadcrumb">
          <Link href="/">Home</Link>
          <span className="sep">/</span>
          <Link href="/#products">Products</Link>
          <span className="sep">/</span>
          <span className="current">{product.eyebrow}</span>
        </p>
        <span className="rz-pill rz-contact-hero-pill">{product.eyebrow}</span>
        <h1>
          <span className="rz-tr-hline"><span style={{ animationDelay: '.12s' }}>{product.title}</span></span>
        </h1>
        <p className="rz-prod-hero-sub">{product.subtitle}</p>
        <div className="rz-page-hero-actions rz-prod-hero-actions">
          <CTA href="/calendly">Book a demo</CTA>
          <CTA href="#solutions" variant="secondary" icon={false}>Explore</CTA>
        </div>
      </div>
    </section>
  );
}

function WhatWeDoSection() {
  return (
    <section className="border-y border-rule bg-paper px-14 py-24 max-[1080px]:px-7 max-[640px]:px-[18px]">
      <div className="rz-wrap">
        <div className="mb-12 grid grid-cols-[1fr_1.4fr] items-start gap-20 max-[1080px]:grid-cols-1 max-[1080px]:gap-9">
          <div>
            <p className="rz-eyebrow">{whatWeDo.eyebrow.replace(/\?$/, '')}</p>
            <h2 className="m-0 text-[clamp(32px,4vw,44px)] font-semibold leading-[1.1] tracking-[-1.2px] text-ink">{whatWeDo.title}</h2>
          </div>
          <p className="m-0 pt-1 text-[16px] leading-[1.6] text-ink-2">{whatWeDo.description}</p>
        </div>
        <div className="grid grid-cols-4 gap-5 max-[1080px]:grid-cols-2 max-[640px]:grid-cols-1">
          {sharedServices.map((service, i) => (
            <Link key={service.title} href={service.href} className="rz-wwd-card">
              <span className="rz-icon-square">
                <ProductIcon kind={service.icon as IconKind} size={20} />
              </span>
              <p className="rz-benefit-num">0{i + 1}</p>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function DocFilingMock() {
  const rows: Array<[string, string, 'ok' | 'warn' | 'muted']> = [
    ['Client intake', 'Complete', 'ok'],
    ['Plan of care', 'Complete', 'ok'],
    ['Medication list', 'Complete', 'ok'],
    ['Background check', 'Complete', 'ok'],
    ['Auth · Amerigroup', 'In review', 'warn'],
    ['Annual eval', 'Scheduled', 'muted'],
  ];
  return (
    <div className="rz-doc-mock">
      <div className="rz-doc-mock-head">
        <div>
          <ProductIcon kind="document" size={18} />
          Documents · A. Khan
        </div>
        <span className="rz-filed">FILED · 05/22/26</span>
      </div>
      <div className="rz-doc-mock-grid">
        {rows.map(([label, status, tone]) => (
          <div key={label}>
            <b>{label}</b>
            <span className={`rz-doc-status-${tone}`}>{status}</span>
          </div>
        ))}
      </div>
      <div className="rz-doc-mock-footer">
        <i>i</i>
        All required documents on file. Audit-ready.
      </div>
    </div>
  );
}

function DocTemplatesMock() {
  const docs = [
    ['Client Intake · PAS', 'Updated 2 days ago'],
    ['Medication Management', 'Updated last week'],
    ['Plan of Care · Home Health', 'Updated last month'],
    ['Auth Request · Amerigroup', 'Updated 3 days ago'],
    ['Annual Eval Checklist', 'Updated 4 days ago'],
  ];
  return (
    <div className="rz-templates-mock">
      <div className="rz-templates-mock-head">
        <b>Document templates</b>
        <span>5 of 47</span>
      </div>
      <div className="rz-templates-list">
        {docs.map(([name, when], i) => (
          <div className="rz-templates-list-row" key={name}>
            <span className={i === 1 ? 'rz-icon-square rz-icon-square-deep' : 'rz-icon-square'}>
              <ProductIcon kind="document" size={16} />
            </span>
            <div>
              <b>{name}</b>
              <span>{when}</span>
            </div>
            <i>Live</i>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShieldMock() {
  return (
    <div className="rz-doc-mock">
      <div className="rz-doc-mock-head">
        <div>
          <ProductIcon kind="shield" size={18} />
          Compliance monitor · 30 days
        </div>
        <span className="rz-filed">UPDATED · 06h ago</span>
      </div>
      <div className="rz-doc-mock-grid">
        {[
          ['OIG U.S.DHHS', 'Clear', 'ok'],
          ['TXL OIG HHSC', 'Clear', 'ok'],
          ['TX DADS · EMR', 'Clear', 'ok'],
          ['License renewal', 'Due in 22d', 'warn'],
          ['Annual eval', 'Scheduled', 'muted'],
          ['Survey-ready', 'Yes', 'ok'],
        ].map(([label, status, tone]) => (
          <div key={label as string}>
            <b>{label}</b>
            <span className={`rz-doc-status-${tone}`}>{status}</span>
          </div>
        ))}
      </div>
      <div className="rz-doc-mock-footer">
        <i>i</i>
        Background checks rerun monthly. No exceptions outstanding.
      </div>
    </div>
  );
}

function ClaimsMock() {
  return (
    <div className="rz-doc-mock">
      <div className="rz-doc-mock-head">
        <div>
          <ProductIcon kind="card" size={18} />
          Claims · this week
        </div>
        <span className="rz-filed">99.2% FIRST PASS</span>
      </div>
      <div className="rz-doc-mock-grid">
        {[
          ['Amerigroup · $4,820', 'Paid', 'ok'],
          ['Superior · $2,150', 'Paid', 'ok'],
          ['Molina · $3,640', 'Paid', 'ok'],
          ['Texas STAR · $1,980', 'Paid', 'ok'],
          ['United HC · $5,210', 'In review', 'warn'],
          ['Anthem · $890', 'Scheduled', 'muted'],
        ].map(([label, status, tone]) => (
          <div key={label as string}>
            <b>{label}</b>
            <span className={`rz-doc-status-${tone}`}>{status}</span>
          </div>
        ))}
      </div>
      <div className="rz-doc-mock-footer">
        <i>i</i>
        Auth + eligibility validated automatically before submit.
      </div>
    </div>
  );
}

function DocEvidence() {
  return (
    <section className="rz-evidence">
      <div className="rz-wrap">
        <div className="rz-evidence-head">
          <p className="rz-eyebrow rz-eyebrow-coral">The before &amp; after</p>
          <h2>Onboarding a new aide should take minutes, not afternoons.</h2>
          <p>
            Average measured time to onboard one aide — from offer accepted to first shift cleared — across founding-customer agencies before and after switching to Ryzolve.
          </p>
        </div>
        <div className="rz-evidence-grid">
          <div className="rz-evidence-card">
            <div className="rz-evidence-tag">Before · Manual filing</div>
            <div className="rz-evidence-big">
              4<span>hrs 12m</span>
            </div>
            <div className="rz-evidence-rows">
              {[
                ['Paper intake forms', '52m'],
                ['Background check (manual)', '1h 20m'],
                ['Filing in cabinet', '24m'],
                ['Auth letter to MCO', '38m'],
                ['Plan of care printout', '58m'],
              ].map(([k, v]) => (
                <div key={k}>
                  <span>{k}</span>
                  <span>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rz-evidence-card is-after">
            <span className="rz-evidence-badge">↓ 87% faster</span>
            <div className="rz-evidence-tag">After · Ryzolve</div>
            <div className="rz-evidence-big">
              32<span>min</span>
            </div>
            <div className="rz-evidence-rows">
              {[
                ['Digital intake (templated)', '6m'],
                ['Automated background check', '4m'],
                ['Digital filing (instant)', '0m'],
                ['Auth sent to MCO (1-click)', '2m'],
                ['Plan of care · e-signed', '20m'],
              ].map(([k, v]) => (
                <div key={k}>
                  <span>{k}</span>
                  <span>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="rz-evidence-meth">
          <span>Methodology</span>
          <span>Median across 14 PAS agencies · 412 aide onboardings · Jan 2024 – Dec 2025 · self-reported, audited at our quarterly customer review.</span>
        </div>
      </div>
    </section>
  );
}

function DocFeature() {
  return (
    <section className="rz-section border-y border-rule bg-paper">
      <div className="rz-wrap grid grid-cols-2 items-center gap-20 max-[1080px]:grid-cols-1 max-[1080px]:gap-9">
        <DocTemplatesMock />
        <div>
          <p className="rz-eyebrow">Made to fit your agency</p>
          <h2 className="m-0 text-[clamp(32px,4vw,44px)] font-semibold leading-[1.1] tracking-[-1.2px] text-ink">Every form your agency uses — already in the system.</h2>
          <ul className="rz-num-list">
            {[
              ['Tailored document suites', 'Document libraries shaped around your service lines — PAS, Home Health, Hospice — not a generic template pack.'],
              ['Painless workflow templates', 'Authorization, client intake, and medication management already wired up. Edit once, deploys to every client.'],
              ['Flexible digital filing', 'Folders, tags, and audit trail. Find any document in three keystrokes — never dig through a cabinet.'],
            ].map(([t, d]) => (
              <li key={t}>
                <span>✓</span>
                <div>
                  <b>{t}</b>
                  <p>{d}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="rz-prod-cta">
            <CTA href="/calendly">Book a demo</CTA>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductSolutions({ slug }: { slug: ProductSlug }) {
  const product = products[slug];
  const Mock =
    slug === 'document-management'
      ? DocFilingMock
      : slug === 'compliance-regulation'
        ? ShieldMock
        : ClaimsMock;
  const bullets = product.solutionBullets;

  return (
    <section id="solutions" className="rz-section bg-bg">
      <div className="rz-wrap grid grid-cols-2 items-center gap-20 max-[1080px]:grid-cols-1 max-[1080px]:gap-9">
        <div>
          <p className="rz-eyebrow">Our Solutions</p>
          <h2 className="m-0 text-[clamp(36px,4.5vw,52px)] font-semibold leading-[1.05] tracking-[-1.5px] text-ink">{product.solutionTitle}</h2>
          <p className="mt-5 text-[17px] leading-[1.6] text-ink-2">{product.solutionDescription}</p>
          {product.solutionLead && (
            <p className="text-[17px] leading-[1.6] text-ink-2" style={{ marginTop: 16 }}>{product.solutionLead}</p>
          )}
          {bullets && bullets.length > 0 && (
            <ul className="rz-prod-bullet-list">
              {bullets.map((b) => <li key={b}>{b}</li>)}
            </ul>
          )}
          <div className="rz-prod-cta">
            <CTA href="/calendly">Book a demo</CTA>
          </div>
        </div>
        <div>
          <Mock />
        </div>
      </div>
    </section>
  );
}

function ProductAbout({ slug }: { slug: ProductSlug }) {
  const product = products[slug];
  if (!product.aboutTitle && !product.aboutDescription && !product.aboutBullets) return null;
  return (
    <section className="rz-section border-y border-rule bg-paper">
      <div className="rz-wrap grid grid-cols-2 items-center gap-20 max-[1080px]:grid-cols-1 max-[1080px]:gap-9">
        <div>
          <p className="rz-eyebrow">Why agencies pick this</p>
          <h2 className="m-0 text-[clamp(32px,4vw,44px)] font-semibold leading-[1.1] tracking-[-1.2px] text-ink">{product.aboutTitle || product.label}</h2>
          {product.aboutDescription && <p style={{ fontSize: 16, color: 'var(--rz-ink-2)', lineHeight: 1.6, marginTop: 20 }}>{product.aboutDescription}</p>}
          {product.aboutBullets && product.aboutBullets.length > 0 && (
            <ul className="rz-prod-bullet-list">
              {product.aboutBullets.map((b) => <li key={b}>{b}</li>)}
            </ul>
          )}
          <div className="rz-prod-cta">
            <CTA href="/calendly">Book a demo</CTA>
          </div>
        </div>
        <div>
          {slug === 'document-management' ? <DocTemplatesMock /> : slug === 'compliance-regulation' ? <ShieldMock /> : <ClaimsMock />}
        </div>
      </div>
    </section>
  );
}

function ProductExtras({ slug }: { slug: ProductSlug }) {
  const product = products[slug];
  if (!product.extraSections || product.extraSections.length === 0) return null;
  return (
    <>
      {product.extraSections.map((section) => (
        <section className="rz-section bg-bg" key={section.title}>
          <div className="rz-wrap grid grid-cols-2 items-center gap-20 max-[1080px]:grid-cols-1 max-[1080px]:gap-9">
            <div>
              <p className="rz-eyebrow">{section.eyebrow}</p>
              <h2 className="m-0 text-[clamp(36px,4.5vw,52px)] font-semibold leading-[1.05] tracking-[-1.5px] text-ink">{section.title}</h2>
              <p className="mt-5 text-[17px] leading-[1.6] text-ink-2">{section.description}</p>
              <div className="rz-prod-cta">
                <CTA href="/calendly">Book a demo</CTA>
              </div>
            </div>
            <div>
              {slug === 'compliance-regulation' ? <ShieldMock /> : slug === 'claims-and-bills' ? <ClaimsMock /> : <DocFilingMock />}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

const PRODUCT_SEO: Record<ProductSlug, { title: string; description: string; keywords: string[] }> = {
  'document-management': {
    title: 'Document Management for PAS, Home Health & Hospice Agencies',
    description:
      'Electronic intake, templated workflows, instant digital filing, and an audit trail on every change. Built for the way HHSC actually surveys Texas home care agencies.',
    keywords: [
      'document management',
      'home health document management',
      'PAS paperwork',
      'electronic intake',
      'audit trail',
      'HHSC documents',
    ],
  },
  'compliance-regulation': {
    title: 'Compliance Regulation & Automated Background Checks',
    description:
      'Monthly background checks, exception reporting, and annual evaluations so your agency stays survey-ready every day of the year — not just before HHSC visits.',
    keywords: [
      'compliance regulation',
      'background checks',
      'HHSC compliance',
      'OIG check',
      'DADS verification',
      'audit ready',
    ],
  },
  'claims-and-bills': {
    title: 'Claims & Billing — Faster Reimbursement, Fewer Denials',
    description:
      'Visit-data aggregation, eligibility validation, simplified claim entry, and cost-reporting readiness — get paid faster by Managed Care Organizations and State Insurance.',
    keywords: [
      'claims management',
      'home health billing',
      'PAS claims',
      'MCO reimbursement',
      'cost reporting',
      'denial management',
    ],
  },
};

export function ProductPage({ slug }: { slug: ProductSlug }) {
  const seo = PRODUCT_SEO[slug];
  return (
    <SiteLayout active={slug}>
      <SEO
        title={seo.title}
        description={seo.description}
        path={`/${slug}`}
        keywords={seo.keywords}
      />
      <ServiceJsonLd
        name={products[slug].title}
        description={seo.description}
        path={`/${slug}`}
        serviceType={products[slug].label}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/#products' },
          { name: products[slug].label, path: `/${slug}` },
        ]}
      />
      <main>
        <ProductHero slug={slug} />
        <WhatWeDoSection />
        <ProductSolutions slug={slug} />
        {slug === 'document-management' ? (
          <>
            <DocEvidence />
            <DocFeature />
          </>
        ) : (
          <ProductAbout slug={slug} />
        )}
        <ProductExtras slug={slug} />
        <TestimonialsSection />
        <LeadMagnetSection />
      </main>
    </SiteLayout>
  );
}

/* ════════════════════════════════════════════════════════════════
   About page
   ════════════════════════════════════════════════════════════════ */

export function AboutPage() {
  return (
    <SiteLayout active="about-us">
      <SEO
        title="About Ryzolve — Built Inside a Texas Care Agency"
        description="Ryzolve is provider-management and training software designed by people who ran a regulated home care agency. Texas Home Health, Hospice, and PAS — built around HHSC."
        path="/about-us"
        keywords={[
          'about Ryzolve',
          'Texas home care software',
          'PAS company',
          'home health platform',
          'Ryzolve LLC',
        ]}
      />
      <LocalBusinessJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about-us' },
        ]}
      />
      <main>
        <section className="rz-about-hero-v2">
          <span className="rz-tr-hero-blob rz-tr-hero-blob-a" aria-hidden="true" />
          <span className="rz-tr-hero-blob rz-tr-hero-blob-b" aria-hidden="true" />
          <div className="rz-about-hero-inner">
            <p className="rz-breadcrumb rz-about-breadcrumb">
              <Link href="/">Home</Link>
              <span className="sep">/</span>
              <span className="current">About</span>
            </p>
            <h1>
              <span className="rz-tr-hline"><span style={{ animationDelay: '.12s' }}>{about.title}</span></span>
            </h1>
            <p className="rz-about-hero-subtitle">
              <span className="rz-tr-hline">
                <span style={{ animationDelay: '.24s' }}>
                  <span className="rz-tr-accent">
                    {about.introTitle}
                    <span className="rz-tr-accent-underline" aria-hidden="true" />
                  </span>
                </span>
              </span>
            </p>
          </div>
        </section>

        <section className="rz-section border-y border-rule bg-paper">
          <div className="rz-wrap grid grid-cols-[1.1fr_1fr] items-center gap-20 max-[1080px]:grid-cols-1 max-[1080px]:gap-9">
            <div>
              <p className="rz-eyebrow">Who we are</p>
              <h2 className="m-0 text-[clamp(36px,4.5vw,52px)] font-semibold leading-[1.05] tracking-[-1.5px] text-ink">{about.introTitle}</h2>
              <p className="mt-6 max-w-[540px] text-[17px] leading-[1.6] text-ink-2">{about.introDescription}</p>
            </div>
            <div className="rz-stat-panel">
              <span className="rz-panel-eyebrow">Where we come from</span>
              <div className="rz-panel-title">TRM Hospice Care</div>
              <div className="rz-stat-rows">
                {[
                  { big: '04+', unit: 'YRS', t: 'Over four years with zero penalties' },
                  { big: '300+', unit: 'HRS', t: 'Hundreds of hours saved on hiring' },
                  { big: '99.2%', unit: 'PASS', t: 'First-pass claim acceptance' },
                ].map((row) => (
                  <div className="rz-stat-row" key={row.t}>
                    <div className="rz-stat-big">
                      <b>{row.big}</b>
                      <span>{row.unit}</span>
                    </div>
                    <p>{row.t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rz-section rz-benefits rz-about-philosophy">
          <div className="rz-wrap">
            <div className="rz-shead">
              <p className="rz-eyebrow">{about.philosophyEyebrow}</p>
              <h2 className="rz-about-philosophy-lead">{about.philosophy[0]}</h2>
            </div>
            <div className="grid grid-cols-3 gap-6 max-[1080px]:grid-cols-2 max-[640px]:grid-cols-1">
              {about.philosophy.slice(1).map((statement, i) => (
                <article className="rz-about-value-card" key={statement}>
                  <span className="rz-about-value-num">0{i + 1}</span>
                  <h3>{statement}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rz-about-cta">
          <div className="rz-about-cta-card">
            <div>
              <h2>{about.contactTitle}</h2>
              <p>Talk to someone who has run an agency — not a call center. We&apos;ll walk through where Ryzolve fits and what it would take to get you live.</p>
              <div className="rz-page-hero-actions" style={{ justifyContent: 'flex-start' }}>
                <CTA href="/contact" variant="coral">Contact us</CTA>
                <CTA href="/calendly" variant="light" icon={false}>Book a demo</CTA>
              </div>
            </div>
            <div className="rz-about-contact-card">
              <div>
                <span>Address</span>
                <span>{company.address}</span>
              </div>
              <div>
                <span>Phone</span>
                <span><a href={`tel:${company.phone}`} style={{ color: '#fff', textDecoration: 'none' }}>{company.phoneDisplay}</a></span>
              </div>
              <div>
                <span>Email</span>
                <span><a href={`mailto:${company.email}`} style={{ color: '#fff', textDecoration: 'none' }}>{company.email}</a></span>
              </div>
              <div>
                <span>Hours</span>
                <span>Mon–Fri, 8am–6pm CT</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}

/* ════════════════════════════════════════════════════════════════
   Contact page
   ════════════════════════════════════════════════════════════════ */

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = turnstileToken !== '' && !submitting;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      await postJson('/website/contact', {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        turnstileToken,
        website: honeypot,
      });
      toast.success('Thank you for contacting us');
      setSent(true);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SiteLayout active="contact">
      <SEO
        title="Contact Ryzolve — We Reply Within One Business Hour"
        description="Questions about Ryzolve, pricing, or an active demo? Call (936) 355-0920, email pas@ryzolve.com, or send the form — we answer within one business hour, Mon–Fri."
        path="/contact"
        keywords={[
          'contact Ryzolve',
          'PAS software contact',
          'Ryzolve phone',
          'demo request',
        ]}
      />
      <LocalBusinessJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]}
      />
      <main>
        <section className="rz-contact-hero">
          <span className="rz-tr-hero-blob rz-tr-hero-blob-a" aria-hidden="true" />
          <span className="rz-tr-hero-blob rz-tr-hero-blob-b" aria-hidden="true" />
          <div className="rz-contact-hero-inner">
            <p className="rz-breadcrumb rz-about-breadcrumb">
              {contact.breadcrumb.map((b, i, arr) => (
                <span key={b}>
                  {i === 0 ? <Link href="/">{b}</Link> : <span className="current">{b}</span>}
                  {i < arr.length - 1 && <span className="sep">/</span>}
                </span>
              ))}
            </p>
            <span className="rz-pill rz-contact-hero-pill">We typically reply within 1 business hour</span>
            <h1>
              <span className="rz-tr-hline"><span style={{ animationDelay: '.12s' }}>{contact.title}</span></span>
            </h1>
            <p className="rz-contact-hero-sub">Questions about Ryzolve, pricing, an active demo, or just need a human? We&apos;re here every weekday — call, email, or send the form below.</p>
          </div>
        </section>

        <section className="rz-section">
          <div className="rz-wrap grid grid-cols-[1fr_0.85fr] items-start gap-9 max-[1080px]:grid-cols-1">
            <form className="rz-form-card" onSubmit={submit}>
              {/* Honeypot — hidden from real users, catches bots */}
              <input
                name="website"
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              {sent ? (
                <div className="rz-form-success">
                  <div className="rz-success-mark">✓</div>
                  <h3>Thank you for contacting us</h3>
                  <p>We received your note and will reply to <strong style={{ color: 'var(--rz-ink)' }}>{form.email}</strong> within one business hour.</p>
                </div>
              ) : (
                <>
                  <h2 style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.4px', margin: 0, color: 'var(--rz-ink)' }}>{contact.formTitle}</h2>
                  <p style={{ fontSize: 14, color: 'var(--rz-ink-2)', margin: '6px 0 18px' }}>We answer within one business hour, Mon–Fri.</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <label className="rz-field">
                      <span className="rz-field-label">First Name <span className="rz-req">*</span></span>
                      <input className="rz-input" required placeholder="Jane" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </label>
                    <label className="rz-field">
                      <span className="rz-field-label">Email <span className="rz-req">*</span></span>
                      <input className="rz-input" required type="email" placeholder="jane@agency.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </label>
                  </div>
                  <label className="rz-field">
                    <span className="rz-field-label">Subject <span className="rz-req">*</span></span>
                    <input className="rz-input" required placeholder="Demo request" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                  </label>
                  <label className="rz-field">
                    <span className="rz-field-label">Message <span className="rz-req">*</span></span>
                    <textarea className="rz-textarea" required placeholder="What can we help with? Agency size, current systems, anything you'd want covered in the demo." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  </label>
                  <p className="rz-form-helper">{contact.required}</p>
                  <div style={{ margin: '12px 0 4px' }}>
                    <Turnstile
                      siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
                      onSuccess={setTurnstileToken}
                      onExpire={() => setTurnstileToken('')}
                      onError={() => setTurnstileToken('')}
                    />
                  </div>
                  <div className="rz-submit-row">
                    <ButtonBtn type="submit" block disabled={!canSubmit} icon={false}>
                      {submitting ? 'Sending…' : 'Send message →'}
                    </ButtonBtn>
                  </div>
                  {!turnstileToken && !submitting && (
                    <p className="rz-form-helper" style={{ marginTop: 8 }}>Please complete the verification above to send your message.</p>
                  )}
                </>
              )}
            </form>
            <div className="rz-contact-side">
              <div className="rz-demo-card">
                <p className="rz-eyebrow rz-eyebrow-coral" style={{ margin: 0 }}>Book a demo</p>
                <h3>30 minutes, no slides.</h3>
                <p>A working session — walk through your bottleneck, see where Ryzolve fits, leave with next steps.</p>
                <CTA href="/calendly" variant="coral">Pick a time</CTA>
              </div>
              <div className="rz-contact-person">
                <p className="rz-eyebrow" style={{ margin: 0 }}>Talk to a person</p>
                <div>
                  <span>Phone</span>
                  <a href={`tel:${company.phone}`}>{company.phoneDisplay}</a>
                </div>
                <div>
                  <span>Email</span>
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                </div>
                <div>
                  <span>Address</span>
                  <span>{company.address}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}

/* ════════════════════════════════════════════════════════════════
   Calendly page
   ════════════════════════════════════════════════════════════════ */

export function CalendlyPage() {
  return (
    <SiteLayout active="calendly">
      <SEO
        title="Book a Demo — 30 Minutes, No Slides"
        description="Schedule a working session with the Ryzolve team. Walk through your bottleneck, see where Ryzolve fits, and leave with next steps."
        path="/calendly"
        keywords={['book a demo', 'Ryzolve demo', 'Calendly', 'PAS software demo']}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Book a demo', path: '/calendly' },
        ]}
      />
      <main>
        <section className="rz-page-hero">
          <div className="rz-page-hero-inner">
            <p className="rz-breadcrumb">
              <Link href="/">Home</Link>
              <span className="sep">/</span>
              <span className="current">Book a demo</span>
            </p>
            <span className="rz-pill">30 minutes · No slides</span>
            <h1>Book a demo.</h1>
            <p>Pick a time that works for you. We&apos;ll walk through where Ryzolve fits — intake, compliance, claims — and answer any questions about pricing and rollout.</p>
          </div>
        </section>
        <section className="rz-section" style={{ paddingTop: 0 }}>
          <div className="rz-calendly-wrap">
            <iframe title="Ryzolve demo booking" src={company.calendlyUrl} loading="lazy" />
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}

/* ════════════════════════════════════════════════════════════════
   Training page
   ════════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════════
   Training page — Administrator courses + In-Service plans
   ════════════════════════════════════════════════════════════════ */

type TopicIconKind =
  | 'shield' | 'person' | 'people' | 'heart' | 'alarm' | 'hand'
  | 'wind' | 'activity' | 'scales' | 'clipboard' | 'badge' | 'stethoscope';

function TopicIcon({ kind, size = 38 }: { kind: TopicIconKind; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none' as const,
    'aria-hidden': true,
  };
  const p = {
    stroke: 'currentColor',
    strokeWidth: 1.7,
    fill: 'none' as const,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (kind) {
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 3 5 6v5c0 4 3 7.5 7 8.5 4-1 7-4.5 7-8.5V6l-7-3Z" {...p} />
          <path d="m9 11 2 2 4-4" {...p} />
        </svg>
      );
    case 'person':
      return (
        <svg {...common}>
          <circle cx="10" cy="8" r="3.2" {...p} />
          <path d="M4 20c0-3.3 2.7-6 6-6 1.3 0 2.4.4 3.4 1" {...p} />
          <path d="m15 16 1.8 1.8L20 14" {...p} />
        </svg>
      );
    case 'people':
      return (
        <svg {...common}>
          <circle cx="8.5" cy="9" r="2.6" {...p} />
          <circle cx="16" cy="10" r="2.2" {...p} />
          <path d="M3.5 19c0-2.8 2.2-5 5-5s5 2.2 5 5M14.5 18c.2-2.2 1.9-4 4-4 1 0 1.9.4 2.6 1" {...p} />
        </svg>
      );
    case 'heart':
      return (
        <svg {...common}>
          <path d="M12 20s-7-4.3-7-9.2A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7-2.2c0 .5 0 1-.2 1.4" {...p} />
          <path d="M13 12h2l1.5-2 2 4H21" {...p} />
        </svg>
      );
    case 'alarm':
      return (
        <svg {...common}>
          <circle cx="12" cy="13" r="6" {...p} />
          <path d="M12 10v3l2 1M9 3 6 5M15 3l3 2M12 7V5" {...p} />
        </svg>
      );
    case 'hand':
      return (
        <svg {...common}>
          <path d="M5 12v5a2 2 0 0 0 2 2h6l5-4c1-1 0-2.5-1.2-2.2L13 16" {...p} />
          <path d="M12 11c2-2.5 1-5-1-5-1.4 0-2 1.2-2 2 0-.8-.6-2-2-2-2 0-3 2.5-1 5l3 3 3-3Z" {...p} />
        </svg>
      );
    case 'wind':
      return (
        <svg {...common}>
          <path d="M3 9h10a2.5 2.5 0 1 0-2.5-2.5M3 14h13a2.5 2.5 0 1 1-2.5 2.5M3 12h7" {...p} />
        </svg>
      );
    case 'activity':
      return (
        <svg {...common}>
          <path d="M3 12h4l2 6 4-14 2 8h6" {...p} />
        </svg>
      );
    case 'scales':
      return (
        <svg {...common}>
          <path d="M12 4v16M7 20h10M5 8h14M5 8l-2 5h4l-2-5ZM19 8l-2 5h4l-2-5ZM12 4l-7 4M12 4l7 4" {...p} />
        </svg>
      );
    case 'clipboard':
      return (
        <svg {...common}>
          <rect x="6" y="4" width="12" height="17" rx="2" {...p} />
          <path d="M9 4a3 3 0 0 1 6 0M9 11h6M9 15h4" {...p} />
        </svg>
      );
    case 'badge':
      return (
        <svg {...common}>
          <circle cx="12" cy="10" r="6" {...p} />
          <path d="m9 10 2 2 4-4M9 19l3-2 3 2v-3" {...p} />
        </svg>
      );
    case 'stethoscope':
      return (
        <svg {...common}>
          <path d="M6 4v5a4 4 0 0 0 8 0V4M6 4H4M14 4h2M10 17a4 4 0 0 0 8 0v-2" {...p} />
          <circle cx="18" cy="13" r="2" {...p} />
        </svg>
      );
  }
}

function CapIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2 9l10-4 10 4-10 4L2 9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M6 11v4c0 1.4 2.7 3 6 3s6-1.6 6-3v-4M21 10v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IndividualIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function BookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 5a2 2 0 0 1 2-2h6v17H5a2 2 0 0 0-2 2V5ZM21 5a2 2 0 0 0-2-2h-6v17h6a2 2 0 0 1 2 2V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function scrollToId(id: string) {
  const el = typeof document !== 'undefined' ? document.getElementById(id) : null;
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}

function TrainingHero() {
  return (
    <section className="rz-tr-hero">
      <span className="rz-tr-hero-blob rz-tr-hero-blob-a" aria-hidden="true" />
      <span className="rz-tr-hero-blob rz-tr-hero-blob-b" aria-hidden="true" />
      <div className="rz-tr-hero-inner">
        <h1>
          <span className="rz-tr-hline"><span style={{ animationDelay: '.15s' }}>{training.hero.line1}</span></span>
          <span className="rz-tr-hline">
            <span style={{ animationDelay: '.28s' }}>
              <span className="rz-tr-accent">
                {training.hero.line2Accent}
                <span className="rz-tr-accent-underline" aria-hidden="true" />
              </span>
            </span>
          </span>
          <span className="rz-tr-hline"><span style={{ animationDelay: '.41s' }}>{training.hero.line3}</span></span>
        </h1>
        <p className="rz-tr-hero-sub">{training.hero.subtitle}</p>
        <div className="rz-tr-hero-actions">
          <button type="button" className="rz-btn rz-btn-blue" onClick={() => scrollToId('admin-training')}>
            <span>View Administrator Courses</span>
            <span className="rz-btn-arrow" aria-hidden="true">↓</span>
          </button>
          <button type="button" className="rz-btn rz-btn-primary" onClick={() => scrollToId('in-service')}>
            <span>View In-Service Plans</span>
            <span className="rz-btn-arrow" aria-hidden="true">↓</span>
          </button>
        </div>
        <div className="rz-tr-trust-pills">
          {training.trustPills.map((t) => (
            <span key={t}>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2.5 7.5 5.5 10.5 11.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrainingMarquee() {
  const row = (
    <div className="rz-tr-marquee-row">
      {training.marquee.map((t, i) => (
        <span key={`${t}-${i}`} className="rz-tr-marquee-item">
          {t}
          <span className="rz-tr-marquee-dot" aria-hidden="true" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="rz-tr-marquee" aria-hidden="true">
      <div className="rz-tr-marquee-track">
        {row}
        {row}
      </div>
    </div>
  );
}

function TrainingPathSplit({
  courses,
  inServicePlans,
}: {
  courses: TrainingCourseCard[];
  inServicePlans?: InServicePlanCard[];
}) {
  const plans = inServicePlans ?? training.inServicePlans;
  return (
    <section className="rz-tr-paths">
      <div className="rz-wrap grid grid-cols-2 gap-6 max-[640px]:grid-cols-1">
        {/* Admin (light) */}
        <div className="rz-tr-path">
          <span className="rz-tr-path-pill">{training.pathSplit.adminPillLabel}</span>
          <h2>{training.pathSplit.adminTitle}</h2>
          <p>{training.pathSplit.adminDescription}</p>
          <div className="rz-tr-path-list">
            {courses.map((c) => (
              <button
                key={c.slug}
                type="button"
                className="rz-tr-path-row"
                onClick={() => scrollToId('admin-training')}
              >
                <span className="rz-tr-path-row-left">
                  <span className="rz-tr-path-hours">{c.hoursNum}h</span>
                  <span className="rz-tr-path-name">{c.tagline}</span>
                </span>
                <span className="rz-tr-path-price">${c.priceNum}</span>
              </button>
            ))}
          </div>
          <button type="button" className="rz-btn rz-btn-blue" onClick={() => scrollToId('admin-training')}>
            <span>View Administrator Courses</span>
            <span className="rz-btn-arrow" aria-hidden="true">↓</span>
          </button>
        </div>
        {/* Agency (dark) */}
        <div className="rz-tr-path rz-tr-path-dark">
          <span className="rz-tr-path-pill rz-tr-path-pill-coral">{training.pathSplit.agencyPillLabel}</span>
          <h2>{training.pathSplit.agencyTitle}</h2>
          <p>{training.pathSplit.agencyDescription}</p>
          <div className="rz-tr-path-list">
            {plans.map((p, index) => (
              <div
                key={p.name}
                className={
                  index === Math.floor(plans.length / 2)
                    ? 'rz-tr-path-row is-featured'
                    : 'rz-tr-path-row'
                }
              >
                <span className="rz-tr-path-row-left">
                  <span className="rz-tr-path-name">{p.name}</span>
                  <span className="rz-tr-path-seats">{p.seats}</span>
                </span>
                <span className="rz-tr-path-price">
                  {p.price}
                  <span className="rz-tr-path-per">/mo</span>
                </span>
              </div>
            ))}
          </div>
          <button type="button" className="rz-btn rz-btn-coral" onClick={() => scrollToId('in-service')}>
            <span>View In-Service Plans</span>
            <span className="rz-btn-arrow" aria-hidden="true">↓</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function TrainingJumpNav() {
  const [active, setActive] = useState('admin-training');
  const trainingUrl = trainingBaseUrl();
  const loginHref = `${trainingUrl}/auth/login`;

  useEffect(() => {
    const ids = ['admin-training', 'in-service', 'library'];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const tab = (id: string, label: string) => (
    <button
      type="button"
      className={active === id ? 'is-on' : ''}
      onClick={() => scrollToId(id)}
    >
      {label}
    </button>
  );

  return (
    <div className="rz-tr-jumpnav" role="navigation" aria-label="Training sections">
      <div className="rz-tr-jumpnav-inner">
        <div className="rz-tr-jumpnav-tabs">
          {tab('admin-training', 'Administrator Training')}
          {tab('in-service', 'In-Service Plans')}
          {tab('library', 'Monthly Library')}
        </div>
        <div className="rz-tr-jumpnav-right">
          <a href={loginHref} target="_blank" rel="noopener noreferrer">Training login</a>
          <button type="button" className="rz-btn rz-btn-primary rz-btn-sm" onClick={() => scrollToId('in-service')}>
            <span>View plans</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function TrainingAdminCourses({ courses: adminCourses }: { courses: TrainingCourseCard[] }) {
  const [q, setQ] = useState('');
  const courses = adminCourses.filter(
    (c) =>
      !q.trim() ||
      `${c.title} ${c.short} ${c.audienceShort} ${c.tagline}`.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <section id="admin-training" className="rz-tr-admin">
      <div className="rz-wrap">
        <div className="rz-tr-section-head">
          <div className="rz-tr-section-head-left">
            <div className="rz-tr-eyebrow-row">
              <CapIcon size={20} />
              <span>{training.adminEyebrow}</span>
            </div>
            <h2>{training.adminTitle}</h2>
            <p>{training.adminSubtitle}</p>
          </div>
          <label className="rz-tr-search">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.6" />
              <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search administrator courses"
            />
          </label>
        </div>

        {courses.length === 0 ? (
          <div className="rz-tr-empty">No courses match &ldquo;{q}&rdquo;.</div>
        ) : (
          <div className="grid grid-cols-3 items-stretch gap-6 max-[1080px]:grid-cols-2 max-[640px]:grid-cols-1">
            {courses.map((c) => (
              <article
                key={c.slug}
                className={c.featured ? 'rz-tr-course-card is-featured' : 'rz-tr-course-card'}
              >
                <div className="rz-tr-course-card-head">
                  <span className="rz-tr-hours-badge">{c.hoursNum}h</span>
                  {c.featured && <span className="rz-tr-most-chosen">Most chosen</span>}
                </div>
                <div>
                  <span className="rz-tr-course-eyebrow">{c.eyebrow}</span>
                  <h3>{c.title}</h3>
                  <p>{c.short}</p>
                </div>
                <div className="rz-tr-course-pills">
                  {training.adminCoursePills.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div className="rz-tr-course-foot">
                  <div>
                    <span className="rz-tr-course-price">{c.price}</span>
                    <span className="rz-tr-course-once">one-time</span>
                  </div>
                  <Link className="rz-btn rz-btn-primary rz-btn-sm" href={trainingCourseDetailHref(c.slug)}>
                    <span>View course</span>
                    <span className="rz-btn-arrow" aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function TrainingInServicePlans({ inServicePlans }: { inServicePlans?: InServicePlanCard[] }) {
  const plans = inServicePlans ?? training.inServicePlans;
  const inServiceHref = agencyInServiceSignupHref();
  return (
    <section id="in-service" className="rz-tr-inservice">
      <div className="rz-wrap">
        <div className="rz-tr-section-head">
          <div className="rz-tr-section-head-left">
            <div className="rz-tr-eyebrow-row">
              <IndividualIcon size={20} />
              <span>{training.inServiceEyebrow}</span>
            </div>
            <h2>{training.inServiceLeadTitle}</h2>
            <p>{training.inServiceLeadDescription}</p>
          </div>
          <a href="#in-service" className="rz-tr-compare-link">Compare plans <span aria-hidden="true">→</span></a>
        </div>

        <div className="rz-tr-disclaimer">{training.inServiceDisclaimer}</div>

        <div className="grid grid-cols-3 items-stretch gap-5 max-[1080px]:grid-cols-2 max-[640px]:grid-cols-1">
          {plans.map((plan, index) => {
            // In a 3-tier pricing layout the recommended plan belongs in the
            // center column with the highlight, so the emphasis is balanced and
            // prices still read left→right ascending. Highlight the middle card
            // by position rather than the backend `isFeatured` flag (seed data
            // currently flags the cheapest tier).
            const featured = index === Math.floor(plans.length / 2);
            const note = plan.note ?? 'Most chosen';
            return (
            <article
              key={plan.name}
              className={featured ? 'rz-tr-plan-card is-featured' : 'rz-tr-plan-card'}
            >
              {featured && <span className="rz-tr-plan-badge">{note}</span>}
              <div>
                <div className="rz-tr-plan-name">{plan.name}</div>
                <div className="rz-tr-plan-seats">{plan.seats}</div>
              </div>
              <div className="rz-tr-plan-price">
                <span className="rz-tr-plan-amount">{plan.price}</span>
                <span className="rz-tr-plan-per">/mo</span>
              </div>
              <p className="rz-tr-plan-desc">{plan.description}</p>
              <ul className="rz-tr-plan-features">
                {plan.features.map((f) => (
                  <li key={f}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
                      <path d="m6.5 10 2.2 2.2L13.5 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                className={featured ? 'rz-btn rz-btn-coral rz-btn-block' : 'rz-btn rz-btn-primary rz-btn-block'}
                href={inServiceHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Choose plan</span>
                <span className="rz-btn-arrow" aria-hidden="true">→</span>
              </a>
            </article>
            );
          })}
        </div>

        <div className="rz-tr-included">
          <strong>Included in every In-Service plan:</strong>
          {training.inServiceIncluded.map((t, i) => (
            <span key={t}>
              {i > 0 && <span aria-hidden="true">·</span>}
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrainingLibrary() {
  const [filter, setFilter] = useState<'All' | 'Safety' | 'Compliance'>('All');
  const shown = training.topics.filter((t) => filter === 'All' || t.category === filter);
  const inServiceHref = agencyInServiceSignupHref();
  return (
    <section id="library" className="rz-tr-library">
      <div className="rz-wrap">
        <div className="rz-tr-library-connector">
          <span className="rz-tr-library-connector-line" />
          <span className="rz-tr-library-connector-pill">
            <BookIcon size={16} />
            Included in every In-Service plan
          </span>
          <span className="rz-tr-library-connector-line" />
        </div>
        <div className="rz-tr-section-head">
          <div className="rz-tr-section-head-left">
            <h2>{training.libraryTitle}</h2>
            <p>{training.libraryDescription}</p>
          </div>
          <div className="rz-tr-filter">
            {training.topicCategories.map((tab) => (
              <button
                key={tab}
                type="button"
                className={filter === tab ? 'is-on' : ''}
                onClick={() => setFilter(tab as 'All' | 'Safety' | 'Compliance')}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-5 max-[1080px]:grid-cols-2 max-[640px]:grid-cols-1">
          {shown.map((topic) => (
            <a
              key={topic.month}
              href={inServiceHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rz-tr-topic-card"
            >
              <div className="rz-tr-topic-thumb">
                <span className="rz-tr-topic-month">{topic.month}</span>
                <span className="rz-tr-topic-icon-wrap">
                  <TopicIcon kind={topic.icon as TopicIconKind} size={44} />
                </span>
              </div>
              <div className="rz-tr-topic-body">
                <h3>{topic.title}</h3>
                <span className="rz-tr-topic-cta">
                  View agency plans <span aria-hidden="true">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>

        <p className="rz-tr-library-foot">{training.libraryFooter}</p>
      </div>
    </section>
  );
}

function TrainingClosingCTA() {
  return (
    <section className="rz-tr-cta">
      <div className="rz-shader-bg" aria-hidden="true">
        {/* LIQUID metaball — matches RZ_TrainingCTA in the bundle */}
        <ShaderCanvas
          shader="liquid"
          palette={['#083E69', '#0D5992', '#FF774C', '#FFFFFF']}
          opacity={1}
        />
      </div>
      <div className="rz-tr-cta-vignette" aria-hidden="true" />
      <div className="rz-tr-cta-inner">
        <h2>{training.cta.title}</h2>
        <p>{training.cta.description}</p>
        <div className="rz-tr-cta-actions">
          <button type="button" className="rz-btn rz-btn-light" onClick={() => scrollToId('admin-training')}>
            <span>View Administrator Courses</span>
          </button>
          <button type="button" className="rz-btn rz-btn-coral" onClick={() => scrollToId('in-service')}>
            <span>View In-Service plans</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function TrainingHowItWorks() {
  return (
    <section className="rz-tr-how">
      <div className="rz-wrap">
        <div className="rz-shead">
          <p className="rz-eyebrow">{training.howItWorks.eyebrow}</p>
          <h2>{training.howItWorks.title}</h2>
        </div>
        <div className="grid grid-cols-3 gap-6 max-[1080px]:grid-cols-2 max-[640px]:grid-cols-1">
          {training.howItWorks.steps.map((s, i) => (
            <article className="rz-tr-how-card" key={s.n}>
              <div className="rz-tr-how-head">
                <span className="rz-tr-how-step">STEP {s.n}</span>
                <span className="rz-tr-how-circle">{i + 1}</span>
              </div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrainingFAQs() {
  return (
    <section className="rz-tr-faqs">
      <div className="rz-tr-faqs-inner">
        <div className="rz-shead rz-shead-center">
          <p className="rz-eyebrow">{training.faqs.eyebrow}</p>
          <h2>{training.faqs.title}</h2>
        </div>
        <div className="rz-tr-faqs-list">
          {training.faqs.items.map((f, i) => (
            <details className="rz-tr-faq" key={f.q} open={i === 0}>
              <summary>
                <span>{f.q}</span>
                <span className="rz-tr-faq-plus" aria-hidden="true">+</span>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function courseOutcomes(course: TrainingCourseCard) {
  if (course.learningOutcomes?.length) return course.learningOutcomes;

  return [
    'Complete HHSC-aligned Administrator Training at your own pace.',
    'Understand the requirements tied to Administrator and Alternate Administrator duties.',
    'Download your certificate after successful course completion.',
  ];
}

function courseSkills(course: TrainingCourseCard) {
  if (course.skills?.length) return course.skills;
  return ['Self-paced learning', 'Administrator readiness', 'Certificate completion'];
}

export function TrainingCourseDetailPage({ course }: { course: TrainingCourseCard }) {
  const purchaseHref = trainingCoursePurchaseHref(course.slug);
  const outcomes = courseOutcomes(course);
  const skills = courseSkills(course);

  return (
    <SiteLayout active="training">
      <SEO
        title={`${course.title} · Ryzolve Training`}
        description={course.short || course.description}
        path={trainingCourseDetailHref(course.slug)}
        keywords={[
          'Texas administrator training',
          `${course.hoursNum} hour administrator training`,
          'HHSC training',
          'Ryzolve Training',
        ]}
      />
      <CourseJsonLd course={course} path={trainingCourseDetailHref(course.slug)} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Training', path: '/training' },
          { name: course.title, path: trainingCourseDetailHref(course.slug) },
        ]}
      />
      <main className="rz-tr-detail">
        <section className="rz-tr-detail-hero">
          <div className="rz-wrap grid grid-cols-[minmax(0,1fr)_380px] items-center gap-14 max-[1080px]:grid-cols-1 max-[1080px]:gap-9">
            <div className="rz-tr-detail-copy">
              <Link className="rz-tr-detail-back" href="/training#admin-training">
                <span aria-hidden="true">←</span>
                All Administrator courses
              </Link>
              <h1>{course.title}</h1>
              <p>{course.short || course.description}</p>
              <div className="rz-tr-detail-stats" aria-label="Course details">
                <span><b>{course.hoursNum}h</b> clock hours</span>
                <span><b>{course.price}</b> one-time</span>
                <span><b>Instant</b> certificate</span>
              </div>
            </div>

            <aside className="rz-tr-detail-purchase" aria-label="Course purchase">
              {course.featured && <span className="rz-tr-plan-badge">Most chosen</span>}
              <span className="rz-tr-detail-purchase-kicker">One-time purchase</span>
              <strong>{course.price}</strong>
              <p>1-year access. Complete at your own pace.</p>
              <a className="rz-btn rz-btn-blue rz-btn-block" href={purchaseHref}>
                <span>Purchase course</span>
                <span className="rz-btn-arrow" aria-hidden="true">→</span>
              </a>
              <ul>
                <li><span aria-hidden="true">✓</span>Secure payment via Stripe</li>
                <li><span aria-hidden="true">✓</span>Instant access after purchase</li>
                <li><span aria-hidden="true">✓</span>Certificate on completion</li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="rz-tr-detail-body">
          <div className="rz-wrap grid grid-cols-[minmax(0,1fr)_360px] items-start gap-12 max-[1080px]:grid-cols-1 max-[1080px]:gap-9">
            <article className="rz-tr-detail-main">
              <p className="rz-eyebrow">Course overview</p>
              <h2>What this course covers</h2>
              <p>{course.description}</p>

              <div className="rz-tr-detail-tags" aria-label="Approved for">
                {course.approvedFor.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              <h3>Learning outcomes</h3>
              <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 max-[640px]:grid-cols-1">
                {outcomes.map((outcome) => (
                  <li key={outcome}>
                    <span aria-hidden="true">✓</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </article>

            <aside className="rz-tr-detail-side">
              <div className="rz-tr-detail-visual">
                {course.thumbnailUrl ? (
                  <img src={course.thumbnailUrl} alt={`${course.title} course artwork`} />
                ) : (
                  <div className="rz-tr-detail-visual-fallback">
                    <CapIcon size={48} />
                    <span>{course.hoursNum}h</span>
                  </div>
                )}
              </div>
              <div className="rz-tr-detail-skill-card">
                <h3>Course format</h3>
                <ul>
                  {training.adminCoursePills.map((pill) => (
                    <li key={pill}>{pill}</li>
                  ))}
                </ul>
              </div>
              <div className="rz-tr-detail-skill-card">
                <h3>Skills covered</h3>
                <ul>
                  {skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}

export function TrainingPage({
  adminCourses = fallbackAdministratorCourses(),
  inServicePlans = fallbackInServicePlans(),
}: {
  adminCourses?: TrainingCourseCard[];
  inServicePlans?: InServicePlanCard[];
}) {
  const courses = adminCourses.length ? adminCourses : fallbackAdministratorCourses();
  const plans = inServicePlans.length ? inServicePlans : fallbackInServicePlans();

  return (
    <SiteLayout active="training">
      <SEO
        title="Texas Administrator Training — 8, 12 & 16 Hour Courses"
        description="HHSC-aligned administrator training for Texas Home Health, Hospice, and PAS agencies. Self-paced, instant certificates, monthly in-service library for full care teams."
        path="/training"
        keywords={[
          'Texas administrator training',
          'HHSC training',
          'home health training',
          'hospice training',
          'PAS training',
          'in-service training',
          'caregiver certification',
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Training', path: '/training' },
        ]}
      />
      <FaqJsonLd items={training.faqs.items} />
      <main>
        <TrainingHero />
        <TrainingMarquee />
        <TrainingPathSplit courses={courses} inServicePlans={plans} />
        <TrainingJumpNav />
        <TrainingAdminCourses courses={courses} />
        <TrainingInServicePlans inServicePlans={plans} />
        <TrainingLibrary />
        <TrainingClosingCTA />
        <TrainingHowItWorks />
        <TrainingFAQs />
      </main>
    </SiteLayout>
  );
}


/* ════════════════════════════════════════════════════════════════
   Utility pages
   ════════════════════════════════════════════════════════════════ */

export function BlankPage() {
  return (
    <SiteLayout active="blank">
      <SEO
        title="Ryzolve"
        description="Ryzolve provider management software."
        path="/blank"
        noindex
      />
      <main className="rz-section">
        <div className="rz-wrap" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 48, fontWeight: 600, letterSpacing: '-1.5px', margin: 0 }}>{blank.title}</h1>
        </div>
      </main>
    </SiteLayout>
  );
}

export function NotFoundPage() {
  return (
    <SiteLayout active="home">
      <SEO
        title="Page Not Found"
        description="The page you are looking for is not available or has been moved. Head back to the Ryzolve homepage or get in touch with us."
        path="/404"
        noindex
      />
      <main>
        <section className="rz-notfound">
          <div className="rz-notfound-wrap">
            <span className="rz-num">Error · 404</span>
            <h1>Oops! Page Not Found.</h1>
            <p>The page you are looking for is not available or has been moved. Try a different page or go to homepage with the button below.</p>
            <div className="rz-page-hero-actions">
              <CTA href="/">Go to Homepage</CTA>
              <CTA href="/contact" variant="secondary" icon={false}>Contact us</CTA>
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
