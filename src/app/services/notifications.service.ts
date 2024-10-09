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
  unread_count;
  last_page = -1;
  list: any[] = [];

  private pusher: Pusher;

  constructor(private network: NetworkService) {}

  getNotificationsFromApi(search = '', page = 1) {
    return new Promise(async (resolve) => {
      let obj = {
        page: page,
      };
      const res = (await this.network.getAllNotifications(obj)) as any;
      console.log(res);
      const data = res.result;
      this.page = data.current_page;
      this.last_page = data.last_page;
      if (page === 1) {
        this.list = data.data;
        this.unread_count = this.list.filter((item) => !item.is_read).length;
        console.log('Unread count:', this.unread_count);
      } else {
        this.list = [...this.list, ...data.data];
        this.unread_count = this.list.filter((item) => !item.is_read).length;
        console.log('Updated unread count:', this.unread_count);
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
