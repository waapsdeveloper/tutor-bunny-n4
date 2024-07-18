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
      } else {
        this.list = [...this.list, ...data.data];
      }
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
