import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-req-course-list',
  templateUrl: './req-course-list.component.html',
  styleUrls: ['./req-course-list.component.scss'],
})
export class ReqCourseListComponent extends BasePage implements OnInit {

  list;
  @Output('number') number: EventEmitter<any> = new EventEmitter<any>();

  constructor(injector: Injector) {
    super(injector)
    this.callApi()
  }

  ngOnInit() { }

  async callApi() {
    let user = this.users.getUser()

    let res = await this.network.getAllReqCourses(user.id, );
    this.list = res.result.data;
    this.number.emit(res.result.total);

  }

  async refreshPage(event) {


    let user = this.users.getUser()


    let res = await this.network.getAllReqCourses(user.id, );
    this.number.emit(res.result.total);

    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

}
