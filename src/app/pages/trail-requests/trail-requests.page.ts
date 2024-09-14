import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { GlobalTrialsService } from 'src/app/services/global-trials.service';

@Component({
  selector: 'app-trail-requests',
  templateUrl: './trail-requests.page.html',
  styleUrls: ['./trail-requests.page.scss'],
})
export class TrailRequestsPage extends BasePage implements OnInit {

  user;
  // trials: any[] = [];

  constructor(injector: Injector, public trialSrvice: GlobalTrialsService) {
    super(injector);
    this.initialize();
  }

  ngOnInit() { }

  async initialize() {
    // this.user = this.users.getUser();

    // let obj = {

    // }
    // this.trials = await this.network.geTrailRequests(obj, this.user.id)
  }
}
