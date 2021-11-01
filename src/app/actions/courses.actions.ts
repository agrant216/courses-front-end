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
