import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';

@Component({
  selector: 'app-teacher-course-list',
  templateUrl: './teacher-course-list.page.html',
  styleUrls: ['./teacher-course-list.page.scss'],
})
export class TeacherCourseListPage extends BasePage implements OnInit {
  pageTitle = 'Courses by';
  params;
  teacher_id;
  user;
  list: any [] = []
  constructor(injector: Injector, public globalCourses: GlobalCoursesService) {
    super(injector);
  }

  ngOnInit() {
    this.params = this.nav.getQueryParams();
    console.log(this.params);

    if (this.params.user) {
      this.user = JSON.parse(this.params.user);
      this.pageTitle = `Courses by ${this.user.name}`;
      this.teacher_id = this.user.id;
      this.callApi();
    }
  }

  async callApi() {
    let obj = {
      user_id: this.teacher_id,
    };
    console.log(obj);

    let res = await this.network.getTeacherCourses(obj);
    this.list = res.result.data;
  }
}
