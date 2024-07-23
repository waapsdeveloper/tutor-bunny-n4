import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent extends BasePage implements OnInit {


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

  async oepnDeatils(item) {

    const params = {
      id: item.id,
      backUrl: '/tabs/student-dashboard'
    }
    let res = await this.nav.push('student-course-detail', params)

  }

}
