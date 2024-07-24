import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-student-other-courses',
  templateUrl: './student-other-courses.component.html',
  styleUrls: ['./student-other-courses.component.scss'],
})
export class StudentOtherCoursesComponent extends BasePage implements OnInit {


  list;
  count;
  user

  page: number = 1;
  last_page = -1;
  data: any;
  constructor(injector: Injector) {
    super(injector)

  }

  ngOnInit() {

  }


  async initialize() {

  }
  getListData(data) {
    this.count = data.total;


  }

  seeAll() {
    this.nav.pop('/tabs/student-dashboard')
  }

}
