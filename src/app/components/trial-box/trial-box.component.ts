import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-trial-box',
  templateUrl: './trial-box.component.html',
  styleUrls: ['./trial-box.component.scss'],
})
export class TrialBoxComponent extends BasePage implements OnInit {

  user;
  trail
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

    let res = await this.network.getOneTrial(this.user.id)
    console.log(res);

    this.trail = res.message.trail;

    this.student = this.trail.student.name;
    this.country = this.trail.student.country;
    this.city = this.trail.student.city;
    this.image = this.trail.student.student_image;
    this.age = this.trail.student.age;
    this.serial_number = this.trail.course.serial_number;
    this.courseName = this.trail.course.title;
    this.flag = this.getFlag()

  }
  getFlag() {
    if (this.trail && this.trail.student && this.trail.student.flag) {
      const flag = this.trail.student.flag;
      if (flag) {
        return flag.toLowerCase();
      } else {
        return ""
      }
    } else {
      return ""
    }
  }
  goToTrailReq() {
    this.nav.push('my-students')
  }

}
