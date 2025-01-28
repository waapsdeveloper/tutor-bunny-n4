import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-teacher-profile-statistics',
  templateUrl: './teacher-profile-statistics.component.html',
  styleUrls: ['./teacher-profile-statistics.component.scss'],
})
export class TeacherProfileStatisticsComponent extends BasePage implements OnInit {
  private _experince: any;

  @Input('experince')
  // public get experince() {
  //   return this._experince;
  // }

  year;
  trials;
  courses;
  event
  user;
  currency = '$';
  credits;
  views;
  notes_count;
  @Input() hourly_rate = 0;
  @Input() course = 0;

  constructor(injector: Injector) {
    super(injector)
    this.initialize();
  }
  ngOnInit() {}
  async initialize() {
    this.user = this.users.getUser()
    this.getexperince(this.user);
    this.getcourse(this.user);
    this.getCurrencySymbol(this.user);
    let res = await this.network.getdashboardcounts();
    this.trials = res.trials;
    this.courses = res.courses;
    this.event = res.events;
    this.credits = res.events;
    this.views = res.events;
  }

  getCurrencySymbol(user) {

    if(user?.role_id == 2){
      this.currency = user?.student?.country?.currency_symbol
    }else if(user?.role_id == 3){
      this.currency = user?.teacher?.country?.currency_symbol
    }else{
      this.currency = '$'
    }


  }
  getexperince(user) {
    console.log(this.year);
    if(user?.role_id == 3){
      this.year = this.calculateYear(parseInt(user?.teacher?.started_teaching));
      console.log("This is experience "+this.year);
    }else{
      this.year = 0;
    }
  }
  calculateYear(experience) {
    const currentYear = new Date().getFullYear();
    return currentYear - experience;
  }

  getcourse(user) {

    if(user?.role_id == 3){
      this.courses = this.calculateYear(user?.teacher?.course);
    }else{
      this.courses = 0;
    }
  }

}
