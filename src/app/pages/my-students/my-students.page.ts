import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { GlobalTrialsService } from 'src/app/services/global-trials.service';

@Component({
  selector: 'app-my-students',
  templateUrl: './my-students.page.html',
  styleUrls: ['./my-students.page.scss'],
})
export class MyStudentsPage extends BasePage  { // implements OnInit

  user;
  search;

  constructor(injector: Injector, public globalTrials: GlobalTrialsService) {
    super(injector);
    this.globalTrials.getTrials('', 1);
  }

  // ngOnInit() { }

  doSearch($event) {
    this.globalTrials.getTrials(this.search, 1)
  }



  filterByStatus(status = '') {
    this.globalTrials.status = status;
    this.globalTrials.getTrials(this.search, 1)
  }

  async handleRefresh(event) {

    this.globalTrials.status = null;
    this.globalTrials.page = 1;
    this.search = '';
    await this.globalTrials.getTrials('', 1)

    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  async onIonInfinite(ev) {

    if (this.globalTrials.last_page > this.globalTrials.page) {
      await this.globalTrials.getTrials(this.search, this.globalTrials.page + 1)
    }

    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

}
