import { training } from './content';

export type TrainingCourseCard = {
  slug: string;
  hours: string;
  hoursNum: number;
  tier: string;
  price: string;
  priceNum: number;
  title: string;
  description: string;
  short: string;
  audienceShort: string;
  eyebrow: string;
  tagline: string;
  featured?: boolean;
  approvedFor: string[];
  learningOutcomes?: string[];
  skills?: string[];
  thumbnailUrl?: string;
  href?: string;
};

type PublicCourse = {
  id?: number | string;
  slug?: string;
  title?: string;
  description?: string;
  durationMinutes?: number | string;
  priceCents?: number | string;
  currency?: string;
  learningOutcomes?: unknown;
  skills?: unknown;
  thumbnailUrl?: string;
};

const ADMIN_COURSES_PATH = '/public/courses?limit=100';
const ADMIN_COURSE_DETAIL_PATH = '/public/courses';

export function trainingBaseUrl() {
  return (process.env.NEXT_PUBLIC_RYZOLVE_TRAINING || 'https://learn.ryzolve.app').replace(/\/$/, '');
}

export function agencyTrainingBaseUrl() {
  return (process.env.NEXT_PUBLIC_RYZOLVE_AGENCY || 'https://agency.ryzolve.app').replace(/\/$/, '');
}

export function agencyInServiceSignupHref() {
  return `${agencyTrainingBaseUrl()}/auth/register`;
}

export function trainingCourseDetailHref(slug: string) {
  return `/training/${encodeURIComponent(slug)}`;
}

export function trainingCoursePurchaseHref(slug: string) {
  const base = trainingBaseUrl();
  if (!slug) return `${base}/auth/register`;

  const redirectTarget = `/courses/${encodeURIComponent(slug)}?auto=1`;
  return `${base}/auth/register?redirect=${encodeURIComponent(redirectTarget)}`;
}

function coursesApiBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_RYZOLVE_COURSES_API ||
    process.env.NEXT_PUBLIC_API_URL ||
    'https://api.ryzolve.app'
  ).replace(/\/$/, '');
}

export function fallbackAdministratorCourses(): TrainingCourseCard[] {
  return training.courses.map((course) => ({ ...course }));
}

function cleanText(value: unknown) {
  return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '';
}

function toNumber(value: unknown) {
  const n = typeof value === 'string' ? Number(value) : value;
  return typeof n === 'number' && Number.isFinite(n) ? n : 0;
}

function cleanList(value: unknown) {
  return Array.isArray(value) ? value.map(cleanText).filter(Boolean) : [];
}

function courseImageUrl(value: unknown) {
  const url = cleanText(value);
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  return `${trainingBaseUrl()}${url.startsWith('/') ? '' : '/'}${url}`;
}

function hoursFromCourse(item: PublicCourse) {
  const text = `${item.title || ''} ${item.description || ''}`;
  const match = text.match(/(\d+(?:\.\d+)?)\s*(?:clock\s*)?(?:hours?|hrs?|h)\b/i);
  if (match) return toNumber(match[1]);

  const duration = toNumber(item.durationMinutes);
  if (!duration) return 0;
  return duration > 24 ? Math.round((duration / 60) * 10) / 10 : duration;
}

function priceFromCents(value: unknown) {
  const raw = toNumber(value);
  const dollars = raw > 999 ? raw / 100 : raw;
  const price = Number.isInteger(dollars) ? `$${dollars}` : `$${dollars.toFixed(2)}`;
  return { price, priceNum: dollars };
}

function metaForCourse(item: PublicCourse, hoursNum: number) {
  const text = `${item.slug || ''} ${item.title || ''} ${item.description || ''}`.toLowerCase();

  if (hoursNum === 8 || text.includes('initial')) {
    return {
      audienceShort: 'First-time',
      eyebrow: 'Administrator training',
      tagline: 'First-Time Administrator Training',
      featured: false,
    };
  }

  if (hoursNum === 12 || text.includes('existing') || text.includes('continuing')) {
    return {
      audienceShort: 'Renewal',
      eyebrow: 'Administrator training',
      tagline: 'Renewal Training',
      featured: true,
    };
  }

  if (hoursNum === 16 || text.includes('new administrators')) {
    return {
      audienceShort: 'New admins',
      eyebrow: 'Administrator training',
      tagline: 'New-Admin Onboarding',
      featured: false,
    };
  }

  return {
    audienceShort: 'Administrator',
    eyebrow: 'Administrator course',
    tagline: cleanText(item.title) || 'Administrator Training',
    featured: false,
  };
}

export function normalisePublicCourse(item: PublicCourse): TrainingCourseCard | null {
  const slug = cleanText(item.slug || item.id);
  const hoursNum = hoursFromCourse(item);
  const title = cleanText(item.title);
  const description = cleanText(item.description);

  if (!slug || !title || !hoursNum) return null;

  const fallback = training.courses.find((course) => course.hoursNum === hoursNum) || training.courses[0];
  const { price, priceNum } = priceFromCents(item.priceCents || fallback.priceNum);
  const meta = metaForCourse(item, hoursNum);

  return {
    slug,
    hours: `${hoursNum} Hrs`,
    hoursNum,
    tier: fallback.tier,
    price,
    priceNum,
    title,
    description,
    short: description || fallback.short,
    audienceShort: meta.audienceShort,
    eyebrow: meta.eyebrow,
    tagline: meta.tagline,
    featured: meta.featured,
    approvedFor: fallback.approvedFor,
    learningOutcomes: cleanList(item.learningOutcomes),
    skills: cleanList(item.skills),
    thumbnailUrl: courseImageUrl(item.thumbnailUrl),
    href: trainingCoursePurchaseHref(slug),
  };
}

export async function fetchAdministratorCourses(): Promise<TrainingCourseCard[]> {
  try {
    const response = await fetch(`${coursesApiBaseUrl()}${ADMIN_COURSES_PATH}`, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Course API returned ${response.status}`);
    }

    const json = await response.json();
    const items = Array.isArray(json?.data?.items) ? json.data.items : [];
    const courses = items
      .map((item: PublicCourse) => normalisePublicCourse(item))
      .filter((course: TrainingCourseCard | null): course is TrainingCourseCard => Boolean(course))
      .sort((a: TrainingCourseCard, b: TrainingCourseCard) => a.hoursNum - b.hoursNum);

    return courses.length ? courses : fallbackAdministratorCourses();
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Unable to fetch administrator courses, using local fallback.', error);
    }
    return fallbackAdministratorCourses();
  }
}

export async function fetchAdministratorCourseBySlug(
  slug: string
): Promise<TrainingCourseCard | null> {
  const cleanSlug = cleanText(slug);
  if (!cleanSlug) return null;

  try {
    const response = await fetch(
      `${coursesApiBaseUrl()}${ADMIN_COURSE_DETAIL_PATH}/${encodeURIComponent(slug)}`,
      {
        cache: 'no-store',
        headers: { Accept: 'application/json' },
      }
    );

    if (!response.ok) {
      throw new Error(`Course detail API returned ${response.status}`);
    }

    const json = await response.json();
    const item = json?.data?.course;
    const packageData = json?.data?.package;
    const course = normalisePublicCourse({
      ...item,
      priceCents: packageData?.priceCents ?? item?.priceCents,
      currency: packageData?.currency ?? item?.currency,
    });

    if (course) return course;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Unable to fetch administrator course detail, using local fallback.', error);
    }
  }

  const courses = await fetchAdministratorCourses();
  return (
    courses.find((course) => course.slug === cleanSlug) ||
    fallbackAdministratorCourses().find((course) => course.slug === cleanSlug) ||
    null
  );
}
