import { createSelector } from "@ngrx/store";
import * as fromCourses from "./course-catalog.reducers";

export interface AppState {
  courses: fromCourses.CourseCatalogState
}

export const reducers = {
  courses: fromCourses.reducer
}

const selectCourses = (state: AppState) => state.courses;

export const selectCoursesArray = fromCourses.adapter.getSelectors(selectCourses).selectAll;

export const selectHasSelectedCourse = createSelector(
  selectCourses,
  c => !!c.selectedCourse
)


export const selectSelectedCourse = createSelector(
  selectCourses,
  c => c.selectedCourse
)
