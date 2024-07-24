import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-my-students',
  templateUrl: './my-students.page.html',
  styleUrls: ['./my-students.page.scss'],
})
export class MyStudentsPage extends BasePage implements OnInit {

  user;
  page = 1;
  last_page = -1;
  list: any[] = [];
  status;
  search;

  constructor(injector: Injector) {
    super(injector);
    this.getTrials('', 1);
  }

  ngOnInit() { }

  doSearch($event) {
    this.getTrials(this.search, 1)
  }

  async getTrials(search = '', page = 1) {

    return new Promise(async resolve => {

      this.user = this.users.getUser();

      let obj = {
        search: search,
        page: page
      }

      if (this.status) {
        obj['status'] = this.status
      }

      const res = await this.network.geTrailRequests(obj, this.user.id);
      const result = res.result;
      this.page = result.current_page;
      this.last_page = result.last_page;
      if (this.page == 1) {
        this.list = result["data"];
      } else {
        this.list = [...this.list, ...result["data"]]
      }

      resolve(true)

    })

    // this.list = res.trials;

  }

  removeFromList(id) {
    this.getTrials('', 1);

  }

  filterByStatus(status = '') {
    this.status = status;
    this.getTrials(this.search, 1)
  }

  async handleRefresh(event) {

    this.status = null;
    this.page = 1;
    this.search = '';
    await this.getTrials('', 1)

    setTimeout(() => {

      event.target.complete();
    }, 500);
  }

  async onIonInfinite(ev) {

    if (this.last_page > this.page) {
      await this.getTrials(this.search, this.page + 1)
    }

    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

}
