import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
})
export class RequestsPage extends BasePage {
  pageTitle = 'My Requests';
  user;
  list: any[] = [];
  constructor(injector: Injector) {
    super(injector);
    this.callApi();
  }

  async callApi() {
    let user = this.users.getUser();
    let res = await this.network.getAllReqCourses(user.id);
    this.list = res.result.data;
    console.log(this.list, "hgjsaefhgkjdfghkjcgjkfdjghkfdsjghfsdhgkjfdsjghksdfhgjkfds");

    this.pageTitle = `My Requests (${res.result.total})`;
  }

  async refreshPage(event) {
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }
}
