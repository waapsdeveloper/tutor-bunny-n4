import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { GlobalTrialsService } from 'src/app/services/global-trials.service';

@Component({
  selector: 'app-trial-box',
  templateUrl: './trial-box.component.html',
  styleUrls: ['./trial-box.component.scss'],
})
export class TrialBoxComponent extends BasePage implements OnInit {
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
    this.initialize();
  }
  ngOnInit() {
    this.trialsReceivedViaPusher();
  };
  trialsReceivedViaPusher() {
    this.user = this.users.getUser();
    this.events.registerPusherEvent(this.user.id);
    this.events.subscribe('trials-received-via-pusher', this.updateTrailsList.bind(this));
  }

  async updateTrailsList(data: any) {
    let trail_Id = data.id;
    this.initialize();
    this.events.publish('get-dashboard-stats');
    this.newTrial = await this.network.geTrailRequestsByPusher(trail_Id);
    console.log(this.newTrial);
    
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
  getFlag(item) {

    if (item && item.student && item.student.student.country.iso2) {
      const flag = item.student.student.country.iso2;

      if (flag) {
        return flag.toLowerCase();
      } else {
        return ""
      }
    } else {
      return ""
    }
  }
  goToTrialReq() {
    this.nav.push('my-students')
  }

  goToChat() {
    this.nav.push('/tabs/chat')
  }


}
