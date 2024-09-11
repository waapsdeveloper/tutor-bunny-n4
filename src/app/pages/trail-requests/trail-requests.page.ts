import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';


@Component({
  selector: 'app-trail-requests',
  templateUrl: './trail-requests.page.html',
  styleUrls: ['./trail-requests.page.scss'],
})
export class TrailRequestsPage extends BasePage implements OnInit {
  ;
  user;
  trial;

  constructor(injector: Injector) {
    super(injector);
    this.initialize();
  }

  ngOnInit() { }

  async initialize() {
    this.user = this.users.getUser();

    let obj = {

    }
    this.trial = await this.network.geTrailRequests(obj, this.user.id)
  }
}
