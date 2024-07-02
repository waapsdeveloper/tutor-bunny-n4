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
  country;
  age;
  courseName;
  image = 'assets/profileimg.png'
  city;
  list;
  flag;
  serial_number;
  constructor(injector: Injector) {
    super(injector)
    this.initialize();
  }
  ngOnInit() { };
  async initialize() {
    this.user = this.users.getUser();
    let obj = {
      teacher_id: this.user.id
    }
    let res = await this.network.getPendingTrial(this.user.id, obj,);
    this.trial = res.trials;
    console.log(this.trial);
    this.flag = this.getFlag()
  }
  getFlag() {
    if (this.trial && this.trial.student && this.trial.student.student.country.iso2) {
      const flag = this.trial.student.student.country.iso2;
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

}
