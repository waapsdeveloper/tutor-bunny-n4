import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';
import { EventsService } from './events.service';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private pusher: Pusher;
  ratingChannel: any;
  userChannel: any;

  constructor(private network: NetworkService, private events: EventsService) {
    this.events.subscribe('clear-all-services-data', () => {
      this.ratingChannel =null;
      this.userChannel = null
    });
    const options = {
      cluster: 'ap2',
      forceTLS: true,
    };
    this.pusher = new Pusher('a45efbe1a2e731b6dbfb', options);
    this.userChannel = this.pusher.subscribe('admin-update-channel');
    this.ratingChannel = this.pusher.subscribe('rating-channel');
  }

  registerPusherEvent(id: any) {
    console.log(id);

    this.ratingChannel.bind(
      'rating-rec-' + id,
      this.ratingChannelReceived.bind(this)
    );
    this.userChannel.bind(
      'admin-update-rec-' + id,
      this.userChannelReceived.bind(this)
    );
  }

  ratingChannelReceived($event: any) {
    this.events.publish('rating-rec-update-by-id', $event);
  }

  userChannelReceived($event: any) {
    console.log($event);
    this.events.publish('user-update-via-pusher', $event);
  }
}
