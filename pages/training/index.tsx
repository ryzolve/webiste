import type { GetServerSideProps } from 'next';

import { TrainingPage } from 'redesign/site';
import {
  fetchAdministratorCourses,
  type TrainingCourseCard,
} from 'redesign/training-courses';

type TrainingRouteProps = {
  adminCourses: TrainingCourseCard[];
};

export default function TrainingRoute({ adminCourses }: TrainingRouteProps) {
  return <TrainingPage adminCourses={adminCourses} />;
}

export const getServerSideProps: GetServerSideProps<TrainingRouteProps> = async () => {
  const adminCourses = await fetchAdministratorCourses();

  return {
    props: {
      adminCourses,
    },
  };
};
