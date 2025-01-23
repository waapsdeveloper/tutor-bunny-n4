import { Injectable } from '@angular/core';

import {
  NgSimpleStateBaseRxjsStore,
  NgSimpleStateStoreConfig,
} from 'ng-simple-state';
import { UsersService } from './users.service';
import { NetworkService } from './network.service';


export interface GlobalStudyMaterialModel {
    id: number
    is_liked_by_me: boolean,
    user_id: 57,
    user: any,
    title: string,
    description: string,
    language_id: number,
    image: string,
    price: string,
    keywords: [],
    auth_user_currency_symbol: string,
    updated_price: string
}

export type GlobalStudyMaterialModelState = Array<GlobalStudyMaterialModel>;

@Injectable({
  providedIn: 'root'
})
export class GlobalStudyMaterialService extends NgSimpleStateBaseRxjsStore<GlobalStudyMaterialModelState> {


  page = 1;
  last_page = -1;

  constructor(private users: UsersService, private network: NetworkService) {
    super();
  }

  storeConfig(): NgSimpleStateStoreConfig {
    return {
      storeName: 'GlobalStudyMaterialModel',
    };
  }

  initialState(): GlobalStudyMaterialModelState {
    return [];
  }

  getList() {
    return this.selectState((state) => state);
  }

  getItem(id) {
    return this.selectState((state) => state.find((x) => x.id == id));
  }

  getItemPromise(id) {
    return new Promise((resolve) => {
      this.selectState((state) => state.find((x) => x.id == id)).subscribe((res) => {
        resolve(res);
      });
    });
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

  getGlobalStudyMaterialFromApi(search = '', page = 1) {
    return new Promise(async (resolve) => {
      const user = this.users.getUser();
      let obj = {
        search: search,
        page: page,
        user_id: user.id,
      };

      let res = await this.network.getAllMaterials(obj);


      const data = res.result;
      this.page = data.current_page;
      this.last_page = data.last_page;

      this.setState( (state) => {
        if (page === 1) {
          return data.data;
        }
        return [...state, ...data.data];
      });

      resolve(true);
    });
  }

  getMyStudyMaterialFromApi(search = '', page = 1) {
    return new Promise(async (resolve) => {
      const user = this.users.getUser();
      let obj = {
        search: search,
        page: page,
        user_id: user.id,
      };

      let res = await this.network.getMyMaterialList(obj, user.id);

      const data = res.result;
      this.page = data.current_page;
      this.last_page = data.last_page;

      this.setState( (state) => {
        if (page === 1) {
          return data.data;
        }
        return [...state, ...data.data];
      });

      resolve(true);
    });
  }


}
