import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage extends BasePage implements OnInit {
  user;
  notifications;
  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit() {
    this.user = this.users.getUser()
    console.log(this.user);
    this.initialize();
  }
  async initialize() {
    let userId = this.user.id;
    let res = await this.network.getNotifications(userId);
    console.log(res);
    this.notifications = res.result;

  }

}
