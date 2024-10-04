import { Component, Injector, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent extends BasePage implements OnInit {
  private _item: any;
  last_message;
  unread_count;
  @Input('item')
  public get item() {
    return this._item;
  }

  public set item(value: any) {
    this._item = value;
    const time = this.item.updated_at;
    this.unread_count = this.item.unread_count;
    this.last_message = this.item.last_message;
    this.time = moment(time).format('hh:mm a');
  }

  time;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.events.subscribe('update-chat-lists', (data) => {
      console.log(data);
      if(data.chat_room_id == this.item.chat_room_id){
        this.last_message = data.message;

        this.unread_count = parseInt(this.item.unread_count) + 1
        console.log(this.unread_count);

      }
    });
  }

  async gotoMessage(item) {
    let params = {
      item: JSON.stringify(item),
    };
    let res = await this.nav.push('messages', params);
  }
  // getTime(time) {
  //   moment.updateLocale('en', {
  //     relativeTime: {
  //       future: "in %s",
  //       past: "%s ago",
  //       // s: 'few seconds',
  //       ss: '%d s',
  //       m: "a minute",
  //       mm: "%d m",
  //       h: "an hour",
  //       hh: "%d h",
  //       d: "a day",
  //       dd: "%d d",
  //       M: "a month",
  //       MM: "%d M",
  //       y: "a year",
  //       yy: "%d y"
  //     }
  //   });
  //   this.time = moment(time).fromNow();
  //   return this.time
  // }
}
