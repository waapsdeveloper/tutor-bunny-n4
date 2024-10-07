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
export class ChatPage extends BasePage implements OnInit, OnDestroy{

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
    this.initialize();

    this.activeUser =this.users.getUser();
    console.log(this.activeUser);

  }

  ngOnInit() {
    this.messageReceivedViaPusher();

    this.events.subscribe('update-chat-list', (data) => {
      this.initialize();
    })

  }
  messageReceivedViaPusher() {
    this.events.subscribe(
      'message-received-via-pusher',
      this.updateChatsByMessageReceived.bind(this)
    );
  }

  updateChatsByMessageReceived(data: any) {
    console.log(data);
    this.events.publish('update-chat-lists', data)
  }

  ngOnDestroy() {
   this.user = null;
   this.other_user_id = null;
  }

  doSearch(event){

    this.chats.getchatList(this.search, 1)
  }

  async ionViewWillEnter() {

    this.params = this.nav.getQueryParams();
    if (this.params.user) {
      this.user = JSON.parse(this.params.user);
      console.log(this.user);

    }
    if (this.params.other_user_id) {
      this.other_user_id = JSON.parse(this.params.other_user_id);
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


  ShowSearchBar(event){
    this.isSearchBarShow = !this.isSearchBarShow;
  }


}
