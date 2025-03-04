import { Injectable } from '@angular/core';
import { NgrxCrudService } from './abstract/ngrx-crud.service';
import Pusher from 'pusher-js';
import { NetworkService } from './network.service';
import { ListRequestsService } from './teacher/list-requests.service';

@Injectable({
  providedIn: 'root',
})
export class ChatMessegesService extends NgrxCrudService<any> {
  ngrxModelName: string = 'ChatMessagesModel';

  messages: any[] = [];
  chatChannel: any;
  chats;
  unreadCount = 0;

  constructor(private network: NetworkService,private listRequestsService: ListRequestsService) {
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
}
