import { Injectable } from '@angular/core';
import { NgrxCrudService } from './abstract/ngrx-crud.service';
import Pusher from 'pusher-js';
import { NetworkService } from './network.service';
import { ListRequestsService } from './teacher/list-requests.service';
import { EventsService } from './events.service';

@Injectable({
  providedIn: 'root',
})
export class ChatMessegesService extends NgrxCrudService<any> {
  ngrxModelName: string = 'ChatMessagesModel';

  messages: any[] = [];
  chatChannel: any;


  isTyping: boolean = false;

  timer: any;

  constructor(private network: NetworkService, private events: EventsService) {
    super();
  }


  isStartTyping(obj: any) {
    if (!this.isTyping) {
      this.isTyping = true;
      this.network.sendMessageTyping(obj); // Send only when first typing starts
    }
  
    clearTimeout(this.timer);
  
    this.timer = setTimeout(() => {
      this.isTyping = false;
    }, 1500);
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

    this.chatChannel.bind(
      'message-typing-' + user_id,
      this.chatChannelTypingReceived.bind(this)
    );

    
  }

  async chatChannelTypingReceived($event: any) {
    let data = $event;
    console.log('data-chat', data);
    if (data.chat_room_id) {
      const chatRoomId = await this.returnChatroomIdFromListInState();
      if (chatRoomId === data.chat_room_id) {

        // this.updateMessageInState(data);
        this.events.publish('np-starts-typing', data);
      }
    }
  }

  async chatChannelReceived($event: any) {
    let data = $event;
    console.log('data-chat', data);
    if (data.chat_room_id) {
      const chatRoomId = await this.returnChatroomIdFromListInState();
      if (chatRoomId === data.chat_room_id) {
        this.updateMessageInState(data);
        this.events.publish('scroll-to-bottom');
      }
    }
  }
  getChatMessages(id) {
    return new Promise(async (resolve) => {
      let res = (await this.network.getMessages(id)) as any;
      const days = res.data;
      this.setState((state) => ({
        ...state,
        list: days,
      }));

      // //
      // this.events.publish('scroll-to-bottom');

      resolve(true);
    });
  }

  async returnChatroomIdFromListInState(): Promise<number> {
    const list = await this.getListPromise();
    if (list && list.length > 0) {
      let msgs = list[0].messages;
      if (msgs && msgs.length > 0) {
        return msgs[0].chat_room_id;
      }
    }

    return 0;
  }

  addMessageInState(messageObject: any) {
    this.setState((state) => {
      // Find index of the entry with date "now"
      let nowIndex = state.list.findIndex((item) => item.date === 'now');

      let updatedList = [...state.list];

      if (nowIndex !== -1) {
        // If "now" exists, update its messages array
        updatedList[nowIndex] = {
          ...updatedList[nowIndex],
          messages: [...updatedList[nowIndex].messages, messageObject],
        };
      } else {
        // If "now" does not exist, add a new entry
        updatedList.push({
          date: 'now',
          messages: [messageObject],
        });
      }

      return {
        ...state,
        list: updatedList,
      };
    });
  }

  updateMessageInState(updatedMessage: any) {
    this.setState((state) => {
      // Find index of the entry with date "now"
      let nowIndex = state.list.findIndex((item) => item.date === 'now');
      let messageUpdated = false;
      let updatedList = [...state.list];

      if (nowIndex !== -1) {
        // Update message if found
        updatedList[nowIndex] = {
          ...updatedList[nowIndex],
          messages: updatedList[nowIndex].messages.map((msg) => {
            if (
              (msg.id === -1 && msg.message === updatedMessage.message) ||
              msg.id === updatedMessage.id
            ) {
              messageUpdated = true;
              return { ...msg, ...updatedMessage };
            }
            return msg;
          }),
        };
      }

      // If no message was updated, add it as a new message
      if (!messageUpdated) {
        if (nowIndex !== -1) {
          updatedList[nowIndex].messages.push(updatedMessage);
        } else {
          updatedList.push({
            date: 'now',
            messages: [updatedMessage],
          });
        }
      }

      return {
        ...state,
        list: updatedList,
      };
    });
  }

  // this.setState((state) => {

  //   let messageUpdated = false;

  //   const updatedList = state.list.map((item) => {
  //   //   // if (item.date === 'now') {
  //       const updatedMessages = item.messages.map((msg) => {
  //   //       if (
  //   //         (msg.id === -1 && msg.message === updatedMessage.message) ||
  //   //         msg.id === updatedMessage.id
  //   //       ) {
  //   //         messageUpdated = true;
  //   //         return { ...msg, ...updatedMessage };
  //   //       }
  //   //       return msg;
  //   //     });

  //   //     return {
  //   //       ...item,
  //   //       messages: messageUpdated
  //   //         ? updatedMessages // If updated, return modified messages
  //   //         : [...updatedMessages, updatedMessage], // Otherwise, add new message
  //       // };
  //     // }
  //     // return item;
  //   // });

  //   // return { list: updatedList };

  // });
  // }
}
