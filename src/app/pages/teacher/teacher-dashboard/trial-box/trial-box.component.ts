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
  filteredList$;
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

  checkNumberOfPendings(data) {
    console.log('inside trial box  ', data);
    this.filteredList$ = data.filter((element) => element.status === 'Pending');
    console.log('Filtered List', this.filteredList$);
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
