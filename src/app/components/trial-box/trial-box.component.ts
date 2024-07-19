import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

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
  constructor(injector: Injector) {
    super(injector)
    this.initialize();
  }
  ngOnInit() { 
    this.trialsReceivedViaPusher();
  };
  trialsReceivedViaPusher() {
    this.events.registerPusherEvent(this.user.id);
    console.log("sdfsf");

    this.events.subscribe('trials-received-via-pusher', this.updateTrailsList.bind(this));
  }

  updateTrailsList(data:any){
    console.log(data);
    this.newTrial = data;
    this.initialize();

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
    this.user = this.users.getUser();
    let obj = {
      teacher_id: this.user.id
    }
    let res = await this.network.getPendingTrial(this.user.id, obj);
    this.trailCount = res.total
    this.trial = res.trials;
    console.log(this.trial);
  }
  getFlag(item) {
    console.log(item.student);

    if (item && item.student && item.student.student.country.iso2) {
      const flag = item.student.student.country.iso2;
      console.log(flag);

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
  async trailStatus(key, item) {
    let obj = {
      status: key,
      user_id: item.student.id
    };
    let trialId = item.id;
    let res = await this.network.changeTrailStuts(obj, trialId);
  }
  goToChat() {
    this.nav.push('/tabs/chat')
  }
  removeFromList(id){
    this.initialize();
  }

}
