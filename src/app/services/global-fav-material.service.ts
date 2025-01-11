import { Injectable } from '@angular/core';

import {
  NgSimpleStateBaseRxjsStore,
  NgSimpleStateStoreConfig,
} from 'ng-simple-state';
import { UsersService } from './users.service';
import { NetworkService } from './network.service';

export interface GlobalFavMaterailModel {
  user_id: number;
  course_id: number;
}
export type GlobalFavMaterailModelState = Array<GlobalFavMaterailModel>;
@Injectable({
  providedIn: 'root',
})
export class GlobalFavMaterialService extends NgSimpleStateBaseRxjsStore<GlobalFavMaterailModelState> {
  page = 1;
  last_page = -1;
  constructor(private users: UsersService, private network: NetworkService) {
    super();
  }
  storeConfig(): NgSimpleStateStoreConfig {
    return {
      storeName: 'GlobalFavMaterailModel',
    };
  }

  initialState(): GlobalFavMaterailModelState {
    return [];
  }

  getList() {
    return this.selectState((state) => state);
  }

  getCount() {
    return this.selectState((state) => state.length);
  }

  getCountPromise() {
    return new Promise((resolve) => {
      this.selectState((state) => state.length).subscribe((res) => {
        resolve(res);
      });
    });
  }
  getGlobalFavMaterialFromApi() {
    return new Promise(async (resolve) => {
      let res = await this.network.getAllFavMaterialIds();

      this.setState(() => res);
      resolve(true);
    });
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
