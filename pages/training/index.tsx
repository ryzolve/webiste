import type { GetServerSideProps } from 'next';

import { TrainingPage } from 'redesign/site';
import {
  fetchAdministratorCourses,
  fetchInServicePlans,
  type InServicePlanCard,
  type TrainingCourseCard,
} from 'redesign/training-courses';

type TrainingRouteProps = {
  adminCourses: TrainingCourseCard[];
  inServicePlans: InServicePlanCard[];
};

export default function TrainingRoute({ adminCourses, inServicePlans }: TrainingRouteProps) {
  return <TrainingPage adminCourses={adminCourses} inServicePlans={inServicePlans} />;
}

export const getServerSideProps: GetServerSideProps<TrainingRouteProps> = async () => {
  const [adminCourses, inServicePlans] = await Promise.all([
    fetchAdministratorCourses(),
    fetchInServicePlans(),
  ]);

  return {
    props: {
      adminCourses,
      inServicePlans,
    },
  };
};
