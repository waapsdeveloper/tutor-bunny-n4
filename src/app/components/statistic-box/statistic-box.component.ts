import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-statistic-box',
  templateUrl: './statistic-box.component.html',
  styleUrls: ['./statistic-box.component.scss'],
})
export class StatisticBoxComponent extends BasePage implements OnInit {

  trials = 0;
  courses = 0;
  event = 0
  credits = 0;
  views = 0;
  earnings = 5897640;
  currency_symbol = '₹'; 
  coins = 0;

  constructor(injector: Injector) {
    super(injector)
    this.initialize();
  }

  async ngOnInit() {
    this.events.subscribe('get-dashboard-stats', this.initialize.bind(this))
  }

  async initialize() {

    let res = await this.network.getdashboardcounts();

    this.trials = res.trials;
    this.courses = res.courses;
    this.event = res.events;
    this.credits = res.events;
    this.views = res.events;
    this.earnings = res.earnings || 0;
    this.currency_symbol = res.currency_symbol || '$';
    this.coins = res.coins;

  }

  goToTrialReq() {
    this.nav.push('my-students')
  }
  openEarnings(){
    this.nav.push('/teacher-my-earning')
  }

  openCredit(){
    this.nav.push('/teacher-credits')

  }


}
