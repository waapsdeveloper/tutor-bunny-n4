import { Injectable } from '@angular/core';

import { UsersService } from './users.service';
import { NetworkService } from './network.service';
import { NgrxCrudService } from './abstract/ngrx-crud.service';
import Pusher from 'pusher-js';
import { ListRequestsService } from './teacher/list-requests.service';

@Injectable({
  providedIn: 'root',
})
export class ListChatsService extends NgrxCrudService<any> {
  ngrxModelName: string = 'ListChatsModel';

  chats;
  unreadCount = 0;

  chatChannel: any;

  constructor(private network: NetworkService, private users: UsersService, private listRequestsService: ListRequestsService) {
    super();
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
      console.log("chat-data", data)
      this.setList(data.data, data.page, data.last_page, data.total);

      this.unreadCount = (await this.getUnreadMsgCount()) as number;
      resolve(data);
      return;
    });
  }

  async getUnreadMsgCount(): Promise<number> {
    let res = await this.network.getUnreadChat({});
    this.unreadCount = res.unread_count;

    this.setState((state) => ({
      ...state,
      unread_count: res.unread_count,
    }));


    let list = res.list as any[];
    for(var i = 0; i < list.length; i++){

      let anItem = list[i];

      this.setState((state) => ({
        ...state,
        list: state.list.map( item => {
          if(item.chat_room_id == anItem.chat_room_id ){
            return { ...item, unread_count: anItem.unread_count }
          }
          return item;
        }),
      }));
    }









    return this.unreadCount;
  }

  setLastMessageOfChatList(obj: { chat_room_id: number; message: string }) {
    this.setState((state) => {
      const exists = state.list.some(
        (item: any) => item.chat_room_id === obj.chat_room_id
      );

      if (!exists) {
        // If no matching chat room, return state unchanged
        return state;
      }

      return {
        ...state,
        list: state.list.map(
          (item: any) => {
            if(item.chat_room_id === obj.chat_room_id) {

              // count unread meessage via
              return { ...item, last_message: obj.message } // Update last_message for the matching chat
            }
            return item;
          }
        ),
      };
    });
  }

  unRegisterPusherEvent(pusher: Pusher, user_id: number) {
    if (pusher) {
      pusher.unsubscribe('chats-channel');
      pusher.disconnect();
    }

    this.chatChannel.unbind('message-rec-' + user_id);
  }

  registerPusherEvent(pusher: Pusher, user_id: number) {
    this.chatChannel = pusher.subscribe('chats-channel');
    this.chatChannel.bind(
      'message-rec-' + user_id,
      this.chatChannelReceived.bind(this)
    );
  }

  chatChannelReceived($event: any) {
    let data = $event;
    console.log('data-chat', data);
    if (data.chat_room_id) {

      this.setLastMessageOfChatList({
        chat_room_id: data.chat_room_id,
        message: data.message
      });

    }

    this.getUnreadMsgCount();

    // when chat received, update message request
    this.listRequestsService.getRequests(1, '')

    // this.getchatList();
    // this.getUnreadMsgCount();
  }
}
