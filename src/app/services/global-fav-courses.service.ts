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
  providedIn: 'root',
})
export class GlobalFavCoursesService extends NgSimpleStateBaseRxjsStore<GlobalFavCoursesModelState> {  

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

  getList() {
    return this.selectState((state) => state );
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

  getGlobalFavCoursesFromApi() {
    return new Promise(async (resolve) => {
      let res = await this.network.getAllFavCoursesIds();
      this.setState(() => res);
      resolve(true);
    });
  }

  setList(list: any[]){
    this.setState((state) => {
      return list.length > 0 ? [...list] : [];
    })
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
