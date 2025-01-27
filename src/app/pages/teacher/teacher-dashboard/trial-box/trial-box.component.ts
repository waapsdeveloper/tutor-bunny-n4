import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { PendingTrialsService } from 'src/app/services/teacher/pending-trials.service';

@Component({
  selector: 'app-trial-box',
  templateUrl: './trial-box.component.html',
  styleUrls: ['./trial-box.component.scss'],
})
export class TrialBoxComponent extends BasePage { //  implements OnInit
  
  list$;
  count$;

  constructor(injector: Injector, private pendingTrialsService: PendingTrialsService) {
    super(injector)
  }

  ngOnInit() {

    // this.user = this.users.getUser();
    this.pendingTrialsService.getList().subscribe((data) => {
      this.list$ = data;
    });

    this.pendingTrialsService.getCount().subscribe((data) => {
      this.count$ = data;
    });

  };

  goToTrialReq() {
    this.nav.push('teacher-trial-list')
  }

  goToDeatil(item) {    
    const params = {
      id: item.course.id,
      backUrl: '/tabs/teacher-dashboard',
    };
    this.nav.push('/course-detail', params);
  }

}
