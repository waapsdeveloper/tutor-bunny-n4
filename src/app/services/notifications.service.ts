import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';
import { UsersService } from './users.service';
import { NetworkService } from './network.service';
import { EventsService } from './events.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  user: any;
  page = 1;
  unread_count = 0;
  ids: any[] = [];
  shownoti;
  last_page = -1;
  list: any[] = [];
  notificationChannel: any;
  private pusher: Pusher;

  constructor(
    private network: NetworkService,
    private users: UsersService,
    private events: EventsService
  ) {
    const options = {
      cluster: 'ap2',
      forceTLS: true,
    };
    this.pusher = new Pusher('a45efbe1a2e731b6dbfb', options);
    this.notificationChannel = this.pusher.subscribe('notification-channel');
    this.events.subscribe(
      'clear-all-services-data',
      () => {
        this.user = null;
        if (this.pusher) {
          this.pusher.unsubscribe('notification-channel');
          this.pusher.disconnect();
        }
        this.events.unsubscribe('notification-received-via-pusher');
      },
      false
    );
  }

  registerPusherEvent() {
    let user = this.users.getUser() as any;


    this.notificationChannel.bind(
      'notification-rec-' + user.id,

      this.notificationChannelReceived.bind(this)
    );
  }
  unRegisterPusherEvent() {
    let user = this.users.getUser() as any;

    if (this.pusher) {
      this.pusher.unsubscribe('notification-channel');
      this.pusher.disconnect();
    }
    this.notificationChannel.unbind('notification-rec-' + user.id);
    this.events.unsubscribe('notification-received-via-pusher');
  }

  async notificationChannelReceived($event: any) {
    this.events.publish('notification-received-via-pusher', $event);

    let id = $event.notification_id;

    let res = await this.network.getNotificationById(id);


    this.list.unshift(res.data);
    // if (res.data.is_open === 0) {
    //

    this.unread_count = this.unread_count + 1;
    // }



  }

  getNotificationsFromApi(search = '', page = 1) {
    return new Promise(async (resolve) => {
      let obj = {
        page: page,
      };
      const res = (await this.network.getAllNotifications(obj)) as any;
      const data = res.result;
      this.page = data.current_page;
      this.last_page = data.last_page;
      if (page === 1) {
        this.list = data.data;
        const openItemsArray = this.list.filter((item) => item.is_open === 0);

        this.unread_count = openItemsArray.length;
      } else {
        this.list = [...this.list, ...data.data];
        const openItemsArray = this.list.filter((item) => item.is_open === 0);

        this.unread_count = openItemsArray.length;
      }
      resolve(this.list);
    });
  }

  async sendIsOpenToApis() {
    let ids = this.list.map((item) => item.id);
    let object = {
      ids: ids,
    };
    let response = await this.network.notificationRead(object);

    this.unread_count = 0;
  }

  getAllNotifications() {
    return new Promise(async (resolve) => {
      if (this.list.length == 0) {
        await this.getNotificationsFromApi();
      }

      resolve(this.list);
    });
  }

  loadMoreNotifications() {
    return new Promise((resolve) => {
      if (this.page < this.last_page) {
        this.page = this.page + 1;
        this.getNotificationsFromApi('', this.page);
      }

      resolve(true);
    });
  }
}
