import { Injectable } from '@angular/core';
import { EventsService } from './events.service';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import Pusher from 'pusher-js';

import {
  NgSimpleStateBaseRxjsStore,
  NgSimpleStateStoreConfig,
} from 'ng-simple-state';
import { UsersService } from './users.service';
import { NetworkService } from './network.service';

export interface GlobalChatsModel {
  unread_count: number;
  chats: any[];
  requests: any[];
}

@Injectable({
  providedIn: 'root',
})
export class ChatService extends NgSimpleStateBaseRxjsStore<GlobalChatsModel> {
  user: any;
  role_id: any;
  chats;
  count;
  latestEvent = 'randomLast';
  historicalEvent = 'randomHistory';
  unreadCount = 0;

  review_course = {
    user_id: null,
    course_id: null,
  };

  days: any[] = [];
  chatChannel: any;
  presenceChannel: any;

  constructor(
    private users: UsersService,
    private network: NetworkService,
    private events: EventsService,
    public pubsubSvc: NgxPubSubService
  ) {
    super();


    // this.events.subscribe(
    //   'clear-all-services-data',
    //   () => {
    //     this.user = null;
    //     this.role_id = null;
    //     this.chats = [];
    //     this.count = 0;
    //     if (this.pusher) {
    //       this.pusher.unsubscribe('chats-channel');
    //       this.pusher.unsubscribe('presence-chat-room');
    //       this.pusher.disconnect();
    //     }
    //     this.events.unsubscribe('message-received-via-pusher');
    //   },
    //   false
    // );

    // this.events.subscribe('clear-chat-data', () => {
    //   this.days = null;
    // });
    // this.events.subscribe('update-chat-lists', () => {
    //   this.getchatList();
    // });
  }

  storeConfig(): NgSimpleStateStoreConfig {
    return {
      storeName: 'GlobalChatsModel',
    };
  }

  initialState(): GlobalChatsModel {
    return {
      unread_count: 0,
      chats: [],
      requests: [],
    };
  }

  getChatList() {
    return this.selectState((state) => state.chats);
  }

  getChatCount() {
    return this.selectState((state) => state.chats.length);
  }

  getChatCountPromise() {
    return new Promise((resolve) => {
      this.selectState((state) => state.chats.length).subscribe((res) => {
        resolve(res);
      });
    });
  }

  getRequestList() {
    return this.selectState((state) => state.requests);
  }

  getRequestCount() {
    return this.selectState((state) => state.requests.length);
  }

  getRequestCountPromise() {
    return new Promise((resolve) => {
      this.selectState((state) => state.requests.length).subscribe((res) => {
        resolve(res);
      });
    });
  }

  getUnreadCount() {
    return this.selectState((state) => state.unread_count);
  }

  getUnreadCountPromise() {
    return new Promise((resolve) => {
      this.selectState((state) => state.unread_count).subscribe((res) => {
        resolve(res);
      });
    });
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
      chat_room_id: data.chat_room_id,
    };
    let res = await this.network.getMessagesRoom(this.user.id, obj);

    if (res && res.bool && res.chat_room) {
      const chatRoom = res.chat_room;

      // Find the chat index in the existing chat list
      let chatIndex = this.chats.findIndex((chat) => chat.id === chatRoom.id);

      if (chatIndex !== -1) {
        this.chats[chatIndex] = {
          ...this.chats[chatIndex],
          ...chatRoom,
          last_message: chatRoom.last_message,
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
        //
        this.unreadCount = (await this.getUnreadMsgCount()) as number;
        //
        let data = await this.network.getRequsetCount(this.user.id);
        if (this.user.role_id == 3) {
          this.getChatRequsts();
        }
        this.count = data.message.pending_count;
      }
      resolve(this.chats);
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

    return this.unreadCount;
  }

  getChatRequsts() {
    //   return new Promise(async (resolve) => {
    //     this.user = this.users.getUser();
    //     let res = await this.network.getRequestMessagesRoom(this.user.id);
    //     //
    //     this.requestCount = res.total;
    //     //
    //     this.requests = res.data;
    //     resolve;
    //   });
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

      const user = this.users.getUser();
      if (user.role_id == 3) {
        this.getChatRequsts();
      }
      this.getchatList();
      resolve(true);
    });
  }

  getChatMessages(id) {
    return new Promise(async (resolve) => {
      let res = (await this.network.getMessages(id)) as any;
      this.days = res.data;

      //
      this.events.publish('scroll-to-bottom');

      resolve(true);
    });
  }

  async updateChatCount(roomId, count) {
    //
    //

    this.chats = this.chats ?? [];
    let chatIndex = this.chats.findIndex((chat) => chat.chat_room_id == roomId);

    if (chatIndex != -1) {
      this.chats[chatIndex].unread_count = count;
    }
  }

  updadteChatList(data) {
    let id = data.chat_room_id;

    let chatIndex = this.chats.findIndex((chat) => chat.chat_room_id === id);
    if (chatIndex !== -1) {
      this.chats[chatIndex] = {
        ...this.chats[chatIndex],
        ...data,
      };
    } else {
    }
  }

  async getChadRoomId(user1, user2): Promise<number> {
    let obj = {
      user_id_1: user1,
      user_id_2: user2,
    };
    let res = await this.network.getChadRoomId(obj);

    //
    const chatroom = res.chat_room;

    if (chatroom) {
      return chatroom.id;
    }
    return -1;
  }

  async getChatRoomInfo(roomId): Promise<any> {
    //

    // const findObj = this.chats.find((x) => x.chat_room_id == roomId);
    // if (!findObj) {

    let obj = {
      limit: 20,
      offset: 0,
    };
    const res = await this.network.getChatRoomById(roomId, obj);
    //

    if (res.length > 0) {
      // this.chats = [...this.chats, ...res];
      return res[0];
    }

    return null;
    // }

    // return findObj;

    //   const currectUser = this.users.getUser();
    //   const otherUserId = user1 == currectUser.id ? user2 : user1;
    //   const otherUser =
    //     chatroom['user1'].id == otherUserId
    //       ? chatroom['user1']
    //       : chatroom['user2'];

    //   let customObj = {
    //     chat_room_id: chatroom.id,
    //     last_message: '',
    //     other_user_id: otherUserId,
    //     unread_count: 0,
    //     user: otherUser,
    //   };

    //   this.chats.push(customObj);
    //   return chatroom.id;
    // }

    // return chatroom.id;
    // }

    // */
    // const ch = this.chats.find((x) => x.id == roomId);
    // return ch;
  }

  async setChatRoomListItemInfo(roomId): Promise<any> {
    //

    let obj = {
      limit: 10,
      offset: 0,
    };
    const res = await this.network.getChatRoomById(roomId, obj);
    //

    this.chats = this.chats ?? [];

    const findIndex = this.chats.findIndex((x) => x.chat_room_id == roomId);
    if (findIndex != -1 && res.length > 0) {
      this.chats[findIndex] = res[0];
    } else {
      await this.getChatRequsts();
    }

    // this.getUnreadMsgCount();
  }
}
