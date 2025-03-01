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

  chatChannelReceived($event: any) {
    let data = $event;
    console.log('data-chat', data);
    if (data.chat_room_id) {
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

  addMessageInState(messageObject: any) {
    this.setState((state) => ({
      ...state,
      list: [...state.list, messageObject],
    }));
  }

  updateMessageInState(updatedMessage: any) {
    this.setState((state) => ({
      list: state.list.map((item) => ({
        ...item,
        messages: item.messages.map((msg) =>
          (msg.id === -1 && msg.message === updatedMessage.message) ||
          msg.id === updatedMessage.id
            ? { ...msg, ...updatedMessage }
            : msg
        ),
      })),
    }));
  }
}
