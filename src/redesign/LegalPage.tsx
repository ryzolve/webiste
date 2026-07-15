import Link from 'next/link';

import SEO from './SEO';
import { type LegalPolicy } from './legal-content';
import { BreadcrumbJsonLd } from './structured-data';
import { SiteLayout } from './site';

// ----------------------------------------------------------------------

export default function LegalPage({ policy }: { policy: LegalPolicy }) {
  return (
    <SiteLayout active="legal">
      <SEO title={policy.title} description={policy.description} path={policy.path} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: policy.h1, path: policy.path },
        ]}
      />

      <main className="rz-legal-page">
        <section className="rz-legal-hero">
          <div className="rz-legal-container">
            <p className="rz-breadcrumb">
              <Link href="/">Home</Link>
              <span className="sep">/</span>
              <span className="current">{policy.h1}</span>
            </p>
            <p className="rz-legal-eyebrow">Ryzolve legal</p>
            <h1>{policy.h1}</h1>
            <p className="rz-legal-intro">{policy.intro}</p>
            <p className="rz-legal-updated">Last updated: {policy.lastUpdated}</p>
          </div>
        </section>

        <section className="rz-legal-content">
          <div className="rz-legal-container rz-legal-grid">
            <nav className="rz-legal-toc" aria-label={`${policy.h1} table of contents`}>
              <p>On this page</p>
              <ol>
                {policy.sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>{section.heading}</a>
                  </li>
                ))}
              </ol>
            </nav>

            <article className="rz-legal-article">
              {policy.sections.map((section) => (
                <section key={section.id} id={section.id}>
                  <h2>{section.heading}</h2>
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}
            </article>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
