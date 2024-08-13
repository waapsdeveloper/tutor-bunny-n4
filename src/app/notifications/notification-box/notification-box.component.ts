import { Component, Injector, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-notification-box',
  templateUrl: './notification-box.component.html',
  styleUrls: ['./notification-box.component.scss'],
})
export class NotificationBoxComponent extends BasePage implements OnInit {
  private _item: any;
  loading= true;
  is_read;
  @Input('item')
  public get item() {
    return this._item;
  };

  public set item(value: any) {
    this._item = value;
    // console.log(value);
    this.getNotificationRead(value)
    this.is_read = value.is_read;
  }
  time;
  user;
  user_id;
  constructor(injector:Injector) {
    super(injector)
    setTimeout(() => {
      this.loading = false;
    },4000);
    
   }

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
  }



  async getNotificationRead(item) {

    if (item.user_id != this.user_id) {
      if (item.is_read == 0) {
        let obj = { ids: [item.id] };
        console.log(obj);
        let res = await this.network.getNotificationRead(obj);
        console.log(res);
        

      }
      else {
        console.log("SDdsfdsfsd");
      }
    }
    else {
      console.log("12345678");
    }
  }
}
