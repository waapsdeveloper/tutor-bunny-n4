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
  id: number;
}

export type GlobalChatsModelState = Array<GlobalChatsModel>;

@Injectable({
  providedIn: 'root',
})
export class ChatService extends NgSimpleStateBaseRxjsStore< GlobalChatsModelState > {



  
  user: any;
  role_id: any;
  chats;
  count;
  latestEvent = 'randomLast';
  historicalEvent = 'randomHistory';
  unreadCount = 0;
  requests;
  requestCount = 0;
  private pusher: Pusher;

  review_course = {
    user_id: null,
    course_id: null,
  };
  days: any[] = [];
  chatChannel: any;

  constructor(
    private users: UsersService,
    private network: NetworkService,
    private events: EventsService,
    public pubsubSvc: NgxPubSubService
  ) {
    super();
    const options = {
      cluster: 'ap2',
      forceTLS: true,
    };

    this.pusher = new Pusher('a45efbe1a2e731b6dbfb', options);
    this.chatChannel = this.pusher.subscribe('chats-channel');


    this.events.subscribe(
      'clear-all-services-data',
      () => {
        this.user = null;
        this.role_id = null;
        this.chats = [];
        this.count = 0;
        this.requests = [];
        this.requestCount = 0;
        if (this.pusher) {
          this.pusher.unsubscribe('chats-channel');
          this.pusher.disconnect();
        }
        this.events.unsubscribe('message-received-via-pusher');
      },
      false
    );
    this.events.subscribe('clear-chat-data', () => {
      this.days = null;
    });
    this.events.subscribe('update-chat-lists', () => {
      this.getchatList();
    });
  }


  storeConfig(): NgSimpleStateStoreConfig {
    return {
      storeName: 'GlobalChatsModel',
    };
  }

  initialState(): GlobalChatsModelState {
    return [];
  }

  getList() {
    return this.selectState((state) => state);
  }

  getCount() {
    return this.selectState((state) => state.length);
  }

  getCountPromise() {
    return new Promise((resolve) => {
      this.selectState((state) => state.length).subscribe((res) => {
        resolve(res);
      });
    });
  }


  unRegisterPusherEvent() {
    let user = this.users.getUser() as any;

    if (this.pusher) {
      this.pusher.unsubscribe('chats-channel');
      this.pusher.disconnect();
    }
    this.chatChannel.unbind('message-rec-' + user.id);

    this.events.unsubscribe('message-received-via-pusher');
  }

  registerPusherEvent(id: any) {
    this.chatChannel.bind(
      'message-rec-' + id,
      this.chatChannelReceived.bind(this)
    );
  }

  chatChannelReceived($event: any) {
    this.events.publish('message-received-via-pusher', $event);


    let data = $event;
    if (data.chat_room_id) {
      this.setChatRoomListItemInfo(data.chat_room_id);
    }

    this.getUnreadMsgCount();

    // this.getchatList();
    // this.getUnreadMsgCount();
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
    if (this.chats.length == 0) {
      return 0;
    }
    //
    let ids = this.chats.map((item) => item.chat_room_id);
    //
    // return

    let object = {
      ids: ids,
      user_id: this.user.id,
    };

    let res = await this.network.getUnreadChat(object);
    //

    this.unreadCount = res.unread_count;
    //

    return this.unreadCount;
  }

  getChatRequsts() {
    return new Promise(async (resolve) => {
      this.user = this.users.getUser();

      let res = await this.network.getRequestMessagesRoom(this.user.id);
      //

      this.requestCount = res.total;
      //

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
      if (this.user.role_id == 3) {
        this.getChatRequsts();
      }
      this.getchatList();
      resolve;
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
        offset: 0
      }
      const res = await this.network.getChatRoomById(roomId,obj);
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
      offset: 0
    }
    const res = await this.network.getChatRoomById(roomId, obj);
    //

    const findIndex = this.chats.findIndex((x) => x.chat_room_id == roomId);
    if (findIndex != -1 && res.length > 0) {
      this.chats[findIndex] = res[0];
    } else {
      await this.getChatRequsts();
    }

    // this.getUnreadMsgCount();




  }
}
