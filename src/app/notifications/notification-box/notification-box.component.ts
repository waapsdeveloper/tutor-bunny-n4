import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import * as moment from 'moment';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-notification-box',
  templateUrl: './notification-box.component.html',
  styleUrls: ['./notification-box.component.scss'],
})
export class NotificationBoxComponent extends BasePage implements OnInit {
  private _item: any;
  loading = true;
  is_read;
  @Input('item')
  public get item() {
    return this._item;
  }

  public set item(value: any) {
    this._item = value;
    this.is_read = value.is_read;
  }
  time;
  user;
  user_id;
  @Output('reloadList') reloadList: EventEmitter<any> = new EventEmitter<any>();

  constructor(injector: Injector) {
    super(injector);
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
  readNotification(item) {
    this.getNotificationRead(item);
  }

  ngOnInit() {
    moment.updateLocale('en', {
      relativeTime: {
        future: ' %s ago',
        past: '%s ago',
        s: 'a few seconds',
        ss: '%d s',
        m: 'a minute',
        mm: '%dm',
        h: 'an hour',
        hh: '%dh',
        d: 'a day',
        dd: '%dd',
        M: 'a month',
        MM: '%dM',
        y: 'a year',
        yy: '%dy',
      },
    });
    let createdAt = moment(this.item.created_at);

    this.time = createdAt.fromNow();
  }

  async getNotificationRead(item) {
    if (item.user_id != this.user_id) {
      if (item.is_read == 0) {
        let obj = { ids: [item.id] };
        let res = await this.network.getNotificationRead(obj);
        this.reloadList.emit(res.data);
      } else {
      }
    } else {
    }
  }
}
