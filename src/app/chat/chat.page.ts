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
  params;
  teacher
  student;
  user
  chat_room_id;
  chat_
  constructor(injector: Injector) {
    super(injector);

    this.initialize();
  }

  ngOnInit() {

  }
  async ionViewWillEnter() {
    this.params = this.nav.getQueryParams();
    console.log(this.params);
    if (this.params.teacher) {
      this.teacher = JSON.parse(this.params.teacher);
    }
    if (this.params.chat_room_id) {
      this.chat_room_id = this.params.chat_room_id;
    }

  }

  async initialize() {

    this.user = this.users.getUser();
    let res = await this.network.getMessagesRoom(this.user.id)
    this.chat = res.data;


  }
  getTime(time) {
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
    return this.time
  }

  async gotoMessage(item) {
    console.log(item);

    await this.modals.present(MessagesPage, { item }, '', 1, 'right-to-left');
    this.initialize()
  }
}
