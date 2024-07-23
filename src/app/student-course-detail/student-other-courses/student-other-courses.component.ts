import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-student-other-courses',
  templateUrl: './student-other-courses.component.html',
  styleUrls: ['./student-other-courses.component.scss'],
})
export class StudentOtherCoursesComponent extends BasePage implements OnInit {

  private _data: any;

  list;
  count;
  user

  page: number = 1;
  last_page = -1;
  constructor(injector: Injector) {
    super(injector)

  }

  ngOnInit() {

    this.events.subscribe('data-for-other-corses', (data: any) => {
      this.user = data.user;
      console.log(this.user, "fsdsdfsdf");
      this.initialize()
    }
    )

  }
  async initialize() {
    console.log("saddsa");

    this.getCourses();
  }

  getCourses() {
    return new Promise(async resolve => {
      // return

      let obj = {
        user_id: this.user.id
      };

      const res = await this.network.getOtherCourseList(obj) as any;
      console.log(res);
      const data = res.result;
      this.page = data.current_page;
      this.last_page = data.last_page;

      this.count = res.result.total

      resolve(true);
    });
  }
  seeAll() {
    this.nav.pop('/tabs/student-dashboard')
  }

}
