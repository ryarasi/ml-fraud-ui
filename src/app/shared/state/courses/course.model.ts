import { COURSES } from 'src/app/pages/static/dashboard/dashboard.component';
import {
  FetchPolicy,
  Course,
  FetchParams,
  startingFetchParams,
} from '../../common/models';
import { uiroutes } from '../../common/ui-routes';

export const emptyCourseFormRecord: Course = {
  id: null,
  title: null,
  description: null,
  instructor: null,
  institutions: [],
};
export interface CourseStateModel {
  courses: Course[];
  lastPage: number;
  coursesSubscribed: boolean;
  fetchPolicy: FetchPolicy;
  fetchParamss: FetchParams[];
  courseFormId: number;
  courseFormRecord: Course;
  isFetching: boolean;
  errorFetching: boolean;
  formSubmitting: boolean;
  errorSubmitting: boolean;
}

export const defaultCourseState: CourseStateModel = {
  courses: [],
  lastPage: null,
  coursesSubscribed: false,
  fetchPolicy: null,
  fetchParamss: [],
  courseFormId: null,
  courseFormRecord: emptyCourseFormRecord,
  isFetching: false,
  errorFetching: false,
  formSubmitting: false,
  errorSubmitting: false,
};

export const CourseFormCloseURL =
  uiroutes.DASHBOARD_ROUTE.route + '?tab=' + COURSES;
