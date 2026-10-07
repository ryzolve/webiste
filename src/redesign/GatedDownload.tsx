import type { FormEvent, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';

import { trackEvent } from './analytics';
import { ButtonBtn, DeferredTurnstile, postJson } from './site';

/**
 * A download that asks for the visitor's details first. The form posts to
 * /website/contact, which stores the lead in the admin "Website → Contacts"
 * list, notifies the team and sends the visitor an acknowledgement. The
 * download starts as soon as the API accepts it.
 *
 * A browser that has unlocked a file once skips the form next time.
 */

type GatedFile = {
  title: string;
  href: string;
  /** Where the download was offered, for the lead record and analytics. */
  slug: string;
};

const UNLOCKED_PREFIX = 'rz-unlocked:';

function isUnlocked(href: string) {
  try {
    return localStorage.getItem(UNLOCKED_PREFIX + href) === '1';
  } catch {
    return false;
  }
}

function rememberUnlocked(href: string) {
  try {
    localStorage.setItem(UNLOCKED_PREFIX + href, '1');
  } catch {
    // Storage blocked: they'll see the form again next visit.
  }
}

function startDownload(href: string) {
  const a = document.createElement('a');
  a.href = href;
  a.download = href.split('/').pop() ?? '';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

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
    if (autoOpenOnHash && window.location.hash === autoOpenOnHash && !isUnlocked(file.href)) {
      setOpen(true);
      trackEvent('gated_download_opened', { slug: file.slug, resource: file.title, via: 'link' });
    }
  }, [autoOpenOnHash, file.href, file.slug, file.title]);

  const handleClick = () => {
    onClick?.();
    if (isUnlocked(file.href)) {
      startDownload(file.href);
      return;
    }
    setOpen(true);
    trackEvent('gated_download_opened', { slug: file.slug, resource: file.title, via: 'button' });
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
  const [done, setDone] = useState(false);

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
      // The API collapses newlines, so the details go in one line.
      await postJson('/website/contact', {
        name: form.name,
        email: form.email,
        subject: `Checklist download: ${file.title}`,
        message: [
          `Downloaded the ${file.title} from /blogs/${file.slug}.`,
          `Agency: ${form.agency}.`,
          `Phone: ${form.phone || 'not given'}.`,
        ].join(' '),
        turnstileToken,
        website: honeypot,
      });
      rememberUnlocked(file.href);
      trackEvent('gated_download_submitted', { slug: file.slug, resource: file.title });
      setDone(true);
      startDownload(file.href);
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
          {done ? (
            <div className="rz-form-success">
              <div className="rz-success-mark">✓</div>
              <h3 id="rz-gated-title">Your download has started.</h3>
              <p>
                If it didn&apos;t, use the button below. We&apos;ve also sent a note to{' '}
                {form.email}.
              </p>
              <div className="rz-submit-row" style={{ flexDirection: 'column', gap: 12 }}>
                <a className="rz-btn rz-btn-primary rz-btn-block" download href={file.href}>
                  <span>Download the checklist</span>
                  <span className="rz-btn-arrow" aria-hidden="true">↓</span>
                </a>
                <Link
                  className="rz-btn rz-btn-secondary rz-btn-block"
                  href={`/calendly?utm_source=ryzolve.com&utm_medium=blog&utm_campaign=${file.slug}&utm_content=download`}
                  onClick={() => trackEvent('blog_cta_clicked', { slug: file.slug, placement: 'download', cta: 'demo' })}
                >
                  <span>Book a demo</span>
                  <span className="rz-btn-arrow" aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={submit}>
              <h3 id="rz-gated-title" style={{ marginTop: 0, paddingRight: 32 }}>
                Get the {file.title}
              </h3>
              <p className="rz-form-helper" style={{ marginTop: -6, marginBottom: 14 }}>
                Tell us where to reach you and the PDF downloads right away.
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
              <div style={{ margin: '4px 0 12px' }}>
                <DeferredTurnstile
                  onSuccess={setTurnstileToken}
                  onExpire={() => setTurnstileToken('')}
                  onError={() => setTurnstileToken('')}
                />
              </div>
              <div className="rz-submit-row">
                <ButtonBtn type="submit" block disabled={!canSubmit} icon={false}>
                  {submitting ? 'Sending…' : 'Download the checklist'}
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
