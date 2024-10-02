import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-statistic-box',
  templateUrl: './statistic-box.component.html',
  styleUrls: ['./statistic-box.component.scss'],
})
export class StatisticBoxComponent extends BasePage implements OnInit {


  trials;
  courses;
  event
  credits;
  views;
  user;
  constructor(injector: Injector) {
    super(injector)
    this.initialize();
  }

  async ngOnInit() {
    this.user = this.users.getUser();
    this.events.subscribe('get-dashboard-stats', this.initialize.bind(this))

  }

  async initialize() {
    let res = await this.network.getdashboardcounts();
    this.trials = res.trials;
    this.courses = res.courses;
    this.event = res.events;
    this.credits = res.events;
    this.views = res.events;
  }



}
