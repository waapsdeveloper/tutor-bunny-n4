import { Injectable } from '@angular/core';

import {
  NgSimpleStateBaseRxjsStore,
  NgSimpleStateStoreConfig,
} from 'ng-simple-state';
import { UsersService } from './users.service';
import { NetworkService } from './network.service';

export interface PendingTrialsModel   {
  id: number;
  date: string;
  course: any;
  student: any;
  teacher: any;
  status: string;
}

export type PendingTrialsModelState = Array<PendingTrialsModel>;

@Injectable({
  providedIn: 'root'
})
export class PendingTrialsService  extends NgSimpleStateBaseRxjsStore<PendingTrialsModelState> {

  page = 1;
  last_page = -1;


  constructor(private users: UsersService, private network: NetworkService,) {
    super();
  }


  storeConfig(): NgSimpleStateStoreConfig {
    return {
      storeName: 'PendingTrialsModelState',
    };
  }

  initialState(): PendingTrialsModelState {
    return [];
  }

  getList() {
    return this.selectState( (state) => state );
  }

  getCount() {
    return this.selectState( (state) => state.length);
  }

  getCountPromise() {
    return new Promise((resolve) => {
      this.selectState( (state) => state.length).subscribe( (res) => {
        resolve(res);
      });
    });

  }



  getPendingTrialsFromApi(search = '', page = 1) {
    return new Promise(async (resolve) => {
      const user = this.users.getUser();
      let obj = {
        search: search,
        page: page,
        teacher_id: user.id,
      };
      let res = await this.network.getPendingTrial(user.id, obj);


      const data = res.result;
      this.page = data.current_page;
      this.last_page = data.last_page;

      this.setState( (state) => {
        if (page === 1) {
          return data.data;
        }
        return [...state, ...data.data];
      });

      // if (page === 1) {
      //   this.pendingTrials = data.data;
      // } else {
      //   this.pendingTrials = [...this.pendingTrials, ...data.data];
      // }
      resolve(true);
    });
  }


  setRemove(obj: any) {
    this.setState((state) => state.filter((item: any) => item.id !== obj.id));
  }




}
