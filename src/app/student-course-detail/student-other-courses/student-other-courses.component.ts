import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-student-other-courses',
  templateUrl: './student-other-courses.component.html',
  styleUrls: ['./student-other-courses.component.scss'],
})
export class StudentOtherCoursesComponent extends BasePage implements OnInit {


  list;
  count;
  page: number = 1;
  last_page = -1;
  constructor(injector: Injector) {
    super(injector)
    this.initialize()
  }

  ngOnInit() { }
  async initialize() {
    this.getCourses('', 1);
  }

  getCourses(search = '', page = 1, liked = false) {
    return new Promise(async resolve => {
      let obj = {
        search: search,
        page: page,
        liked: liked
      };

      const res = await this.network.getAllCourses(obj) as any;
      console.log(res);
      const data = res.result;
      this.page = data.current_page;
      this.last_page = data.last_page;

      if (page === 1) {
        this.list = data.data;
        this.count = data.total;
      } else {
        this.list = [...this.list, ...data.data];
      }
      resolve(true);
    });
  }
  seeAll(){
    this.nav.pop('/tabs/student-dashboard')
  }

}
