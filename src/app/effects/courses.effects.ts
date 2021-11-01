import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import * as actions from '../actions/courses.actions';
import { CourseEntity } from "../reducers/course-catalog.reducers";

@Injectable()
export class CoursesEffects {

  // loadCourses => loadCoursesCompleted | loadCoursesFailed
  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.LoadCourses),
      mergeMap(() => this.client.get<{ data: CourseEntity[] }>('https://localhost/itu/courses/course-catalog')
        .pipe(
          map(response => response.data),
          map(payload => actions.LoadCoursesCompleted({ payload })),
          catchError(() => of(actions.LoadCoursesFailed({ payload: 'Could Not Load The Courses' })))
        )
      )
    )



  );



  constructor(private actions$: Actions, private client: HttpClient) { }
}
