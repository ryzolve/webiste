import type { GetServerSideProps } from 'next';

import { TrainingCourseDetailPage } from 'redesign/site';
import {
  fetchAdministratorCourseBySlug,
  type TrainingCourseCard,
} from 'redesign/training-courses';

type TrainingCourseRouteProps = {
  course: TrainingCourseCard;
};

export default function TrainingCourseRoute({ course }: TrainingCourseRouteProps) {
  return <TrainingCourseDetailPage course={course} />;
}

export const getServerSideProps: GetServerSideProps<TrainingCourseRouteProps> = async (context) => {
  const slug = typeof context.params?.slug === 'string' ? context.params.slug : '';
  const course = await fetchAdministratorCourseBySlug(slug);

  if (!course) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      course,
    },
  };
};
