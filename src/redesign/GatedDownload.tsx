import type { FormEvent, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';

import { trackEvent } from './analytics';
import { ButtonBtn, DeferredTurnstile, postJson } from './site';

/**
 * "Email me this file". The form posts to the API's /website/resources, which
 * stores the request (admin → Website → Contacts), notifies the team and
 * emails the visitor the link. The site never holds the file's URL, so a
 * mistyped address never gets the file, and no confirm-code step is needed.
 */

type GatedFile = {
  title: string;
  /** Key in the API's website.resources.ts. */
  resource: string;
  /** Where the form was offered, for the lead record and analytics. */
  slug: string;
};

export function GatedDownloadButton({
  file,
  className,
  children,
  onClick,
  autoOpenOnHash,
}: {
  file: GatedFile;
  className: string;
  children: ReactNode;
  onClick?: () => void;
  /** Open the form on load when the URL hash matches, e.g. "#download". */
  autoOpenOnHash?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (autoOpenOnHash && window.location.hash === autoOpenOnHash) {
      setOpen(true);
      trackEvent('resource_form_opened', { slug: file.slug, resource: file.resource, via: 'link' });
    }
  }, [autoOpenOnHash, file.resource, file.slug]);

  const handleClick = () => {
    onClick?.();
    setOpen(true);
    trackEvent('resource_form_opened', { slug: file.slug, resource: file.resource, via: 'button' });
  };

  return (
    <>
      <button className={className} onClick={handleClick} type="button">
        {children}
      </button>
      {open && <GatedDownloadModal file={file} onClose={() => setOpen(false)} />}
    </>
  );
}

function GatedDownloadModal({ file, onClose }: { file: GatedFile; onClose: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', agency: '', phone: '' });
  const [honeypot, setHoneypot] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);
  // Bumped to remount Turnstile: siteverify consumes a token, so a retry after
  // a failed send needs a fresh widget, not just a cleared token.
  const [turnstileKey, setTurnstileKey] = useState(0);

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
      await postJson('/website/resources', {
        resource: file.resource,
        name: form.name,
        email: form.email,
        agency: form.agency,
        phone: form.phone || undefined,
        page: `/blogs/${file.slug}`,
        turnstileToken,
        website: honeypot,
      });
      trackEvent('resource_requested', { slug: file.slug, resource: file.resource });
      setSentTo(form.email);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setTurnstileKey((k) => k + 1);
    } finally {
      setTurnstileToken('');
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
        aria-labelledby="rz-gated-title"
        className="relative w-full max-w-[440px] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rz-form-card">
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-[20px] leading-none !text-muted hover:bg-rule-soft hover:!text-ink"
          >
            ×
          </button>
          {sentTo ? (
            <div className="rz-form-success" aria-live="polite">
              <div className="rz-success-mark">✓</div>
              <h3 id="rz-gated-title">Check your inbox.</h3>
              <p>
                We&apos;ve sent the {file.title} to <strong>{sentTo}</strong>. It usually arrives
                within a few minutes; if not, check your spam folder.
              </p>
              <div className="rz-gated-actions">
                <Link
                  className="rz-btn rz-btn-primary rz-btn-block"
                  href={`/calendly?utm_source=ryzolve.com&utm_medium=blog&utm_campaign=${file.slug}&utm_content=resource`}
                  onClick={() =>
                    trackEvent('blog_cta_clicked', { slug: file.slug, placement: 'resource', cta: 'demo' })
                  }
                >
                  <span>Book a demo</span>
                  <span className="rz-btn-arrow" aria-hidden="true">→</span>
                </Link>
                <button className="rz-gated-retry" onClick={() => setSentTo(null)} type="button">
                  Wrong address? Send it again
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit}>
              <h3 id="rz-gated-title" style={{ marginTop: 0, paddingRight: 32 }}>
                Get the {file.title}
              </h3>
              <p className="rz-form-helper" style={{ marginTop: -6, marginBottom: 14 }}>
                We&apos;ll email it to you right away, so use an address you can check now.
              </p>
              {/* Honeypot: hidden from real users, catches bots */}
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
                <input className="rz-input" required autoComplete="name" placeholder="Jane Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </label>
              <label className="rz-field">
                <span className="rz-field-label">Work email</span>
                <input className="rz-input" required type="email" autoComplete="email" placeholder="jane@agency.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </label>
              <label className="rz-field">
                <span className="rz-field-label">Agency name</span>
                <input className="rz-input" required autoComplete="organization" placeholder="Lone Star Home Care" value={form.agency} onChange={(e) => setForm({ ...form, agency: e.target.value })} />
              </label>
              <label className="rz-field">
                <span className="rz-field-label">Phone (optional)</span>
                <input className="rz-input" type="tel" autoComplete="tel" placeholder="(713) 555-0100" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </label>
              <div key={turnstileKey} style={{ margin: '4px 0 12px' }}>
                <DeferredTurnstile
                  onSuccess={setTurnstileToken}
                  onExpire={() => setTurnstileToken('')}
                  onError={() => setTurnstileToken('')}
                />
              </div>
              <div className="rz-submit-row">
                <ButtonBtn type="submit" block disabled={!canSubmit} icon={false}>
                  {submitting ? 'Sending…' : 'Email me the checklist'}
                </ButtonBtn>
              </div>
              <p className="rz-form-helper rz-form-helper-center" style={{ color: 'var(--rz-muted)' }}>
                {!turnstileToken && !submitting
                  ? 'Please complete the verification above.'
                  : (
                    <>
                      We may follow up about Ryzolve. See our <Link href="/privacy">Privacy Policy</Link>.
                    </>
                  )}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
