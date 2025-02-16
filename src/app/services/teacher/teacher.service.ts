import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';
import { EventsService } from '../events.service';
import { NetworkService } from '../network.service';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  
  ratingChannel: any;
  userChannel: any;

  constructor(private network: NetworkService, private events: EventsService) {
    
    
  }

  registerPusherEvent(pusher: Pusher, user_id: any) {

    this.userChannel = pusher.subscribe('admin-update-channel');
    this.ratingChannel = pusher.subscribe('rating-channel');

    this.ratingChannel.bind('rating-rec-' + user_id, this.ratingChannelReceived.bind(this));
    this.userChannel.bind('admin-update-rec-' + user_id, this.userChannelReceived.bind(this));

  }

  unRegisterPusherEvent(pusher: Pusher, user_id: number){  
    if (pusher) {
      pusher.unsubscribe('admin-update-channel');
      pusher.unsubscribe('rating-channel');
      pusher.disconnect();
    }
    this.ratingChannel.unbind('rating-rec-' + user_id);
    this.userChannel.unbind('admin-update-rec-' + user_id);
  }

  ratingChannelReceived($event: any) {
    this.events.publish('rating-rec-update-by-id', $event);
  }

  userChannelReceived($event: any) {
    this.events.publish('user-update-via-pusher', $event);    
  }


}
