import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import * as actions from '../actions/courses.actions';
import { CourseEntity } from "../reducers/course-catalog.reducers";
import { environment } from '../../environments/environment'
import { Router } from "@angular/router";

@Injectable()
export class CoursesEffects {

  readonly baseUrl = environment.apiUrl;

  editSelectedCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.selectedCourseSet),
      /* navigate to the course edit thing */
      map(a => a.payload.id),
      tap((id) => this.router.navigate(['..', 'course', 'edit', id]))
    ), { dispatch: false });

  // loadCourses => loadCoursesCompleted | loadCoursesFailed
  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.LoadCourses),
      mergeMap(() => this.client.get<{ data: CourseEntity[] }>(this.baseUrl + 'itu/courses/course-catalog')
        .pipe(
          map(response => response.data),
          map(payload => actions.LoadCoursesCompleted({ payload })),
          catchError(() => of(actions.LoadCoursesFailed({ payload: 'Could Not Load The Courses' })))
        )
      )
    )



  );



  constructor(private actions$: Actions, private client: HttpClient, private router: Router) { }
}
