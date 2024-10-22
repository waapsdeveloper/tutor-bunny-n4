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
  public get experince() {
    return this._experince;
  }

  public set experince(value: any) {
    this._experince = value;
    this.calculateAge();
  }
  year;
  trials;
  courses;
  event
  user;
  currency = '$';
  credits;
  views;

  @Input() hourly_rate = 0;
  @Input() course = 0;


  constructor(injector: Injector) {
    super(injector)
    this.initialize();
  }

  calculateAge() {
    const currentYear = new Date().getFullYear();
    this.year = currentYear - this.experince;
  }

  ngOnInit() {}
  async initialize() {
    this.user = this.users.getUser()
    let role = localStorage.getItem('role')
    if(role == '2'){
      this.currency = this.user.student.country.currency_symbol
    }else{
      this.currency = this.user.teacher.country.currency_symbol
    }
    let res = await this.network.getdashboardcounts();
    this.trials = res.trials;
    this.courses = res.courses;
    this.event = res.events;
    this.credits = res.events;
    this.views = res.events;
  }
}
