import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();

const read = (path) => readFileSync(join(root, path), 'utf8');

const requiredFiles = [
  'src/redesign/content.ts',
  'src/redesign/site.tsx',
  'src/redesign/site.css',
  'src/redesign/training-courses.ts',
  'wrangler.jsonc',
  'open-next.config.ts',
  '.assetsignore',
  'scripts/prepare-cloudflare-assets.mjs',
  'pages/index.tsx',
  'pages/document-management/index.tsx',
  'pages/compliance-regulation/index.tsx',
  'pages/claims-and-bills/index.tsx',
  'pages/about-us/index.tsx',
  'pages/contact/index.tsx',
  'pages/calendly/index.tsx',
  'pages/training/index.tsx',
  'pages/training/[slug].tsx',
  'pages/blank.tsx',
  'pages/404.tsx',
  'docs/content-mapping-old-to-new.md',
];

for (const file of requiredFiles) {
  assert.ok(existsSync(join(root, file)), `${file} should exist`);
}

const content = read('src/redesign/content.ts');
const site = read('src/redesign/site.tsx');
const css = read('src/redesign/site.css');
const trainingCourses = read('src/redesign/training-courses.ts');
const mapping = read('docs/content-mapping-old-to-new.md');
const trainingPage = read('pages/training/index.tsx');
const trainingDetailPage = read('pages/training/[slug].tsx');
const pkg = JSON.parse(read('package.json'));
const wrangler = read('wrangler.jsonc');
const openNext = read('open-next.config.ts');
const gitignore = read('.gitignore');
const assetsignore = read('.assetsignore');

// Original copy must be preserved verbatim (per client instruction).
const requiredCopy = [
  "Enhance your agency's",
  'Provider management software to help PAS agencies be more efficient',
  'Transform your PAS agency: No more time wasted on outdated processes',
  'Document Management that suites to fit your healthcare structure to increase Efficiency',
  'Managing paper work made easier',
  "We've got you covered during state audits.",
  'Claims are handled quickly.',
  'Empowering Growth Through Smart Solutions',
  'Get in Touch',
  'This is blank page',
  'Our Philosophy ?',
  'Add the necessary contraints before submitting claims',
  'Implementing the software can be done in as little as week',
  'reducing down paperwork & errors',
];

for (const phrase of requiredCopy) {
  assert.ok(content.includes(phrase), `content.ts should preserve old copy: ${phrase}`);
}

// All public routes must remain.
const requiredRoutes = [
  '/',
  '/document-management',
  '/compliance-regulation',
  '/claims-and-bills',
  '/about-us',
  '/contact',
  '/calendly',
  '/training',
  '/blank',
  '/404',
];

for (const route of requiredRoutes) {
  assert.ok(content.includes(`'${route}'`) || content.includes(`"${route}"`), `route kept: ${route}`);
}

// Form endpoints unchanged.
const requiredEndpoints = [
  '/api/customers',
  '/api/contacts',
];

for (const endpoint of requiredEndpoints) {
  assert.ok(site.includes(endpoint), `site.tsx should retain form endpoint ${endpoint}`);
}

// Component / class hooks the redesigned site relies on.
const requiredDesignHooks = [
  'rz-btn',
  'rz-btn-primary',
  'rz-btn-secondary',
  'rz-btn-coral',
  'rz-pill',
  'rz-promo',
  'rz-header',
  'rz-nav',
  'rz-products-menu',
  'rz-footer',
  'rz-hero',
  'rz-stats-band',
  'rz-proof-band',
  'rz-benefits-grid',
  'rz-strategy-grid',
  'rz-how-grid',
  'rz-training-cta',
  'rz-tm-layout',
  'rz-evidence-grid',
  'rz-lead-card',
  'rz-form-card',
  'rz-page-hero',
  'rz-modal',
];

for (const hook of requiredDesignHooks) {
  assert.ok(site.includes(hook) || css.includes(hook), `redesign should reference class hook: ${hook}`);
}

for (const phrase of [
  'className="rz-benefit-card-head"',
  'className="rz-icon-square rz-icon-square-deep"',
  '<span className="rz-step-tag">STEP 0{index + 1}</span>',
  '<span className="rz-card-foot">',
]) {
  assert.ok(site.includes(phrase), `what-we-do cards should match strategy card header treatment: ${phrase}`);
}

for (const phrase of [
  'rz-solutions-home',
  'rz-solutions-board',
  'rz-solutions-copy',
  'rz-solutions-ledger',
  'rz-solutions-ledger-head',
  'rz-solutions-metric-row',
]) {
  assert.ok(site.includes(phrase), `homepage solutions section should use the refreshed layout: ${phrase}`);
  assert.ok(css.includes(phrase), `homepage solutions section CSS should style refreshed layout: ${phrase}`);
}

assert.match(
  css,
  /\.rz-eyebrow\s*\{[^}]*font-size:\s*11px[^}]*letter-spacing:\s*0\.16em/s,
  'section preheadings should be slightly smaller and tighter'
);

assert.ok(
  site.includes('<span className="rz-panel-eyebrow">Agency outcomes</span>'),
  'homepage solutions ledger should not repeat Personal Agency as both eyebrow and title'
);
assert.ok(
  !site.includes('<span className="rz-panel-eyebrow">Personal agency</span>'),
  'homepage solutions ledger should avoid duplicate Personal Agency text'
);

for (const phrase of [
  'rz-tm-layout',
  'rz-tm-quotes',
  'rz-tm-video-action',
  'rz-tm-play-label',
]) {
  assert.ok(site.includes(phrase), `testimonial section should use a clearer video/review layout: ${phrase}`);
  assert.ok(css.includes(phrase), `testimonial CSS should style clearer video/review layout: ${phrase}`);
}

assert.ok(site.includes('Watch video'), 'testimonial video CTA should have visible text');

assert.ok(
  !css.includes('.rz-tm-author span {'),
  'testimonial author metadata selector should not override avatar spans'
);
assert.match(
  css,
  /\.rz-tm-author > div > span\s*\{/,
  'testimonial author metadata should be scoped to the text wrapper only'
);

// Headline strings (visible UI) we keep in the redesign.
const requiredVisibleStrings = [
  'Login',
  'Training login',
  'Book a demo',
  'See our products',
  'Learn more',
  'Browse the 3 courses',
  'View Administrator Courses',
  'View In-Service Plans',
  'View course',
  'Choose plan',
  'View agency plans',
  'Pick a time',
];

for (const phrase of requiredVisibleStrings) {
  assert.ok(site.includes(phrase), `site.tsx should preserve UI string: ${phrase}`);
}

for (const phrase of [
  'Start free trial',
  'Start 14-day trial',
  'Start In-Service trial',
  'no card required',
]) {
  assert.ok(!site.includes(phrase), `site.tsx should not mention a free trial: ${phrase}`);
  assert.ok(!content.includes(phrase), `content.ts should not mention a free trial: ${phrase}`);
}

for (const phrase of [
  'homeTrainingCta',
  'View training options',
  'Compare administrator and agency training',
]) {
  assert.ok(content.includes(phrase) || site.includes(phrase), `homepage should use training CTA copy: ${phrase}`);
}

assert.ok(site.includes('function HomeTrainingCta'), 'homepage should render a training CTA section');
assert.ok(site.includes('href="/training"'), 'homepage training CTA should link to /training');

for (const phrase of [
  '<circle cx="380" cy="270" r="44" fill="#FFFFFF" stroke="#DCEAF5" strokeWidth="2" />',
  '<path d="M363 270 l12 12 22-26" stroke="#0D5992"',
  '<rect width="220" height="96" rx="14" fill="#FFFFFF" stroke="#E7E5E0" />',
  '<rect x="16" y="16" width="32" height="32" rx="8" fill="#DCEAF5" />',
  '<path d="M24 32 l6 6 10-12" stroke="#083E69"',
  '<rect width="280" height="124" rx="14" fill="#0D5992" />',
]) {
  assert.ok(site.includes(phrase), `home hero SVG should keep compliance white and make claim card blue: ${phrase}`);
}

const homepageVideoUrl = 'https://youtu.be/KeVOcQhl2S4';

assert.ok(
  content.includes(`media: '${homepageVideoUrl}'`),
  `homepage testimonial content should use ${homepageVideoUrl}`
);
assert.ok(
  site.includes('href={video.media ??'),
  'homepage testimonial play button should use the testimonial media URL'
);
assert.ok(
  mapping.includes(homepageVideoUrl),
  `content mapping should document the homepage testimonial URL: ${homepageVideoUrl}`
);

for (const phrase of [
  'function PricingLeadModal',
  'rz-pricing-toggle',
  'rz-pricing-grid',
  'Yearly · save 10%',
  'monthlyValue: 99',
  'monthlyValue: 249',
  'monthlyValue: 499',
  'Up to 10 Clients',
  'Up to 50 Clients',
  'Up to 100 Clients',
]) {
  assert.ok(!site.includes(phrase), `homepage should not render fake pricing UI: ${phrase}`);
  assert.ok(!content.includes(phrase), `content should not keep fake pricing data: ${phrase}`);
}

for (const phrase of [
  'Required to start',
  'Initial administrator training',
  'Annual renewal',
  'New admin onboarding',
]) {
  assert.ok(!content.includes(phrase), `training copy should avoid unclear internal label: ${phrase}`);
  assert.ok(!trainingCourses.includes(phrase), `live course metadata should avoid unclear internal label: ${phrase}`);
}

// Administrator course cards must come from the main app public API, with local
// content only as the safety fallback.
for (const phrase of [
  'getServerSideProps',
  'fetchAdministratorCourses',
  'adminCourses',
]) {
  assert.ok(trainingPage.includes(phrase), `training page should server-load courses: ${phrase}`);
}

for (const phrase of [
  'NEXT_PUBLIC_RYZOLVE_COURSES_API',
  'https://api.ryzolve.app',
  '/public/courses?limit=100',
  'ADMIN_COURSE_DETAIL_PATH',
  '${ADMIN_COURSE_DETAIL_PATH}/${encodeURIComponent(slug)}',
  'normalisePublicCourse',
  'durationMinutes',
  'priceCents',
  'trainingBaseUrl',
  'trainingCourseDetailHref',
  'trainingCoursePurchaseHref',
  '/auth/register?redirect=',
  '`/courses/${encodeURIComponent(slug)}?auto=1`',
  'fetchAdministratorCourseBySlug',
  'NEXT_PUBLIC_RYZOLVE_AGENCY',
  'https://agency.ryzolve.app',
  'agencyInServiceSignupHref',
  '/auth/register',
]) {
  assert.ok(trainingCourses.includes(phrase), `training-courses.ts should wire live catalog data: ${phrase}`);
}

assert.ok(
  !trainingCourses.includes('`${trainingBaseUrl()}/courses`'),
  'course purchases should not send users back to app course detail pages'
);
assert.ok(
  !trainingCourses.includes('/checkout?course='),
  'course purchases should not use the learner app checkout redirect'
);

for (const phrase of [
  'adminCourses',
  'TrainingAdminCourses({ courses',
  'TrainingPathSplit({ courses',
  'href={trainingCourseDetailHref(c.slug)}',
  'TrainingCourseDetailPage',
  'trainingCoursePurchaseHref(course.slug)',
  'rz-tr-detail',
  'Purchase course',
]) {
  assert.ok(site.includes(phrase), `site.tsx should render live admin courses: ${phrase}`);
}

assert.ok(!site.includes('c.href || courseHref'), 'public course cards should not deep-link to app course pages');
assert.ok(!site.includes('<span>{course.eyebrow}</span>'), 'course detail hero should not show internal category labels');
assert.ok(
  !site.includes('const courseHref = `${trainingUrl}/courses`;'),
  'in-service package CTAs should not route to the individual course marketplace'
);

for (const phrase of [
  'agencyInServiceSignupHref',
  'href={inServiceHref}',
  'View agency plans',
]) {
  assert.ok(site.includes(phrase), `site.tsx should route in-service package CTAs to agency signup: ${phrase}`);
}

for (const phrase of [
  'rz-about-hero-subtitle',
  'rz-about-philosophy-lead',
]) {
  assert.ok(site.includes(phrase), `about page should use restrained heading hooks: ${phrase}`);
  assert.ok(css.includes(phrase), `about page CSS should style restrained heading hooks: ${phrase}`);
}

assert.match(
  css,
  /\.rz-about-hero-v2 h1\s*\{[^}]*font-size:\s*clamp\(42px,\s*4\.2vw,\s*64px\)[^}]*letter-spacing:\s*-1\.6px/s,
  'about page title should stay in sync with the smaller inner-page hero scale'
);

assert.match(
  css,
  /\.rz-about-hero-subtitle\s*\{[^}]*font-size:\s*clamp\(24px,\s*2\.8vw,\s*38px\)[^}]*line-height:\s*1\.14/s,
  'about page subtitle should be a subtitle, not a second oversized h1'
);

assert.match(
  css,
  /\.rz-about-philosophy-lead\s*\{[^}]*font-size:\s*clamp\(28px,\s*3vw,\s*44px\)[^}]*line-height:\s*1\.14/s,
  'about philosophy lead should not inherit oversized section headline treatment'
);

assert.match(
  css,
  /@media \(max-width:\s*640px\)\s*\{[\s\S]*\.rz-tr-jumpnav-inner\s*\{[^}]*display:\s*grid[^}]*grid-template-columns:\s*1fr[^}]*padding:\s*10px 18px 12px/s,
  'mobile training jump nav should use a contained one-column layout'
);

assert.match(
  css,
  /@media \(max-width:\s*640px\)\s*\{[\s\S]*\.rz-tr-jumpnav-tabs\s*\{[^}]*width:\s*100%[^}]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)[^}]*max-width:\s*100%/s,
  'mobile training tabs should fit inside the viewport instead of widening the page'
);

assert.match(
  css,
  /@media \(max-width:\s*640px\)\s*\{[\s\S]*\.rz-tr-jumpnav-tabs > button\s*\{[^}]*white-space:\s*normal[^}]*font-size:\s*12px/s,
  'mobile training tab labels should wrap instead of forcing horizontal overflow'
);

assert.match(
  css,
  /@media \(max-width:\s*640px\)\s*\{[\s\S]*\.rz-tr-jumpnav-right\s*\{[^}]*width:\s*100%[^}]*justify-content:\s*space-between/s,
  'mobile training jump nav actions should stay inside the viewport'
);

assert.match(
  css,
  /@media \(max-width:\s*640px\)\s*\{[\s\S]*\.rz-tr-section-head h2\s*\{[^}]*font-size:\s*clamp\(30px,\s*8vw,\s*34px\)[^}]*letter-spacing:\s*-1\.1px/s,
  'mobile training section headings should use the mobile content scale'
);

for (const phrase of [
  'In-Service package signup',
  'NEXT_PUBLIC_RYZOLVE_AGENCY',
  '/auth/register',
]) {
  assert.ok(mapping.includes(phrase), `content mapping should document agency signup routing: ${phrase}`);
}

for (const phrase of [
  'getServerSideProps',
  'fetchAdministratorCourseBySlug',
  'TrainingCourseDetailPage',
  'notFound: true',
]) {
  assert.ok(trainingDetailPage.includes(phrase), `training detail route should render website detail page: ${phrase}`);
}

for (const phrase of [
  '.rz-tr-course-card > div > p',
  '-webkit-line-clamp: 3',
  '-webkit-box-orient: vertical',
  'text-overflow: ellipsis',
]) {
  assert.ok(css.includes(phrase), `course card descriptions should be clamped: ${phrase}`);
}

assert.match(
  css,
  /\.rz-tr-plan-desc\s*\{[^}]*-webkit-line-clamp:\s*3[^}]*text-overflow:\s*ellipsis/s,
  'agency plan descriptions should be clamped to a short ellipsis preview'
);

// Animation hooks.
const requiredCssAnimations = [
  '@keyframes rzWordSwap',
  '.rz-word-frame',
];

for (const hook of requiredCssAnimations) {
  assert.ok(css.includes(hook), `site.css should preserve animation hook: ${hook}`);
}

// Cloudflare Workers deployment config.
assert.ok(pkg.dependencies?.['@opennextjs/cloudflare'], 'package.json should include @opennextjs/cloudflare');
assert.ok(pkg.devDependencies?.wrangler, 'package.json should include wrangler');
assert.equal(
  pkg.scripts?.['build:cloudflare'],
  'opennextjs-cloudflare build && node scripts/prepare-cloudflare-assets.mjs'
);
assert.equal(
  pkg.scripts?.['preview:cloudflare'],
  'npm run build:cloudflare && opennextjs-cloudflare preview'
);
assert.equal(
  pkg.scripts?.['deploy:cloudflare'],
  'npm run build:cloudflare && opennextjs-cloudflare deploy'
);
assert.equal(
  pkg.scripts?.['cf-typegen'],
  'wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts'
);

for (const phrase of [
  '"main": ".open-next/worker.js"',
  '"name": "ryzolve-website"',
  '"compatibility_date": "2026-06-03"',
  '"nodejs_compat"',
  '"directory": ".open-next/assets"',
  '"binding": "ASSETS"',
  '"observability"',
]) {
  assert.ok(wrangler.includes(phrase), `wrangler.jsonc should include ${phrase}`);
}

assert.ok(
  openNext.includes('defineCloudflareConfig') && openNext.includes('@opennextjs/cloudflare'),
  'open-next.config.ts should use the Cloudflare OpenNext adapter'
);

for (const phrase of ['.open-next', '.wrangler', '.dev.vars*', '!*.dev.vars.example']) {
  assert.ok(gitignore.includes(phrase), `.gitignore should include ${phrase}`);
}

assert.ok(
  assetsignore.includes('videos/testimonial-trm-hospice.mp4'),
  '.assetsignore should exclude the oversized testimonial video from Workers assets'
);

for (const phrase of ['.DS_Store', '**/.DS_Store']) {
  assert.ok(assetsignore.includes(phrase), `.assetsignore should exclude ${phrase}`);
}

// Documentation sections.
const requiredMappingSections = [
  '# Ryzolve Website Content Mapping',
  '## Client Approval Notes',
  '## Home',
  '## Product Pages',
  '## Training Cutover',
  '## Pages Preserved Even When Absent From Handoff',
];

for (const section of requiredMappingSections) {
  assert.ok(mapping.includes(section), `mapping doc should include ${section}`);
}

assert.ok(
  mapping.includes('/auth/register?redirect=<encoded /courses/<slug>?auto=1>'),
  'mapping doc should point purchase CTAs at learner signup with an encoded auto-checkout redirect'
);

console.log('Redesign smoke verification passed.');
