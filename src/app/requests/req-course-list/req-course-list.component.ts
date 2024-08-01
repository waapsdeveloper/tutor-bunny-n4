import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-req-course-list',
  templateUrl: './req-course-list.component.html',
  styleUrls: ['./req-course-list.component.scss'],
})
export class ReqCourseListComponent extends BasePage implements OnInit {

  list;
  constructor(injector: Injector) {
    super(injector)
    this.callApi()
  }

  ngOnInit() { }

  async callApi() {
    let user = this.users.getUser()
    console.log(user);

    let res = await this.network.getAllReqCourses(user.id);
    this.list = res.result.data;
    console.log(this.list);
    
    
  }

}
