import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-header-notification-button',
  templateUrl: './header-notification-button.component.html',
  styleUrls: ['./header-notification-button.component.scss'],
})
export class HeaderNotificationButtonComponent {


  unreadCount$;

  constructor(public notification: NotificationsService) { 

    this.notification.getUnreadCount().subscribe( data => {
      this.unreadCount$ = data;
    })

  }


}
