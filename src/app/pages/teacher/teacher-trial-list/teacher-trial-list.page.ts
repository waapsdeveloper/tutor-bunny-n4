import { Component, Injector, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';
import { GlobalTrialsService } from 'src/app/services/global-trials.service';
import { ListTrialsService } from 'src/app/services/teacher/list-trials.service';

@Component({
  selector: 'app-teacher-trial-list',
  templateUrl: './teacher-trial-list.page.html',
  styleUrls: ['./teacher-trial-list.page.scss'],
})
export class TeacherTrialListPage extends BasePage implements OnInit  { // implements OnInit

  user;
  search: string = ''; // Search query
  status: string = ''; // Optional filter for status
  page: number = 1; // Current page
  last_page: number = -1; // Last page
  list$: any[] = []; // List of items
  loading: boolean = false; // Loading state
  infiniteScrollDisabled: boolean = false; // Disable infinite scroll when no more data



  constructor(injector: Injector, public listTrialsService: ListTrialsService) {
    super(injector);    

    this.listTrialsService.getList().subscribe(async (data) => {
      this.list$ = data;
      const stat = await this.listTrialsService.getStatPromise() as any;
      console.log(stat)
      this.page = stat.page;
      this.last_page = stat.last_page;
    });
    
  }

  ngOnInit() {
    this.resetAndFetch();

  }

  resetAndFetch() {

    this.page = 1;
    this.last_page = -1;
    this.infiniteScrollDisabled = false;
    this.getList();
  }

  async getList(page = 1, search = '', status = '') {    

    this.loading = true;
    const res = await this.listTrialsService.getTrials(page, search, status);
    console.log('trials', res);
    let data = res.result;
    this.page = data.current_page;
    this.last_page = data.last_page;

    console.log(this.last_page, this.page)
    this.loading = false;
  }

  doSearch($event) {
    this.getList(1, this.search, this.status);
  }

  filterByStatus(status = '') {
    this.status = status;
    this.getList(1, this.search, this.status);
  }

  async handleRefresh(event) {
    this.resetAndFetch();

    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  async onIonInfinite(ev) {

    if(this.loading == true){
      (ev as InfiniteScrollCustomEvent).target.complete();
      return;
    }

    console.log(this.last_page, this.page)

    if (this.last_page !== -1 && this.page < this.last_page) {

      console.log("erf")

      await this.getList(this.page + 1, this.search, this.status);
    }
    
    (ev as InfiniteScrollCustomEvent).target.complete();
    
  }

}
