import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';
import { GlobalCoursesService } from '../services/global-courses.service';

@Component({
  selector: 'app-teacher-course-list',
  templateUrl: './teacher-course-list.page.html',
  styleUrls: ['./teacher-course-list.page.scss'],
})
export class TeacherCourseListPage extends BasePage implements OnInit {

  pageTitle = 'Courses by'

  constructor(injector:Injector, public globalCourses: GlobalCoursesService) {
    super(injector)
   }

  ngOnInit() {
    console.log();
  }


  async callApi() {

  }

}
