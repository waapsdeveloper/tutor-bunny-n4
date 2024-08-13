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
  request;
  time;
  params;
  teacher
  student;
  user_1;
  user;
  role_id;
  chat_room_id;
  chat_;
  other_user_id;
  showChat = 'inbox';
  constructor(injector: Injector) {
    super(injector);
    this.initialize();
  }

  ngOnInit() {

    this.events.subscribe('update-chat-list', (data) => {
      this.initialize();
    })

  }
  async ionViewWillEnter() {
    this.params = this.nav.getQueryParams();
    console.log(this.params);
    if (this.params.user) {
      this.user = JSON.parse(this.params.user);
      console.log(this.user);

    }
    if (this.params.other_user_id) {
      this.other_user_id = JSON.parse(this.params.other_user_id);
      console.log(this.other_user_id);

    }
    if (this.params.chat_room_id) {
      this.chat_room_id = this.params.chat_room_id;
      let item = {
        chat_room_id: this.chat_room_id,
        other_user_id: this.other_user_id,
        user: this.user
      }
      let params = {
        item: JSON.stringify(item)
      }
      let res = await this.nav.push('messages', params)
      this.initialize()
    }

  }

  async initialize() {

    this.user_1 = this.users.getUser();

    this.role_id = this.user_1.role_id;
    console.log(this.role_id);

    // this.flag = this.getFlag();

    let res = await this.network.getMessagesRoom(this.user_1.id)
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
    let params = {
      item: JSON.stringify(item)
    }
    let res = await this.nav.push('messages', params)
    this.initialize()
  }

  async showinbox(value) {

    console.log(value);

    this.showChat = value;

    if (this.showChat == 'requests') {
      let res = await this.network.getRequestMessagesRoom(this.user_1.id);
      console.log(res);

      this.request = res.data;
    }
  }

}
