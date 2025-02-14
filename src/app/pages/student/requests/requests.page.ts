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
  search=  '';
  last_page = -1;
  page = 1;
  constructor(injector: Injector) {
    super(injector);
  }

  ionViewWillEnter() {
    this.initialize();
  }
  initialize(){
    this.loadResolvers();
    this.user = this.dataR.user;
    this.callApi();

  }

  async callApi() {
    return new Promise(async (resolve) => {
      let obj = {
        search: this.search,
        page: this.page,
      };
      let res = await this.network.getAllReqCourses(this.user.id, obj);
      let d = res.result;
      this.pageTitle = `My Requests (${res.result.total})`;
      this.page = d.current_page;
      if (this.page == 1) {
        this.list = d['data'];
      } else {
        this.list = [...this.list, ...d['data']];
      }

      resolve(true);
    });
  }

  async refreshPage(event) {
    this.search = '';
    this.page = 1;
    await this.callApi();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  async loadMore($event) {
    return new Promise(async (resolve) => {
      if (this.page < this.last_page) {
        this.page = this.page + 1;
        await this.callApi();
      }
      $event.target.complete();
      resolve(true);
    });
  }

  openDetails(item: any) {
    this.nav.push('./student-course-detail', { course_id: item.id });
  }
}
