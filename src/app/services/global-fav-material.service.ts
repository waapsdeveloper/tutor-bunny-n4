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
  providedIn: 'root'
})
export class GlobalFavMaterialService extends NgSimpleStateBaseRxjsStore< GlobalFavMaterailModelState >{

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
  }


