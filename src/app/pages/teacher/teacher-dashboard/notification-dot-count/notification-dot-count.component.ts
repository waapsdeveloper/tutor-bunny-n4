import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-notification-dot-count',
  templateUrl: './notification-dot-count.component.html',
  styleUrls: ['./notification-dot-count.component.scss'],
})
export class NotificationDotCountComponent  implements OnInit {

  constructor(public notification: NotificationsService,) { }

  ngOnInit() {}

}
