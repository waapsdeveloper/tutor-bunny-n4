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

  getGlobalFavCoursesFromApi() {
    return new Promise(async (resolve) => {

      let res = await this.network.getAllFavCoursesIds();


      resolve(true);
    });
  }
}
