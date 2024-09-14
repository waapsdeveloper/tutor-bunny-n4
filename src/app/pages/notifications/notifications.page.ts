import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage extends BasePage implements OnInit {
  user;
  params: any;
  notifications;

  constructor(injector: Injector, public notificationService: NotificationsService) {
    super(injector)

    this.events.subscribe('dashboard:notificationReceived', this.initialize())
  }


  ngOnInit() {
    this.notificationService.getAllNotifications()
    // this.user = this.users.getUser()
    // this.initialize();
  }

  async initialize() {
    let userId = this.user.id;
    let res = await this.network.getNotifications(userId);
    this.notifications = res.result;
  }

}
