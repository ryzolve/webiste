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

export type BlogArticleSection = {
  title: string;
  paragraphs: string[];
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
    slug: '16-hour-new-administrator-training-texas',
    image: '/img/blog/16-hour-new-administrator-training-texas.jpg',
    imageAlt: 'An agency administrator taking notes at her desk beside an open laptop',
    label: '16-hour new administrator training',
    eyebrow: 'Texas administrator training',
    title: 'What the 16-Hour New Administrator Training Actually Covers in Texas',
    description:
      'A plain-language guide to the 16-hour training Texas requires for first-time HCSSA Administrators and Alternate Administrators, and how to stay on schedule.',
    publishedAt: '2026-08-11',
    readingMinutes: 6,
    keywords: [
      '16 hour texas administrator training',
      'new HCSSA administrator training',
      'first-time administrator training texas',
      'HCSSA onboarding training',
      'texas home care administrator requirements',
    ],
    solutionTitle: 'How it works at your agency.',
    solutionDescription:
      'A plain-language guide to the additional training first-time Administrators and Alternate Administrators must complete in their first year — and how to keep it from becoming a deadline scramble.',
    workflowSteps: [
      {
        number: '01',
        title: 'Know your window',
        description: 'First-time Administrators and Alternate Administrators have until the end of their first 12 months in the role to complete the additional 16 clock hours.',
      },
      {
        number: '02',
        title: 'Complete it in Ryzolve, on your schedule',
        description: 'Self-paced modules mean the 16 hours can be finished in one sitting or spread across several weeks, in your browser, on any device.',
      },
      {
        number: '03',
        title: 'File your certificate',
        description: 'A state-recognized certificate generates instantly on completion, ready to download and keep with your agency\'s records.',
      },
    ],
    articleSections: [
      {
        title: 'Why this training gets missed',
        paragraphs: [
          'The 16-hour requirement sits on top of the 8-hour training a new Administrator or Alternate Administrator completes before stepping into the role. Because it\'s due later — by the end of the first 12 months — it\'s easy for it to slip behind the day-to-day work of actually running the agency. By the time a survey or license renewal comes up, tracking down whether the hours were completed, and finding the certificate, becomes its own project.',
          'A predictable place to start the 16 hours, and a predictable place to find the certificate afterward, removes that scramble. It doesn\'t change what the training covers — it just keeps the record where your team expects it to be.',
        ],
      },
      {
        title: 'What the 16 hours are meant to prepare you for',
        paragraphs: [
          'This training builds on the foundational 8-hour course with the practical, day-to-day responsibilities of running a licensed agency — the kind of subjects that come up in a survey, a complaint investigation, or a routine audit rather than in a classroom. It\'s designed to be completed either before or during the first year in the role, whichever fits your onboarding timeline.',
        ],
      },
      {
        title: 'How this connects to survey readiness',
        paragraphs: [
          'Administrator training doesn\'t sit in isolation — it\'s one part of the record an agency needs to produce on demand during a survey. Keeping training certificates alongside caregiver records, compliance checks, and other documentation means your agency can answer "where\'s the proof" quickly, instead of searching for it under pressure.',
        ],
      },
    ],
    capabilities: [
      'Whether your Administrator or Alternate Administrator has started the 16-hour course',
      'Where the completion certificate will be filed once it\'s issued',
      'Whether the timeline lines up with your agency\'s own onboarding checklist',
    ],
    faqs: [
      {
        q: 'Who needs the 16-hour training?',
        a: 'First-time Administrators and Alternate Administrators of Home Health, Hospice, and PAS agencies in Texas, within their first 12 months in the role.',
      },
      {
        q: 'Can I complete it before I\'m officially designated?',
        a: 'No — the 16 hours are designed to be completed after designation, within your first 12 months in the role. The 8-hour course is the one completed beforehand; the two aren\'t interchangeable in timing.',
      },
      {
        q: 'Is the certificate accepted for HHSC licensing purposes?',
        a: 'Yes. The course generates a state-recognized completion certificate, which is the record an agency keeps on file to show the requirement was met.',
      },
      {
        q: 'How long do I have access to the course material?',
        a: 'Access stays open for the full 12 months you have to complete the requirement in Ryzolve, so you can finish it in one sitting or spread it across several sessions at your own pace.',
      },
    ],
    relatedLinks: [
      {
        href: '/compliance-regulation',
        title: 'Compliance checks',
        description: 'See how training records fit into ongoing compliance tracking.',
      },
      {
        href: '/document-management',
        title: 'Document management',
        description: 'Explore where certificates and agency records live together.',
      },
      {
        href: '/training',
        title: 'In-Service training',
        description: 'Compare Administrator courses with monthly agency training plans.',
      },
    ],
    ctaLabel: 'View the 16-hour course',
    ctaHref: '/training/16-hours-for-new-administrators-and-alternates',
    capabilitiesTitle: 'What to review before your first-year deadline',
    relatedTitle: 'Administrator training connects to the rest of your agency.',
    ctaTitle: 'Ready to get your Administrator certified?',
  },
  {
    slug: 'abuse-neglect-exploitation-reporting-training',
    image: '/img/blog/abuse-neglect-exploitation-reporting-training.jpg',
    imageAlt: 'Two care staff talking quietly across a break-room table',
    label: 'Abuse & neglect reporting',
    eyebrow: 'In-service training',
    title: 'Keeping Abuse, Neglect & Exploitation Reporting Training Current on Your Care Team',
    description:
      'A practical look at keeping abuse, neglect, and exploitation reporting training current for Texas home care caregivers and staff, and why it matters for survey readiness.',
    publishedAt: '2026-08-06',
    readingMinutes: 6,
    keywords: [
      'caregiver abuse neglect exploitation reporting training',
      'mandatory reporting training texas home care',
      'elder abuse reporting training',
      'home care in-service training texas',
    ],
    solutionTitle: 'How it works at your agency.',
    solutionDescription:
      'A practical look at why this In-Service topic carries more weight than most, and how agencies keep it documented and audit-ready year-round.',
    workflowSteps: [
      {
        number: '01',
        title: 'Assign the topic',
        description: 'Abuse, Neglect & Exploitation Reporting is one of twelve topics included in every Ryzolve In-Service plan.',
      },
      {
        number: '02',
        title: 'Track completion by learner in Ryzolve',
        description: 'See who has completed the topic and who still needs to, without cross-referencing separate spreadsheets.',
      },
      {
        number: '03',
        title: 'Keep the certificate on file',
        description: 'Completion records and certificates stay attached to each caregiver\'s profile for audit readiness.',
      },
    ],
    articleSections: [
      {
        title: 'Why this topic carries extra weight',
        paragraphs: [
          'Caregivers and attendants are often the first, and sometimes the only, people positioned to notice signs of abuse, neglect, or exploitation in a client\'s home. Reporting training isn\'t just a compliance checkbox — it\'s what equips staff to recognize warning signs and know exactly what to do next, and it\'s a topic surveyors pay close attention to.',
          'Because of that, agencies need more than a one-time training moment early in a caregiver\'s tenure. Keeping it current across the whole team, with a clear completion record, is what turns "we trained on this once" into "we can show you exactly who\'s current, right now."',
        ],
      },
      {
        title: 'What consistent training on this topic looks like',
        paragraphs: [
          'Reporting training covers recognizing signs of abuse, neglect, and exploitation, understanding an agency\'s reporting obligations, and knowing the steps to take once something is identified. Refreshing it on a recurring basis, rather than only at hire, keeps it front of mind rather than becoming something staff remember only from orientation.',
        ],
      },
      {
        title: 'How this connects to survey readiness',
        paragraphs: [
          'This is exactly the kind of record a survey or complaint investigation can ask for on short notice: proof that a specific staff member completed reporting training, and when. Keeping it alongside other compliance documentation, rather than in a separate system, is what makes "produce the record" a quick lookup instead of a scramble.',
        ],
      },
    ],
    capabilities: [
      'Which caregivers and staff have completed this topic, and when',
      'Whether new hires have it scheduled as part of onboarding',
      'Where the completion certificates are stored if a surveyor asks',
    ],
    faqs: [
      {
        q: 'Is this topic included in every In-Service plan?',
        a: 'Yes — Abuse, Neglect & Exploitation Reporting is one of the twelve monthly topics included in every Ryzolve In-Service plan, regardless of plan size.',
      },
      {
        q: 'How do I see who on my team still needs to complete it?',
        a: 'Ryzolve\'s In-Service dashboard shows completion status by learner, so you can see at a glance who\'s finished this topic and who still needs to, rather than checking individual records one at a time.',
      },
      {
        q: 'Does the certificate reset each year, or is it a one-time record?',
        a: 'It\'s an annual record — the topic repeats every year as part of the ongoing In-Service cycle, and each year\'s completion is tracked separately in Ryzolve.',
      },
      {
        q: 'Can I assign this topic outside of its scheduled month?',
        a: 'Yes. New hires can complete the topic when it fits their onboarding timeline rather than waiting for its scheduled month to come around again.',
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
    slug: 'documentation-and-charting-training',
    image: '/img/blog/documentation-and-charting-training.jpg',
    imageAlt: 'A caregiver writing visit notes on a tablet in a client’s living room',
    label: 'Documentation & charting',
    eyebrow: 'In-service training',
    title: 'Why Documentation & Charting Deserves Its Own Training Month',
    description:
      'Why consistent documentation and charting training matters for Texas home care agencies, and how to keep caregiver records audit-ready between surveys.',
    publishedAt: '2026-08-04',
    readingMinutes: 6,
    keywords: [
      'home care documentation training',
      'caregiver charting training texas',
      'home care documentation requirements',
      'PAS agency documentation',
      'audit-ready caregiver records',
    ],
    solutionTitle: 'How it works at your agency.',
    solutionDescription:
      'Good care that isn\'t documented is invisible to a surveyor. Here\'s how agencies keep charting habits consistent across a whole care team.',
    workflowSteps: [
      {
        number: '01',
        title: 'Assign the topic',
        description: 'Documentation & Charting is one of twelve topics included in every Ryzolve In-Service plan.',
      },
      {
        number: '02',
        title: 'Reinforce daily habits',
        description: 'In Ryzolve, the training connects directly to the notes and records caregivers already produce during visits.',
      },
      {
        number: '03',
        title: 'Keep records audit-ready',
        description: 'Completion certificates and caregiver documentation live in the same place, ready to produce on demand.',
      },
    ],
    articleSections: [
      {
        title: 'Why documentation gaps are so costly',
        paragraphs: [
          'A caregiver can deliver excellent care and still leave an agency exposed if the visit isn\'t documented clearly and on time. Missing details, inconsistent formatting, or notes that don\'t match what was actually authorized are some of the most common findings in a survey or audit — not because care wasn\'t delivered, but because the record doesn\'t show it was.',
          'Training on documentation and charting isn\'t about teaching caregivers to write more. It\'s about building a consistent habit: what to note, when to note it, and how to keep the record aligned with what was authorized and delivered.',
        ],
      },
      {
        title: 'What this training reinforces',
        paragraphs: [
          'The topic covers the basics of clear, timely charting — what belongs in a visit note, how to keep documentation consistent from caregiver to caregiver, and why the record needs to match the authorized services. Refreshing it annually keeps documentation habits consistent even as new caregivers join the team.',
        ],
      },
      {
        title: 'How this connects to claims and compliance',
        paragraphs: [
          'Documentation doesn\'t stay in its own lane. It\'s what supports a claim when billed hours are compared against approved hours, and it\'s often the first thing reviewed in a compliance check or complaint investigation. Keeping charting training current, and keeping the resulting records organized alongside claims and compliance data, is what makes those reviews faster instead of a document hunt.',
        ],
      },
    ],
    capabilities: [
      'Whether documentation habits are consistent across caregivers, not just individually strong',
      'Which staff have completed this topic and when it\'s due for a refresh',
      'Whether visit notes are easy to produce quickly if a surveyor asks for them',
    ],
    faqs: [
      {
        q: 'Is Documentation & Charting included in every In-Service plan?',
        a: 'Yes — it\'s one of the twelve monthly topics included in every Ryzolve In-Service plan, regardless of plan size.',
      },
      {
        q: 'Does this training replace an agency\'s own documentation policy?',
        a: 'No. It reinforces good documentation habits, but it doesn\'t replace an agency\'s own charting policy or the specific format an agency requires — think of it as the baseline every caregiver should already understand.',
      },
      {
        q: 'How often should caregivers refresh this topic?',
        a: 'Annually, as part of the standard In-Service cycle, so documentation habits stay consistent even as new caregivers join the team.',
      },
      {
        q: 'Where do completed certificates get stored?',
        a: 'In Ryzolve, certificates stay attached to each caregiver\'s profile alongside their other training records, so they\'re easy to locate without a separate filing system.',
      },
    ],
    relatedLinks: [
      {
        href: '/document-management',
        title: 'Document management',
        description: 'See where caregiver notes and records are organized.',
      },
      {
        href: '/claims-and-bills',
        title: 'Claims and reconciliation',
        description: 'Explore how documentation supports billed-versus-approved hour comparisons.',
      },
      {
        href: '/compliance-regulation',
        title: 'Compliance checks',
        description: 'Review how training records fit into ongoing compliance tracking.',
      },
    ],
    ctaLabel: 'View In-Service Plans',
    ctaHref: '/training',
    capabilitiesTitle: 'What to review across your care team',
    relatedTitle: 'Documentation training connects to the rest of your agency.',
    ctaTitle: 'Ready to see your team\'s training status?',
  },
  {
    slug: '8-hour-initial-administrator-training-texas',
    image: '/img/blog/8-hour-initial-administrator-training-texas.jpg',
    imageAlt: 'A new administrator working through training on a laptop at a kitchen table',
    label: '8-hour initial administrator training',
    eyebrow: 'Texas administrator training',
    title: 'The 8-Hour Training Every First-Time Texas Administrator Needs Before Designation',
    description:
      'What the 8-hour pre-designation training covers for first-time Texas Administrators and Alternate Administrators, and how to time it correctly before stepping into the role.',
    publishedAt: '2026-07-30',
    readingMinutes: 5,
    keywords: [
      '8 hour texas administrator training',
      'initial administrator training texas',
      'pre-designation administrator training',
      'HCSSA administrator requirements',
      'texas home care administrator certification',
    ],
    solutionTitle: 'How it works at your agency.',
    solutionDescription:
      'A plain-language guide to the initial training required before someone steps into the Administrator or Alternate Administrator role — and why timing matters as much as completion.',
    workflowSteps: [
      {
        number: '01',
        title: 'Complete it before designation',
        description: 'The 8 hours must be finished during the 12 months immediately before someone is designated Administrator or Alternate Administrator.',
      },
      {
        number: '02',
        title: 'Learn at your own pace in Ryzolve',
        description: 'Self-paced, browser-based modules mean the course fits around hiring timelines instead of a fixed class schedule.',
      },
      {
        number: '03',
        title: 'Certify and file',
        description: 'A state-recognized certificate generates instantly, ready to keep on file before day one in the role.',
      },
    ],
    articleSections: [
      {
        title: 'Why timing trips agencies up more than content',
        paragraphs: [
          'The 8-hour course itself isn\'t the hard part — most agencies know it\'s required. What catches people off guard is the timing: it has to be completed in the 12 months immediately preceding designation, not just "at some point" before or after. An agency promoting from within, or bringing on a new Administrator quickly, can lose track of exactly when that window opened.',
          'Having a clear record of when the course was completed, and confirming it falls inside that 12-month window, turns a potential compliance question into a quick lookup.',
        ],
      },
      {
        title: 'What the 8-hour training covers',
        paragraphs: [
          'The course introduces the licensing standards an agency operates under and the state and federal laws that apply to running one — including the Texas Health and Safety Code provisions on home and community support services and criminal history checks, and the Texas Human Resources Code chapter on the rights of the elderly. It\'s designed as the foundation a new Administrator or Alternate Administrator needs before taking on the role, ahead of the additional 16-hour training required within the first year.',
        ],
      },
      {
        title: 'How this fits into onboarding as a whole',
        paragraphs: [
          'Administrator training is one piece of a broader onboarding record — alongside hire forms, background checks, and the documents an agency needs to produce during a survey. Keeping the training certificate in the same place as the rest of that onboarding paperwork means there\'s one place to look, not several.',
        ],
      },
    ],
    capabilities: [
      'The exact date the 8-hour course was completed, relative to the designation date',
      'Whether the certificate is filed somewhere your team can retrieve quickly',
      'Whether the additional 16-hour training is already scheduled for the first year',
    ],
    faqs: [
      {
        q: 'When exactly does someone need to complete the 8-hour course?',
        a: 'During the 12 months immediately before they\'re designated Administrator or Alternate Administrator of a Home Health, Hospice, or PAS agency in Texas.',
      },
      {
        q: 'Does this course replace the 16-hour training?',
        a: 'No. The 8-hour course covers the foundation required before designation; the 16-hour course is additional training required within the first year after designation. Both are required, in that order.',
      },
      {
        q: 'Can the same person take this course for multiple agencies?',
        a: 'Each person needs to complete the course individually for their own designation — it\'s tied to the individual being designated, not transferable between agencies.',
      },
      {
        q: 'How is the certificate delivered?',
        a: 'A state-recognized certificate generates automatically in Ryzolve on completion, ready to download and keep on file.',
      },
    ],
    relatedLinks: [
      {
        href: '/training/16-hours-for-new-administrators-and-alternates',
        title: '16-hour new administrator training',
        description: 'See what\'s required in the first year after designation.',
      },
      {
        href: '/document-management',
        title: 'Document management',
        description: 'Explore where training certificates and onboarding records live together.',
      },
      {
        href: '/compliance-regulation',
        title: 'Compliance checks',
        description: 'Review how administrator training fits into ongoing compliance tracking.',
      },
    ],
    ctaLabel: 'View the 8-Hour Course',
    ctaHref: '/training/8-hours-initial-administrator-training-program',
    capabilitiesTitle: 'What to check before someone steps into the role',
    relatedTitle: 'Administrator training connects to the rest of your agency.',
    ctaTitle: 'Ready to get your new Administrator certified?',
  },
  {
    slug: 'infection-control-training-home-care',
    image: '/img/blog/infection-control-training-home-care.jpg',
    imageAlt: 'A caregiver washing her hands at a home bathroom sink',
    label: 'Infection control training',
    eyebrow: 'In-service training',
    title: 'Infection Control Training Isn\'t a One-Time Topic — Here\'s How Agencies Keep It Current',
    description:
      'Why infection control stays a year-round training priority for Texas home care agencies, and how to keep completion records current across your care team.',
    publishedAt: '2026-07-28',
    readingMinutes: 5,
    keywords: [
      'infection control training home care',
      'caregiver infection control texas',
      'home health infection control training',
      'PAS agency in-service training',
    ],
    solutionTitle: 'How it works at your agency.',
    solutionDescription:
      'Infection control habits are easy to teach once and hard to keep consistent. Here\'s how a recurring training cadence helps.',
    workflowSteps: [
      {
        number: '01',
        title: 'Assign the topic',
        description: 'Infection Control is one of twelve topics included in every Ryzolve In-Service plan.',
      },
      {
        number: '02',
        title: 'Track it by learner in Ryzolve',
        description: 'See who\'s completed the topic across your caregivers, attendants, and staff in one place.',
      },
      {
        number: '03',
        title: 'Keep certificates on file',
        description: 'Completion records stay attached to each learner\'s profile, ready for review.',
      },
    ],
    articleSections: [
      {
        title: 'Why infection control training needs a recurring cadence',
        paragraphs: [
          'Hand hygiene, standard precautions, and safe handling of supplies in a client\'s home are habits, not facts to memorize once. Without a recurring refresh, good practices can quietly drift, especially across a care team where caregivers work independently in different homes rather than under direct daily supervision.',
          'A consistent, agency-wide training cycle keeps the standard the same for every caregiver, regardless of when they were hired, and gives the agency a clear record that the training happened and who completed it.',
        ],
      },
      {
        title: 'What this training reinforces',
        paragraphs: [
          'The topic covers the core practices caregivers rely on day to day — hand hygiene, standard precautions, and safe handling of care-related materials in a home setting, rather than a clinical or facility environment. Refreshing it annually keeps the standard consistent even as new caregivers join partway through the year.',
        ],
      },
      {
        title: 'How this connects to survey readiness',
        paragraphs: [
          'Infection control is a routine focus area in surveys and audits. Being able to show, quickly, which caregivers are current on this training — and when they completed it — is the difference between a quick answer and a longer follow-up. Keeping the record alongside other compliance documentation is what makes that answer fast.',
        ],
      },
    ],
    capabilities: [
      'Whether every active caregiver has completed the current year\'s Infection Control topic',
      'Whether new hires have it scheduled as part of onboarding, not left until later',
      'Where the completion certificates are stored if a surveyor or case manager asks',
    ],
    faqs: [
      {
        q: 'Is Infection Control included in every In-Service plan?',
        a: 'Yes — it\'s one of the twelve monthly topics included in every Ryzolve In-Service plan, regardless of plan size.',
      },
      {
        q: 'How often should caregivers refresh this topic?',
        a: 'Annually, as part of the standard In-Service cycle, so infection control habits stay consistent regardless of when a caregiver was hired.',
      },
      {
        q: 'Can new hires complete it outside of its scheduled month?',
        a: 'Yes. New hires can complete Infection Control as part of onboarding in Ryzolve rather than waiting for its scheduled month.',
      },
      {
        q: 'Does this replace agency-specific infection control policies?',
        a: 'No. It sets a consistent baseline, but agency-specific infection control procedures and supply protocols still apply on top of it.',
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
      'This topic protects clients directly and protects the agency\'s compliance standing at the same time. Here\'s how to keep it current across a full care team.',
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
          'Client rights, privacy under HIPAA, and recognizing elder abuse are three distinct subjects that intersect constantly in home care — a caregiver who understands a client\'s right to privacy is also better equipped to notice when something about a client\'s situation doesn\'t look right. Training on all three together, rather than as separate one-off sessions, reflects how they actually show up in day-to-day caregiving.',
          'Because this topic touches both client protection and agency compliance, it tends to draw close attention during surveys — which makes a clear, current completion record especially valuable.',
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
          'This is a topic surveyors and case managers may ask about directly, given its overlap with privacy and client protection standards. Being able to show current completion records for every active caregiver, without a delay, keeps a routine inquiry routine. Keeping it alongside other compliance and caregiver documentation is what makes that possible.',
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
        a: 'Yes — Client Rights, HIPAA & Elder Abuse is one of the twelve monthly topics included in every Ryzolve In-Service plan, regardless of plan size.',
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
        a: 'Yes. New hires can complete it during onboarding, given how directly it touches client protection, rather than waiting for the scheduled month.',
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
      'Clinical tasks have checklists. Building trust with a client from a different background doesn\'t — but training still helps. Here\'s how agencies keep this topic current.',
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
          'A caregiver walks into a different home, and often a different culture, every day. Clear communication and respect for a client\'s background aren\'t optional soft skills — they shape whether a client trusts the caregiver enough to accept help in the first place. Unlike a clinical procedure, there\'s no single script for this, which makes ongoing training more valuable, not less.',
          'A consistent annual refresh keeps the whole team working from the same baseline expectations, rather than leaving it to individual caregiver experience alone.',
        ],
      },
      {
        title: 'What this training reinforces',
        paragraphs: [
          'The topic covers practical communication techniques for home visits and an introduction to cultural competency — recognizing and respecting differences in background, language, and expectations across the client population an agency serves. It\'s meant to build habits, not memorize a script.',
        ],
      },
      {
        title: 'How this connects to client satisfaction and retention',
        paragraphs: [
          'Communication issues are a common root cause behind client complaints and caregiver turnover on a case. Keeping this training current is one of the more direct ways an agency can support both client satisfaction and caregiver confidence — and having the record on file supports that story if a case manager or surveyor asks about it.',
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
        a: 'Yes — Communication Skills & Cultural Competency is one of the twelve monthly topics included in every Ryzolve In-Service plan, regardless of plan size.',
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
        a: 'Yes. New hires can complete it in Ryzolve during onboarding rather than waiting for its scheduled month.',
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
    title: 'Dementia & Alzheimer\'s Care: Training That Changes How a Caregiver Sees the Whole Visit',
    description:
      'How Texas home care agencies keep Dementia & Alzheimer\'s Care training current across caregivers, and why it matters for client safety and family trust.',
    publishedAt: '2026-07-16',
    readingMinutes: 5,
    keywords: [
      'dementia care training caregivers',
      'alzheimers training home care texas',
      'dementia caregiver training',
      'PAS agency in-service training',
    ],
    solutionTitle: 'How it works at your agency.',
    solutionDescription:
      'Caring for a client with dementia calls for a different set of instincts than a typical visit. Here\'s how agencies keep that training consistent across the team.',
    workflowSteps: [
      {
        number: '01',
        title: 'Assign the topic',
        description: 'Dementia & Alzheimer\'s Care is one of twelve topics in every Ryzolve In-Service plan.',
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
        title: 'Why this training matters beyond the checklist',
        paragraphs: [
          'A caregiver who understands how dementia affects memory, communication, and behavior responds differently to a difficult moment than one who doesn\'t — with more patience, fewer escalations, and a safer visit overall. It\'s also one of the topics families notice directly: how a caregiver handles confusion or agitation shapes whether a family trusts the agency to keep showing up.',
          'An annual refresh keeps this understanding consistent across the whole team, not dependent on which caregivers happen to have prior experience with dementia care.',
        ],
      },
      {
        title: 'What this training reinforces',
        paragraphs: [
          'The topic covers recognizing common dementia and Alzheimer\'s-related behaviors, communication approaches that reduce confusion and agitation, and safety considerations specific to cognitive decline. It\'s built around the situations caregivers actually encounter in a client\'s home.',
        ],
      },
      {
        title: 'How this connects to client and family trust',
        paragraphs: [
          'Families of clients with dementia often ask directly about caregiver training on this topic. Being able to answer clearly, with a record to back it up, supports both the immediate conversation and the agency\'s broader compliance documentation.',
        ],
      },
    ],
    capabilities: [
      'Whether caregivers assigned to dementia or memory-care clients have current training on file',
      'Whether new hires receive this training early if they\'ll be assigned to relevant cases',
      'Where completion certificates are stored for quick reference',
    ],
    faqs: [
      {
        q: 'Is this topic included in every In-Service plan?',
        a: 'Yes — Dementia & Alzheimer\'s Care is one of the twelve monthly topics included in every Ryzolve In-Service plan, regardless of plan size.',
      },
      {
        q: 'Should only caregivers assigned to memory-care clients take this training?',
        a: 'All caregivers benefit from it, since assignments can shift, but it\'s especially important to confirm before assigning someone to a dementia or memory-care case specifically.',
      },
      {
        q: 'How often should this topic be refreshed?',
        a: 'Annually, as part of the standard In-Service cycle.',
      },
      {
        q: 'Can it be assigned outside its scheduled month for new hires?',
        a: 'Yes. New hires can complete it in Ryzolve during onboarding if they\'ll be assigned to relevant cases early on.',
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
    slug: 'emergency-disaster-preparedness-training',
    image: '/img/blog/emergency-disaster-preparedness-training.jpg',
    imageAlt: 'A caregiver checking a home emergency kit and flashlight by the door',
    label: 'Emergency & disaster preparedness',
    eyebrow: 'In-service training',
    title: 'Emergency & Disaster Preparedness: A Training Topic Texas Agencies Can\'t Treat as Optional',
    description:
      'Why emergency and disaster preparedness training carries extra weight for Texas home care agencies, and how to keep caregiver readiness current year-round.',
    publishedAt: '2026-07-14',
    readingMinutes: 5,
    keywords: [
      'emergency preparedness training home care',
      'disaster preparedness caregiver training texas',
      'home health emergency plan training',
      'PAS agency in-service training',
    ],
    solutionTitle: 'How it works at your agency.',
    solutionDescription:
      'Between hurricanes, winter storms, and power outages, Texas agencies deal with emergencies more often than most. Here\'s how to keep the whole team ready.',
    workflowSteps: [
      {
        number: '01',
        title: 'Assign the topic',
        description: 'Emergency & Disaster Preparedness is one of twelve topics in every Ryzolve In-Service plan.',
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
        title: 'Why this training can\'t wait until the emergency happens',
        paragraphs: [
          'An emergency plan only works if the people executing it were trained on it before the emergency started. For a home care agency, that means caregivers who know what to do when a scheduled visit coincides with severe weather, a power outage, or another disruption — not figuring it out in the moment.',
          'Texas agencies in particular deal with a real range of seasonal risk, from hurricanes along the coast to winter storms further north. A recurring annual refresh keeps the plan current in caregivers\' minds instead of something reviewed once at hire and forgotten.',
        ],
      },
      {
        title: 'What this training reinforces',
        paragraphs: [
          'The topic covers recognizing emergency situations, understanding the agency\'s disaster response plan, and knowing what steps to take to keep both clients and caregivers safe when a visit is disrupted by an emergency.',
        ],
      },
      {
        title: 'How this connects to survey readiness',
        paragraphs: [
          'Emergency preparedness is a standard area of review in surveys and audits. Being able to show which caregivers are current on this training, and that the agency\'s own plan is up to date, keeps that part of a survey straightforward.',
        ],
      },
    ],
    capabilities: [
      'Whether every active caregiver has completed the current year\'s topic before the season it\'s most relevant to',
      'Whether the agency\'s emergency plan itself is current and reflected in the training',
      'Where completion certificates are stored for quick reference',
    ],
    faqs: [
      {
        q: 'Is this topic included in every In-Service plan?',
        a: 'Yes — Emergency & Disaster Preparedness is one of the twelve monthly topics included in every Ryzolve In-Service plan, regardless of plan size.',
      },
      {
        q: 'Does this replace an agency\'s own written emergency plan?',
        a: 'No. It builds caregiver awareness of the agency\'s emergency plan and their role in it, but the written plan itself is a separate document an agency maintains and keeps current.',
      },
      {
        q: 'Should this training be timed around hurricane or winter storm season?',
        a: 'It can help to complete it ahead of a relevant season, but the training is scheduled annually regardless — the goal is having it current before an emergency happens, not perfectly timed to one type of event.',
      },
      {
        q: 'Can new hires complete it outside its scheduled month?',
        a: 'Yes. New hires can complete it in Ryzolve during onboarding rather than waiting for its scheduled month.',
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
      'Poor transfer technique doesn\'t just risk the client — it\'s one of the leading causes of caregiver injury. Here\'s how agencies keep this training consistent.',
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
          'Assisting with activities of daily living — bathing, dressing, mobility, transfers — is some of the most physically hands-on work a caregiver does. Done with proper technique, it protects the client from falls and injury. Done without it, it also puts the caregiver at risk of back and shoulder injuries that are among the most common reasons caregiving staff miss work.',
          'That\'s part of why this topic gets a dedicated training month rather than being folded into general onboarding — the stakes run in both directions.',
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
          'Injuries from improper transfer technique are a real driver of caregiver turnover, alongside the direct safety risk to clients. Keeping this training current is one of the more concrete ways an agency can reduce both — and having the record on file supports that if it\'s ever reviewed.',
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
        a: 'Yes — Assisting with ADLs & Safe Transfer is one of the twelve monthly topics included in every Ryzolve In-Service plan, regardless of plan size.',
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
      'Recognizing symptoms early and following safety precautions consistently is what keeps one exposure from becoming a bigger problem. Here\'s how agencies keep this training current.',
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
          'Caregivers move between homes and, in some cases, healthcare settings, which makes consistent understanding of airborne pathogen precautions genuinely important — not a formality. Recognizing early symptoms and knowing the correct safety precautions is what allows a caregiver to protect themselves, their client, and the next home they walk into.',
          'Because the risk doesn\'t go away between training cycles, this topic gets a recurring annual refresh rather than a one-time orientation session.',
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
          'Safety and infection-related precautions are a routine area of review during surveys. Being able to show current, complete training records for every active caregiver keeps that part of a review straightforward rather than a follow-up item.',
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
        a: 'Yes — TB / Airborne Pathogen + Safety Precautions is one of the twelve monthly topics included in every Ryzolve In-Service plan, regardless of plan size.',
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
        a: 'Yes. New hires can complete it in Ryzolve during onboarding rather than waiting for its scheduled month.',
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
      'Burnout is one of the biggest drivers of caregiver turnover in home care. This is the one In-Service topic aimed directly at the caregiver, not the client.',
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
          'Most In-Service topics protect the client. This one protects the caregiver — and by extension, the agency\'s ability to keep experienced staff on the schedule. Caregiving is emotionally and physically demanding work, often done alone in a client\'s home, and burnout is a well-documented driver of turnover across the home care industry.',
          'Including self-care as a formal training topic signals to caregivers that the agency takes their wellbeing seriously, not just their productivity — which matters for retention in a field where turnover is expensive to replace.',
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
        a: 'Yes — Caregiver Self-Care is one of the twelve monthly topics included in every Ryzolve In-Service plan, regardless of plan size.',
      },
      {
        q: 'Is this training counted toward any state requirement?',
        a: 'No — it\'s not tied to a specific state licensing requirement the way some other topics are. It\'s included because burnout directly affects care quality and retention, which matters just as much operationally.',
      },
      {
        q: 'How often should this topic be refreshed?',
        a: 'Annually, as part of the standard In-Service cycle.',
      },
      {
        q: 'Can it be assigned outside its scheduled month for new hires?',
        a: 'Yes. New hires can complete it in Ryzolve during onboarding rather than waiting for its scheduled month.',
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
          'A caregiver working alone in a client\'s home regularly faces small judgment calls — appropriate boundaries, handling a client\'s belongings, what to do when a family member asks something outside the caregiver\'s role. Without a clear standard, caregivers are left to guess. With one, they have a consistent reference point to fall back on.',
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
          'Many client and family complaints trace back to a boundary or conduct issue rather than a clinical one. A clear, consistently trained standard is one of the more direct ways an agency can reduce those complaints before they happen — and having the training record on file supports the agency\'s position if a concern is ever raised.',
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
        a: 'Yes — Ethics & Professional Conduct is one of the twelve monthly topics included in every Ryzolve In-Service plan, regardless of plan size.',
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
      'A caregiver who knows what a normal reading looks like is often the first person to catch that something\'s changed. Here\'s how agencies keep this training current.',
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
          'An annual refresh keeps technique and judgment consistent across the team, rather than relying on whatever training a caregiver happened to receive elsewhere.',
        ],
      },
      {
        title: 'What this training reinforces',
        paragraphs: [
          'The topic covers proper technique for taking vital signs, understanding typical ranges, and knowing when a reading warrants escalating to the agency or a client\'s care team rather than simply documenting it and moving on.',
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
        a: 'Yes — Vital Signs & Health Monitoring is one of the twelve monthly topics included in every Ryzolve In-Service plan, regardless of plan size.',
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
    title: 'The 12-Hour Renewal Cycle Existing Administrators Can\'t Let Slip',
    description:
      'What the 12-hour continuing education requirement covers for existing Texas Administrators and Alternate Administrators, and how to keep renewal cycles on schedule.',
    publishedAt: '2026-06-23',
    readingMinutes: 5,
    keywords: [
      '12 hour texas administrator renewal training',
      'HCSSA administrator continuing education',
      'administrator renewal training texas',
      'existing administrator training requirements',
    ],
    solutionTitle: 'How it works at your agency.',
    solutionDescription:
      'Unlike the initial training, this one repeats every year — which makes it easy to lose track of exactly when the clock resets. Here\'s how to keep renewal on schedule.',
    workflowSteps: [
      {
        number: '01',
        title: 'Know your cycle',
        description: 'Administrators and Alternate Administrators must complete 12 clock hours of continuing education within each 12-month period, beginning with the date of designation.',
      },
      {
        number: '02',
        title: 'Cover the required topics in Ryzolve',
        description: 'The 12 hours must include at least two required subject areas, alongside other topics related to the administrator role.',
      },
      {
        number: '03',
        title: 'Certify and file',
        description: 'A state-recognized certificate generates instantly on completion, ready to keep with your renewal records.',
      },
    ],
    articleSections: [
      {
        title: 'Why renewal cycles are easier to lose track of than initial training',
        paragraphs: [
          'The 8-hour and 16-hour courses each happen once, tied to a clear starting point — designation into the role. The 12-hour renewal is different: it repeats every 12-month period from that same designation date, year after year, for as long as someone holds the role. Multiply that across every Administrator and Alternate Administrator an agency has had over time, and it\'s easy to lose track of exactly when each person\'s current cycle closes.',
          'A clear record of each administrator\'s designation date, and where they stand in the current 12-month cycle, turns renewal from a recurring guessing game into a routine check.',
        ],
      },
      {
        title: 'What the 12-hour renewal covers',
        paragraphs: [
          'The course must include at least two required topics related to administering an agency, alongside other subjects relevant to the role. It\'s designed to keep an Administrator or Alternate Administrator current on the responsibilities of the position on an ongoing basis, rather than treating initial training as a one-time credential.',
        ],
      },
      {
        title: 'How this fits into ongoing compliance',
        paragraphs: [
          'Administrator training records, like other compliance documentation, need to be producible on demand. Keeping renewal certificates filed alongside the rest of an agency\'s compliance and personnel records means a renewal-cycle question has a fast answer instead of a search.',
        ],
      },
    ],
    capabilities: [
      'The designation date that starts their current 12-month renewal cycle',
      'Whether the current cycle\'s 12 hours are complete, in progress, or not yet started',
      'Where each year\'s completion certificate is filed',
    ],
    faqs: [
      {
        q: 'How often does the 12-hour renewal need to be completed?',
        a: 'Within each 12-month period, starting from the Administrator\'s or Alternate Administrator\'s date of designation, for as long as they hold the role.',
      },
      {
        q: 'Does the 12-hour course need to be completed all at once?',
        a: 'No. The 12 hours can be completed across multiple sessions throughout the 12-month cycle in Ryzolve — it doesn\'t need to be finished in one sitting.',
      },
      {
        q: 'What happens if an administrator\'s renewal cycle lapses?',
        a: 'This can affect the agency\'s compliance standing, so it\'s worth confirming current consequences with HHSC or your compliance lead directly rather than assuming a default outcome.',
      },
      {
        q: 'How is the certificate delivered after completion?',
        a: 'A state-recognized certificate generates automatically on completion, ready to download and keep with the agency\'s renewal records.',
      },
    ],
    relatedLinks: [
      {
        href: '/training/8-hours-initial-administrator-training-program',
        title: '8-hour initial training',
        description: 'See what\'s required before someone is designated Administrator.',
      },
      {
        href: '/training/16-hours-for-new-administrators-and-alternates',
        title: '16-hour new administrator training',
        description: 'Review the first-year requirement for first-time administrators.',
      },
      {
        href: '/compliance-regulation',
        title: 'Compliance checks',
        description: 'See how renewal records fit into ongoing compliance tracking.',
      },
    ],
    ctaLabel: 'View the 12-Hour Course',
    ctaHref: '/training/12-hours-for-existing-administrators-and-alternates',
    capabilitiesTitle: 'What to review for each administrator on staff',
    relatedTitle: 'Administrator training connects to the rest of your agency.',
    ctaTitle: 'Ready to keep your Administrators current?',
  },
  {
    slug: 'semarc-replaces-emr-search-texas-hcssa',
    image: '/img/blog/semarc-replaces-emr-search-texas-hcssa.jpg',
    imageAlt: 'An administrator running a registry search at a two-monitor desk',
    label: 'SEMARC replaces EMR search',
    eyebrow: 'Compliance checks',
    title: 'SEMARC Has Replaced the Standalone EMR Search — Here\'s What Changed',
    description:
      'Effective August 3, 2026, Texas HCSSA and ALF providers use SEMARC instead of a standalone EMR search. Here\'s exactly what changed, what didn\'t, and what to do now.',
    publishedAt: '2026-06-18',
    readingMinutes: 7,
    keywords: [
      'SEMARC texas hcssa',
      'employee misconduct registry texas',
      'SEMARC TULIP',
      'texas home care background check requirements',
      'NAR SEMARC employability check',
    ],
    solutionTitle: 'How it works at your agency.',
    solutionDescription:
      'Effective August 3, 2026, Texas HCSSA and ALF providers run employability checks through SEMARC instead of a standalone Employee Misconduct Registry search. Here\'s what actually changed, what didn\'t, and what to check on your agency\'s process this week.',
    workflowSteps: [
      {
        number: '01',
        title: 'SEMARC replaces the standalone EMR search',
        description: 'The Employee Misconduct Registry itself isn\'t going away; HHSC still manages it. But its results are now folded into SEMARC results instead of being searched on their own, and the old standalone EMR search link is gone from the TULIP home page.',
      },
      {
        number: '02',
        title: 'Access runs through TULIP',
        description: 'Providers with existing TULIP access request SEMARC access under "Other Actions," get approved by their Business Entity\'s Security Authority, and the option appears on their dashboard.',
      },
      {
        number: '03',
        title: 'NAR stays separate',
        description: 'The Nurse Aide Registry is still its own required search in TULIP, alongside SEMARC — not merged into it.',
      },
    ],
    articleSections: [
      {
        title: 'What SEMARC actually is',
        paragraphs: [
          'SEMARC (Search Engine for Multi-Agency Reportable Conduct) is a statewide database created under Senate Bill 1849 that pools reportable-conduct findings — abuse, neglect, exploitation, and other misconduct — from HHSC, DFPS, TJJD, and TEA into one searchable platform. Before SEMARC, an individual barred from working in, say, a childcare setting under one agency\'s registry could still get hired at a long-term care agency checking a different one. SEMARC closes that gap by giving authorized employers one place to check across all four agencies at once.',
        ],
      },
      {
        title: 'One exception worth knowing',
        paragraphs: [
          'HCS and TxHmL providers don\'t currently have TULIP access and are exempt from the SEMARC requirement until that access becomes available, expected around March 2027 — they continue their current process until then. State Supported Living Center hiring managers access SEMARC through IAMOnline instead of TULIP.',
        ],
      },
      {
        title: 'How this connects to survey readiness',
        paragraphs: [
          'Employability checks are exactly the kind of record a surveyor can ask to see on short notice. Whether the underlying process changes — as it just did with SEMARC — the expectation stays the same: a clear, current record for every employee, contractor, and volunteer, ready to produce on demand.',
        ],
      },
      {
        title: 'Compliance checks connect to the rest of your agency.',
        paragraphs: [
          '*This post reflects Texas HHSC\'s NAR & SEMARC Joint Training FAQ (updated July 16, 2026) and Provider Letter 2026-10. Regulatory guidance can continue to evolve — confirm current requirements at [semarc.texas.gov](https://semarc.texas.gov/faq/) before relying on this for a compliance decision.*',
        ],
      },
    ],
    capabilities: [
      'The EMR is no longer searched as its own standalone item — its results now appear inside SEMARC',
      'SEMARC access must be requested separately in TULIP, even for agencies that already had TULIP access for other purposes',
      'Each Business Entity is limited to 10 TULIP user accounts total, across every location',
      'The Nurse Aide Registry (NAR) is still required and still searched separately',
      'LEIE checks — both the federal OIG exclusion list and HHSC\'s own — are still required; SEMARC does not replace them',
      'Criminal history background checks through DPS/DFPS are unchanged',
      'CANRS is not replaced',
      'The required check cadence — at hire, and at least every 12 months after — has not changed',
      'Job titles still don\'t matter: every employee, contractor, and volunteer needs to be checked, not just direct-care staff',
      'Whether your agency has requested and received SEMARC access in TULIP',
      'Who holds your agency\'s TULIP Security Authority role, since they approve SEMARC access requests',
      'Whether your hiring process still waits for NAR, SEMARC, and any other required results to come back clear before a new hire starts — provisional hiring while results are pending isn\'t allowed',
      'Whether staff who currently run EMR/NAR checks know the standalone EMR link on the TULIP home page is gone',
    ],
    faqs: [
      {
        q: 'Does SEMARC replace LEIE or OIG checks?',
        a: 'No. Both the federal OIG exclusion list and HHSC\'s own LEIE checks are still required. SEMARC only compiles reportable-conduct findings from HHSC, DFPS, TJJD, and TEA — it doesn\'t cover the same ground as exclusion-list checks.',
      },
      {
        q: 'Do we need to re-check every current employee right away?',
        a: 'No. Regulation on when to conduct employability checks hasn\'t changed — staff must be checked at hire and annually after that. You\'re not required to immediately re-check everyone hired before August 2026; that check simply happens through SEMARC when their next annual check comes due.',
      },
      {
        q: 'What if results are still pending when we need to hire someone quickly?',
        a: 'No one can be hired while results are pending. All required checks — NAR, SEMARC, and any others that apply — need to come back clear before someone starts, even if that means a delayed start date.',
      },
      {
        q: 'Where do we find the official implementation details?',
        a: 'Provider Letter 2026-10 and the official SEMARC site at semarc.texas.gov are the authoritative sources — both are linked in this post.',
      },
    ],
    relatedLinks: [
      {
        href: '/compliance-regulation',
        title: 'Compliance checks',
        description: 'See how OIG, LEIE, and NAR tracking work inside Ryzolve.',
      },
      {
        href: '/document-management',
        title: 'Document management',
        description: 'Explore where employability check results and hiring records live together.',
      },
      {
        href: '/training',
        title: 'Caregiver onboarding',
        description: 'Review how hiring, checks, and training fit into one onboarding flow.',
      },
    ],
    ctaLabel: 'See how Ryzolve tracks compliance checks',
    ctaHref: '/compliance-regulation',
    capabilitiesTitle: 'What changed, and what didn\'t',
    relatedTitle: 'How this connects to the rest of your agency.',
    ctaTitle: 'Ready to keep employability checks organized?',
  },
  {
    slug: 'leie-nar-emr-semarc-texas-employability-checks',
    image: '/img/blog/leie-nar-emr-semarc-texas-employability-checks.jpg',
    imageAlt: 'Hands sorting labelled folders in a filing drawer',
    label: 'LEIE, NAR, EMR & SEMARC checks',
    eyebrow: 'Compliance checks',
    title: 'LEIE, NAR, EMR, SEMARC: Which Registries Does a Texas Home Care Agency Actually Need to Check?',
    description:
      'Four registries, four different purposes. A plain-language guide to which employability checks Texas home care agencies actually need, and how they relate to each other.',
    publishedAt: '2026-06-16',
    readingMinutes: 6,
    keywords: [
      'LEIE NAR EMR SEMARC texas',
      'texas home care employability checks',
      'OIG exclusion list home care',
      'texas hcssa background check requirements',
    ],
    solutionTitle: 'How it works at your agency.',
    solutionDescription:
      'Four acronyms, four different agencies, one hiring decision. Here\'s what each registry actually covers, and why checking one doesn\'t mean you can skip another.',
    workflowSteps: [
      {
        number: '01',
        title: 'Know what each registry checks for',
        description: 'LEIE, NAR, and SEMARC each screen for a different kind of risk, and none of them substitute for another.',
      },
      {
        number: '02',
        title: 'Run all of them, every time',
        description: 'Employability checks are required at hire and at least every 12 months after, across every registry that applies to your agency.',
      },
      {
        number: '03',
        title: 'Keep the results together',
        description: 'A surveyor asking "did you check this person" isn\'t asking about just one registry.',
      },
    ],
    articleSections: [
      {
        title: 'Why one search doesn\'t cover everything',
        paragraphs: [
          'It\'s a reasonable assumption that if a name comes back clear on one registry, it\'s clear everywhere — but each of these systems was built by a different agency to track a different kind of risk, and they don\'t share results with each other except where a law specifically connects them.',
        ],
      },
      {
        title: 'The four registries, in plain language',
        paragraphs: [
          '**LEIE (List of Excluded Individuals and Entities)** — Tracks individuals and entities excluded from participating in federally funded healthcare programs due to fraud, patient abuse, licensing revocation, or similar findings. Maintained federally by the HHS Office of Inspector General, with a parallel list maintained by Texas HHSC\'s own Office of Inspector General. Neither is affected by SEMARC.',
          '**NAR (Nurse Aide Registry)** — Texas\'s registry of individuals found to have abused, neglected, or exploited a resident or misappropriated resident property while working in a nurse aide role. Searched separately in TULIP, required for every employee regardless of job title.',
          '**EMR (Employee Misconduct Registry)** — HHSC\'s registry barring individuals from long-term care employment due to substantiated misconduct findings. Still maintained by HHSC, but as of August 2026, its results are surfaced through SEMARC rather than a standalone search.',
          '**SEMARC (Search Engine for Multi-Agency Reportable Conduct)** — A newer, broader system that pools reportable-conduct findings from HHSC, DFPS, TJJD, and TEA into a single search, closing the gap where someone barred in one sector could get hired in another. It houses EMR results but doesn\'t replace LEIE or NAR.',
        ],
      },
      {
        title: 'How this connects to survey readiness',
        paragraphs: [
          'When a surveyor asks to see employability check documentation, "we checked something" isn\'t a complete answer. Being able to show which registries were checked for a given employee, and when, is what turns that conversation into a quick confirmation instead of a longer review.',
        ],
      },
      {
        title: 'Compliance checks connect to the rest of your agency.',
        paragraphs: [
          '*This post reflects Texas HHSC\'s NAR & SEMARC Joint Training FAQ (updated July 16, 2026). Confirm current requirements at [semarc.texas.gov](https://semarc.texas.gov/faq/) before relying on this for a compliance decision.*',
        ],
      },
    ],
    capabilities: [
      'Whether your pre-hire checklist includes LEIE, NAR, and SEMARC — not just the one your team remembers most easily',
      'Whether checks are re-run at least every 12 months for every existing employee, not only new hires',
      'Whether your documentation shows which registry was checked, when, and by whom — a surveyor may ask about any one of them specifically',
    ],
    faqs: [
      {
        q: 'If SEMARC comes back clear, do we still need to check LEIE separately?',
        a: 'Yes. SEMARC and LEIE are maintained by different processes and cover different kinds of findings. A clear SEMARC result doesn\'t substitute for a LEIE check, and vice versa.',
      },
      {
        q: 'Does job title affect which registries apply?',
        a: 'No. Job titles don\'t matter for NAR and SEMARC — every employee, contractor, and volunteer needs to be checked, regardless of role. LEIE checks apply to anyone involved in providing or billing for services.',
      },
      {
        q: 'How often do these checks need to be repeated?',
        a: 'At hire, and at least every 12 months after, for as long as someone remains employed or contracted.',
      },
      {
        q: 'Do contractors need the same checks as employees?',
        a: 'Yes. Contractors and subcontractors need the same LEIE and SEMARC screening as employees — job classification doesn\'t exempt anyone from the requirement.',
      },
    ],
    relatedLinks: [
      {
        href: '/blogs/semarc-replaces-emr-search-texas-hcssa',
        title: 'SEMARC replaces the standalone EMR search',
        description: 'See what changed in August 2026 and what to check now.',
      },
      {
        href: '/compliance-regulation',
        title: 'Compliance checks',
        description: 'See how OIG, LEIE, and NAR tracking work inside Ryzolve.',
      },
      {
        href: '/document-management',
        title: 'Document management',
        description: 'Explore where employability check records live together.',
      },
    ],
    ctaLabel: 'See how Ryzolve tracks compliance checks',
    ctaHref: '/compliance-regulation',
    capabilitiesTitle: 'What to review across your hiring process',
    relatedTitle: 'How this connects to the rest of your agency.',
    ctaTitle: 'Ready to keep every registry check organized in one place?',
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
      'Survey teams don\'t call ahead the way a scheduled monitoring does. Here\'s how often a survey happens, what typically gets requested, and a checklist to keep on hand before one does.',
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
        description: 'After that, surveys recur at least every 36 months, matching the 3-year HCSSA license period — unless a complaint or reported incident triggers one sooner.',
      },
    ],
    articleSections: [
      {
        title: 'Why survey readiness can\'t be a once-a-cycle project',
        paragraphs: [
          'A license survey is looking at whether your agency\'s day-to-day operation matches its licensing standards — client records, staff records, policies, and quality documentation. Because the standard survey cycle runs every 36 months, it\'s tempting to treat readiness as something to assemble right before that window opens. But a complaint or reported incident can trigger a survey at any time, outside the normal cycle, which means the records a surveyor might ask for need to already be current, not reconstructed under a deadline.',
        ],
      },
      {
        title: 'What a survey typically covers',
        paragraphs: [
          'Surveyors generally look across three areas: **client and care records** (visit schedules, the client roster, admission and discharge documentation), **staff and training records** (the employee roster, competency evaluations, in-service training), and **policy and quality documentation** (your policy manual, complaint log, QAPI, infection control, and emergency preparedness plan). The exact list can vary by license category, and HHSC may request documentation beyond what\'s typical — but these three categories cover most of what comes up. This is exactly where Ryzolve fits: client records, staff records, and policy documentation live in one system year-round, so "survey-ready" is the normal state of your records rather than a project you start when a survey is announced.',
        ],
      },
      {
        title: 'The full checklist',
        paragraphs: [
          'It\'s organized into the same three categories, with space to check off each item as it\'s confirmed current — worth keeping printed and updated rather than assembled from scratch when a survey is announced.',
        ],
      },
      {
        title: 'How this differs from a contract monitoring',
        paragraphs: [
          'A license survey and an HHSC contract and fiscal compliance monitoring are two different reviews, run by two different parts of HHSC, looking at different things — a survey checks licensing and care standards, while monitoring checks contract and billing compliance for agencies with an HHSC Community Care Services contract. Many agencies deal with both. [See how contract monitoring differs, with its own checklist →](https://ryzolve.com/blogs/texas-hhsc-contract-monitoring-readiness)',
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
        a: 'Unlike a scheduled contract monitoring, which comes with at least 14 days\' written notice, a licensure survey can arrive with little to no advance notice — which is exactly why records need to stay current between cycles rather than being prepared right before one.',
      },
      {
        q: 'Does every license category get surveyed the same way?',
        a: 'The core survey cycle — initial, then within 18 months, then every 36 months — applies across HCSSA license categories, though the specific standards reviewed depend on which category of service (home health, hospice, PAS) an agency provides.',
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
    capabilitiesTitle: 'What to review between surveys, not just before one',
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
      'If your agency holds an HHSC Community Care Services contract, this is a separate review from your license survey — and it\'s mostly interested in billing, staffing, and payroll records. Here\'s what it covers and a checklist to prepare with.',
    workflowSteps: [
      {
        number: '01',
        title: 'Applies to contracted programs',
        description: 'This monitoring is for agencies with an HHSC Community Care Services contract — PAS, CDS, CLASS, CMPAS, DAHS, DBMD, and related programs — not every licensed HCSSA has one.',
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
          'It\'s easy to assume a license survey and a contract monitoring are the same visit with a different name, but they\'re run by different parts of HHSC for different reasons. A license survey checks whether your agency meets HCSSA licensing and care standards. A contract and fiscal compliance monitoring checks whether your agency is meeting the terms of a specific HHSC contract — which mostly comes down to billing accuracy, screening processes, and payroll documentation. An agency can pass one and still have gaps in the other, because they\'re measuring different things.',
        ],
      },
      {
        title: 'How often this happens',
        paragraphs: [
          'Contract and fiscal compliance monitoring doesn\'t run on a fixed annual or multi-year cycle the way a license survey does. Under state rule, HHSC monitors a contractor at least once during a provisional contract, then periodically after that on a schedule HHSC sets — which means the interval isn\'t predictable the way survey timing is. What is predictable is the notice: at least 14 days\' written notice before the monitoring date, naming the contract being reviewed and what to have ready.',
        ],
      },
      {
        title: 'What a monitoring typically covers',
        paragraphs: [
          'The review centers on four areas: **screening and background checks** (LEIE screening process and evidence — including the monthly screening cadence, which is stricter than the annual employability checks required elsewhere), **staff and payroll records** (employee roster, wage notification process, payroll documentation), **client and service records** (client charts, complaint logs, documentation that clients were informed how to report abuse or neglect), and **program-specific documents** that only apply to certain contract types, like vendor justifications for CLASS DSA or a facility floor plan for RC. Ryzolve is built around this exact overlap — LEIE screening, payroll records, and client documentation stay connected in one system, so a 14-day notice becomes a confirmation pass instead of a records-assembly project.',
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
      'Whether LEIE screening is actually happening monthly, not just at hire — this monitoring checks for evidence of the ongoing cadence, not a one-time record',
      'Whether payroll records for attendants tie back cleanly to the hours billed for the individuals they served',
      'Whether your complaint log is current and whether clients or their representatives have documented proof they were told how to file one',
      'Whether program-specific items for your contract type are already on file, rather than something you\'d need to assemble under a 14-day deadline',
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
    ctaLabel: 'Download the Monitoring Checklist (PDF)',
    ctaHref: '/resources/texas-hhsc-contract-monitoring-checklist.pdf',
    capabilitiesTitle: 'What to review before the notice letter arrives',
    relatedTitle: 'Monitoring readiness connects to the rest of your agency.',
    ctaTitle: 'Ready to keep monitoring documentation organized year-round?',
  },
  {
    slug: 'payroll-ready-evv-data',
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
