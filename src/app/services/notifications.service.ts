import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';
import { EventsService } from './events.service';

import {
  NgSimpleStateBaseRxjsStore,
  NgSimpleStateStoreConfig,
} from 'ng-simple-state';
import { UsersService } from './users.service';
import { NetworkService } from './network.service';

export interface GlobalNotificationModel {
  unread_count: number;
  list: any[];
  page: number,
  last_page: number,
  total: number
}

@Injectable({
  providedIn: 'root',
})
export class NotificationsService extends NgSimpleStateBaseRxjsStore<GlobalNotificationModel> {

  user: any;
  
  
  private pusher: Pusher;
  notificationChannel: any;

  constructor(
    private network: NetworkService,
    private users: UsersService,
    private events: EventsService
  ) {
    super();

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

  storeConfig(): NgSimpleStateStoreConfig {
    return {
      storeName: 'GlobalNotificationModel',
    };
  }

  initialState(): GlobalNotificationModel {
    return {
      unread_count: 0,
      list: [],
      page: 1,
      last_page: -1,
      total: 0
    };
  }

  getState(){
    return this.selectState((state) => state);
  }

  getList() {
    return this.selectState((state) => state.list);
  }

  getListPromise() {
    return new Promise((resolve) => {
      this.selectState((state) => state.list).subscribe((res) => {
        resolve(res);
      });
    });
  }

  getCount() {
    return this.selectState(
      (state) => state.list.length
    );
  }

  getCountPromise() {
    return new Promise((resolve) => {
      this.selectState((state) => state.list.length).subscribe((res) => {
        resolve(res);
      });
    });
  }

  getUnreadCount() {
    return this.selectState(
      (state) => state.unread_count
    );
  }

  getUnreadCountPromise() {
    return new Promise((resolve) => {
      this.selectState((state) => state.unread_count).subscribe((res) => {
        resolve(res);
      });
    });
  }

  getPagePromise() {
    return new Promise((resolve) => {
      this.selectState((state) => state.page).subscribe((res) => {
        resolve(res);
      });
    });
  }

  getLastPagePromise() {
    return new Promise((resolve) => {
      this.selectState((state) => state.last_page).subscribe((res) => {
        resolve(res);
      });
    });
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
    this.setItem(res.data)
    // this.list.unshift(res.data);
    // if (res.data.is_open === 0) {
    //

    // this.unread_count = this.unread_count + 1;
    // }



  }

  setItem(obj: any) {
    this.setState((state) => {
      const exists = state.list.some((item: any) => item.id === obj.id);
      return {
        ...state, // Keep other parts of the state unchanged
        list: exists
          ? state.list.map((item: any) => (item.id === obj.id ? obj : item)) // Update existing item
          : [obj, ...state.list], // Add new item
      };
    });
  }
  

  setRemove(obj: any) {
    this.setState((state) => ({
      ...state, // Preserve other state properties
      list: state.list.filter((item: any) => item.id !== obj.id), // Remove the item with matching ID
    }));
  }
  
  setList(list: any[]){
    this.setState((state) => ({
      ...state, // Preserve other state properties
      list: list
    }));
  }

  setPage(page: number){
    this.setState((state) => ({
      ...state, // Preserve other state properties
      page: page
    }));
  }

  setLastPage(last_page: number){
    this.setState((state) => ({
      ...state, // Preserve other state properties
      last_page: last_page
    }));
  }

  setUnreadCount(unread_count: number){
    this.setState((state) => ({
      ...state, // Preserve other state properties
      unread_count: unread_count
    }));
  }



  getNotificationsFromApi(search = '', page = 1) {    
    

    return new Promise(async (resolve) => {
      let obj = {
        page: page,
      };
      const res = (await this.network.getAllNotifications(obj)) as any;
      const data = res.result;

      let list = await this.getListPromise() as any[];

      this.setPage(data.current_page);
      this.setLastPage(data.last_page);

      if (page === 1) {
        list = data.data;
      } else {
        list = [...list, ...data.data];        
      }

      this.setList(list)

      // const openItemsArray = list.filter((item) => item.is_open === 0);

        // this.unread_count = openItemsArray.length;

      resolve(list);
    });
  }

  getNotificationUnreadCount(){
    return new Promise( async (resolve) => {

      let count = 0;
      const res = await this.network.getNotificationUnreadCount();
      console.log(res)
      this.setUnreadCount(res.unread_count)
      resolve(count);

    });
  }

  setNotificationUnreadCount(params: {unread_count: number}){
    return new Promise( async (resolve) => {

      const res = await this.network.getNotificationUnreadCount();
      this.setUnreadCount(res.unread_count)
      resolve(res.unread_count);

    });
  }

  async sendIsOpenToApis(list) {
    let ids = list.map((item) => item.id);
    let object = {
      ids: ids,
    };
    await this.network.notificationRead(object);

    // this.unread_count = 0;
  }

  // getAllNotifications() {
  //   return new Promise(async (resolve) => {
  //     if (this.list.length == 0) {
  //       await this.getNotificationsFromApi();
  //     }

  //     resolve(this.list);
  //   });
  // }

  loadMoreNotifications() {
    return new Promise( async (resolve) => {

      const page = await this.getPagePromise() as number;
      const last_page = await this.getLastPagePromise() as number;


      if (page < last_page) {
        this.getNotificationsFromApi('', page + 1);
      }

      resolve(true);
    });
  }
}
