import { Component, Injector, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage extends BasePage implements ViewWillEnter {
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

  ionViewWillEnter(): void {
    this.initialize();
  }



  async initialize() {
    this.loadResolvers();
    // this.notificationService.unread_count = 0;
    console.log(this.notificationService.unread_count);

    this.notificationService.sendIsOpenToApis()

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
