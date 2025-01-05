import { Injectable } from '@angular/core';

import {
  NgSimpleStateBaseRxjsStore,
  NgSimpleStateStoreConfig,
} from 'ng-simple-state';
import { UsersService } from './users.service';
import { NetworkService } from './network.service';

export interface GlobalFavCoursesModel {
  user_id: number;
  course_id: number;

}

export type GlobalFavCoursesModelState = Array<GlobalFavCoursesModel>;

@Injectable({
  providedIn: 'root'
})
export class GlobalFavCoursesService extends NgSimpleStateBaseRxjsStore< GlobalFavCoursesModelState > {

  page = 1;
  last_page = -1;

  constructor(private users: UsersService, private network: NetworkService) {
    super();
  }

  storeConfig(): NgSimpleStateStoreConfig {
    return {
      storeName: 'GlobalFavCoursesModel',
    };
  }

  initialState(): GlobalFavCoursesModelState {
    return [];
  }

  getList(user_id: number) {
    return this.selectState((state) => state.filter((item: any) => item.user_id === user_id));
  }

  getListPromise(user_id: number) {
    return new Promise( (resolve) => {
      this.selectState((state) => state.filter((item: any) => item.user_id === user_id)).subscribe((res) => {
        resolve(res);
      });
    });
  }

  getCount(user_id: number) {
    return this.selectState((state) => state.filter((item: any) => item.user_id === user_id).length);
  }

  getCountPromise() {
    return new Promise((resolve) => {
      this.selectState((state) => state.length).subscribe((res) => {
        resolve(res);
      });
    });
  }

  getGlobalFavCoursesFromApi() {
    return new Promise(async (resolve) => {
      let res = await this.network.getAllFavCoursesIds();
      this.setState( () => res);
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
