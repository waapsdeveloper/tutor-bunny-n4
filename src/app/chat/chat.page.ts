import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';
import { MessagesPage } from '../messages/messages.page';
import * as moment from 'moment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage extends BasePage implements OnInit {

  chat;
  time
  user
  constructor(injector: Injector) {
    super(injector);

    this.initialize();
  }

  ngOnInit() {

  }

  async initialize() {
    console.log("ffgcgc");
    
    this.user = this.users.getUser();
    let res = await this.network.getMessagesRoom(this.user.id)
    // console.log(res);
    this.chat = res.data;
    // console.log(this.chat);


  }
  getTime(time) {
    // console.log(time);

    moment.updateLocale('en', {
      relativeTime: {
        future: "in %s",
        past: "%s ago",
        s: 'few seconds',
        ss: '%d s',
        m: "a minute",
        mm: "%d m",
        h: "an hour",
        hh: "%d h",
        d: "a day",
        dd: "%d d",
        M: "a month",
        MM: "%d M",
        y: "a year",
        yy: "%d y"
      }
    });
    this.time = moment(time).fromNow();
    // console.log(this.time);
    return this.time
  }

  async gotoMessage(item) {
    let res = await this.modals.present(MessagesPage, {
      item: item
    })
    this.initialize()
  }
}
