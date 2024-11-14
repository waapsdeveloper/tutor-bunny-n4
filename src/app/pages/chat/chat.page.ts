import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { MessagesPage } from '../messages/messages.page';
import * as moment from 'moment';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage extends BasePage implements OnInit, OnDestroy {

  chat;
  request;
  time;
  params;
  teacher
  isSearchBarShow = false;
  student;
  activeUser
  count;
  user_1;
  user;
  search;
  role_id;
  chat_room_id;
  chat_;
  other_user_id;
  showChat = 'inbox';

  constructor(injector: Injector, public chats: ChatService) {
    super(injector);
    this.events.subscribe('clear-params-chat', () =>{
      this.chat_room_id = null;
      this.params =  null;
    }, false);

    this.initialize();
    this.activeUser = this.users.getUser();

  }

  ngOnInit() {
    this.events.subscribe('update-chat-lists', (data) => {

      this.handleRefresh(data);
    })
    this.events.subscribe(
      'message-received-via-pusher',
      this.updateChatsByMessageReceived.bind(this)
    );
  }
  messageReceivedViaPusher() {
    this.events.subscribe(
      'message-received-via-pusher',
      this.updateChatsByMessageReceived.bind(this)
    );
  }

  updateChatsByMessageReceived(data: any) {
    this.chats.getchatList(this.search, 1)


    this.events.publish('update-chat-lists', data)
  }

  ngOnDestroy() {
    this.user = null;
    this.other_user_id = null;
  }


  ionViewDidLeave() {
    this.user = null;
    this.other_user_id = null;
  }

  doSearch(event) {

    this.chats.getchatList(this.search, 1)
  }

  async ionViewWillEnter() {

    this.chats.getUnreadMsgCount()

    let previousUrl = this.nav.getPreviousUrl();
    const url = new URL(previousUrl, window.location.origin);
    const prevUrl = url.pathname.split('/')[1];
    console.log('Previous URL:', prevUrl);

    this.params = this.nav.getQueryParams();
    console.log(this.params);
    if (this.params.user) {
      this.user = JSON.parse(this.params.user);
    }
    if (this.params.other_user_id) {
      this.other_user_id = JSON.parse(this.params.other_user_id);
    }
    this.chat_room_id = this.params.chat_room_id;
    console.log(this.chat_room_id);
    if (this.chat_room_id) {
      let item = {
        chat_room_id: this.chat_room_id,
        other_user_id: this.other_user_id,
        user: this.user
      }
      let params = {
        item: JSON.stringify(item)
      }

      if(prevUrl != 'messages'){
        let res = await this.nav.push('messages', params)
      }
      // this.initialize()
    }
    this.initialize()
  }


  async initialize() {
    await this.chats.getchatList(this.search, 1);
  }

  async handleRefresh(event) {

    await this.chats.getchatList('', 1);
    event.target.complete();
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

    this.initialize()
  }

  async showRequests() {
    let res = this.nav.push('chat-requests');
    this.initialize()
  }

  async getRequstList() {
    let res = await this.network.getRequestMessagesRoom(this.user_1.id);
    this.request = res.data;
  }


  ShowSearchBar(event) {
    this.isSearchBarShow = !this.isSearchBarShow;
  }


}
