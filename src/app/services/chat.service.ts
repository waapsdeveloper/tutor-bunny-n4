import { Injectable } from '@angular/core';
import { EventsService } from './events.service';
import { NetworkService } from './network.service';
import { UsersService } from './users.service';
import { resolve } from 'path';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  user: any;
  role_id: any;
  chats;
  count;
  latestEvent = 'randomLast';
  historicalEvent = 'randomHistory';
  unreadCount = 0;
  requests;
  requestCount= 0;
  private pusher: Pusher;

  review_course = {
    user_id: null,
    course_id: null,
  };
  days: any [] = [];
  chatChannel: any;

  constructor(
    private users: UsersService,
    private network: NetworkService,
    private events: EventsService,
    public pubsubSvc: NgxPubSubService
  ) {
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
        this.chats = null;
        this.count = null;
        this.requests = null;
        this.requestCount = null;
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

  registerPusherEvent(id: any) {
    this.chatChannel.bind(
      'message-rec-' + id,
      this.chatChannelReceived.bind(this)
    );
  }

  chatChannelReceived($event: any) {
    this.getchatList();

    this.events.publish('message-received-via-pusher', $event);
    this.getUnreadMsgCount();
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
        console.log(this.chats);
        this.unreadCount = await this.getUnreadMsgCount() as number;
        console.log(this.unreadCount);
        let data = await this.network.getRequsetCount(this.user.id);
        if(this.user.role_id == 3){
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
    console.log(this.chats);
    let ids = this.chats.map((item) => item.chat_room_id);
    console.log(ids);
    // return

    let object = {
      ids: ids,
      user_id: this.user.id
    };

    let res = await this.network.getUnreadChat(object);
    console.log(res);

    this.unreadCount = res.unread_count;
    console.log(this.unreadCount, 'unread');

    return this.unreadCount;
  }

  getChatRequsts() {
    return new Promise(async (resolve) => {
      this.user = this.users.getUser();

      let res = await this.network.getRequestMessagesRoom(this.user.id);
      console.log(res,"dsffdsfsfsdfs");

      this.requestCount = res.total;
      console.log(this.requestCount);

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
      if(this.user.role_id == 3){
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
      console.log(this.days);
      this.events.publish('scroll-to-bottom');

      resolve(true);
    });
  }


  updateChatCount(roomId, count){

    console.log(roomId);
    console.log(this.chats);
    let chatIndex = this.chats.findIndex((chat) => chat.chat_room_id == roomId);
    console.log(chatIndex);
    if(chatIndex != -1){
      this.chats[chatIndex].unread_count = 0;
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

    console.log(res);
    const chatroom = res.chat_room;

    if (chatroom) {
      return chatroom.id;
    }
    return -1;
  }

  async getChatRoomInfo(roomId): Promise<any> {
    console.log(this.chats, roomId);

    const findObj = this.chats.find((x) => x.chat_room_id == roomId);
    if (!findObj) {

      const res = await this.network.getChatRoomById(roomId);
      console.log(res);

      if(res.length > 0){
        this.chats = [...this.chats, ...res];
        return res[0]
      }

    }



    return findObj;

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

}
