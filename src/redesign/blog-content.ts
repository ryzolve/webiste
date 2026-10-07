import type { BlogOfferKind } from './blog-offers';

export type BlogFaq = { q: string; a: string };

export type BlogRelatedLink = {
  href: string;
  title: string;
  description: string;
};

export type BlogWorkflowStep = {
  number: string;
  title: string;
  description: string;
};

export type BlogArticleList = {
  /** Optional lead-in above the list, e.g. "Changing:". */
  heading?: string;
  items: string[];
};

export type BlogArticleTable = {
  head: string[];
  rows: string[][];
};

/** One piece of a section, for copy that mixes paragraphs, lists and tables. */
export type BlogArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean; heading?: string }
  | { type: 'table'; head: string[]; rows: string[][] }
  /** A standalone "→" link in the copy, drawn as a tracked button. */
  | { type: 'cta'; label: string; href: string };

/**
 * Rendered in this order: paragraphs, blocks, lists, closing, table. `blocks`
 * keeps mixed copy in its written order; the other fields are the older,
 * fixed-order shape. Every string goes through the inline-markdown renderer,
 * so links and bold work everywhere.
 */
export type BlogArticleSection = {
  title: string;
  paragraphs: string[];
  blocks?: BlogArticleBlock[];
  lists?: BlogArticleList[];
  closing?: string[];
  table?: BlogArticleTable;
};

export type BlogCapabilityEntry = {
  slug: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  publishedAt: string;
  readingMinutes: number;
  keywords: string[];
  solutionTitle: string;
  solutionDescription: string;
  workflowSteps: BlogWorkflowStep[];
  articleSections: BlogArticleSection[];
  capabilities: string[];
  faqs: BlogFaq[];
  relatedLinks: BlogRelatedLink[];
  ctaLabel: string;
  ctaHref: string;
  /** Overrides the offer derived from ctaHref/eyebrow (see blog-offers.ts). */
  offer?: BlogOfferKind;
  /** Index of the article section the mid-article CTA follows. Defaults to 0. */
  inlineCtaAfter?: number;
  /** Last substantive revision (YYYY-MM-DD); shown in the hero and as dateModified. */
  updatedAt?: string;
  /** <title> when it should differ from the H1. */
  seoTitle?: string;
  /** Hero lede when the meta description reads too much like a summary. */
  heroDescription?: string;
  /** Workflow-section eyebrow; defaults to "How it works". */
  solutionEyebrow?: string;
  /** FAQ eyebrow; defaults to "Questions Texas PAS teams ask". */
  faqEyebrow?: string;
  /** End-of-article CTA copy; defaults to the offer's body. */
  ctaDescription?: string;
  /**
   * Turns the post's secondary CTA into an "email me this file" form. The site
   * never holds the file's URL: `resource` is a key in the API's
   * website.resources.ts, and POST /website/resources emails the link, so a
   * mistyped address never gets it. ctaHref should point back at the post's
   * #download (it is only a fallback; the CTA renders as a button).
   */
  gatedDownload?: { title: string; resource: string };
  /** Sources / disclaimer line printed after the last article section. */
  sourceNote?: string;
  /**
   * Per-post section headings. These were hard-coded to the first (payroll)
   * article, which meant every other post inherited its wording — so they are
   * optional here and fall back to neutral copy in BlogCapabilityPage.
   */
  /** Hero/card image under /public/img/blog. */
  image?: string;
  imageAlt?: string;
  heroPanelTitle?: string;
  heroPanelDescription?: string;
  capabilitiesTitle?: string;
  faqTitle?: string;
  relatedTitle?: string;
  ctaTitle?: string;
};

export const BLOG_PAGE_SIZE = 6;

export const publishedBlogCapabilities: BlogCapabilityEntry[] = [
  {
    slug: 'monthly-in-service-training-texas-home-care-agencies',
    image: '/img/blog/monthly-in-service-training-texas-home-care-agencies.jpg',
    imageAlt: 'A caregiver working through a training module on a tablet at a kitchen table',
    label: 'Monthly in-service training',
    heroPanelTitle: 'Twelve topics, one plan.',
    heroPanelDescription:
      'A topic a month for your whole care team, completion shown by learner, and a certificate for every person.',
    eyebrow: 'In-service training',
    title: 'Monthly In-Service Training for Texas Home Care Agencies: The 12 Topics',
    seoTitle: 'Monthly In-Service Training for Texas Home Care Agencies: All 12 Topics',
    description:
      'A guide to the 12 monthly In-Service topics every Texas home care agency should cover, what surveyors ask for, and how Ryzolve helps you prove it.',
    heroDescription:
      'Nobody enjoys training logistics. But when a surveyor says, "Show me your staff in-service and training records," you want to open one place and have the answer.',
    publishedAt: '2026-10-07',
    readingMinutes: 6,
    keywords: [
      'in-service training home care texas',
      'caregiver in-service topics',
      'home care annual training',
      'PAS agency in-service training',
      'HCSSA in-service',
    ],
    solutionTitle: '',
    solutionDescription: '',
    workflowSteps: [],
    articleSections: [
      {
        title: 'What\'s actually required',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'It depends on your license category. For Medicare-certified home health, federal rules require home health aides to get at least 12 hours of in-service training in each 12-month period. For PAS attendants, as far as we can find, Texas doesn\'t set an hour minimum. The agency decides what competent looks like and has to be able to show it.' },
          { type: 'p', text: 'Either way, HHSC survey document requests ask for staff in-service and training records. The records are what you\'re judged on.' },
        ],
      },
      {
        title: 'The 12 topics',
        paragraphs: [],
        blocks: [
          { type: 'p', text: '**January: Infection Control.** Hand hygiene, protective equipment, and what to do when a client discloses an illness. [Read more →](https://ryzolve.com/blogs/infection-control-training-home-care)' },
          { type: 'p', text: '**February: Client Rights, HIPAA & Elder Abuse.** Privacy, dignity and recognizing abuse.' },
          { type: 'p', text: '**March: Communication Skills & Cultural Competency.** Building trust with clients from different backgrounds.' },
          { type: 'p', text: '**April: Dementia & Alzheimer\'s Care.** Handling confusion, agitation and safety. [Read more →](https://ryzolve.com/blogs/dementia-alzheimers-care-training)' },
          { type: 'p', text: '**May: Emergency & Disaster Preparedness.** Your plan, your role in it, and what to do before the storm. [Read more →](https://ryzolve.com/blogs/emergency-disaster-preparedness-training)' },
          { type: 'p', text: '**June: Assisting with ADLs & Safe Transfer.** Body mechanics that protect the client and the caregiver.' },
          { type: 'p', text: '**July: TB / Airborne Pathogen & Safety Precautions.** Recognizing symptoms and taking the right precautions.' },
          { type: 'p', text: '**August: Caregiver Self-Care.** Burnout is a retention problem. This one helps.' },
          { type: 'p', text: '**September: Ethics & Professional Conduct.** Boundaries, client property and conduct.' },
          { type: 'p', text: '**October: Documentation & Charting.** What good records look like. [Read more →](https://ryzolve.com/blogs/documentation-and-charting-training)' },
          { type: 'p', text: '**November: Abuse, Neglect & Exploitation Reporting.** The duty to report, and exactly how. [Read more →](https://ryzolve.com/blogs/abuse-neglect-exploitation-reporting-training)' },
          { type: 'p', text: '**December: Vital Signs & Health Monitoring.** Technique, normal ranges and when to escalate.' },
        ],
      },
      {
        title: 'How Ryzolve helps',
        paragraphs: [],
        blocks: [
          {
            type: 'list',
            items: [
              '**A full year, ready to go.** All 12 topics are included in our monthly In-Service plan.',
              '**Proof on demand.** Administrators see completion by learner and download a certificate for each person.',
              '**Your own material, too.** Our training platform lets you add your own courses, in video or text, beyond the standard 12.',
            ],
          },
        ],
      },
      {
        title: 'Beyond training',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'Training is one piece of staying survey-ready. Ryzolve also runs employability and exclusion checks at hire and every month, stores every result, and keeps caregiver files organized, so the records a surveyor asks for are easy to pull. See how it fits together in a short demo.' },
          { type: 'cta', label: 'Book a demo', href: '/calendly' },
        ],
      },
    ],
    inlineCtaAfter: 2,
    capabilities: [],
    faqs: [
      {
        q: 'Is In-Service training required for PAS agencies?',
        a: 'As far as we can find, Texas doesn\'t set a minimum number of training hours for PAS attendants. Your agency has to be able to show competency, and surveyors ask for training records.',
      },
      {
        q: 'What does federal law require for home health aides?',
        a: 'At least 12 hours of in-service training in each 12-month period for home health aides in Medicare-certified agencies.',
      },
      {
        q: 'Can we add our own courses?',
        a: 'Yes. Ryzolve\'s training platform lets subscribing agencies add courses in video or text.',
      },
      {
        q: 'How do I show a surveyor who\'s trained?',
        a: 'Administrators see completion by learner and can download a certificate for each person.',
      },
    ],
    relatedLinks: [
      {
        href: '/blogs/texas-hcssa-license-survey-readiness',
        title: 'License survey checklist',
        description: 'What surveyors ask for.',
      },
      {
        href: '/compliance-regulation',
        title: 'Compliance checks',
        description: 'How Ryzolve runs and stores employability checks.',
      },
      {
        href: '/calendly',
        title: 'Book a demo',
        description: 'See how Ryzolve helps agencies stay survey-ready beyond training.',
      },
    ],
    ctaLabel: 'View In-Service Plans',
    ctaHref: '/training',
    faqEyebrow: 'Questions Texas agencies ask',
    relatedTitle: 'In-service training connects to the rest of your agency.',
    ctaTitle: 'See your team\'s training status',
  },
  {
    slug: '16-hour-new-administrator-training-texas',
    image: '/img/blog/16-hour-new-administrator-training-texas.jpg',
    imageAlt: 'An agency administrator taking notes at her desk beside an open laptop',
    label: '16-hour new administrator training',
    eyebrow: 'Texas administrator training',
    title: 'The 16-Hour Administrator Training in Texas: What It Is and When to Take It',
    seoTitle: '16-Hour New Administrator Training for Texas HCSSAs: Deadline, Rules and Timing',
    description:
      'Texas requires 16 more clock hours of training for first-time HCSSA Administrators and Alternates. When the clock starts, what you can finish before you\'re designated, and how to keep it from slipping.',
    heroDescription:
      'The 8-hour course gets everyone\'s attention because it comes first. The 16-hour course is the one that sneaks up on people. You\'re running an agency, the first year disappears, and suddenly the deadline is close.',
    publishedAt: '2026-08-11',
    updatedAt: '2026-10-07',
    readingMinutes: 5,
    keywords: [
      '16 hour texas administrator training',
      'new HCSSA administrator training',
      'first-time administrator training texas',
      '26 TAC 558.259',
      'texas home care administrator requirements',
    ],
    solutionEyebrow: 'At a glance',
    solutionTitle: 'The rule in plain English',
    solutionDescription:
      'This applies to first-time Administrators and Alternate Administrators under 26 TAC §558.259.',
    workflowSteps: [
      {
        number: '01',
        title: '8 hours before you\'re designated',
        description: 'That\'s the initial course, done in the 12 months before designation.',
      },
      {
        number: '02',
        title: '16 more hours by the end of your first 12 months',
        description: 'The clock runs from the date you\'re designated.',
      },
      {
        number: '03',
        title: '24 hours total, then 12 a year',
        description: 'After year one, continuing education takes over.',
      },
    ],
    articleSections: [
      {
        title: 'The part most people miss: you can start early',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'Any of the 16 hours can be finished before you\'re designated, as long as they fall within the 12 months right before your designation date.' },
          { type: 'p', text: 'That matters because the first year as an Administrator is chaotic. If you\'re already taking the 8-hour course, nothing stops you from finishing some or all of the 16 hours while you\'re at it. Then the deadline never becomes a problem.' },
        ],
      },
      {
        title: 'What the 16 hours cover',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'The rule lists required subjects, and HHSC reviews courses against it. A course can also include other topics related to an Administrator\'s duties. You\'re not memorizing statutes for fun. You\'re learning what you\'ll be held to when a surveyor walks in.' },
        ],
      },
      {
        title: 'Keep the proof where you can find it',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'Hold on to your certificate, and make sure it shows the course, the hours and the date. For continuing education, HHSC describes proof as the name of the class, the topics covered, and the hours and dates. It\'s a good habit from day one.' },
          { type: 'p', text: 'A certificate sitting in an email from eighteen months ago is how people end up scrambling during a survey.' },
        ],
      },
      {
        title: 'What comes after',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'Once you\'ve done the 24 initial hours, you move to 12 hours of continuing education in each 12-month period. [Here\'s how the 12-hour renewal works →](https://ryzolve.com/blogs/12-hour-administrator-renewal-training-texas)' },
        ],
      },
      {
        title: 'Take it with Ryzolve',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'Our 16-hour course is HHSC-recognized, self-paced and online. You can finish it in a weekend or spread it over a few weeks, and you get a certificate you can download when you\'re done.' },
        ],
      },
      {
        title: 'Beyond training',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'Training is one piece of staying survey-ready. Ryzolve also runs employability and exclusion checks at hire and every month, stores every result, and keeps caregiver files organized, so the records a surveyor asks for are easy to pull. See how it fits together in a short demo.' },
          { type: 'cta', label: 'Book a demo', href: '/calendly' },
        ],
      },
    ],
    inlineCtaAfter: 4,
    sourceNote:
      '*This reflects 26 TAC §558.259 and HHSC guidance. Confirm current requirements at [hhs.texas.gov](https://www.hhs.texas.gov/providers/long-term-care-providers/home-community-support-services-agencies-hcssa) before relying on this for a compliance decision.*',
    capabilities: [],
    faqs: [
      {
        q: 'Who needs the 16-hour training?',
        a: 'First-time Administrators and Alternate Administrators of Texas HCSSAs, which includes home health, hospice and personal assistance services agencies.',
      },
      {
        q: 'Can I take any of it before I\'m designated?',
        a: 'Yes. Any of the 16 hours can be completed before designation if they fall within the 12 months immediately before the date you\'re designated.',
      },
      {
        q: 'Do I have to finish the 8 hours first?',
        a: 'The 8 hours must be completed before you\'re designated, within the 12 months before. For the 16 hours, what matters is the window: any time before designation (inside that 12-month lookback) or before the end of your first 12 months in the role.',
      },
      {
        q: 'What happens after I finish the 24 hours?',
        a: 'You complete 12 hours of continuing education in each following 12-month period.',
      },
      {
        q: 'Do I get a certificate?',
        a: 'Yes. You can download a certificate when you complete the course.',
      },
    ],
    relatedLinks: [
      {
        href: '/blogs/8-hour-initial-administrator-training-texas',
        title: '8-hour initial training',
        description: 'The course that comes before designation.',
      },
      {
        href: '/blogs/12-hour-administrator-renewal-training-texas',
        title: '12-hour renewal training',
        description: 'What continuing education looks like after year one.',
      },
      {
        href: '/compliance-regulation',
        title: 'Compliance checks',
        description: 'How Ryzolve runs and stores employability checks.',
      },
      {
        href: '/calendly',
        title: 'Book a demo',
        description: 'See how Ryzolve helps agencies stay survey-ready beyond training.',
      },
    ],
    ctaLabel: 'View the 16-hour course',
    ctaHref: '/training/16-hours-for-new-administrators-and-alternates',
    faqEyebrow: 'Questions Texas administrators ask',
    relatedTitle: 'Administrator training connects to the rest of your agency.',
    ctaTitle: 'Get your Administrator certified',
  },
  {
    slug: 'abuse-neglect-exploitation-reporting-training',
    image: '/img/blog/abuse-neglect-exploitation-reporting-training.jpg',
    imageAlt: 'Two care staff talking quietly across a break-room table',
    label: 'Abuse & neglect reporting',
    eyebrow: 'In-service training',
    title: 'Abuse, Neglect and Exploitation Reporting: What Every Caregiver Needs to Know',
    seoTitle: 'Abuse, Neglect and Exploitation Reporting for Texas Caregivers: What Staff Must Know',
    description:
      'In Texas, anyone who suspects abuse, neglect or exploitation of an elderly or disabled adult must report it immediately. What your caregivers need to know, and what surveyors and monitors look for.',
    heroDescription:
      'Your caregivers are in clients\' homes when nobody else is. If something is wrong, they\'re often the first to see it. Whether they know exactly what to do next is one of the most important things you can train.',
    publishedAt: '2026-08-06',
    updatedAt: '2026-10-07',
    readingMinutes: 6,
    keywords: [
      'caregiver abuse neglect exploitation reporting texas',
      'mandatory reporting home care texas',
      'DFPS hotline caregivers',
      'home care in-service training texas',
    ],
    solutionTitle: '',
    solutionDescription: '',
    workflowSteps: [],
    articleSections: [
      {
        title: 'The law, in plain English',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'In Texas, everyone is a mandated reporter. Under Human Resources Code §48.051, anyone who has cause to believe an elderly person or an adult with a disability is being abused, neglected or exploited must report it immediately to the Department of Family and Protective Services (DFPS).' },
          {
            type: 'list',
            items: [
              '**Phone:** 1-800-252-5400, 24 hours a day',
              '**Online:** txabusehotline.org (if the person isn\'t in immediate danger)',
              '**If someone is in immediate danger:** call 911 first, then DFPS',
            ],
          },
          { type: 'p', text: 'A few things caregivers often don\'t know:' },
          {
            type: 'list',
            items: [
              'The duty is personal. Telling a supervisor is good practice, but it doesn\'t replace reporting.',
              'People who report in good faith are protected from civil and criminal liability, and DFPS keeps the reporter\'s name confidential.',
              'Failing to report can be charged as a crime.',
            ],
          },
        ],
      },
      {
        title: 'What a caregiver should do',
        paragraphs: [],
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              '**Make sure the person is safe.** Call 911 if there\'s immediate danger.',
              '**Report to DFPS.** If you\'re not sure which agency handles it, call the hotline. They\'ll route it.',
              '**Tell the agency.** The office needs to know so it can respond and protect the client.',
              '**Write down what you saw and heard.** Date, time, facts. Not opinions or guesses.',
              '**Don\'t investigate.** No confronting the family and no collecting evidence. Report and let the investigators work.',
            ],
          },
        ],
      },
      {
        title: 'It isn\'t only caregivers who need to know',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'HHSC\'s contract monitoring requests documentation that each client or their representative was told, orally and in writing, how to report complaints and allegations of abuse, neglect or exploitation. That needs to happen before service starts and again every 12 months. It\'s a specific item on the monitoring document list, and it\'s easy to forget because nobody\'s in training when it comes due.' },
        ],
      },
      {
        title: 'Why this ties back to hiring',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'Substantiated findings of abuse, neglect or exploitation are what end up on the Employee Misconduct Registry and in SEMARC. That\'s why your pre-hire checks matter, and why a good reporting culture matters. [See which checks to run →](https://ryzolve.com/blogs/leie-nar-emr-semarc-texas-employability-checks)' },
        ],
      },
      {
        title: 'Training your team',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'Ryzolve\'s monthly In-Service plan includes both Client Rights, HIPAA & Elder Abuse and a dedicated Abuse, Neglect & Exploitation Reporting topic. Administrators can see who has completed each topic and download a certificate for each person. When a surveyor asks for training records, you have them.' },
        ],
      },
      {
        title: 'Beyond training',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'Training is one piece of staying survey-ready. Ryzolve also runs employability and exclusion checks at hire and every month, stores every result, and keeps caregiver files organized, so the records a surveyor asks for are easy to pull. See how it fits together in a short demo.' },
          { type: 'cta', label: 'Book a demo', href: '/calendly' },
        ],
      },
    ],
    inlineCtaAfter: 4,
    sourceNote:
      '*This reflects Texas Human Resources Code Chapter 48 and DFPS guidance. Confirm current requirements with DFPS and HHSC before relying on this for a compliance decision.*',
    capabilities: [],
    faqs: [
      {
        q: 'Who has to report suspected abuse, neglect or exploitation?',
        a: 'Anyone who has cause to believe an elderly person or an adult with a disability is being abused, neglected or exploited, under Texas Human Resources Code §48.051.',
      },
      {
        q: 'Where do caregivers report?',
        a: 'To DFPS at 1-800-252-5400 or txabusehotline.org. If someone is in immediate danger, call 911 first.',
      },
      {
        q: 'Is telling my supervisor enough?',
        a: 'No. The duty to report belongs to the person who has cause to believe it\'s happening. Telling the agency is also important, but it doesn\'t replace the report.',
      },
      {
        q: 'Are reporters protected?',
        a: 'People who report in good faith have immunity from civil and criminal liability, and DFPS keeps the reporter\'s name confidential.',
      },
      {
        q: 'How often should caregivers be trained on this?',
        a: 'Annually works for most agencies, and new hires should be trained early. Ryzolve\'s In-Service plan covers it every year.',
      },
    ],
    relatedLinks: [
      {
        href: '/blogs/monthly-in-service-training-texas-home-care-agencies',
        title: 'All 12 In-Service topics',
        description: 'The full monthly catalog.',
      },
      {
        href: '/compliance-regulation',
        title: 'Compliance checks',
        description: 'How Ryzolve runs and stores employability checks.',
      },
      {
        href: '/calendly',
        title: 'Book a demo',
        description: 'See how Ryzolve helps agencies stay survey-ready beyond training.',
      },
    ],
    ctaLabel: 'View In-Service Plans',
    ctaHref: '/training',
    faqEyebrow: 'Questions Texas agencies ask',
    relatedTitle: 'In-service training connects to the rest of your agency.',
    ctaTitle: 'See your team\'s training status',
  },
  {
    slug: 'documentation-and-charting-training',
    image: '/img/blog/documentation-and-charting-training.jpg',
    imageAlt: 'A caregiver writing visit notes on a tablet in a client’s living room',
    label: 'Documentation & charting',
    eyebrow: 'In-service training',
    title: 'If It Isn\'t Documented, a Surveyor Can\'t See It',
    seoTitle: 'Documentation and Charting for Home Care: What Surveyors and Monitors Look For',
    description:
      'Good care that isn\'t documented is invisible to a surveyor. What home care records get requested, the habits that keep them audit-ready, and why late records cost you.',
    heroDescription:
      'A caregiver can do everything right on a visit and still leave the agency exposed. If the record doesn\'t show what happened, as far as a surveyor or monitor is concerned, it didn\'t.',
    publishedAt: '2026-08-04',
    updatedAt: '2026-10-07',
    readingMinutes: 6,
    keywords: [
      'home care documentation training',
      'caregiver charting texas',
      'home care documentation requirements',
      'PAS agency documentation',
      'audit-ready caregiver records',
    ],
    solutionTitle: '',
    solutionDescription: '',
    workflowSteps: [],
    articleSections: [
      {
        title: 'What actually gets requested',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'Look at the lists HHSC sends before a visit. A license survey asks for the week\'s visit schedule, your client roster, admission and discharge records, personnel files and clinical or client records. A contract monitoring asks for client charts, including referrals and authorizations, evaluations, service plans, attendant orientations and practitioner statements for the whole monitoring period.' },
          { type: 'p', text: 'And here\'s the part that matters: those documents have to already exist. HHSC\'s monitoring form says they aren\'t to be created after you get the notice.' },
        ],
      },
      {
        title: 'The habits that hold up',
        paragraphs: [],
        blocks: [
          {
            type: 'list',
            items: [
              '**Document at the time, not later.** A note written on the day is believable. A note written three weeks later, after the notice arrived, isn\'t.',
              '**Stick to facts.** What the caregiver saw, did and heard. Not opinions or guesses.',
              '**Match what was authorized.** If the authorization says one thing and the visit record says another, someone will ask about it.',
              '**Correct, don\'t erase.** Fix a mistake with a dated correction that explains it. Never wipe out the original.',
              '**Label late entries.** If something has to be written late, say so.',
            ],
          },
        ],
      },
      {
        title: 'Where changes create paperwork',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'For the PAS clients we see most, a change in authorized hours means the schedule changed, and that means a revised service plan and a fresh attendant orientation within 7 days of the new schedule start. It\'s required whether or not the caregiver changed. These are exactly the records that go missing when schedules shift in the middle of a busy week. Check your own program\'s rules for the details.' },
        ],
      },
      {
        title: 'A five-minute test',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'Pick a client. Can you show the authorization, the current service plan, the attendant\'s orientation and the visit records for the last month, in order, without hunting? If yes, good. If not, you\'ve found where to start.' },
        ],
      },
      {
        title: 'Where Ryzolve fits',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'Ryzolve\'s In-Service plan includes a Documentation & Charting topic every year, with completion shown by learner and a downloadable certificate for each person. On the platform side, we capture caregiver hours worked by visit and track the service plans and orientations that follow a schedule change, so the evidence is there when it\'s asked for.' },
        ],
      },
      {
        title: 'Beyond training',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'Training is one piece of staying survey-ready. Ryzolve also runs employability and exclusion checks at hire and every month, stores every result, and keeps caregiver files organized, so the records a surveyor asks for are easy to pull. See how it fits together in a short demo.' },
          { type: 'cta', label: 'Book a demo', href: '/calendly' },
        ],
      },
    ],
    inlineCtaAfter: 4,
    capabilities: [],
    faqs: [
      {
        q: 'Does this training replace our own documentation policy?',
        a: 'No. It builds good habits, but your agency\'s own policy and formats still apply.',
      },
      {
        q: 'How often should caregivers refresh on documentation?',
        a: 'Annually works for most agencies, with new hires trained early.',
      },
      {
        q: 'Can records be created after a notice arrives?',
        a: 'No. HHSC\'s monitoring form says documents must already exist and aren\'t to be created after the notice.',
      },
      {
        q: 'How do we handle a mistake in a record?',
        a: 'Add a dated correction that explains it. Don\'t delete or overwrite the original entry.',
      },
      {
        q: 'Where do certificates go?',
        a: 'In Ryzolve training, administrators can download a certificate for each person.',
      },
    ],
    relatedLinks: [
      {
        href: '/blogs/texas-hhsc-contract-monitoring-readiness',
        title: 'Contract monitoring checklist',
        description: 'What monitors ask for.',
      },
      {
        href: '/blogs/texas-hcssa-license-survey-readiness',
        title: 'License survey checklist',
        description: 'What surveyors ask for.',
      },
      {
        href: '/blogs/monthly-in-service-training-texas-home-care-agencies',
        title: 'All 12 In-Service topics',
        description: 'The full monthly catalog.',
      },
      {
        href: '/calendly',
        title: 'Book a demo',
        description: 'See how Ryzolve helps agencies stay survey-ready beyond training.',
      },
    ],
    ctaLabel: 'View In-Service Plans',
    ctaHref: '/training',
    faqEyebrow: 'Questions Texas agencies ask',
    relatedTitle: 'Documentation connects to the rest of your agency.',
    ctaTitle: 'See your team\'s training status',
  },
  {
    slug: '8-hour-initial-administrator-training-texas',
    image: '/img/blog/8-hour-initial-administrator-training-texas.jpg',
    imageAlt: 'A new administrator working through training on a laptop at a kitchen table',
    label: '8-hour initial administrator training',
    eyebrow: 'Texas administrator training',
    title: 'The 8-Hour Administrator Training: Timing Matters More Than You\'d Think',
    seoTitle: '8-Hour Initial Administrator Training for Texas HCSSAs: What It Covers and When to Take It',
    description:
      'First-time HCSSA Administrators and Alternates in Texas must complete 8 clock hours in the 12 months before designation. What it covers, why timing matters, and how to take it online.',
    heroDescription:
      'Most agencies know the 8-hour course is required. What catches people off guard is the timing. It isn\'t enough to have taken it "at some point." There\'s a window.',
    publishedAt: '2026-07-30',
    updatedAt: '2026-10-07',
    readingMinutes: 5,
    keywords: [
      '8 hour texas administrator training',
      'initial administrator training texas',
      'pre-designation administrator training',
      'HCSSA administrator requirements',
      '26 TAC 558.259',
    ],
    solutionEyebrow: 'At a glance',
    solutionTitle: 'The rule in plain English',
    solutionDescription:
      'That\'s 26 TAC §558.259(c).',
    workflowSteps: [
      {
        number: '01',
        title: 'Before you\'re designated',
        description: 'First-time Administrators and Alternate Administrators must complete 8 clock hours before designation.',
      },
      {
        number: '02',
        title: 'Inside a 12-month window',
        description: 'Those hours have to be done during the 12 months immediately before the date of designation.',
      },
      {
        number: '03',
        title: 'Then 16 more',
        description: 'The additional 16 hours follow in your first year (or earlier, inside the same lookback).',
      },
    ],
    articleSections: [
      {
        title: 'Where agencies slip up',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'Say you promote an Alternate Administrator into the Administrator role, or you hire someone quickly. They took a course last year. When did they finish it, exactly? If it was more than 12 months before they were designated, it doesn\'t count for the initial requirement.' },
          { type: 'p', text: 'It\'s an easy thing to miss, and it\'s the kind of detail that gets noticed when a surveyor asks to see the paperwork. So write the completion date down next to the designation date and look at the gap.' },
        ],
      },
      {
        title: 'What the 8 hours cover',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'The course introduces the licensing standards an agency operates under and the laws that apply to running one. That includes the Texas Health and Safety Code chapters on home and community support services agencies, the Human Resources Code chapter on the rights of the elderly, and federal laws like the Americans with Disabilities Act and the Family and Medical Leave Act. It\'s the foundation for everything the 16-hour course builds on.' },
        ],
      },
      {
        title: 'A quick check before someone steps into the role',
        paragraphs: [],
        blocks: [
          {
            type: 'list',
            items: [
              'What\'s the exact date the 8-hour course was completed?',
              'What\'s the exact date of designation?',
              'Is it within 12 months? If not, the hours need to be redone.',
              'Is the 16-hour course already on the calendar?',
            ],
          },
        ],
      },
      {
        title: 'Take it with Ryzolve',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'Our 8-hour course is HHSC-recognized, self-paced and online. You finish when it suits you, and you can download your certificate the moment you complete it.' },
        ],
      },
      {
        title: 'Beyond training',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'Training is one piece of staying survey-ready. Ryzolve also runs employability and exclusion checks at hire and every month, stores every result, and keeps caregiver files organized, so the records a surveyor asks for are easy to pull. See how it fits together in a short demo.' },
          { type: 'cta', label: 'Book a demo', href: '/calendly' },
        ],
      },
    ],
    inlineCtaAfter: 3,
    sourceNote:
      '*This reflects 26 TAC §558.259 and HHSC guidance. Confirm current requirements at [hhs.texas.gov](https://www.hhs.texas.gov/providers/long-term-care-providers/home-community-support-services-agencies-hcssa) before relying on this for a compliance decision.*',
    capabilities: [],
    faqs: [
      {
        q: 'When exactly do I need to complete the 8 hours?',
        a: 'Before you\'re designated, and within the 12 months immediately before your designation date.',
      },
      {
        q: 'Does this replace the 16-hour training?',
        a: 'No. The 8 hours are the initial requirement. The additional 16 hours are separate, and together they make 24.',
      },
      {
        q: 'Can the same course count for more than one agency?',
        a: 'The requirement attaches to the person being designated. Each person needs their own completed hours and their own certificate.',
      },
      {
        q: 'How do I get the certificate?',
        a: 'You can download it as soon as you complete the course.',
      },
    ],
    relatedLinks: [
      {
        href: '/blogs/16-hour-new-administrator-training-texas',
        title: '16-hour new administrator training',
        description: 'What\'s required in the first year.',
      },
      {
        href: '/blogs/12-hour-administrator-renewal-training-texas',
        title: '12-hour renewal training',
        description: 'What continuing education looks like after that.',
      },
      {
        href: '/compliance-regulation',
        title: 'Compliance checks',
        description: 'How Ryzolve runs and stores employability checks.',
      },
      {
        href: '/calendly',
        title: 'Book a demo',
        description: 'See how Ryzolve helps agencies stay survey-ready beyond training.',
      },
    ],
    ctaLabel: 'View the 8-Hour Course',
    ctaHref: '/training/8-hours-initial-administrator-training-program',
    faqEyebrow: 'Questions Texas administrators ask',
    relatedTitle: 'Administrator training connects to the rest of your agency.',
    ctaTitle: 'Get your new Administrator certified',
  },
  {
    slug: 'infection-control-training-home-care',
    image: '/img/blog/infection-control-training-home-care.jpg',
    imageAlt: 'A caregiver washing her hands at a home bathroom sink',
    label: 'Infection control training',
    eyebrow: 'In-service training',
    title: 'Infection Control in Home Care: The Rule, the Records and the Habits',
    seoTitle: 'Infection Control for Texas Home Care Agencies: The Rule, the Records and the Training',
    description:
      'What 26 TAC §558.285 requires of Texas HCSSAs on infection control, the documentation agencies forget, and how to keep caregiver training current.',
    heroDescription:
      'Hand hygiene is the easy part. What agencies trip over is the paperwork around infections, and whether what a caregiver learns in a client\'s kitchen ever makes it back to the office.',
    publishedAt: '2026-07-28',
    updatedAt: '2026-10-07',
    readingMinutes: 5,
    keywords: [
      'infection control training home care',
      '26 TAC 558.285',
      'caregiver infection control texas',
      'home health infection control policy',
    ],
    solutionTitle: '',
    solutionDescription: '',
    workflowSteps: [],
    articleSections: [
      {
        title: 'What the rule requires',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'Under 26 TAC §558.285, a Texas HCSSA must adopt and enforce written infection control policies, including prevention of the spread of infectious and communicable disease. The policies must ensure that the agency, its employees and its contractors comply with Texas Health and Safety Code Chapter 81.' },
          { type: 'p', text: 'HHSC has also proposed an amendment that would require the written policy to address measures to prevent the spread of communicable and infectious diseases, including use of personal protective equipment. Watch for how it lands.' },
        ],
      },
      {
        title: 'The part agencies forget',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'The rule also requires you to document infections a client acquires while receiving services. For agencies licensed only for personal assistance services, that means recording the date the infection was disclosed to the employee, the client\'s name, and the treatment as the client described it. Other license categories record more.' },
          { type: 'p', text: 'Think about what that means in practice. A client mentions a bad cough or a UTI to a caregiver. Does that reach the office? Does anyone write it down? Surveyors ask for infection control documentation, and this is a place where good care and good records can quietly come apart.' },
        ],
      },
      {
        title: 'What training should cover',
        paragraphs: [],
        blocks: [
          {
            type: 'list',
            items: [
              'Hand hygiene, and when it matters most',
              'Gloves and other protective equipment, used properly',
              'Cleaning and handling of supplies in a home setting',
              'What to do and who to tell when a client discloses an illness',
              'When a caregiver should stay home',
            ],
          },
        ],
      },
      {
        title: 'A five-minute test',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'Ask one caregiver, "If a client told you they\'d started antibiotics for an infection, what would you do?" If the answer is "I\'d keep an eye on it," your process has a gap.' },
        ],
      },
      {
        title: 'Where Ryzolve fits',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'Infection Control is part of Ryzolve\'s In-Service plan every year. Administrators see completion by learner and can download a certificate for each person. Our training platform also lets your agency add your own courses, so your infection control policy can sit next to the standard module.' },
        ],
      },
      {
        title: 'Beyond training',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'Training is one piece of staying survey-ready. Ryzolve also runs employability and exclusion checks at hire and every month, stores every result, and keeps caregiver files organized, so the records a surveyor asks for are easy to pull. See how it fits together in a short demo.' },
          { type: 'cta', label: 'Book a demo', href: '/calendly' },
        ],
      },
    ],
    inlineCtaAfter: 4,
    sourceNote:
      '*This reflects 26 TAC §558.285. Confirm current requirements at [hhs.texas.gov](https://www.hhs.texas.gov/providers/long-term-care-providers/home-community-support-services-agencies-hcssa) before relying on this for a compliance decision.*',
    capabilities: [],
    faqs: [
      {
        q: 'Is infection control training part of every In-Service plan?',
        a: 'Yes. It\'s one of the twelve topics in Ryzolve\'s monthly In-Service plan.',
      },
      {
        q: 'Does it replace our own infection control policy?',
        a: 'No. The rule requires your agency to adopt and enforce its own written policy. Training supports it.',
      },
      {
        q: 'What infection documentation does the rule require?',
        a: 'Infections a client acquires while receiving services must be documented. For PAS-only agencies, that means the date the infection was disclosed to the employee, the client\'s name and the treatment as the client disclosed it.',
      },
      {
        q: 'Can we add our own infection control material?',
        a: 'Yes. Ryzolve\'s training platform lets subscribing agencies add their own courses, using video or text.',
      },
      {
        q: 'How often should caregivers refresh?',
        a: 'Annually is a sensible cadence, with new hires trained early.',
      },
    ],
    relatedLinks: [
      {
        href: '/blogs/monthly-in-service-training-texas-home-care-agencies',
        title: 'All 12 In-Service topics',
        description: 'The full monthly catalog.',
      },
      {
        href: '/blogs/texas-hcssa-license-survey-readiness',
        title: 'License survey checklist',
        description: 'Infection control documentation is on the list.',
      },
      {
        href: '/calendly',
        title: 'Book a demo',
        description: 'See how Ryzolve helps agencies stay survey-ready beyond training.',
      },
    ],
    ctaLabel: 'View In-Service Plans',
    ctaHref: '/training',
    faqEyebrow: 'Questions Texas agencies ask',
    relatedTitle: 'In-service training connects to the rest of your agency.',
    ctaTitle: 'See your team\'s training status',
  },
  {
    slug: 'client-rights-hipaa-elder-abuse-training',
    image: '/img/blog/client-rights-hipaa-elder-abuse-training.jpg',
    imageAlt: 'A caregiver closing a folder of client records at a home office desk',
    label: 'Client rights & HIPAA',
    eyebrow: 'In-service training',
    title: 'Client Rights, HIPAA & Elder Abuse: One Training Topic, Two Kinds of Protection',
    description:
      'How Texas home care agencies keep Client Rights, HIPAA, and Elder Abuse training current across caregivers and staff, and why it matters for both clients and compliance.',
    publishedAt: '2026-07-23',
    readingMinutes: 6,
    keywords: [
      'HIPAA training home care',
      'client rights training caregivers',
      'elder abuse training texas',
      'home care privacy training',
      'PAS agency in-service training',
    ],
    solutionTitle: 'How it works at your agency.',
    solutionDescription:
      'This topic protects clients directly while supporting the agency\'s compliance standing. The same training needs to stay current across the full care team.',
    workflowSteps: [
      {
        number: '01',
        title: 'Assign the topic',
        description: 'Client Rights, HIPAA & Elder Abuse is one of twelve topics included in every Ryzolve In-Service plan.',
      },
      {
        number: '02',
        title: 'Track completion by learner in Ryzolve',
        description: 'See who\'s completed the topic across caregivers and staff without cross-referencing spreadsheets.',
      },
      {
        number: '03',
        title: 'Keep certificates on file',
        description: 'Completion records stay attached to each learner\'s profile for audit readiness.',
      },
    ],
    articleSections: [
      {
        title: 'Why this topic covers more ground than most',
        paragraphs: [
          'Client rights, privacy under HIPAA, and recognizing elder abuse are distinct subjects that regularly intersect in home care. A caregiver who understands a client\'s right to privacy is also better equipped to notice when something about the client\'s situation looks wrong. Covering the subjects together reflects how they show up in day-to-day caregiving.',
          'Because this topic involves client protection and agency compliance, it tends to draw close attention during surveys. A clear, current completion record is especially valuable here.',
        ],
      },
      {
        title: 'What this training reinforces',
        paragraphs: [
          'The topic covers a client\'s basic rights as a person receiving care, the caregiver\'s role in protecting private health information under HIPAA, and how to recognize and respond to signs of elder abuse. Refreshing it annually keeps the standard consistent across the team, regardless of when each caregiver was hired.',
        ],
      },
      {
        title: 'How this connects to survey readiness',
        paragraphs: [
          'Surveyors and case managers may ask about this topic directly because it overlaps with privacy and client protection standards. Current completion records for every active caregiver keep a routine inquiry from becoming a longer search, especially when they are filed with the rest of the agency\'s compliance and caregiver documentation.',
        ],
      },
    ],
    capabilities: [
      'Whether every active caregiver and staff member has completed the current year\'s topic',
      'Whether new hires have it scheduled early in onboarding, given the sensitivity of the subject matter',
      'Where the completion certificates are stored if a surveyor asks to see them',
    ],
    faqs: [
      {
        q: 'Is this topic included in every In-Service plan?',
        a: 'Yes. Client Rights, HIPAA & Elder Abuse is one of the twelve monthly topics included in every Ryzolve In-Service plan, regardless of plan size.',
      },
      {
        q: 'Does this cover an agency\'s full HIPAA policy?',
        a: 'No. It covers the caregiver-level basics of client rights, HIPAA, and elder abuse recognition, but an agency\'s full HIPAA policy and privacy procedures remain a separate, more detailed document.',
      },
      {
        q: 'How do I see who on my team still needs to complete it?',
        a: 'Ryzolve\'s dashboard shows completion by learner, so you can check who\'s current without cross-referencing separate records.',
      },
      {
        q: 'Can this topic be assigned outside its scheduled month for new hires?',
        a: 'Yes. Because the topic directly concerns client protection, new hires can complete it during onboarding without waiting for the scheduled month.',
      },
    ],
    relatedLinks: [
      {
        href: '/compliance-regulation',
        title: 'Compliance checks',
        description: 'See how training completion fits into ongoing compliance tracking.',
      },
      {
        href: '/document-management',
        title: 'Document management',
        description: 'Explore where caregiver records and certificates live together.',
      },
      {
        href: '/training',
        title: 'Administrator training',
        description: 'Compare In-Service plans with one-time Administrator courses.',
      },
    ],
    ctaLabel: 'View In-Service Plans',
    ctaHref: '/training',
    capabilitiesTitle: 'What to review across your care team',
    relatedTitle: 'In-service training connects to the rest of your agency.',
    ctaTitle: 'Ready to see your team\'s training status?',
  },
  {
    slug: 'communication-skills-cultural-competency-training',
    image: '/img/blog/communication-skills-cultural-competency-training.jpg',
    imageAlt: 'A caregiver and an older adult in conversation on a sofa',
    label: 'Communication & cultural competency',
    eyebrow: 'In-service training',
    title: 'Communication Skills & Cultural Competency: Training for the Part of the Job That\'s Hardest to Standardize',
    description:
      'Why communication and cultural competency training helps Texas home care caregivers build trust with clients from different backgrounds, and how agencies keep it current.',
    publishedAt: '2026-07-21',
    readingMinutes: 5,
    keywords: [
      'caregiver communication skills training',
      'cultural competency training home care',
      'home care communication training texas',
      'PAS agency in-service training',
    ],
    solutionTitle: 'How it works at your agency.',
    solutionDescription:
      'Clinical tasks have checklists. Building trust with a client from a different background does not, though training can give caregivers a useful foundation.',
    workflowSteps: [
      {
        number: '01',
        title: 'Assign the topic',
        description: 'Communication Skills & Cultural Competency is one of twelve topics in every Ryzolve In-Service plan.',
      },
      {
        number: '02',
        title: 'Track completion by learner in Ryzolve',
        description: 'See who\'s completed the topic across your caregivers and staff in one place.',
      },
      {
        number: '03',
        title: 'Keep certificates on file',
        description: 'Completion records stay attached to each learner\'s profile, ready for review.',
      },
    ],
    articleSections: [
      {
        title: 'Why this topic is harder to standardize than it looks',
        paragraphs: [
          'A caregiver walks into a different home, and often a different culture, every day. Clear communication and respect for a client\'s background shape whether a client trusts the caregiver enough to accept help. There is no single script as there is for a clinical procedure, so ongoing training remains useful.',
          'A consistent annual refresher gives the whole team the same baseline expectations instead of relying on each caregiver\'s prior experience.',
        ],
      },
      {
        title: 'What this training reinforces',
        paragraphs: [
          'The topic covers practical communication techniques for home visits and an introduction to cultural competency. Caregivers learn to recognize and respect differences in background, language, and expectations across the clients an agency serves. The aim is to build useful habits, not memorize a script.',
        ],
      },
      {
        title: 'How this connects to client satisfaction and retention',
        paragraphs: [
          'Communication issues are a common cause of client complaints and caregiver turnover on a case. Current training can support client satisfaction and caregiver confidence. A completion record also helps if a case manager or surveyor asks about the agency\'s approach.',
        ],
      },
    ],
    capabilities: [
      'Whether every active caregiver has completed the current year\'s topic',
      'Whether new hires receive this training early, given how directly it affects client trust',
      'Where completion certificates are stored for quick reference',
    ],
    faqs: [
      {
        q: 'Is this topic included in every In-Service plan?',
        a: 'Yes. Communication Skills & Cultural Competency is one of the twelve monthly topics included in every Ryzolve In-Service plan, regardless of plan size.',
      },
      {
        q: 'Does this replace language-specific training for bilingual caregivers?',
        a: 'No. It builds general communication and cultural awareness skills, but it doesn\'t replace language-specific training a bilingual caregiver might need for a particular client relationship.',
      },
      {
        q: 'How often should this topic be refreshed?',
        a: 'Annually, as part of the standard In-Service cycle.',
      },
      {
        q: 'Can it be assigned outside its scheduled month for new hires?',
        a: 'Yes. New hires can complete it in Ryzolve during onboarding without waiting for its scheduled month.',
      },
    ],
    relatedLinks: [
      {
        href: '/compliance-regulation',
        title: 'Compliance checks',
        description: 'See how training completion fits into ongoing compliance tracking.',
      },
      {
        href: '/document-management',
        title: 'Document management',
        description: 'Explore where caregiver records and certificates live together.',
      },
      {
        href: '/training',
        title: 'Administrator training',
        description: 'Compare In-Service plans with one-time Administrator courses.',
      },
    ],
    ctaLabel: 'View In-Service Plans',
    ctaHref: '/training',
    capabilitiesTitle: 'What to review across your care team',
    relatedTitle: 'In-service training connects to the rest of your agency.',
    ctaTitle: 'Ready to see your team\'s training status?',
  },
  {
    slug: 'dementia-alzheimers-care-training',
    image: '/img/blog/dementia-alzheimers-care-training.jpg',
    imageAlt: 'A caregiver gently guiding an older woman’s hand across a photo album',
    label: 'Dementia & Alzheimer\'s care',
    eyebrow: 'In-service training',
    title: 'Dementia Care: What Caregivers Need Before the Hard Day Arrives',
    seoTitle: 'Dementia and Alzheimer\'s Care Training for Texas Home Care Caregivers',
    description:
      'What caregivers need to handle dementia well, how Texas rules approach caregiver competency, and how agencies keep training current and provable.',
    heroDescription:
      'A caregiver who\'s never been taught about dementia will take a lot of things personally. A client who doesn\'t recognize her, accuses her of stealing, or refuses a bath she asked for yesterday. The right training changes how those moments go.',
    publishedAt: '2026-07-16',
    updatedAt: '2026-10-07',
    readingMinutes: 5,
    keywords: [
      'dementia care training caregivers',
      'alzheimers training home care texas',
      'dementia caregiver training',
      'PAS agency in-service training',
    ],
    solutionTitle: '',
    solutionDescription: '',
    workflowSteps: [],
    articleSections: [
      {
        title: 'How Texas approaches this',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'For personal assistance services, the rule asks that unlicensed attendants have demonstrated competency to perform the tasks assigned. It doesn\'t hand you a mandatory dementia course. Your agency decides what competent looks like and has to be able to show it.' },
          { type: 'p', text: 'That\'s why a documented, repeatable training matters. It\'s your evidence that a caregiver assigned to a client with dementia was prepared for it.' },
        ],
      },
      {
        title: 'What good training covers',
        paragraphs: [],
        blocks: [
          {
            type: 'list',
            items: [
              '**Don\'t argue.** Correcting a person with dementia rarely helps. Redirecting does.',
              '**Keep it simple.** One instruction at a time. Choices between two things, not ten.',
              '**Routine is a tool.** Predictable days reduce distress.',
              '**Know the safety risks.** Wandering, stoves, medications, stairs.',
              '**Notice changes.** A sudden change in behavior can signal pain, infection or something else. It\'s worth reporting, not just enduring.',
              '**Look after families.** Relatives are often worn out, and a caregiver who communicates well becomes a partner.',
            ],
          },
        ],
      },
      {
        title: 'Behavior notes are records too',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'When a client has a hard day, the note matters. "Client agitated" tells nobody anything. "Client refused bath, said she didn\'t know me, calmed after music" tells the next caregiver and the supervisor what works. Those notes are part of what a surveyor can ask to see.' },
        ],
      },
      {
        title: 'Matching training to assignments',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'Before assigning a caregiver to a client with dementia, ask: has this person been trained, and can we show it? That\'s a one-minute question that saves a lot of trouble.' },
        ],
      },
      {
        title: 'Where Ryzolve fits',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'Dementia & Alzheimer\'s Care is part of Ryzolve\'s In-Service plan every year. Administrators see completion by learner and download a certificate for each person. You can also add your own courses to our training platform, so a client-specific protocol can live right next to the standard module.' },
        ],
      },
      {
        title: 'Beyond training',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'Training is one piece of staying survey-ready. Ryzolve also runs employability and exclusion checks at hire and every month, stores every result, and keeps caregiver files organized, so the records a surveyor asks for are easy to pull. See how it fits together in a short demo.' },
          { type: 'cta', label: 'Book a demo', href: '/calendly' },
        ],
      },
    ],
    inlineCtaAfter: 4,
    capabilities: [],
    faqs: [
      {
        q: 'Does Texas require a dementia course for caregivers?',
        a: 'For PAS attendants, the rule asks for demonstrated competency in the tasks assigned rather than a specific course. Your agency sets the standard and has to be able to show it.',
      },
      {
        q: 'Should only caregivers on memory-care cases take it?',
        a: 'Everyone benefits, since assignments change. It matters most before someone is assigned to a client with dementia.',
      },
      {
        q: 'Can we add our own protocols?',
        a: 'Yes. Ryzolve\'s training platform lets subscribing agencies add courses of their own, using video or text.',
      },
      {
        q: 'How often should it be refreshed?',
        a: 'Annually is a sensible cadence, with new hires trained before they start on relevant cases.',
      },
    ],
    relatedLinks: [
      {
        href: '/blogs/monthly-in-service-training-texas-home-care-agencies',
        title: 'All 12 In-Service topics',
        description: 'The full monthly catalog.',
      },
      {
        href: '/blogs/documentation-and-charting-training',
        title: 'Documentation and charting',
        description: 'Why behavior notes matter.',
      },
      {
        href: '/calendly',
        title: 'Book a demo',
        description: 'See how Ryzolve helps agencies stay survey-ready beyond training.',
      },
    ],
    ctaLabel: 'View In-Service Plans',
    ctaHref: '/training',
    faqEyebrow: 'Questions Texas agencies ask',
    relatedTitle: 'In-service training connects to the rest of your agency.',
    ctaTitle: 'See your team\'s training status',
  },
  {
    slug: 'emergency-disaster-preparedness-training',
    image: '/img/blog/emergency-disaster-preparedness-training.jpg',
    imageAlt: 'A caregiver checking a home emergency kit and flashlight by the door',
    label: 'Emergency & disaster preparedness',
    eyebrow: 'In-service training',
    title: 'Emergency Preparedness: A Plan Nobody\'s Trained On Isn\'t a Plan',
    seoTitle: 'Emergency and Disaster Preparedness for Texas Home Care Agencies',
    description:
      'What 26 TAC §558.256 requires of Texas HCSSAs: a written emergency plan, staff training, client information, and the drills surveyors ask to see.',
    heroDescription:
      'Anyone who lives in Houston knows how this goes. A hurricane, a flood, a hard freeze. Your clients can\'t wait for the roads to clear, and your caregivers need to know what to do before the weather arrives.',
    publishedAt: '2026-07-14',
    updatedAt: '2026-10-07',
    readingMinutes: 5,
    keywords: [
      'emergency preparedness training home care',
      '26 TAC 558.256',
      'disaster preparedness caregiver training texas',
      'home health emergency plan',
    ],
    solutionTitle: '',
    solutionDescription: '',
    workflowSteps: [],
    articleSections: [
      {
        title: 'What the rule requires',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'Under 26 TAC §558.256, an HCSSA must have a written emergency preparedness and response plan that describes its approach to a disaster that could affect the need for its services or its ability to provide them. Some specifics:' },
          {
            type: 'list',
            items: [
              'The plan has to be based on a risk assessment of the disasters likely in your service area',
              'It describes what staff do in each phase: mitigation, preparedness, response and recovery',
              'It includes procedures to triage clients',
              'You must provide and discuss emergency preparedness information with each client, including the client\'s own responsibilities',
              'You must orient and train employees, volunteers and contractors on their responsibilities in the plan',
            ],
          },
        ],
      },
      {
        title: 'What surveyors ask to see',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'Surveyors\' document lists include the emergency preparedness plan, with drills and evaluations. A plan in a binder isn\'t enough. They want evidence that people know it and that you\'ve practiced it.' },
        ],
      },
      {
        title: 'Where plans fall apart',
        paragraphs: [],
        blocks: [
          {
            type: 'list',
            items: [
              'The plan was written once, and nobody can say when it was last reviewed',
              'New hires never see it',
              'Clients were never given the information the rule requires',
              'Drills happened, but nobody wrote down when or what was learned',
            ],
          },
        ],
      },
      {
        title: 'A five-minute test',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'Ask a caregiver, "A hurricane warning goes out tonight. What do you do for your clients tomorrow?" If you hear three different answers from three caregivers, that\'s your training gap.' },
        ],
      },
      {
        title: 'Where Ryzolve fits',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'Emergency & Disaster Preparedness is part of Ryzolve\'s In-Service plan every year. Administrators see completion by learner and download a certificate for each person, so you can show who was trained and when. And since our training platform lets you add your own courses, your agency\'s specific plan can be taught right alongside the standard topic.' },
        ],
      },
      {
        title: 'Beyond training',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'Training is one piece of staying survey-ready. Ryzolve also runs employability and exclusion checks at hire and every month, stores every result, and keeps caregiver files organized, so the records a surveyor asks for are easy to pull. See how it fits together in a short demo.' },
          { type: 'cta', label: 'Book a demo', href: '/calendly' },
        ],
      },
    ],
    inlineCtaAfter: 4,
    sourceNote:
      '*This reflects 26 TAC §558.256. Confirm current requirements at [hhs.texas.gov](https://www.hhs.texas.gov/providers/long-term-care-providers/home-community-support-services-agencies-hcssa) before relying on this for a compliance decision.*',
    capabilities: [],
    faqs: [
      {
        q: 'Does the training replace our written emergency plan?',
        a: 'No. The rule requires your own written plan. Training makes sure your people know it.',
      },
      {
        q: 'Who has to be trained?',
        a: 'Employees, volunteers and contractors, on their responsibilities in the plan.',
      },
      {
        q: 'Do clients need to be told anything?',
        a: 'Yes. The agency must provide and discuss emergency preparedness information with each client, including the client\'s responsibilities in the plan.',
      },
      {
        q: 'Should we time training around hurricane season?',
        a: 'It helps to have it fresh before a high-risk season, but the point is being trained before an emergency, whatever the type.',
      },
      {
        q: 'Can we add our own plan to the training?',
        a: 'Yes. Ryzolve\'s training platform lets agencies add their own courses.',
      },
    ],
    relatedLinks: [
      {
        href: '/blogs/monthly-in-service-training-texas-home-care-agencies',
        title: 'All 12 In-Service topics',
        description: 'The full monthly catalog.',
      },
      {
        href: '/blogs/texas-hcssa-license-survey-readiness',
        title: 'License survey checklist',
        description: 'Emergency plans and drills are on the list.',
      },
      {
        href: '/calendly',
        title: 'Book a demo',
        description: 'See how Ryzolve helps agencies stay survey-ready beyond training.',
      },
    ],
    ctaLabel: 'View In-Service Plans',
    ctaHref: '/training',
    faqEyebrow: 'Questions Texas agencies ask',
    relatedTitle: 'In-service training connects to the rest of your agency.',
    ctaTitle: 'See your team\'s training status',
  },
  {
    slug: 'adls-safe-transfer-training',
    image: '/img/blog/adls-safe-transfer-training.jpg',
    imageAlt: 'A caregiver safely assisting an older man up from a chair',
    label: 'ADLs & safe transfer',
    eyebrow: 'In-service training',
    title: 'Assisting with ADLs & Safe Transfer: The Training That Protects Two People at Once',
    description:
      'Why safe transfer technique and ADL assistance training protects both clients and caregivers, and how Texas home care agencies keep it current.',
    publishedAt: '2026-07-09',
    readingMinutes: 5,
    keywords: [
      'ADL training caregivers',
      'safe transfer training home care',
      'activities of daily living training texas',
      'caregiver injury prevention training',
    ],
    solutionTitle: 'How it works at your agency.',
    solutionDescription:
      'Poor transfer technique puts the client at risk and is also a leading cause of caregiver injury. Regular training helps keep safe technique consistent.',
    workflowSteps: [
      {
        number: '01',
        title: 'Assign the topic',
        description: 'Assisting with ADLs & Safe Transfer is one of twelve topics in every Ryzolve In-Service plan.',
      },
      {
        number: '02',
        title: 'Track completion by learner in Ryzolve',
        description: 'See who\'s completed the topic across caregivers and staff in one place.',
      },
      {
        number: '03',
        title: 'Keep certificates on file',
        description: 'Completion records stay attached to each learner\'s profile, ready for review.',
      },
    ],
    articleSections: [
      {
        title: 'Why proper technique matters for two people, not one',
        paragraphs: [
          'Assisting with activities of daily living includes bathing, dressing, mobility, and transfers. It is some of the most physically demanding work a caregiver does. Proper technique protects the client from falls and injury, while poor technique puts the caregiver at risk of the back and shoulder injuries that commonly lead to missed work.',
          'Because both the client and caregiver can be injured, this topic gets a dedicated training month instead of being folded into general onboarding.',
        ],
      },
      {
        title: 'What this training reinforces',
        paragraphs: [
          'The topic covers safe body mechanics for assisting with daily living activities, proper transfer technique between positions like bed, chair, and wheelchair, and recognizing when a transfer requires more support than one caregiver alone can safely provide.',
        ],
      },
      {
        title: 'How this connects to caregiver retention and client safety',
        paragraphs: [
          'Injuries from improper transfer technique contribute to caregiver turnover and create a direct safety risk for clients. Keeping this training current can reduce both risks. A completion record also documents the agency\'s work if the training is ever reviewed.',
        ],
      },
    ],
    capabilities: [
      'Whether caregivers assigned to clients with mobility needs have current training on file',
      'Whether new hires receive this training early, given the physical risk involved',
      'Where completion certificates are stored for quick reference',
    ],
    faqs: [
      {
        q: 'Is this topic included in every In-Service plan?',
        a: 'Yes. Assisting with ADLs & Safe Transfer is one of the twelve monthly topics included in every Ryzolve In-Service plan, regardless of plan size.',
      },
      {
        q: 'Does this cover use of mechanical lifts or assistive equipment?',
        a: 'It covers safe body mechanics and transfer technique broadly. Agency-specific equipment, like a particular lift model, is typically covered in separate equipment-specific training.',
      },
      {
        q: 'Should caregivers on mobility-heavy cases refresh this more often?',
        a: 'Caregivers on mobility-heavy cases benefit from more frequent reinforcement, though the formal In-Service topic itself is scheduled annually like the rest of the curriculum.',
      },
      {
        q: 'Can it be assigned outside its scheduled month for new hires?',
        a: 'Yes. New hires can complete it in Ryzolve during onboarding, especially if they\'ll be assigned to mobility-heavy cases early on.',
      },
    ],
    relatedLinks: [
      {
        href: '/compliance-regulation',
        title: 'Compliance checks',
        description: 'See how training completion fits into ongoing compliance tracking.',
      },
      {
        href: '/document-management',
        title: 'Document management',
        description: 'Explore where caregiver records and certificates live together.',
      },
      {
        href: '/training',
        title: 'Administrator training',
        description: 'Compare In-Service plans with one-time Administrator courses.',
      },
    ],
    ctaLabel: 'View In-Service Plans',
    ctaHref: '/training',
    capabilitiesTitle: 'What to review across your care team',
    relatedTitle: 'In-service training connects to the rest of your agency.',
    ctaTitle: 'Ready to see your team\'s training status?',
  },
  {
    slug: 'tb-airborne-pathogen-safety-training',
    image: '/img/blog/tb-airborne-pathogen-safety-training.jpg',
    imageAlt: 'A caregiver fitting a respirator mask before entering a home',
    label: 'TB & airborne pathogen safety',
    eyebrow: 'In-service training',
    title: 'TB & Airborne Pathogen Precautions: A Training Topic That Doesn\'t Get to Skip a Year',
    description:
      'How Texas home care agencies keep TB and airborne pathogen precaution training current across caregivers, and why it stays a recurring priority.',
    publishedAt: '2026-07-07',
    readingMinutes: 5,
    keywords: [
      'TB training home care',
      'airborne pathogen training caregivers',
      'safety precautions training home health',
      'PAS agency in-service training',
    ],
    solutionTitle: 'How it works at your agency.',
    solutionDescription:
      'Recognizing symptoms early and following safety precautions can keep one exposure from becoming a bigger problem. Agencies reinforce those practices through recurring training.',
    workflowSteps: [
      {
        number: '01',
        title: 'Assign the topic',
        description: 'TB / Airborne Pathogen + Safety Precautions is one of twelve topics in every Ryzolve In-Service plan.',
      },
      {
        number: '02',
        title: 'Track completion by learner in Ryzolve',
        description: 'See who\'s completed the topic across caregivers and staff in one place.',
      },
      {
        number: '03',
        title: 'Keep certificates on file',
        description: 'Completion records stay attached to each learner\'s profile, ready for review.',
      },
    ],
    articleSections: [
      {
        title: 'Why this training doesn\'t get to lapse',
        paragraphs: [
          'Caregivers move between homes and, in some cases, healthcare settings. A consistent understanding of airborne pathogen precautions is important for that work. Recognizing early symptoms and following the correct safety precautions helps a caregiver protect themselves, their client, and the next home they enter.',
          'The risk continues between training cycles, so this topic receives an annual refresher after the initial orientation.',
        ],
      },
      {
        title: 'What this training reinforces',
        paragraphs: [
          'The topic covers recognizing signs and symptoms associated with TB and other airborne pathogens, understanding standard safety precautions, and knowing when and how to escalate a concern to the agency.',
        ],
      },
      {
        title: 'How this connects to survey readiness',
        paragraphs: [
          'Safety and infection-related precautions are routinely reviewed during surveys. Current, complete training records for every active caregiver can keep that part of the review from becoming a follow-up item.',
        ],
      },
    ],
    capabilities: [
      'Whether every active caregiver has completed the current year\'s topic',
      'Whether new hires receive this training as an early priority, given the health and safety stakes',
      'Where completion certificates are stored for quick reference',
    ],
    faqs: [
      {
        q: 'Is this topic included in every In-Service plan?',
        a: 'Yes. TB / Airborne Pathogen + Safety Precautions is one of the twelve monthly topics included in every Ryzolve In-Service plan, regardless of plan size.',
      },
      {
        q: 'Does this replace agency-specific exposure control procedures?',
        a: 'No. It covers the general precautions every caregiver should know, but an agency\'s specific exposure control plan and reporting procedures remain a separate policy.',
      },
      {
        q: 'How often should this topic be refreshed?',
        a: 'Annually, as part of the standard In-Service cycle.',
      },
      {
        q: 'Can new hires complete it outside its scheduled month?',
        a: 'Yes. New hires can complete it in Ryzolve during onboarding without waiting for its scheduled month.',
      },
    ],
    relatedLinks: [
      {
        href: '/compliance-regulation',
        title: 'Compliance checks',
        description: 'See how training completion fits into ongoing compliance tracking.',
      },
      {
        href: '/document-management',
        title: 'Document management',
        description: 'Explore where caregiver records and certificates live together.',
      },
      {
        href: '/training',
        title: 'Administrator training',
        description: 'Compare In-Service plans with one-time Administrator courses.',
      },
    ],
    ctaLabel: 'View In-Service Plans',
    ctaHref: '/training',
    capabilitiesTitle: 'What to review across your care team',
    relatedTitle: 'In-service training connects to the rest of your agency.',
    ctaTitle: 'Ready to see your team\'s training status?',
  },
  {
    slug: 'caregiver-self-care-training',
    image: '/img/blog/caregiver-self-care-training.jpg',
    imageAlt: 'A caregiver resting in a parked car between client visits',
    label: 'Caregiver self-care',
    eyebrow: 'In-service training',
    title: 'Caregiver Self-Care: The Training Topic That Protects Your Retention Numbers',
    description:
      'Why caregiver self-care training helps Texas home care agencies reduce burnout and turnover, and how to keep it part of a regular training cycle.',
    publishedAt: '2026-07-02',
    readingMinutes: 5,
    keywords: [
      'caregiver self-care training',
      'caregiver burnout prevention training',
      'home care staff wellbeing training',
      'PAS agency in-service training',
    ],
    solutionTitle: 'How it works at your agency.',
    solutionDescription:
      'Burnout is one of the biggest drivers of caregiver turnover in home care. This In-Service topic focuses directly on the caregiver\'s needs.',
    workflowSteps: [
      {
        number: '01',
        title: 'Assign the topic',
        description: 'Caregiver Self-Care is one of twelve topics in every Ryzolve In-Service plan.',
      },
      {
        number: '02',
        title: 'Track completion by learner in Ryzolve',
        description: 'See who\'s completed the topic across your caregivers and staff in one place.',
      },
      {
        number: '03',
        title: 'Keep certificates on file',
        description: 'Completion records stay attached to each learner\'s profile, ready for review.',
      },
    ],
    articleSections: [
      {
        title: 'Why this topic exists in a compliance-driven curriculum',
        paragraphs: [
          'Most In-Service topics focus on the client. This one focuses on the caregiver and, in turn, the agency\'s ability to keep experienced staff on the schedule. Caregiving is emotionally and physically demanding work, often done alone in a client\'s home. Burnout is a well-documented driver of turnover across the home care industry.',
          'Including self-care as a formal training topic shows caregivers that the agency takes their wellbeing seriously. That attention can matter for retention in a field where replacing staff is expensive.',
        ],
      },
      {
        title: 'What this training reinforces',
        paragraphs: [
          'The topic covers recognizing early signs of caregiver burnout, practical strategies for managing the emotional and physical demands of the work, and knowing what support resources are available through the agency.',
        ],
      },
      {
        title: 'How this connects to retention',
        paragraphs: [
          'Turnover is costly to recruit and onboard around, and burnout is one of its most preventable causes. A recurring self-care training cycle, paired with a real support pathway, is a low-cost step toward keeping experienced caregivers on staff longer.',
        ],
      },
    ],
    capabilities: [
      'Whether every active caregiver has completed the current year\'s topic',
      'Whether the agency has a clear path for caregivers to raise concerns about burnout when they come up',
      'Where completion certificates are stored for quick reference',
    ],
    faqs: [
      {
        q: 'Is this topic included in every In-Service plan?',
        a: 'Yes. Caregiver Self-Care is one of the twelve monthly topics included in every Ryzolve In-Service plan, regardless of plan size.',
      },
      {
        q: 'Is this training counted toward any state requirement?',
        a: 'No. It\'s not tied to a specific state licensing requirement the way some other topics are. It\'s included because burnout directly affects care quality and retention, both of which matter operationally.',
      },
      {
        q: 'How often should this topic be refreshed?',
        a: 'Annually, as part of the standard In-Service cycle.',
      },
      {
        q: 'Can it be assigned outside its scheduled month for new hires?',
        a: 'Yes. New hires can complete it in Ryzolve during onboarding without waiting for its scheduled month.',
      },
    ],
    relatedLinks: [
      {
        href: '/compliance-regulation',
        title: 'Compliance checks',
        description: 'See how training completion fits into ongoing compliance tracking.',
      },
      {
        href: '/document-management',
        title: 'Document management',
        description: 'Explore where caregiver records and certificates live together.',
      },
      {
        href: '/training',
        title: 'Administrator training',
        description: 'Compare In-Service plans with one-time Administrator courses.',
      },
    ],
    ctaLabel: 'View In-Service Plans',
    ctaHref: '/training',
    capabilitiesTitle: 'What to review across your care team',
    relatedTitle: 'In-service training connects to the rest of your agency.',
    ctaTitle: 'Ready to see your team\'s training status?',
  },
  {
    slug: 'ethics-professional-conduct-training',
    image: '/img/blog/ethics-professional-conduct-training.jpg',
    imageAlt: 'Two colleagues in a thoughtful hallway conversation',
    label: 'Ethics & professional conduct',
    eyebrow: 'In-service training',
    title: 'Ethics & Professional Conduct: Setting the Standard Before a Situation Tests It',
    description:
      'How ethics and professional conduct training helps Texas home care agencies set clear behavioral standards, and how to keep it current across a care team.',
    publishedAt: '2026-06-30',
    readingMinutes: 5,
    keywords: [
      'caregiver ethics training',
      'professional conduct training home care',
      'home health ethics training texas',
      'PAS agency in-service training',
    ],
    solutionTitle: 'How it works at your agency.',
    solutionDescription:
      'Boundary questions in home care rarely come with an obvious right answer in the moment. This training gives caregivers a standard to fall back on.',
    workflowSteps: [
      {
        number: '01',
        title: 'Assign the topic',
        description: 'Ethics & Professional Conduct is one of twelve topics in every Ryzolve In-Service plan.',
      },
      {
        number: '02',
        title: 'Track completion by learner in Ryzolve',
        description: 'See who\'s completed the topic across caregivers and staff in one place.',
      },
      {
        number: '03',
        title: 'Keep certificates on file',
        description: 'Completion records stay attached to each learner\'s profile, ready for review.',
      },
    ],
    articleSections: [
      {
        title: 'Why this training matters before, not after, a situation comes up',
        paragraphs: [
          'A caregiver working alone in a client\'s home regularly faces small judgment calls about boundaries, a client\'s belongings, or a family member asking for something outside the caregiver\'s role. A clear standard gives caregivers a consistent reference point instead of leaving them to guess.',
          'Refreshing this training annually keeps the standard consistent across the team, regardless of how long a caregiver has been with the agency.',
        ],
      },
      {
        title: 'What this training reinforces',
        paragraphs: [
          'The topic covers professional boundaries in a client\'s home, appropriate handling of client property and information, and the behavioral standards the agency expects from every caregiver and staff member.',
        ],
      },
      {
        title: 'How this connects to complaint prevention',
        paragraphs: [
          'Many client and family complaints trace back to a boundary or conduct issue instead of a clinical one. A clear, consistently trained standard can reduce those complaints before they happen. If a concern is raised, the training record also helps document the agency\'s position.',
        ],
      },
    ],
    capabilities: [
      'Whether every active caregiver has completed the current year\'s topic',
      'Whether new hires receive this training early, before their first independent visits',
      'Where completion certificates are stored for quick reference',
    ],
    faqs: [
      {
        q: 'Is this topic included in every In-Service plan?',
        a: 'Yes. Ethics & Professional Conduct is one of the twelve monthly topics included in every Ryzolve In-Service plan, regardless of plan size.',
      },
      {
        q: 'Does this replace an agency\'s own code of conduct policy?',
        a: 'No. It sets a consistent baseline for professional boundaries and conduct, but an agency\'s own written code of conduct and disciplinary procedures remain separate documents.',
      },
      {
        q: 'How often should this topic be refreshed?',
        a: 'Annually, as part of the standard In-Service cycle.',
      },
      {
        q: 'Can it be assigned outside its scheduled month for new hires?',
        a: 'Yes. New hires can complete it in Ryzolve during onboarding, ideally before their first independent visits.',
      },
    ],
    relatedLinks: [
      {
        href: '/compliance-regulation',
        title: 'Compliance checks',
        description: 'See how training completion fits into ongoing compliance tracking.',
      },
      {
        href: '/document-management',
        title: 'Document management',
        description: 'Explore where caregiver records and certificates live together.',
      },
      {
        href: '/training',
        title: 'Administrator training',
        description: 'Compare In-Service plans with one-time Administrator courses.',
      },
    ],
    ctaLabel: 'View In-Service Plans',
    ctaHref: '/training',
    capabilitiesTitle: 'What to review across your care team',
    relatedTitle: 'In-service training connects to the rest of your agency.',
    ctaTitle: 'Ready to see your team\'s training status?',
  },
  {
    slug: 'vital-signs-health-monitoring-training',
    image: '/img/blog/vital-signs-health-monitoring-training.jpg',
    imageAlt: 'A caregiver placing a blood-pressure cuff on an older adult’s arm',
    label: 'Vital signs & health monitoring',
    eyebrow: 'In-service training',
    title: 'Vital Signs & Health Monitoring: Training That Turns a Routine Visit Into an Early Warning System',
    description:
      'Why accurate vital signs and health monitoring training matters for Texas home care caregivers, and how agencies keep completion records current.',
    publishedAt: '2026-06-25',
    readingMinutes: 5,
    keywords: [
      'vital signs training caregivers',
      'health monitoring training home care',
      'caregiver vital signs texas',
      'PAS agency in-service training',
    ],
    solutionTitle: 'How it works at your agency.',
    solutionDescription:
      'A caregiver who knows what a normal reading looks like may be the first person to catch a change. Recurring training helps keep that knowledge current.',
    workflowSteps: [
      {
        number: '01',
        title: 'Assign the topic',
        description: 'Vital Signs & Health Monitoring is one of twelve topics in every Ryzolve In-Service plan.',
      },
      {
        number: '02',
        title: 'Track completion by learner in Ryzolve',
        description: 'See who\'s completed the topic across caregivers and staff in one place.',
      },
      {
        number: '03',
        title: 'Keep certificates on file',
        description: 'Completion records stay attached to each learner\'s profile, ready for review.',
      },
    ],
    articleSections: [
      {
        title: 'Why accurate monitoring matters beyond the reading itself',
        paragraphs: [
          'Taking a blood pressure or temperature reading is a simple task. Knowing what\'s normal for a specific client, noticing a meaningful change, and knowing when to escalate it is what actually protects that client. Caregivers are often the only person checking in regularly enough to catch a gradual change before it becomes an emergency.',
          'An annual refresher keeps technique and judgment consistent across the team, regardless of what training a caregiver received elsewhere.',
        ],
      },
      {
        title: 'What this training reinforces',
        paragraphs: [
          'The topic covers proper technique for taking vital signs, understanding typical ranges, and knowing when a reading needs to be escalated to the agency or a client\'s care team instead of simply documented.',
        ],
      },
      {
        title: 'How this connects to documentation and claims',
        paragraphs: [
          'Accurate vital signs monitoring feeds directly into visit documentation, and consistent documentation is what supports both compliance review and claims reconciliation. Keeping this training current is part of what keeps that downstream record reliable.',
        ],
      },
    ],
    capabilities: [
      'Whether caregivers responsible for monitoring vitals have current training on file',
      'Whether new hires receive this training before being assigned to cases that require monitoring',
      'Where completion certificates are stored for quick reference',
    ],
    faqs: [
      {
        q: 'Is this topic included in every In-Service plan?',
        a: 'Yes. Vital Signs & Health Monitoring is one of the twelve monthly topics included in every Ryzolve In-Service plan, regardless of plan size.',
      },
      {
        q: 'Does every caregiver need this training, or only those monitoring vitals?',
        a: 'Every caregiver benefits from understanding the basics, but it\'s especially important for anyone assigned to cases where regular vitals monitoring is part of the care plan.',
      },
      {
        q: 'How often should this topic be refreshed?',
        a: 'Annually, as part of the standard In-Service cycle.',
      },
      {
        q: 'Can it be assigned outside its scheduled month for new hires?',
        a: 'Yes. New hires can complete it in Ryzolve during onboarding, especially if they\'ll be assigned to monitoring-heavy cases early on.',
      },
    ],
    relatedLinks: [
      {
        href: '/document-management',
        title: 'Document management',
        description: 'See where caregiver notes and monitoring records are organized.',
      },
      {
        href: '/compliance-regulation',
        title: 'Compliance checks',
        description: 'Review how training completion fits into ongoing compliance tracking.',
      },
      {
        href: '/training',
        title: 'Administrator training',
        description: 'Compare In-Service plans with one-time Administrator courses.',
      },
    ],
    ctaLabel: 'View In-Service Plans',
    ctaHref: '/training',
    capabilitiesTitle: 'What to review across your care team',
    relatedTitle: 'In-service training connects to the rest of your agency.',
    ctaTitle: 'Ready to see your team\'s training status?',
  },
  {
    slug: '12-hour-administrator-renewal-training-texas',
    image: '/img/blog/12-hour-administrator-renewal-training-texas.jpg',
    imageAlt: 'An administrator reviewing training dates marked on a wall calendar',
    label: '12-hour administrator renewal',
    eyebrow: 'Texas administrator training',
    title: 'The 12-Hour Administrator Renewal: Every Year, for as Long as You Hold the Title',
    seoTitle: '12-Hour Administrator Continuing Education for Texas HCSSAs',
    description:
      'Texas Administrators and Alternate Administrators need 12 clock hours of continuing education every 12 months. How the cycle works, what it must include, and how to keep it from lapsing.',
    heroDescription:
      'The 8-hour and 16-hour courses are one-time. The 12-hour requirement isn\'t. It repeats every 12 months for as long as you\'re an Administrator or Alternate Administrator, which makes it very easy to lose track of.',
    publishedAt: '2026-06-23',
    updatedAt: '2026-10-07',
    readingMinutes: 5,
    keywords: [
      '12 hour texas administrator renewal training',
      'HCSSA administrator continuing education',
      '26 TAC 558.260',
      'administrator renewal training texas',
    ],
    solutionEyebrow: 'At a glance',
    solutionTitle: 'The rule in plain English',
    solutionDescription:
      'If you\'re a first-time Administrator, your first year is covered by the 24 initial hours. The 12-hour cycle then continues in each following 12-month period.',
    workflowSteps: [
      {
        number: '01',
        title: '12 clock hours, every 12 months',
        description: 'Counted from your date of designation, under 26 TAC §558.260.',
      },
      {
        number: '02',
        title: 'At least two required topics',
        description: 'The rule lists topics, and your 12 hours must include at least two of them. The rest can be other subjects related to an Administrator\'s duties.',
      },
      {
        number: '03',
        title: 'Keep proof',
        description: 'HHSC describes proof as the name of the class or workshop, the topics, and the hours and dates.',
      },
    ],
    articleSections: [
      {
        title: 'Why it gets missed',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'Nothing about this requirement announces itself. There\'s no renewal notice, and the clock is set by your own designation date. If you have more than one Administrator or Alternate, each person has a different anniversary.' },
          { type: 'p', text: 'The fix is boring and works: put each person\'s designation anniversary on a shared calendar, with a reminder at least 90 days before. Then keep every certificate in one place, with the course, hours and dates visible.' },
        ],
      },
      {
        title: 'One thing that trips people up',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'HHSC\'s pre-survey training can\'t be counted toward your continuing education hours. It\'s a separate thing. If someone thinks they\'re nearly done because they\'ve done the pre-survey training, they\'re not.' },
        ],
      },
      {
        title: 'Check this for each Administrator and Alternate',
        paragraphs: [],
        blocks: [
          {
            type: 'list',
            items: [
              'When is their designation anniversary?',
              'How many of their 12 hours are done this cycle?',
              'Do those hours include at least two of the required topics?',
              'Where is each certificate, and does it show hours and dates?',
            ],
          },
        ],
      },
      {
        title: 'Take it with Ryzolve',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'Our 12-hour course is HHSC-recognized, self-paced and online. Finish it when it fits your calendar and download your certificate when you\'re done.' },
        ],
      },
      {
        title: 'Beyond training',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'Training is one piece of staying survey-ready. Ryzolve also runs employability and exclusion checks at hire and every month, stores every result, and keeps caregiver files organized, so the records a surveyor asks for are easy to pull. See how it fits together in a short demo.' },
          { type: 'cta', label: 'Book a demo', href: '/calendly' },
        ],
      },
    ],
    inlineCtaAfter: 3,
    sourceNote:
      '*This reflects 26 TAC §558.260 and HHSC guidance. Confirm current requirements at [hhs.texas.gov](https://www.hhs.texas.gov/providers/long-term-care-providers/home-community-support-services-agencies-hcssa) before relying on this for a compliance decision.*',
    capabilities: [],
    faqs: [
      {
        q: 'How often does the 12-hour requirement repeat?',
        a: 'Every 12-month period, counted from the date of designation, for as long as the person is an Administrator or Alternate Administrator.',
      },
      {
        q: 'Does it have to be done all at once?',
        a: 'No. You can complete the hours across the 12-month cycle, in as many sessions as you like.',
      },
      {
        q: 'What has to be in the 12 hours?',
        a: 'At least two of the topics listed in 26 TAC §558.260(a). The rest can be other topics related to an Administrator\'s duties.',
      },
      {
        q: 'What should I keep as proof?',
        a: 'The name of the class or workshop, the topics covered, and the hours and dates. A certificate that shows these covers it.',
      },
      {
        q: 'What if a cycle lapses?',
        a: 'That\'s a compliance problem, and the consequences depend on the situation. Talk to HHSC or your compliance lead directly instead of assuming.',
      },
    ],
    relatedLinks: [
      {
        href: '/blogs/8-hour-initial-administrator-training-texas',
        title: '8-hour initial training',
        description: 'Required before designation.',
      },
      {
        href: '/blogs/16-hour-new-administrator-training-texas',
        title: '16-hour new administrator training',
        description: 'Required in the first year.',
      },
      {
        href: '/compliance-regulation',
        title: 'Compliance checks',
        description: 'How Ryzolve runs and stores employability checks.',
      },
      {
        href: '/calendly',
        title: 'Book a demo',
        description: 'See how Ryzolve helps agencies stay survey-ready beyond training.',
      },
    ],
    ctaLabel: 'View the 12-Hour Course',
    ctaHref: '/training/12-hours-for-existing-administrators-and-alternates',
    faqEyebrow: 'Questions Texas administrators ask',
    relatedTitle: 'Administrator training connects to the rest of your agency.',
    ctaTitle: 'Keep your Administrators current',
  },
  {
    slug: 'semarc-replaces-emr-search-texas-hcssa',
    image: '/img/blog/semarc-replaces-emr-search-texas-hcssa.jpg',
    imageAlt: 'An administrator running a registry search at a two-monitor desk',
    label: 'SEMARC and the EMR search',
    eyebrow: 'Compliance checks',
    title: 'SEMARC and the EMR Search: What Texas Agencies Need to Know Right Now',
    seoTitle: 'SEMARC and the EMR Search: What Texas Agencies Need to Know Now',
    description:
      'HHSC\'s SEMARC rollout has left many Texas agencies confused about which employability checks to run. Here\'s what\'s required, what isn\'t changing, and how Ryzolve runs and stores every check so you\'re never scrambling.',
    heroDescription:
      'HHSC\'s SEMARC announcement left a lot of agencies asking the same question: which employability checks do we actually run? Here\'s what\'s changing, what isn\'t, and how Ryzolve keeps every check on schedule and on record while the rollout settles.',
    publishedAt: '2026-06-18',
    updatedAt: '2026-10-05',
    readingMinutes: 7,
    keywords: [
      'SEMARC texas hcssa',
      'employee misconduct registry texas',
      'SEMARC TULIP',
      'texas home care background check requirements',
      'NAR EMR employability check',
      'LEIE monthly screening texas',
    ],
    solutionEyebrow: 'At a glance',
    solutionTitle: 'The short version.',
    solutionDescription:
      'If you\'re confused, you\'re not alone. The change is real, but the rollout has been uneven, and agencies are getting different experiences depending on access and timing.',
    workflowSteps: [
      {
        number: '01',
        title: 'SEMARC is replacing the EMR search requirement',
        description: 'HHSC\'s Provider Letter 2026-10 says the requirement to search the Employee Misconduct Registry will be replaced by a requirement to search SEMARC, the Search Engine for Multi-Agency Reportable Conduct.',
      },
      {
        number: '02',
        title: 'There was a hold-harmless period',
        description: 'The revised letter gave providers a window from August 3 to October 5, 2026, and states HHSC will not survey for SEMARC compliance until October 6, 2026.',
      },
      {
        number: '03',
        title: 'Nothing else went away',
        description: 'NAR and LEIE checks are still required, and the check cadence hasn\'t changed.',
      },
    ],
    articleSections: [
      {
        title: 'Why it feels confusing',
        paragraphs: [
          'SEMARC was announced as the replacement for a standalone EMR search, yet in day-to-day practice the EMR and NAR search links in TULIP are still working for many agencies. That leaves a practical gap: the rule says one thing, the portal you can actually use says another, and the first agency to be asked about it will likely be one that already has a survey on the calendar.',
          'The sensible response is not to guess. It\'s to keep every check you can run on schedule, keep a dated record of every result, and confirm your SEMARC access status directly with HHSC.',
        ],
      },
      {
        title: 'What SEMARC actually is',
        paragraphs: [
          'SEMARC is a statewide search created under Senate Bill 1849. It pools reportable-conduct findings from HHSC, DFPS, TJJD, and TEA into one search, so someone barred in one sector can\'t simply be hired in another by an employer checking a different registry.',
        ],
      },
      {
        title: 'What\'s changing, and what isn\'t',
        paragraphs: [],
        lists: [
          {
            heading: 'Changing',
            items: [
              'The requirement to search the EMR is being replaced by a requirement to search SEMARC',
              'SEMARC is accessed through TULIP and requires its own access request',
              'Each Business Entity is limited to 10 TULIP user accounts across all locations',
            ],
          },
          {
            heading: 'Not changing',
            items: [
              'The Nurse Aide Registry (NAR) is still required and searched separately',
              'LEIE checks, both federal and Texas, are still required. SEMARC does not replace them',
              'Criminal history checks through DPS/DFPS are unchanged',
              'Checks happen at hire and at least every 12 months after',
              'Job titles don\'t matter: every employee, contractor, and volunteer is checked',
            ],
          },
        ],
      },
      {
        title: 'The real risk isn\'t the rule change. It\'s the proof.',
        paragraphs: [
          'Most agencies fix the process once and move on. The exposure comes later: a check skipped in a busy week, an annual re-check that slips past its window, a monthly LEIE screening that was done but never saved. Then a surveyor or HHSC contract monitor asks to see it.',
          'HHSC\'s contract monitoring notice asks specifically for your written process for pre-employment and monthly LEIE screening, plus evidence the screenings actually happened. A licensure survey can ask for personnel records on short notice. In both cases, "we did it" isn\'t enough. You need the record, and you need it fast.',
        ],
      },
      {
        title: 'What Ryzolve runs for your agency',
        paragraphs: [
          'Ryzolve runs your employability and exclusion checks for you, at hire and again every month:',
        ],
        lists: [
          {
            items: [
              '**LEIE, federal and Texas**',
              '**Nurse Aide Registry (NAR)**',
              '**Employee Misconduct Registry (EMR)**, run through TULIP',
            ],
          },
        ],
        closing: [
          'Every result is saved to the employee\'s record with the date and the registry checked. When a surveyor, monitor, or case manager asks, you pull the record by employee, by date, or by registry in moments.',
        ],
        table: {
          head: ['When HHSC asks for...', 'Without Ryzolve', 'With Ryzolve'],
          rows: [
            ['Proof a new hire was cleared before starting', 'Search email and browser history', 'Open the employee record; the result is attached'],
            ['Monthly LEIE evidence for the period', 'Reconstruct from memory or scattered files', 'Pull the monthly results on file'],
            ['Annual NAR/EMR re-check status', 'Compare hire dates by hand', 'See what\'s current and what\'s coming due'],
            ['A list of everyone checked, and when', 'Build it from scratch', 'Retrieve it from one place'],
          ],
        },
      },
      {
        title: 'Stay ahead of the rollout without the guesswork',
        paragraphs: [
          'Rules like this one will keep shifting while HHSC finishes the rollout. Your agency shouldn\'t have to decode each update while also running a business. Ryzolve keeps your checks running and your records organized, so a change in the requirements becomes an update to your process, not a scramble to rebuild it.',
          'A short demo shows how checks run at hire and monthly, how results are stored, and how fast you can retrieve them.',
        ],
      },
      {
        title: 'What to check this week',
        paragraphs: [],
        lists: [
          {
            items: [
              'Whether your agency has requested SEMARC access in TULIP, and who holds your Security Authority role, since they approve requests',
              'What your HHSC regional contact says you should be searching while SEMARC access is being sorted out',
              'Whether your hiring process waits for every required result to come back clear before a new hire starts. Provisional hiring while results are pending isn\'t allowed',
              'Whether you could produce, right now, a dated record of every check for every current employee',
            ],
          },
        ],
        closing: [
          'If that last one gave you pause, that\'s exactly the gap Ryzolve closes.',
        ],
      },
      {
        title: 'One exception worth knowing',
        paragraphs: [
          'HCS and TxHmL providers don\'t currently have TULIP access and continue their current process until SEMARC is available to them, expected in early 2027. State Supported Living Center hiring managers access SEMARC through IAMOnline instead of TULIP.',
        ],
      },
    ],
    // The demo pitch closes "Stay ahead of the rollout", so the card follows it.
    inlineCtaAfter: 5,
    sourceNote:
      '*This post reflects HHSC Provider Letter 2026-10 (revised) and HHSC\'s NAR & SEMARC Joint Training FAQ. Guidance continues to evolve, so confirm current requirements at [semarc.texas.gov](https://semarc.texas.gov/faq/) before relying on this for a compliance decision.*',
    capabilities: [],
    faqs: [
      {
        q: 'Does SEMARC replace LEIE or NAR checks?',
        a: 'No. LEIE (federal and Texas) and NAR are still required separately. SEMARC is replacing the requirement to search the EMR, and it pools reportable-conduct findings from HHSC, DFPS, TJJD, and TEA. It does not cover the same ground as exclusion-list checks.',
      },
      {
        q: 'Which checks does Ryzolve run?',
        a: 'Ryzolve runs LEIE (federal and Texas), the Nurse Aide Registry, and the Employee Misconduct Registry, at hire and every month. Each result is stored on the employee\'s record and retrievable anytime.',
      },
      {
        q: 'What does HHSC require while SEMARC rolls out?',
        a: 'HHSC\'s Provider Letter 2026-10 replaces the EMR search requirement with a SEMARC requirement, with a hold-harmless period that ran August 3 through October 5, 2026. HHSC states it will not survey for SEMARC compliance until October 6, 2026. Confirm your agency\'s SEMARC access and current expectations with HHSC.',
      },
      {
        q: 'Do we need to re-check every current employee right away?',
        a: 'No. The timing rules haven\'t changed: staff are checked at hire and at least every 12 months after. Their next annual check simply runs under the current process.',
      },
      {
        q: 'What if results are still pending when we need to hire someone quickly?',
        a: 'No one can be hired while results are pending. Every required check needs to come back clear before someone starts, even if that delays the start date.',
      },
      {
        q: 'Can I pull these records during a survey or contract monitoring?',
        a: 'Yes. Because every check is stored in Ryzolve, you can retrieve results by employee, date, or registry whenever a surveyor or HHSC monitor requests them, instead of assembling them at the last minute.',
      },
      {
        q: 'Where do we find the official details?',
        a: 'Provider Letter 2026-10 and the SEMARC site at semarc.texas.gov are the authoritative sources.',
      },
    ],
    relatedLinks: [
      {
        href: '/compliance-regulation',
        title: 'Compliance checks',
        description: 'See how checks run and are stored inside Ryzolve.',
      },
      {
        href: '/document-management',
        title: 'Document management',
        description: 'Explore where employability results and hiring records live together.',
      },
      {
        href: '/training',
        title: 'Caregiver onboarding',
        description: 'Review how hiring, checks, and training fit into one onboarding flow.',
      },
      {
        href: '/blogs/texas-hhsc-contract-monitoring-readiness',
        title: 'HHSC contract monitoring checklist',
        description: 'See what monitors ask for, including monthly LEIE evidence.',
      },
    ],
    ctaLabel: 'See how Ryzolve tracks compliance checks',
    ctaHref: '/compliance-regulation',
    relatedTitle: 'Compliance checks connect to the rest of your agency.',
    ctaTitle: 'Stop tracking compliance checks by hand.',
    ctaDescription:
      'Every check at hire. Every check, every month. Every result stored and ready the moment it\'s asked for. That\'s what Ryzolve does for Texas agencies.',
  },
  {
    slug: 'leie-nar-emr-semarc-texas-employability-checks',
    image: '/img/blog/leie-nar-emr-semarc-texas-employability-checks.jpg',
    imageAlt: 'Hands sorting labelled folders in a filing drawer',
    label: 'LEIE, NAR, EMR & SEMARC checks',
    eyebrow: 'Compliance checks',
    title: 'LEIE, NAR, EMR, SEMARC: Which Checks Does a Texas Home Care Agency Actually Run?',
    seoTitle: 'LEIE, NAR, EMR and SEMARC: Which Employability Checks Texas Agencies Need',
    description:
      'Four registries, four jobs. A plain-language guide to which employability checks a Texas home care agency runs, what each one catches, and how Ryzolve runs and stores them for you.',
    heroDescription:
      'Four acronyms, four different agencies, one hiring decision. The most common mistake we see is assuming a clear result on one means you\'re covered on the others. You aren\'t.',
    publishedAt: '2026-06-16',
    updatedAt: '2026-10-07',
    readingMinutes: 6,
    keywords: [
      'LEIE NAR EMR SEMARC texas',
      'texas home care employability checks',
      'OIG exclusion list home care',
      'texas hcssa background check requirements',
      'monthly LEIE screening',
    ],
    solutionEyebrow: 'At a glance',
    solutionTitle: 'The short version',
    solutionDescription:
      '',
    workflowSteps: [
      {
        number: '01',
        title: 'Each registry catches something different',
        description: 'None of them substitutes for another.',
      },
      {
        number: '02',
        title: 'Run all that apply, every time',
        description: 'At hire, and at least every 12 months after. LEIE is also screened monthly for agencies with an HHSC contract.',
      },
      {
        number: '03',
        title: 'Keep the results',
        description: 'A surveyor or monitor wants dated proof, not your recollection.',
      },
    ],
    articleSections: [
      {
        title: 'The four registries',
        paragraphs: [],
        blocks: [
          { type: 'p', text: '**LEIE (List of Excluded Individuals and Entities).** People and organizations barred from federally funded healthcare programs, for reasons like fraud, patient abuse or a revoked license. There\'s a federal list (HHS OIG) and a Texas list (HHSC OIG). You check both.' },
          { type: 'p', text: '**NAR (Nurse Aide Registry).** Texas\'s registry of nurse aides, including those with substantiated findings of abuse, neglect, exploitation or misappropriating a client\'s property. It\'s searched in TULIP, and everyone you hire gets checked, regardless of title.' },
          { type: 'p', text: '**EMR (Employee Misconduct Registry).** HHSC\'s registry of people barred from long-term care work because of confirmed misconduct findings. This is the one in transition. HHSC\'s Provider Letter 2026-10 says the requirement to search the EMR is being replaced with a requirement to search SEMARC.' },
          { type: 'p', text: '**SEMARC (Search Engine for Multi-Agency Reportable Conduct).** A newer statewide search that pulls misconduct findings from HHSC, DFPS, TJJD and TEA into one place. SEMARC doesn\'t replace LEIE or NAR.' },
        ],
      },
      {
        title: 'Where things stand right now',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'The SEMARC rollout has been confusing. HHSC set a grace period from August 3 to October 5, 2026, and said it would not survey for SEMARC compliance until October 6. In practice, the EMR and NAR links in TULIP are still working for many agencies. [We wrote up what that means for you here →](https://ryzolve.com/blogs/semarc-replaces-emr-search-texas-hcssa)' },
        ],
      },
      {
        title: 'A mistake worth avoiding',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'An agency runs one search, sees a clean result, and moves on. Months later a surveyor asks about a different registry and there\'s nothing in the file.' },
          { type: 'p', text: 'Each check is separate. Every employee, contractor and volunteer gets the full set, and every result gets saved with the date.' },
        ],
      },
      {
        title: 'What we run for agencies on Ryzolve',
        paragraphs: [],
        blocks: [
          { type: 'p', text: 'At hire and every month, Ryzolve runs LEIE (federal and Texas), NAR and EMR. Each result is stored on the employee\'s record with the date and the registry, so you can pull it up when someone asks.' },
          {
            type: 'table',
            head: ['The question', 'Where the answer lives'],
            rows: [
              ['Was this person cleared before they started?', 'Their record, with the date'],
              ['Did we screen everyone for LEIE last March?', 'The monthly results on file'],
              ['Who\'s due for their annual re-check?', 'One place, not scattered files'],
            ],
          },
          { type: 'p', text: 'Want to see it on a real employee file? Book a demo and bring your hardest question.' },
        ],
      },
      {
        title: 'Check these in your own process',
        paragraphs: [],
        blocks: [
          {
            type: 'list',
            items: [
              'Does your pre-hire checklist include every registry, not just the one your team remembers best?',
              'Are checks re-run at least every 12 months for current staff, not only new hires?',
              'Could you show which registry was checked, when, and by whom, for any employee?',
            ],
          },
        ],
      },
    ],
    inlineCtaAfter: 3,
    sourceNote:
      '*This reflects HHSC Provider Letter 2026-10 (revised) and HHSC\'s NAR and SEMARC Joint Training FAQ. Confirm current requirements at [semarc.texas.gov](https://semarc.texas.gov/faq/) before relying on this for a compliance decision.*',
    capabilities: [],
    faqs: [
      {
        q: 'If SEMARC comes back clear, do we still need LEIE?',
        a: 'Yes. SEMARC and LEIE cover different things. A clear result on one tells you nothing about the other.',
      },
      {
        q: 'Does job title change which registries apply?',
        a: 'No. NAR and the misconduct search apply to everyone you hire. LEIE applies to anyone involved in providing or billing for services.',
      },
      {
        q: 'How often are the checks repeated?',
        a: 'At hire and at least every 12 months after. LEIE screening is also done monthly for agencies with an HHSC contract.',
      },
      {
        q: 'Do contractors need the same checks?',
        a: 'Yes. Contractors and subcontractors are screened the same way as employees.',
      },
      {
        q: 'Which checks does Ryzolve run?',
        a: 'LEIE (federal and Texas), NAR and EMR, at hire and monthly, with every result stored and retrievable.',
      },
    ],
    relatedLinks: [
      {
        href: '/blogs/semarc-replaces-emr-search-texas-hcssa',
        title: 'SEMARC and the EMR search',
        description: 'Where the rollout stands.',
      },
      {
        href: '/compliance-regulation',
        title: 'Compliance checks',
        description: 'How checks run and get stored in Ryzolve.',
      },
      {
        href: '/blogs/texas-hhsc-contract-monitoring-readiness',
        title: 'HHSC contract monitoring checklist',
        description: 'What monitors ask for.',
      },
    ],
    ctaLabel: 'See how Ryzolve tracks compliance checks',
    ctaHref: '/compliance-regulation',
    faqEyebrow: 'Questions Texas agencies ask',
    relatedTitle: 'Compliance checks connect to the rest of your agency.',
    ctaTitle: 'Stop chasing your own compliance records',
  },
  {
    slug: 'texas-hcssa-license-survey-readiness',
    image: '/img/blog/texas-hcssa-license-survey-readiness.jpg',
    imageAlt: 'An agency owner greeting a visiting surveyor at the office door',
    label: 'HCSSA license survey readiness',
    eyebrow: 'Compliance checks',
    title: 'What to Have Ready for a Texas HCSSA License Survey',
    description:
      'How often HHSC surveys a Texas HCSSA, what gets requested, and a downloadable checklist to prepare your agency before the survey team arrives.',
    publishedAt: '2026-06-11',
    readingMinutes: 6,
    keywords: [
      'texas hcssa license survey checklist',
      'hhsc survey preparation',
      'home health survey texas',
      'hcssa survey frequency',
      'licensure survey readiness',
    ],
    solutionTitle: 'How it works at your agency.',
    solutionDescription:
      'Survey teams don\'t call ahead the way a scheduled monitoring does. This guide covers survey timing, typical record requests, and a checklist to keep on hand.',
    workflowSteps: [
      {
        number: '01',
        title: 'Initial survey',
        description: 'Conducted once your agency notifies HHSC it\'s ready to be surveyed.',
      },
      {
        number: '02',
        title: 'Re-survey within 18 months',
        description: 'HHSC follows up with a second survey within 18 months of the initial one.',
      },
      {
        number: '03',
        title: 'Then every 36 months',
        description: 'After that, surveys recur at least every 36 months, matching the 3-year HCSSA license period. A complaint or reported incident can trigger one sooner.',
      },
    ],
    articleSections: [
      {
        title: 'Why survey readiness can\'t be a once-a-cycle project',
        paragraphs: [
          'A license survey looks at whether your agency\'s day-to-day operation matches its licensing standards. That includes client records, staff records, policies, and quality documentation. Because the standard survey cycle runs every 36 months, it can be tempting to assemble everything right before that window opens. A complaint or reported incident can trigger a survey at any time, so the records need to stay current between scheduled surveys.',
        ],
      },
      {
        title: 'What a survey typically covers',
        paragraphs: [
          'Surveyors generally look across three areas: **client and care records** (visit schedules, the client roster, admission and discharge documentation), **staff and training records** (the employee roster, competency evaluations, in-service training), and **policy and quality documentation** (your policy manual, complaint log, QAPI, infection control, and emergency preparedness plan). The exact list varies by license category, and HHSC may request other documentation, but these categories cover most reviews. Ryzolve keeps client records, staff records, and policy documentation in one system throughout the year. That makes survey readiness part of routine recordkeeping instead of a project that begins when a survey is announced.',
        ],
      },
      {
        title: 'The full checklist',
        paragraphs: [
          'It\'s organized into the same three categories, with space to check off each item as it is confirmed current. Keep it printed and updated so it does not have to be assembled from scratch when a survey is announced.',
        ],
      },
      {
        title: 'How this differs from a contract monitoring',
        paragraphs: [
          'A license survey and an HHSC contract and fiscal compliance monitoring are separate reviews run by different parts of HHSC. A survey checks licensing and care standards. Monitoring checks contract and billing compliance for agencies with an HHSC Community Care Services contract. Many agencies deal with both. [See how contract monitoring differs, with its own checklist →](https://ryzolve.com/blogs/texas-hhsc-contract-monitoring-readiness)',
        ],
      },
    ],
    capabilities: [
      'Whether your active employee roster and personnel records reflect current staff, not last year\'s',
      'Whether your complaint log is being updated as complaints come in, not backfilled later',
      'Whether your emergency preparedness plan reflects drills that actually happened, with dates',
      'Whether QAPI and infection control documentation are current, not from the last survey cycle',
    ],
    faqs: [
      {
        q: 'How much advance notice do we get before a survey?',
        a: 'A scheduled contract monitoring comes with at least 14 days\' written notice, but a licensure survey can arrive with little to no advance notice. Records therefore need to stay current between cycles.',
      },
      {
        q: 'Does every license category get surveyed the same way?',
        a: 'The core survey cycle starts with an initial survey, followed by another within 18 months and then every 36 months. This applies across HCSSA license categories, though the specific standards depend on whether the agency provides home health, hospice, or PAS services.',
      },
      {
        q: 'What happens if a survey finds a violation?',
        a: 'Violations get documented, typically requiring the agency to submit a plan of correction. Depending on severity, a violation can also lead to further enforcement action, so timely correction and documentation matter.',
      },
      {
        q: 'Can a complaint trigger a survey outside the normal 36-month cycle?',
        a: 'Yes. A complaint or reported incident can trigger a survey at any time, independent of the standard 36-month cycle.',
      },
    ],
    relatedLinks: [
      {
        href: '/blogs/texas-hhsc-contract-monitoring-readiness',
        title: 'Contract & fiscal compliance monitoring checklist',
        description: 'See how this differs from a licensure survey.',
      },
      {
        href: '/document-management',
        title: 'Document management',
        description: 'Explore where survey-ready records live together.',
      },
      {
        href: '/compliance-regulation',
        title: 'Compliance checks',
        description: 'Review how ongoing compliance tracking supports survey readiness.',
      },
    ],
    ctaLabel: 'Download the Survey Checklist (PDF)',
    ctaHref: '/resources/texas-hcssa-license-survey-checklist.pdf',
    capabilitiesTitle: 'What to review between surveys',
    relatedTitle: 'Survey readiness connects to the rest of your agency.',
    ctaTitle: 'Ready to keep survey documentation current year-round?',
  },
  {
    slug: 'texas-hhsc-contract-monitoring-readiness',
    image: '/img/blog/texas-hhsc-contract-monitoring-readiness.jpg',
    imageAlt: 'Two staff reviewing binders together across a conference table',
    label: 'HHSC contract monitoring readiness',
    eyebrow: 'Compliance checks',
    title: 'What to Have Ready for an HHSC Contract & Fiscal Compliance Monitoring',
    description:
      'What an HHSC contract and fiscal compliance monitoring actually reviews, how often it happens, and a downloadable checklist to prepare before the notice letter arrives.',
    publishedAt: '2026-06-09',
    readingMinutes: 6,
    keywords: [
      'hhsc contract monitoring checklist',
      'fiscal compliance monitoring texas',
      'community care services monitoring',
      'texas pas contract monitoring',
      'form 5988 checklist',
    ],
    solutionTitle: 'How it works at your agency.',
    solutionDescription:
      'If your agency holds an HHSC Community Care Services contract, this review is separate from your license survey. It focuses mainly on billing, staffing, and payroll records. Here\'s what it covers and a checklist to prepare with.',
    workflowSteps: [
      {
        number: '01',
        title: 'Applies to contracted programs',
        description: 'This monitoring applies to agencies with an HHSC Community Care Services contract, including PAS, CDS, CLASS, CMPAS, DAHS, DBMD, and related programs. It does not apply to every licensed HCSSA.',
      },
      {
        number: '02',
        title: 'Scheduled, with notice',
        description: 'HHSC sends written notice at least 14 days before a scheduled monitoring, listing the exact records to have ready at the entrance conference.',
      },
      {
        number: '03',
        title: 'Scored against a 90% threshold',
        description: 'Each standard reviewed gets a compliance score. Below 90% overall, or on any individual standard, triggers a required corrective action plan.',
      },
    ],
    articleSections: [
      {
        title: 'Why this isn\'t the same review as your license survey',
        paragraphs: [
          'A license survey and a contract monitoring may sound like two names for the same visit, but different parts of HHSC run them for different reasons. A license survey checks HCSSA licensing and care standards. Contract and fiscal compliance monitoring checks the terms of a specific HHSC contract, focusing mainly on billing accuracy, screening processes, and payroll documentation. Because the reviews measure different things, an agency can pass one and still have gaps in the other.',
        ],
      },
      {
        title: 'How often this happens',
        paragraphs: [
          'Contract and fiscal compliance monitoring does not follow the fixed annual or multi-year cycle used for license surveys. Under state rule, HHSC monitors a contractor at least once during a provisional contract and periodically after that on a schedule HHSC sets. The interval is not predictable, but the notice is: HHSC provides at least 14 days\' written notice, naming the contract under review and the records to have ready.',
        ],
      },
      {
        title: 'What a monitoring typically covers',
        paragraphs: [
          'The review centers on four areas: **screening and background checks** (including evidence of monthly LEIE screening, a stricter schedule than the annual employability checks required elsewhere), **staff and payroll records** (employee roster, wage notification process, payroll documentation), **client and service records** (client charts, complaint logs, and proof that clients were told how to report abuse or neglect), and **program-specific documents** for certain contract types, such as vendor justifications for CLASS DSA or a facility floor plan for RC. Ryzolve keeps LEIE screening, payroll records, and client documentation connected in one system. With those records in place, the 14-day notice can be used to confirm the files instead of assembling them.',
        ],
      },
      {
        title: 'The full checklist',
        paragraphs: [
          'It\'s organized by those four categories, with the program-specific items clearly marked so you\'re not chasing down documentation that doesn\'t apply to your contract type.',
        ],
      },
      {
        title: 'How this differs from a license survey',
        paragraphs: [
          'If your agency also holds an HCSSA license, you\'re dealing with two separate reviews on two separate timelines. [See what a license survey covers instead, with its own checklist →](https://ryzolve.com/blogs/texas-hcssa-license-survey-readiness)',
        ],
      },
    ],
    capabilities: [
      'Whether LEIE screening happens monthly, since this monitoring checks the ongoing schedule as well as the record from hiring',
      'Whether payroll records for attendants tie back cleanly to the hours billed for the individuals they served',
      'Whether your complaint log is current and whether clients or their representatives have documented proof they were told how to file one',
      'Whether program-specific items for your contract type are already on file before the 14-day deadline begins',
    ],
    faqs: [
      {
        q: 'Does every HCSSA go through contract monitoring?',
        a: 'No. This applies specifically to agencies holding an HHSC Community Care Services contract, such as PAS, CDS, CLASS, CMPAS, DAHS, or DBMD. An agency that\'s licensed but doesn\'t hold one of these contracts wouldn\'t go through this particular review.',
      },
      {
        q: 'What happens if our compliance score comes in below 90%?',
        a: 'HHSC requires the agency to submit an acceptable corrective action plan for any standard scoring below 90%. If the overall score falls below 90%, the agency is considered out of substantial compliance with the contract, which can lead to contract actions or sanctions.',
      },
      {
        q: 'Who at HHSC conducts this monitoring?',
        a: 'A Contract Specialist from HHSC\'s Community Care Services Contracts division conducts the monitoring, typically with additional staff present depending on the scope of the review.',
      },
      {
        q: 'Can we respond if we disagree with the monitoring results?',
        a: 'Yes. An agency can submit a written response to HHSC regarding the monitoring results within three business days of the exit conference, and there\'s a process for an informal review or administrative hearing if needed.',
      },
    ],
    relatedLinks: [
      {
        href: '/blogs/texas-hcssa-license-survey-readiness',
        title: 'License survey readiness checklist',
        description: 'See how this differs from a licensure survey.',
      },
      {
        href: '/claims-and-bills',
        title: 'Claims and reconciliation',
        description: 'Explore how billing and payroll records stay organized for review.',
      },
      {
        href: '/compliance-regulation',
        title: 'Compliance checks',
        description: 'Review how ongoing LEIE screening supports monitoring readiness.',
      },
    ],
    ctaLabel: 'Get the Monitoring Checklist (PDF)',
    ctaHref: '/blogs/texas-hhsc-contract-monitoring-readiness#download',
    gatedDownload: {
      title: 'Texas HHSC Contract Monitoring Checklist',
      resource: 'hhsc-contract-monitoring-checklist',
    },
    capabilitiesTitle: 'What to review before the notice letter arrives',
    relatedTitle: 'Monitoring readiness connects to the rest of your agency.',
    ctaTitle: 'Ready to keep monitoring documentation organized year-round?',
  },
  {
    slug: 'payroll-ready-evv-data',
    image: '/img/blog/payroll-ready-evv-data.jpg',
    imageAlt: 'An agency office manager reviewing caregiver hours on a laptop beside a printed schedule',
    label: 'Payroll-ready EVV data',
    eyebrow: 'Texas PAS payroll reporting',
    title: 'How Texas PAS Agencies Can Keep EVV Data Ready for Payroll Processing',
    description:
      'A practical guide to reviewing current clock-in/clock-out data before payroll processing at a Texas PAS agency.',
    publishedAt: '2026-07-22',
    readingMinutes: 7,
    keywords: [
      'Texas PAS payroll reporting',
      'payroll-ready EVV data',
      'EVV payroll data',
      'clock-in clock-out reporting',
      'PAS payroll workflow',
    ],
    solutionTitle: 'What payroll-ready EVV data means in daily agency operations.',
    solutionDescription:
      'Payroll-ready EVV data means your team can review current clock-in/clock-out information before a payroll run, rather than gathering it across separate places at the last minute.',
    workflowSteps: [
      {
        number: '01',
        title: 'Keep clock-in and clock-out data current',
        description: 'Review the visit-time information your team will need before payroll processing begins.',
      },
      {
        number: '02',
        title: 'Review data before the payroll run',
        description: 'Use a pre-payroll review to look for information that needs attention before processing.',
      },
      {
        number: '03',
        title: 'Keep the workflow consistent',
        description: 'Keep clock-in/clock-out data ready for payroll processing regardless of your payroll schedule.',
      },
    ],
    articleSections: [
      {
        title: 'Why clock-in and clock-out data can slow payroll down',
        paragraphs: [
          'A payroll run depends on the agency having current time information available for review. When clock-in or clock-out data needs follow-up close to payroll processing, teams can lose time switching among records, communications, and reports to understand what needs attention.',
          'A regular review gives payroll staff a predictable place to look at current EVV-related time data before processing. It does not replace agency judgment; it gives the team a clearer starting point for the review work that already has to happen.',
        ],
      },
      {
        title: 'A plain-language pre-payroll review workflow',
        paragraphs: [
          'Start by reviewing current clock-in and clock-out data for the payroll period. Next, identify records that need the team’s attention and follow the agency’s established process for resolving them. Then use the reviewed information as part of payroll reporting and processing.',
          'The goal is not to promise that every record is complete automatically. It is to keep the information your agency reviews current and in context, whether your payroll schedule is weekly, biweekly, or another cadence.',
        ],
      },
      {
        title: 'What teams should review before processing payroll',
        paragraphs: [
          'Payroll staff can review whether clock-in/clock-out data is current for the period and whether related records need follow-up. The right review details depend on the agency’s own policies and payroll process.',
          'It also helps to keep the payroll conversation connected to the work around it. Billing, claims, caregiver records, documents, communications, faxing, compliance checks, and notifications can all affect how an agency team understands a record and decides what to review next.',
        ],
      },
      {
        title: 'How payroll data relates to claims, caregiver records, and compliance',
        paragraphs: [
          'Payroll data is one part of a broader operating workflow. For claims, Texas PAS agencies can compare billed hours with approved EVV/TMHP hours before claim submission, identify mismatches, and support reconciliation. Keeping related payroll data in context can make that review easier to coordinate.',
          'Caregiver records, onboarding documents, HR paperwork, and compliance checks also sit alongside the day-to-day agency work. Ryzolve supports those workflows together so teams can follow their processes without treating payroll information as an isolated task.',
        ],
      },
    ],
    capabilities: [
      'Current clock-in/clock-out data ready for payroll processing',
      'A practical pre-payroll review workflow for current time data',
      'EVV and payroll data kept in context with billing, claims, and notifications',
    ],
    faqs: [
      {
        q: 'How does Ryzolve support payroll processing for Texas PAS agencies?',
        a: 'Ryzolve keeps clock-in/clock-out data current and ready for payroll processing regardless of your payroll schedule.',
      },
      {
        q: 'Does the payroll workflow depend on a specific payroll schedule?',
        a: 'No. Ryzolve keeps clock-in/clock-out data current and ready for payroll processing regardless of your payroll schedule.',
      },
      {
        q: 'What does payroll-ready EVV data include?',
        a: 'It includes current clock-in/clock-out data that your team can review as part of payroll reporting and processing.',
      },
      {
        q: 'What other agency workflows can sit alongside payroll data?',
        a: 'Ryzolve supports documents, communications, faxing, billing, invoicing, claims, compliance checks, and notifications alongside payroll data.',
      },
    ],
    relatedLinks: [
      {
        href: '/claims-and-bills',
        title: 'Claims and reconciliation',
        description: 'See how payroll data can stay in context with claims review.',
      },
      {
        href: '/document-management',
        title: 'Documents and onboarding',
        description: 'Explore forms and records that support agency operations.',
      },
      {
        href: '/compliance-regulation',
        title: 'Compliance checks',
        description: 'Review the compliance workflow for caregiver requirements.',
      },
      {
        href: '/training',
        title: 'Training workflows',
        description: 'Explore administrator and in-service training options.',
      },
    ],
    ctaLabel: 'Book a demo',
    ctaHref: '/calendly',
    // Preserves this post's original wording now that the headings are per-post.
    heroPanelTitle: 'Ready for payroll review',
    heroPanelDescription:
      'Keep current time data in view as your agency prepares each payroll run.',
    capabilitiesTitle: 'Payroll data that stays ready for the next step.',
    faqTitle: 'Payroll-ready EVV data, in plain language.',
    relatedTitle: 'Payroll work connects to the rest of your agency.',
    ctaTitle: 'See where payroll-ready data fits at your agency.',
  },
];

/** Newest first. The array is authored in topic order, so ordering by date here
    keeps the listing chronological no matter how entries are added. */
export const blogCapabilitiesByDate: BlogCapabilityEntry[] = [...publishedBlogCapabilities].sort(
  (a, b) => b.publishedAt.localeCompare(a.publishedAt)
);

export function getBlogCapability(slug: string) {
  return publishedBlogCapabilities.find((entry) => entry.slug === slug) || null;
}
