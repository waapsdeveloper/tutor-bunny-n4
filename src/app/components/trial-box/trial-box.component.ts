import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-trial-box',
  templateUrl: './trial-box.component.html',
  styleUrls: ['./trial-box.component.scss'],
})
export class TrialBoxComponent extends BasePage implements OnInit {
  user;
  trial
  student;
  country;
  age;
  courseName;
  image
  city;
  flag;
  serial_number;
  constructor(injector: Injector) {
    super(injector)
    this.initialize();
  }
  ngOnInit() { };
  async initialize() {
    this.user = this.users.getUser();
    let res = await this.network.getOneTrial(this.user.id);
    this.trial = res.trial;
    this.student = this.trial.student.name;
    this.country = this.trial.student.country;
    this.city = this.trial.student.city;
    this.image = this.trial.student.image;
    this.age = this.trial.student.age;
    this.serial_number = this.trial.course.serial_number;
    this.courseName = this.trial.course.title;
    this.flag = this.getFlag()
  }
  getFlag() {
    if (this.trial && this.trial.student && this.trial.student.flag) {
      const flag = this.trial.student.flag;
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
}
