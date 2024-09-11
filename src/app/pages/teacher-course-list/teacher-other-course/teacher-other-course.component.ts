import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';

@Component({
  selector: 'app-teacher-other-course',
  templateUrl: './teacher-other-course.component.html',
  styleUrls: ['./teacher-other-course.component.scss'],
})
export class TeacherOtherCourseComponent extends BasePage  implements OnInit {

  constructor(public globalCourses: GlobalCoursesService, injector: Injector) {
    super(injector)
   }

  ngOnInit() {}

}
