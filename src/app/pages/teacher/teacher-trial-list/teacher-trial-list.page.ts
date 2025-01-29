import { Component, Injector, OnInit } from '@angular/core';
import { ListPage } from 'src/app/base-page/list-page';
import { ListTrialsService } from 'src/app/services/teacher/list-trials.service';

@Component({
  selector: 'app-teacher-trial-list',
  templateUrl: './teacher-trial-list.page.html',
  styleUrls: ['./teacher-trial-list.page.scss'],
})
export class TeacherTrialListPage extends ListPage implements OnInit  { // implements OnInit

  user;  
  list$: any[] = []; // List of items


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

  /**
   * Implementation of fetchList from the abstract base class.
   */
  async fetchList(page: number, search: string, status: string): Promise<{ list: any[]; page: number; last_page: number; total: number }> {
    const res = await this.listTrialsService.getTrials(page, search, status);
    return {
      list: res.result.data,
      page: res.result.current_page,
      last_page: res.result.last_page,
      total: res.result.total
    };
  }

  changeStatus($event){
    let obj = Object.assign({}, $event);    
    this.listTrialsService.changeStatus(obj, obj['trialId']);
  }
  

}
