import { createAction, props } from '@ngrx/store';
import { CourseEntity } from '../reducers/course-catalog.reducers';

export const LoadCourses = createAction(
  '[courses] load the courses'
);

export const LoadCoursesCompleted = createAction(
  '[courses] load courses completed',
  props<{ payload: CourseEntity[] }>()
);

export const LoadCoursesFailed = createAction(
  '[courses] loading the courses failed',
  props<{ payload: string }>()
);

export const selectedCourseSet = createAction(
  '[courses] selected course set',
  props<{ payload: CourseEntity }>()
);

export const courseDayCountAdjusted = createAction(
  '[courses] course day count adjusted',
  props<{ course: CourseEntity, newNumberOfPages: number }>()
);
