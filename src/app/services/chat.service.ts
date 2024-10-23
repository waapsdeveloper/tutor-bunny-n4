import { Injectable } from '@angular/core';
import { EventsService } from './events.service';
import { NetworkService } from './network.service';
import { UsersService } from './users.service';
import { resolve } from 'path';
import { NgxPubSubService } from "@pscoped/ngx-pub-sub";
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  user: any;
  role_id: any;
  chats;
  count;
  latestEvent = "randomLast";
  historicalEvent = "randomHistory";
  unreadCount = 0;
  requests;
  requestCount;
  private pusher: Pusher;

  review_course = {
    user_id: null,
    course_id: null,
  };
  days;
  chatChannel: any;

  constructor(
    private users: UsersService,
    private network: NetworkService,
    private events: EventsService,
    public pubsubSvc: NgxPubSubService
  ) {
    const options = {
      cluster: 'ap2',
      forceTLS: true
    };

    this.pusher = new Pusher('a45efbe1a2e731b6dbfb', options);
    this.chatChannel = this.pusher.subscribe("chats-channel");
    this.events.subscribe('clear-all-services-data', () => {
      this.user = null;
      this.role_id = null;
      this.chats = null;
      this.count = null;
      this.unreadCount = 0;
      this.requests = null;
      this.requestCount = null;
      this.days = null;
    });
    this.events.subscribe('clear-chat-data', () => {
      this.days = null;
    });
    this.events.subscribe('update-chat-lists', () => {

      this.getchatList()
    });


  }

  registerPusherEvent(id: any) {
    this.chatChannel.bind("message-rec-" + id, this.chatChannelReceived.bind(this))
  }

  chatChannelReceived($event: any) {

    this.getchatList()

    this.events.publish('message-received-via-pusher', $event);
    this.getUnreadMsgCount()

  }

  reviewCoursebyChat(data) {
    this.review_course.course_id = data.course_id;
    this.review_course.user_id = data.user_id;
  }
  async updadteChatListById(data) {
    // Fetch the chat by its ID
    this.user = this.users.getUser();
    this.role_id = this.user.role_id;
    let obj = {
      search: 'search',
      page: 1,
      liked: '',
      chat_room_id: data.chat_room_id
    };
    let res = await this.network.getMessagesRoom(this.user.id, obj);

    if (res && res.bool && res.chat_room) {
      const chatRoom = res.chat_room;

      // Find the chat index in the existing chat list
      let chatIndex = this.chats.findIndex(chat => chat.id === chatRoom.id);

      if (chatIndex !== -1) {
        this.chats[chatIndex] = {
          ...this.chats[chatIndex],
          ...chatRoom,
          last_message: chatRoom.last_message
        };
      } else {
      }

    } else {
    }
  }


  getchatList(search = '', page = 1, liked = false) {
    return new Promise(async (resolve) => {
      this.user = this.users.getUser();
      this.role_id = this.user.role_id;
      let obj = {
        search: search,
        page: page,
        liked: liked,
      };
      let res = await this.network.getMessagesRoom(this.user.id, obj);
      if (res) {
        this.chats = res.data;
        this.unreadCount = this.getUnreadMsgCount() as number;
        let data = await this.network.getRequsetCount(this.user.id);
        this.count = data.message.pending_count;
      }
      resolve(this.chats);
      return;
    });
  }

  getUnreadMsgCount(): number {
    if (this.chats.length == 0) {
      return 0;
    }

    let count = this.chats.reduce((prev, next) => {
      return prev + parseInt(next.unread_count);
    }, 0);

    this.unreadCount = count;
    return count;
  }

  getChatRequsts() {
    return new Promise(async (resolve) => {
      let res = await this.network.getRequestMessagesRoom(this.user.id);
      this.requestCount = res.total;
      this.requests = res.data;
      resolve;
    });
  }

  async chatRequstUpdateStatus(value, item) {
    return new Promise(async (resolve) => {
      let obj = {
        request_status: value,
      };
      let res = await this.network.updateMessageReaquest(
        obj,
        item.chat_room_id
      );
      this.getChatRequsts();
      this.getchatList();
      resolve;
    });
  }

  getChatMessages(id) {
    return new Promise(async (resolve) => {
      let res = (await this.network.getMessages(id)) as any;
      this.days = res.data;
      resolve;
    });
  }

  updadteChatList(data) {
    let id = data.chat_room_id;

    let chatIndex = this.chats.findIndex(chat => chat.chat_room_id === id);
    if (chatIndex !== -1) {
      this.chats[chatIndex] = {
        ...this.chats[chatIndex],
        ...data,
      };
    } else {
    }
  }

}
