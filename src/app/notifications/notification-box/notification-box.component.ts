import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-notification-box',
  templateUrl: './notification-box.component.html',
  styleUrls: ['./notification-box.component.scss'],
})
export class NotificationBoxComponent implements OnInit {
  @Input() item;
  time;
  constructor() { }

  ngOnInit() {
    moment.updateLocale('en', {
      relativeTime: {
        future: "in %s",
        past: "%s ago",
        s: 'a few seconds',
        ss: '%d s',
        m: "a minute",
        mm: "%dm",
        h: "an hour",
        hh: "%dh",
        d: "a day",
        dd: "%dd",
        M: "a month",
        MM: "%dM",
        y: "a year",
        yy: "%dy"
      }
    });
    this.time = moment(this.item.created_at).fromNow();
    console.log(this.time);
  }
}
