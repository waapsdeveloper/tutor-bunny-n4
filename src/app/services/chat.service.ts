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
  requests;
  requestCount;
  days;

  constructor(
    private users: UsersService,
    private network: NetworkService,
    private events: EventsService
  ) {}

  getchatList() {
    return new Promise(async (resolve) => {
      this.user = this.users.getUser();
      this.role_id = this.user.role_id;
      console.log(this.role_id);
      let res = await this.network.getMessagesRoom(this.user.id);
      this.chats = res.data;
      let data = await this.network.getRequsetCount(this.user.id);
      console.log(data);
      this.count = data.message.pending_count;
      resolve(this.chats);
      return;
    });
  }

  getChatRequsts() {
    return new Promise(async (resolve) => {
      let res = await this.network.getRequestMessagesRoom(this.user.id);
      console.log(res);
      this.requestCount = res.total;
      this.requests = res.data;
      resolve
    });
  }

  async chatRequstUpdateStatus(value, item) {
    return new Promise(async (resolve) => {
      console.log(value, item);
      let obj = {
        request_status: value,
      };
      let res = await this.network.updateMessageReaquest(
        obj,
        item.chat_room_id
      );
      this.getChatRequsts()
      this.getchatList()
      console.log(res);
      resolve;
    });
  }

  getChatMessages(id){
    return new Promise(async (resolve) => {
      let res = (await this.network.getMessages(id)) as any;
      this.days = res.data;
      console.log(this.days);
      resolve
    })
  }
}
