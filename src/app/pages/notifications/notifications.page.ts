import { Component, Injector } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage extends BasePage{
  
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
    })
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
