import { Injectable } from '@angular/core';

import { UsersService } from './users.service';
import { NetworkService } from './network.service';
import { NgrxCrudService } from './abstract/ngrx-crud.service';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class ListChatsService extends NgrxCrudService<any> {

  ngrxModelName: string = 'ListChatsModel';

  chats;  
  unreadCount = 0;

  private pusher: Pusher;
  chatChannel: any;

  constructor(private network: NetworkService, private users: UsersService) { 
    super()

    const options = {
      cluster: 'ap2',
      forceTLS: true,
    };

    this.pusher = new Pusher('a45efbe1a2e731b6dbfb', options);
    this.chatChannel = this.pusher.subscribe('chats-channel');

  }

  getchatsFromApi(search = '', page = 1, liked = false) {
    return new Promise(async (resolve) => {  
      const user = this.users.getUser();
      const role_id = user.role_id;

      let obj = {
        search: search,
        page: page,
        liked: liked,
      };

      let res = await this.network.getMessagesRoom(user.id, obj);
      const data = res.result;
      this.setList(data.data, data.page, data.last_page, data.total);

      this.unreadCount = (await this.getUnreadMsgCount()) as number;
      resolve(data);
      return;
    });
  }

  async getUnreadMsgCount(): Promise<number> { 
    let res = await this.network.getUnreadChat({});
    this.unreadCount = res.unread_count;

    this.setState( state => ({
      ...state,
      unread_count: res.unread_count
    }));
    
    return this.unreadCount;
  }

  setLastMessageOfChatList(obj: { chat_room_id: number; message: string }) {
    this.setState((state) => {
      const exists = state.list.some((item: any) => item.chat_room_id === obj.chat_room_id);
      
      if (!exists) {
        // If no matching chat room, return state unchanged
        return state;
      }
  
      return {
        ...state,
        list: state.list.map((item: any) => 
          item.chat_room_id === obj.chat_room_id 
            ? { ...item, last_message: obj.message } // Update last_message for the matching chat
            : item // Return unchanged for others
        ),
      };
    });
  }

  unRegisterPusherEvent() {
    let user = this.users.getUser() as any;

    if (this.pusher) {
      this.pusher.unsubscribe('chats-channel');
      this.pusher.disconnect();
    }
    this.chatChannel.unbind('message-rec-' + user.id);
  }

  registerPusherEvent(id: any) {
    this.chatChannel.bind(
      'message-rec-' + id,
      this.chatChannelReceived.bind(this)
    );
  }

  chatChannelReceived($event: any) {

    let data = $event;
    console.log("data-chat", data);
    if (data.chat_room_id) {
      this.setLastMessageOfChatList({ 
        chat_room_id: data.chat_room_id,
        message: data.message 
      })
    }

    this.getUnreadMsgCount();

    // this.getchatList();
    // this.getUnreadMsgCount();
  }

}
