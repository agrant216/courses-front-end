import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/courses.actions'
export interface CourseEntity {
  id: string;
  title: string;
  description?: string;
  numberOfDays: number;
  type: string;
}

export interface CourseCatalogState extends EntityState<CourseEntity> {
  selectedCourse: CourseEntity | null
}

export const adapter = createEntityAdapter<CourseEntity>();

const initialState: CourseCatalogState = adapter.getInitialState({
  selectedCourse: null
});

const reducerFunction = createReducer(
  initialState,
  on(actions.courseDayCountAdjusted, (s, a) => adapter.updateOne({
    id: a.course.id, changes: {
      numberOfDays: a.newNumberOfPages
    }
  }, s)),
  on(actions.selectedCourseSet, (s, a) => ({ ...s, selectedCourse: a.payload })),
  on(actions.LoadCourses, () => initialState),
  on(actions.LoadCoursesCompleted, (s, a) => adapter.setMany(a.payload, s))
);

export function reducer(state: CourseCatalogState = initialState, action: Action): CourseCatalogState {
  return reducerFunction(state, action);
}



