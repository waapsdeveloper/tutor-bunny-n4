import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss'],
})
export class MyCoursesComponent extends BasePage implements OnInit {
  user;
  search = '';
  page = 1;
  last_page = -1;
  list: any[] = [];
  count;
  course;
  status;
  categoryId;
  constructor(injector: Injector) {
    super(injector)
    this.getCourses()
  }

  ngOnInit() { }

  async getCourses(search = '', page = 1) {

    return new Promise(async resolve => {
      let obj = {
        search: search,
        page: page
      }

      if (this.categoryId) {
        obj['category_id'] = this.categoryId
      }


      const res = this.categoryId ? await this.network.getOtherCourseList(obj) as any : await this.network.getMyCourseList(obj) as any;
      console.log(res)
      const result = res.result;
      this.count = res.result.total
      this.page = result.current_page;
      this.last_page = result.last_page;
      if (this.page == 1) {
        this.list = result["data"];
      } else {
        this.list = [...this.list, ...result["data"]]
      }

      resolve(true)
    })


  }
}
