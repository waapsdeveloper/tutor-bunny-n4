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
  loading = false;

  constructor(
    injector: Injector,
    public notificationService: NotificationsService
  ) {
    super(injector);
  }

  async ngOnInit() {
    let shownoti = false;
    this.events.publish('show-noti-dot', shownoti);
    this.initialize();
    let res = await this.notificationService.getNotificationsFromApi();
    console.log(res);

  }

  async initialize() {
    this.loadResolvers();
  }

  collectIds(ids){
    console.log(ids);

  }

  async loadMore($event) {
    if (this.loading == true) {
      return;
    }
    this.loading = true;
    await this.notificationService.loadMoreNotifications();
    this.loading = false;
    $event.target.complete();
  }

  reloadLIst(event) {
    this.initialize();

    this.notificationService.getNotificationsFromApi();
  }
}
