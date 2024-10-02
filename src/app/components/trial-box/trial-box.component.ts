import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { GlobalTrialsService } from 'src/app/services/global-trials.service';

@Component({
  selector: 'app-trial-box',
  templateUrl: './trial-box.component.html',
  styleUrls: ['./trial-box.component.scss'],
})
export class TrialBoxComponent extends BasePage { //  implements OnInit
  user;
  trial;
  student;
  trailCount;
  country;
  age;
  courseName;
  image = 'assets/profileimg.png'
  city;
  list;
  flag;
  newTrial;
  serial_number;
  constructor(injector: Injector, public globalTrials: GlobalTrialsService) {
    super(injector)
  }
  ngOnInit() {

    this.user = this.users.getUser();
  };

  async updateTrailsList(data: any) {
    let trail_Id = data.id;
    this.initialize();
    this.newTrial = await this.network.geTrailRequestsByPusher(trail_Id);
    if (this.newTrial) {
      const index = this.trial.findIndex(c => c.id === this.newTrial.id);
      if (index !== -1) {
        this.list[index] = this.newTrial;

      } else {
        this.list = [this.newTrial, ...this.trial];

      }
    }
  }
  async initialize() {
    this.globalTrials.getPendingTrials();
  }

  goToTrialReq() {
    this.nav.push('my-students')
  }

}
