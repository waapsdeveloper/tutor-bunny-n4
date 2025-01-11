import { Injectable } from '@angular/core';

import {
  NgSimpleStateBaseRxjsStore,
  NgSimpleStateStoreConfig,
} from 'ng-simple-state';
import { UsersService } from './users.service';
import { NetworkService } from './network.service';

export interface GlobalCartModel {
  user_id: number;
  id: number;
  item: any;
}

export type GlobalCartModelState = Array<GlobalCartModel>;


@Injectable({
  providedIn: 'root'
})
export class CartService extends NgSimpleStateBaseRxjsStore<GlobalCartModelState> {

  constructor() { 
    super()
  }

  
  storeConfig(): NgSimpleStateStoreConfig {
    return {
      storeName: 'GlobalCartModel',
    };
  }

  initialState(): GlobalCartModelState {
    return [];
  }

  getList() {
    return this.selectState((state) => state);
  }

  getListPromise() {
    return new Promise((resolve) => {
      this.selectState((state) => state).subscribe((res) => {
        resolve(res);
      });
    });
  }

  getCount() {
    return this.selectState(
      (state) => state.length
    );
  }

  getCountPromise() {
    return new Promise((resolve) => {
      this.selectState((state) => state.length).subscribe((res) => {
        resolve(res);
      });
    });
  }

  isItemExist(id){
    return this.selectState(
      (state) => state.filter((item: any) => item.id === id).length
    );
  }

  setItem(obj: any) {
    this.setState((state) => {
      const exists = state.some((item: any) => item.id === obj.id);
      if (exists) {
        // Update existing item
        return state.map((item: any) => (item.id === obj.id ? obj : item));
      } else {
        // Add new item
        return [...state, obj];
      }
    });
  }

  setRemove(obj: any) {
    this.setState((state) => state.filter((item: any) => item.id !== obj.id));
  }


}
