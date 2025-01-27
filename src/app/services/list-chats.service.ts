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

  constructor(private network: NetworkService, private users: UsersService) { 
    super()
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
      // if (res) {
      //   this.chats = res.data;
      //   //
      //   this.unreadCount = (await this.getUnreadMsgCount()) as number;
      //   //
      //   let data = await this.network.getRequsetCount(this.user.id);
      //   if (this.user.role_id == 3) {
      //     this.getChatRequsts();
      //   }
      //   this.count = data.message.pending_count;
      // }
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

}
