import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';

@Component({
  selector: 'app-teacher-course-list',
  templateUrl: './teacher-course-list.page.html',
  styleUrls: ['./teacher-course-list.page.scss'],
})
export class TeacherCourseListPage extends BasePage implements OnInit {

  pageTitle = 'Courses by'
  params
  user

  constructor(injector:Injector, public globalCourses: GlobalCoursesService) {
    super(injector)
   }

  ngOnInit() {
    this.params = this.nav.getQueryParams();
    if (this.params.user) {
      this.user = JSON.parse(this.params.user)
      this.pageTitle = `My Courses ${this.user.name}`;
    }
  }


  async callApi() {

  }

}
