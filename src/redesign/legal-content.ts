export type LegalSection = {
  id: string;
  heading: string;
  body: string[];
};

export type LegalPolicy = {
  path: '/privacy' | '/terms' | '/cookies';
  title: string;
  description: string;
  h1: string;
  intro: string;
  lastUpdated: 'July 15, 2026';
  sections: LegalSection[];
};

export const legalReviewItems = [
  'Confirm the policy effective date before publication.',
  'Confirm the retention schedule for lead, account, training, and transaction records.',
  'Confirm the privacy-request process and response timing.',
  'Confirm international-transfer practices.',
  "Confirm Stripe's and other learning-portal payment processor roles and transaction-data handling.",
  'Confirm refund, cancellation, and subscription terms.',
  'Confirm governing law, venue, arbitration, and dispute-resolution terms.',
  'Confirm whether GA4 and a cookie-consent mechanism are enabled in production.',
] as const;

export const privacyPolicy: LegalPolicy = {
  path: '/privacy',
  title: 'Privacy Policy',
  description:
    'Learn how Ryzolve collects, uses, shares, and protects information when you visit our website, request a demo, or use our training services.',
  h1: 'Privacy Policy',
  intro:
    'This Privacy Policy explains how Ryzolve LLC handles information collected through ryzolve.com and related marketing communications.',
  lastUpdated: 'July 15, 2026',
  sections: [
    {
      id: 'information-you-provide',
      heading: 'Information You Provide',
      body: [
        'You may choose to provide information when you request a demo, contact us, download a guide, inquire about a plan, register for training, or otherwise communicate with Ryzolve. This information can include your name, email address, phone number, agency or organization details, job title, and the contents of your message.',
        'Please provide only information that is appropriate for a business inquiry. The marketing site is not intended for submitting patient records or other sensitive health information.',
      ],
    },
    {
      id: 'demo-contact-training',
      heading: 'Demo, Contact, Guide, and Training Information',
      body: [
        'When you book a demo, we may receive the information you submit through Calendly and details related to the requested meeting. Contact and guide-download forms may collect information needed to respond to you, deliver requested materials, and understand your interest in Ryzolve.',
        'If you explore administrator or in-service training, information connected with course selection, registration, learning progress, certificates, and related support may be handled through the applicable Ryzolve learning portal or agency platform.',
      ],
    },
    {
      id: 'account-and-transaction-information',
      heading: 'Account and Transaction Information',
      body: [
        'Ryzolve links to separate application and learning-portal experiences. Where you create an account, purchase training, or subscribe to a service, those experiences may collect account, order, payment-status, and support information needed to provide the requested service.',
        'Payment details are handled through the applicable checkout flow and its payment service providers, including Stripe for course purchases where that checkout is offered. We do not describe or collect payment-card information directly through this marketing website.',
      ],
    },
    {
      id: 'technical-information',
      heading: 'Technical Information We Collect Automatically',
      body: [
        'When you visit the site, our hosting, security, and analytics services may receive technical information such as your IP address, browser type, device information, pages viewed, referring pages, approximate location derived from IP address, and the date and time of your visit.',
        'This information helps us operate, secure, troubleshoot, and improve the site and understand how visitors use it.',
      ],
    },
    {
      id: 'cookies-and-similar-technologies',
      heading: 'Cookies and Similar Technologies',
      body: [
        'We and our service providers may use cookies, local storage, pixels, scripts, and similar technologies to keep the site working, protect forms, support chat and scheduling features, remember settings, and measure site use when analytics is configured.',
        'Our Cookie Policy provides additional detail about these technologies and available browser controls.',
      ],
    },
    {
      id: 'how-we-use-information',
      heading: 'How We Use Information',
      body: [
        'We use information to respond to requests, schedule demonstrations, deliver guides and training-related communications, provide and support our services, prevent spam and abuse, maintain site security, analyze site performance, and comply with applicable obligations.',
        'We may also use your contact information to send marketing communications where permitted by law and consistent with your choices.',
      ],
    },
    {
      id: 'service-providers-and-sharing',
      heading: 'Service Providers and Sharing',
      body: [
        'We use service providers that help us host and secure the site, protect forms, schedule meetings, provide chat, deliver our application and learning experiences, and measure website activity. These providers may process information on our behalf to perform their services.',
        'Current marketing-site providers include Cloudflare for hosting and security-related services, Cloudflare Turnstile for form-abuse protection, Calendly for demo scheduling, and Tawk.to for live chat. Google Analytics 4 may be used when enabled in our site configuration. Stripe may process payments for supported course purchases through the applicable checkout flow.',
        'We may also disclose information when required by law, to protect the rights, safety, or security of Ryzolve or others, or in connection with a corporate transaction such as a merger, financing, or sale of assets.',
      ],
    },
    {
      id: 'marketing-choices',
      heading: 'Marketing Choices',
      body: [
        'You can opt out of promotional emails by using the unsubscribe link in the message or by contacting us. Opting out of marketing communications does not prevent us from sending service, security, purchase, or other non-promotional communications when applicable.',
      ],
    },
    {
      id: 'retention-and-security',
      heading: 'Retention and Security',
      body: [
        'We retain information for as long as reasonably necessary for the purposes described in this policy, including to respond to requests, provide services, resolve disputes, maintain records, and meet legal obligations. Retention may vary by the type of information and the service involved.',
        'We use reasonable administrative, technical, and organizational measures designed to protect information. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.',
      ],
    },
    {
      id: 'children',
      heading: 'Children’s Privacy',
      body: [
        'The website and services are intended for business and professional users, not children. We do not knowingly collect personal information from children through this marketing site. If you believe a child has provided information to us, please contact us so we can review the request.',
      ],
    },
    {
      id: 'texas-and-international-visitors',
      heading: 'Texas, United States, and International Visitors',
      body: [
        'Ryzolve operates from Texas in the United States. If you access the site from outside the United States, your information may be processed in the United States or other locations where our service providers operate, subject to applicable law.',
      ],
    },
    {
      id: 'your-privacy-choices',
      heading: 'Your Privacy Choices and Requests',
      body: [
        'Depending on where you live and the information involved, you may have rights to request access, correction, deletion, or other information about our handling of your personal information. To make a request or ask a privacy question, contact us using the details below. We may need to verify your request before responding.',
      ],
    },
    {
      id: 'changes-and-contact',
      heading: 'Changes and Contact',
      body: [
        'We may update this policy as our website, services, or legal obligations change. We will post the updated version on this page and update the last-updated date.',
        'For privacy questions or requests, contact Ryzolve LLC at pas@ryzolve.com or 9309 Highway 75 S, New Waverly, TX 77358.',
      ],
    },
  ],
};

export const termsPolicy: LegalPolicy = {
  path: '/terms',
  title: 'Terms of Service',
  description:
    'Review the terms that govern access to the Ryzolve marketing website, demonstrations, training information, and related Ryzolve services.',
  h1: 'Terms of Service',
  intro:
    'These Terms of Service govern your access to ryzolve.com and the related Ryzolve marketing, training, and software experiences described on this site.',
  lastUpdated: 'July 15, 2026',
  sections: [
    {
      id: 'acceptance',
      heading: 'Acceptance of These Terms',
      body: [
        'By accessing or using this website, you agree to these Terms of Service. If you do not agree, do not use the site. Additional terms may apply when you use a Ryzolve application, learning portal, purchase flow, or other service, and those terms will apply to that service where presented.',
      ],
    },
    {
      id: 'our-services',
      heading: 'Our Website, Software, and Training Services',
      body: [
        'Ryzolve provides information about provider-management software and training offerings for PAS, Home Health, Hospice, and related care-agency operations. The site may link to separate Ryzolve application, agency, and learning-portal experiences.',
        'Information on this site is provided for general business and educational purposes. It does not replace your organization’s professional, legal, regulatory, financial, clinical, or compliance judgment.',
      ],
    },
    {
      id: 'eligibility-and-business-use',
      heading: 'Eligibility and Authorized Business Use',
      body: [
        'You may use the site only for lawful purposes and in connection with evaluating, accessing, or supporting Ryzolve services. You are responsible for ensuring that your use complies with laws, rules, and obligations applicable to your organization.',
      ],
    },
    {
      id: 'demo-and-communications',
      heading: 'Demo Requests and Communications',
      body: [
        'When you request a demo, contact us, or download a resource, you agree that Ryzolve may use the information you provide to respond to your request and communicate with you as described in our Privacy Policy. Scheduling may be provided through Calendly.',
      ],
    },
    {
      id: 'accounts-and-security',
      heading: 'Accounts and Security',
      body: [
        'Separate Ryzolve applications and learning portals may require an account. You are responsible for maintaining the confidentiality of your credentials, providing accurate information, and promptly notifying us of suspected unauthorized access. Do not share credentials or attempt to access accounts that are not yours.',
      ],
    },
    {
      id: 'training-purchases-and-certificates',
      heading: 'Training Purchases, Access, and Certificates',
      body: [
        'Training availability, access requirements, course progress, certificates, and any applicable purchase details are presented through the relevant learning portal or checkout flow. You are responsible for reviewing the information shown before completing a purchase or enrollment.',
        'A certificate of completion reflects the applicable training experience and is not a promise of employment, licensure, regulatory approval, or any particular business outcome.',
      ],
    },
    {
      id: 'payments',
      heading: 'Payment Terms',
      body: [
        'If you purchase training or another offering through an applicable Ryzolve checkout flow, you agree to the price, taxes, and purchase terms displayed there. Payment processing is handled through the applicable checkout experience and its payment service providers, including Stripe for supported course purchases.',
        'Any cancellation, refund, or subscription terms will be presented in the applicable service or checkout flow. This marketing site does not state a separate refund or cancellation policy.',
      ],
    },
    {
      id: 'acceptable-use',
      heading: 'Acceptable Use',
      body: [
        'You may not misuse the site or services, interfere with their operation, probe or bypass security measures, submit unlawful or harmful material, scrape content at scale without permission, impersonate another person, or use the site in a way that infringes rights or violates law.',
      ],
    },
    {
      id: 'intellectual-property',
      heading: 'Intellectual Property',
      body: [
        'The Ryzolve name, logos, website design, software descriptions, training materials, text, graphics, and other content are owned by Ryzolve or its licensors and are protected by applicable intellectual-property laws. You may not copy, modify, distribute, display, or create derivative works from them except as permitted by law or with written permission.',
      ],
    },
    {
      id: 'submissions-and-feedback',
      heading: 'Submissions and Feedback',
      body: [
        'If you send us questions, suggestions, feedback, or other non-confidential submissions, you permit Ryzolve to use that feedback to operate, improve, and market its services without an obligation to compensate you. Do not send confidential information unless we have agreed in writing to receive it.',
      ],
    },
    {
      id: 'third-party-services',
      heading: 'Third-Party Services and Links',
      body: [
        'The site may link to third-party services or separate Ryzolve platforms, including Calendly, Tawk.to, the Ryzolve application, and the Ryzolve learning portal. Those services are governed by their own terms and privacy practices. Ryzolve is not responsible for third-party content, availability, or practices.',
      ],
    },
    {
      id: 'availability-and-changes',
      heading: 'Service Availability and Changes',
      body: [
        'We may change, suspend, or discontinue all or part of the site or its features at any time. We do not guarantee that the site will always be available, uninterrupted, secure, or error-free.',
      ],
    },
    {
      id: 'disclaimers',
      heading: 'Disclaimers',
      body: [
        'The site and its content are provided on an “as is” and “as available” basis. To the extent permitted by law, Ryzolve disclaims warranties of merchantability, fitness for a particular purpose, non-infringement, accuracy, and uninterrupted availability.',
      ],
    },
    {
      id: 'liability',
      heading: 'Limitation of Liability',
      body: [
        'To the extent permitted by law, Ryzolve will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages arising from or related to your use of, or inability to use, this marketing site.',
      ],
    },
    {
      id: 'indemnification',
      heading: 'Indemnification',
      body: [
        'To the extent permitted by law, you agree to defend, indemnify, and hold harmless Ryzolve and its personnel from claims, liabilities, damages, and expenses arising from your misuse of the site, violation of these Terms, or violation of another person’s rights.',
      ],
    },
    {
      id: 'suspension-and-termination',
      heading: 'Suspension and Termination',
      body: [
        'We may suspend or restrict access to the site or related services if we reasonably believe there is misuse, a security risk, a violation of these Terms, or a legal requirement to do so.',
      ],
    },
    {
      id: 'changes-and-contact',
      heading: 'Changes and Contact',
      body: [
        'We may update these Terms from time to time. Updated Terms will be posted on this page with a revised last-updated date. Your continued use after an update means you accept the updated Terms.',
        'For questions about these Terms, contact Ryzolve LLC at pas@ryzolve.com or 9309 Highway 75 S, New Waverly, TX 77358.',
      ],
    },
  ],
};

export const cookiesPolicy: LegalPolicy = {
  path: '/cookies',
  title: 'Cookie Policy',
  description:
    'Understand how Ryzolve and its service providers use cookies and similar technologies on the Ryzolve marketing website.',
  h1: 'Cookie Policy',
  intro:
    'This Cookie Policy explains how Ryzolve uses cookies and similar technologies on ryzolve.com and how you can manage them.',
  lastUpdated: 'July 15, 2026',
  sections: [
    {
      id: 'what-are-cookies',
      heading: 'What Cookies and Similar Technologies Are',
      body: [
        'Cookies are small text files placed on your browser or device. Similar technologies can include local storage, pixels, scripts, SDKs, and identifiers that help a website recognize a browser, remember settings, or measure activity.',
      ],
    },
    {
      id: 'essential-cookies',
      heading: 'Essential Website Technologies',
      body: [
        'Some technologies are necessary to deliver and secure the website. They may support page delivery, load balancing, fraud prevention, error detection, and other core functions. Blocking them can cause parts of the site to stop working correctly.',
      ],
    },
    {
      id: 'cloudflare-and-turnstile',
      heading: 'Cloudflare and Turnstile Security',
      body: [
        'Ryzolve uses Cloudflare services to host and protect the website. Contact, guide, and plan-lead forms use Cloudflare Turnstile to help distinguish human visitors from automated abuse. These services may use technical signals and cookies or similar technologies as part of security and challenge functions.',
      ],
    },
    {
      id: 'live-chat',
      heading: 'Live Chat Technologies',
      body: [
        'The site may load Tawk.to live chat after the page is available or when you interact with the site. Tawk.to may use cookies or similar technologies to provide chat, remember a chat session, and support its service. If you do not want these technologies to load, avoid opening or interacting with the chat feature.',
      ],
    },
    {
      id: 'calendly',
      heading: 'Calendly Scheduling',
      body: [
        'When you book a demonstration, you may be directed to or interact with Calendly. Calendly may set its own cookies or use similar technologies to provide scheduling functionality. Your use of Calendly is also subject to its own policies.',
      ],
    },
    {
      id: 'analytics',
      heading: 'Analytics Cookies',
      body: [
        'Google Analytics 4 is optional in the current site configuration. When it is enabled, Google may use cookies or similar technologies to measure visits, pages viewed, and site interactions so we can understand and improve the website. If analytics is not configured, the site does not load the GA4 script.',
      ],
    },
    {
      id: 'linked-platforms',
      heading: 'Application and Learning Platform Cookies',
      body: [
        'Ryzolve links to separate application and learning-portal domains. Those platforms may use authentication, preference, security, checkout, and other cookies under their own terms and policies. This Cookie Policy applies to ryzolve.com and does not replace the policies of those separate platforms.',
      ],
    },
    {
      id: 'cookie-duration',
      heading: 'Cookie Duration',
      body: [
        'Some cookies last only while your browser is open; these are often called session cookies. Others remain for a set period or until you delete them; these are often called persistent cookies. The duration depends on the provider and the purpose of the technology.',
      ],
    },
    {
      id: 'browser-controls',
      heading: 'Browser Controls',
      body: [
        'Most browsers let you review, delete, or block cookies through their settings. You can usually find these options in your browser’s privacy or security controls. If you block cookies or similar technologies, some site features, including security checks, chat, and scheduling, may not function as expected.',
      ],
    },
    {
      id: 'consent-and-withdrawal',
      heading: 'Consent and Withdrawal',
      body: [
        'Where consent is required for non-essential cookies, we will provide an appropriate choice mechanism. You can also withdraw or adjust cookie choices through available site controls, where offered, and through your browser settings. Essential security technologies may still be necessary to operate the site.',
      ],
    },
    {
      id: 'third-party-policies',
      heading: 'Third-Party Policies',
      body: [
        'For more information about third-party technologies, review the applicable provider policies, including Cloudflare, Calendly, Tawk.to, and Google. Provider practices may change, so their own policies are the best source for current details.',
      ],
    },
    {
      id: 'changes-and-contact',
      heading: 'Changes and Contact',
      body: [
        'We may update this Cookie Policy as our technologies or practices change. We will post the updated version on this page and revise the last-updated date.',
        'For questions about cookies or this policy, contact Ryzolve LLC at pas@ryzolve.com or 9309 Highway 75 S, New Waverly, TX 77358.',
      ],
    },
  ],
};

export const legalPolicies = [privacyPolicy, termsPolicy, cookiesPolicy] as const;
