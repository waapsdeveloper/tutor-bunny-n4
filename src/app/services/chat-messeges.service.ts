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
  chatChannel: any;
  constructor(private network: NetworkService, private events: EventsService) {
    super();
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

  async chatChannelReceived($event: any) {
    let data = $event;
    console.log('data-chat', data);
    if (data.chat_room_id) {
      const chatRoomId = await this.returnChatroomIdFromListInState();
      if (chatRoomId === data.chat_room_id) {
        this.updateMessageInState(data)
        this.events.publish("scroll-to-bottom");
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
    this.setState( (state) => {
      // ...state,
      // list: [...state.list, messageObject],

      let messageFound = false;

      const updatedList = state.list.map((item) => {

        let lastIndexNow = state.list
        .find(item => item.date === "now");

        if(lastIndexNow != -1){ 
          messageFound = true;
          return {
            ...item,
            messages: [...item.messages, messageObject]
          };
          
        }
        
        messageFound = false;
        return item;
      })

      if(!messageFound){
        updatedList.push({
          date: 'now',
          messages: [messageObject]
        })
      }

      return {
        ...state,
        list: updatedList
      }

    });
  }

  updateMessageInState(updatedMessage: any) {

    this.setState( (state) => {

      let messageFound = false;

      const updatedList = state.list.map( (item) => {

        let lastIndexNow = state.list
        .find(item => item.date === "now");
        // .pop() || -1; // Return -1 if undefined

        console.log(lastIndexNow)

        if(lastIndexNow != -1){

          const updatedMessages = item.messages.map((msg) => {
            if (
              (msg.id === -1 && msg.message === updatedMessage.message) ||
              msg.id === updatedMessage.id
            ) {
              messageFound = true;
              return {
               ...msg,
               ...updatedMessage
              };
            }

            messageFound = false;
            return msg;
          })
        }

        messageFound = false;
        return item;

      })

      if(!messageFound){
        updatedList.push({
          date: 'now',
          messages: [updatedMessage]
        })
      }

      return {
        ...state,
        list: updatedList
      }

    });

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
  }
}
