import { Injectable } from '@angular/core';
import { EventsService } from './events.service';
import { NetworkService } from './network.service';
import { UsersService } from './users.service';
import { resolve } from 'path';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  user: any;
  role_id: any;
  chats;
  count;
  unreadCount= 0;
  requests;
  requestCount;
  days;

  constructor(
    private users: UsersService,
    private network: NetworkService,
    private events: EventsService
  ) {
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
        console.log(this.chats);
        this.unreadCount = this.getUnreadMsgCount() as number;
        console.log(this.unreadCount);
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
}
