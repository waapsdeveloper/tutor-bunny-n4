import { Injectable } from '@angular/core';

import {
  NgSimpleStateBaseRxjsStore,
  NgSimpleStateStoreConfig,
} from 'ng-simple-state';
import { UsersService } from './users.service';
import { NetworkService } from './network.service';

export interface GlobalTeachersModel {
  id: number;
}

export type GlobalTeachersModelState = Array<GlobalTeachersModel>;

@Injectable({
  providedIn: 'root'
})
export class GlobalTeacherService extends NgSimpleStateBaseRxjsStore< GlobalTeachersModelState > {

  page = 1;
  last_page = -1;

  constructor(private users: UsersService, private network: NetworkService) {
    super();
  }

  storeConfig(): NgSimpleStateStoreConfig {
    return {
      storeName: 'GlobalTeachersModel',
    };
  }

  initialState(): GlobalTeachersModelState {
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

  getGlobalTeachersFromApi(search = '', page = 1) {
    return new Promise(async (resolve) => {
      const user = this.users.getUser();
      let obj = {
        search: search,
        page: page,
        user_id: user.id,
      };

      let res = await this.network.getAllTeachers(obj);
      console.log('teachers', res);

      const data = res; // res.result;
      // this.page = data.current_page;
      // this.last_page = data.last_page;

      this.setState( (state) => {
        if (page === 1) {
          return data //data.data;
        }
        return [...state, ...data.data];
      });

      resolve(true);
    });
  }
}
