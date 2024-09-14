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

  }


  ngOnInit() {
    this.initialize();
    this.notificationService.getAllNotifications()
  }

  async initialize() {
    this.loadResolvers();
  }

}
