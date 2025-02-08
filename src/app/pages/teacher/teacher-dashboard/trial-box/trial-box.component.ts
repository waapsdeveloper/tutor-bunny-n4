import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { ListTrialsService } from 'src/app/services/teacher/list-trials.service';

@Component({
  selector: 'app-trial-box',
  templateUrl: './trial-box.component.html',
  styleUrls: ['./trial-box.component.scss'],
})
export class TrialBoxComponent extends BasePage implements OnInit {
  //  implements OnInit

  list$;
  filteredList$: any = [];
  count$;
  pendingTrialsCount$;

  constructor(
    injector: Injector,
    private listTrialsService: ListTrialsService
  ) {
    super(injector);
  }

  async ngOnInit() {
    // this.user = this.users.getUser();
    await this.listTrialsService.getList().subscribe((data) => {
      this.list$ = data;
      console.log('this is my list ', this.list$);
      this.checkNumberOfPendings(this.list$);
    });

    // this.listTrialsService.getCount().subscribe((data) => {
    //   this.count$ = data;
    // });
  }

  async checkNumberOfPendings(data) {
    const flist = data.filter((element) => element.status === 'Pending');

    const ids = flist.map((element) => element.id);

    const d = await this.listTrialsService.getTrialsByIds({
      ids: ids,
    }) as any

    console.log('Filtered List', d.trials);
    if(d.trials){
      this.filteredList$ = d.trials;
    }
  }

  goToTrialReq() {
    this.nav.push('teacher-trial-list');
  }

  goToDeatil(item) {
    const params = {
      id: item.course.id,
      backUrl: '/tabs/teacher-dashboard',
    };
    this.nav.push('/course-detail', params);
  }
}
