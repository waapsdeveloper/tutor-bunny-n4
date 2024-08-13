import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage extends BasePage implements OnInit {
  user;
  params: any;
  backUrl = '';
  showBack = false;
  notifications;
  constructor(injector: Injector) {
    super(injector)

    this.events.subscribe('dashboard:notificationReceived', this.initialize())
  }
  ionViewWillEnter(): void {
    this.params = this.nav.getQueryParams();
    if (this.params.backUrl) {
      this.backUrl = this.params.backUrl;
    }

    if (this.params.showBack) {
      this.showBack = this.params.showBack;
    }
  }

  ngOnInit() {
    this.user = this.users.getUser()
    this.initialize();
  }
  async initialize() {
    let userId = this.user.id;
    let res = await this.network.getNotifications(userId);
    this.notifications = res.result;
  }

}
