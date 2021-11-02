import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoadCourses, selectedCourseSet } from 'src/app/actions/courses.actions';
import { AppState, selectCoursesArray } from 'src/app/reducers';
import { CourseEntity } from 'src/app/reducers/course-catalog.reducers';

@Component({
  selector: 'app-course-catalog',
  templateUrl: './course-catalog.component.html',
  styleUrls: ['./course-catalog.component.css']
})
export class CourseCatalogComponent implements OnInit {


  constructor(private store: Store<AppState>) {
    store.dispatch(LoadCourses());
  }

  courses$!: Observable<CourseEntity[]>;
  ngOnInit(): void {
    this.courses$ = this.store.select(selectCoursesArray);
  }

  setSelectedCourse(payload: CourseEntity) {
    this.store.dispatch(selectedCourseSet({ payload }));
  }

}
