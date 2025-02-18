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

  notificationsState$;
  loading = false;

  constructor(
    injector: Injector,
    public notificationService: NotificationsService
  ) {
    super(injector);

    this.notificationService.getState().subscribe( state => {
      this.notificationsState$ = state;
    });








  }
  ngOnInit(): void {
    setTimeout( async () => {

      console.log("reawe")

      const count = await this.notificationService.getUnreadCountPromise() as number;
      console.log("count: " + count)
      this.notificationService.setNotificationUnreadCount({
        unread_count: 0
      });
    }, 1000);
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
    this.notificationService.getNotificationsFromApi();
  }
}
