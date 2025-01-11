import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-header-notification-button',
  templateUrl: './header-notification-button.component.html',
  styleUrls: ['./header-notification-button.component.scss'],
})
export class HeaderNotificationButtonComponent  implements OnInit {

  constructor(private nav: NavService, public notification: NotificationsService) { }

  ngOnInit() {}

  
  gotoNotification() {
    this.nav.push('notifications', {
      backUrl: '',
      showBack: true,
    });
  }

}
