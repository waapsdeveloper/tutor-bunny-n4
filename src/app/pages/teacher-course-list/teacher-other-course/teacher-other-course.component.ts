import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';

@Component({
  selector: 'app-teacher-other-course',
  templateUrl: './teacher-other-course.component.html',
  styleUrls: ['./teacher-other-course.component.scss'],
})
export class TeacherOtherCourseComponent extends BasePage implements OnInit {
  params;
  teacher_id;
  list;
  total_rating;
  rating;
  constructor(public globalCourses: GlobalCoursesService, injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.params = this.nav.getQueryParams();
    if (this.params.user_id) {
      this.teacher_id = this.params.user_id;
    }
    this.callApi();
  }

  async callApi() {
    let obj = {
      user_id: this.teacher_id,
    };
    let res = await this.network.getTeacherCourses(obj);
    this.list = res.result.data;
  }
}
