import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { PendingTrialsService } from 'src/app/services/pending-trials.service';

@Component({
  selector: 'app-trial-box',
  templateUrl: './trial-box.component.html',
  styleUrls: ['./trial-box.component.scss'],
})
export class TrialBoxComponent extends BasePage { //  implements OnInit
  // user;
  // trial;
  // student;
  // trailCount;
  // country;
  // age;
  // courseName;
  // image = 'assets/profileimg.png'
  // city;
  list$;
  count$;
  // flag;
  // newTrial;
  // serial_number;






  constructor(injector: Injector, public pendingTrialsService: PendingTrialsService) {
    super(injector)
  }
  ngOnInit() {

    // this.user = this.users.getUser();
    this.pendingTrialsService.getList().subscribe((data) => {
      this.list$ = data;
      console.log(data);
    });

    this.pendingTrialsService.getCount().subscribe((data) => {
      this.count$ = data;
    });

  };

  // async updateTrailsList(data: any) {
  //   let trail_Id = data.id;
  //   this.initialize();
  //   this.newTrial = await this.network.geTrailRequestsByPusher(trail_Id);
  //   if (this.newTrial) {
  //     const index = this.trial.findIndex(c => c.id === this.newTrial.id);
  //     if (index !== -1) {
  //       this.list[index] = this.newTrial;

  //     } else {
  //       this.list = [this.newTrial, ...this.trial];
  //     }
  //   }
  // }
  async initialize() {
    // this.globalTrials.getPendingTrials();
  }

  goToTrialReq() {
    this.nav.push('my-students')
  }

}
