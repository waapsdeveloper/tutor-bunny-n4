import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';
import { UsersService } from './users.service';
import { NetworkService } from './network.service';
import { EventsService } from './events.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  user: any;
  page = 1;
  last_page = -1;
  list: any[] = [];

  private pusher: Pusher;

  constructor(
    private users: UsersService,
    private network: NetworkService,
    private events: EventsService) { }

  getNotificationsFromApi(search = '', page = 1,) {
    return new Promise(async (resolve) => {
      let obj = {
        page: page,
      };
      const res = await this.network.getAllNotifications(obj) as any;
      const data = res.result;
      this.page = data.current_page;
      this.last_page = data.last_page;
      if (page === 1) {
        this.list = data.data;
      } else {
        this.list = [...this.list, ...data.data];
      }

      resolve(this.list);
    });
  }

  getAllNotifications() {
    return new Promise(async (resolve) => {
      if (this.list.length == 0) {
        await this.getNotificationsFromApi();
      }

      resolve(this.list);
    });
  }





}
