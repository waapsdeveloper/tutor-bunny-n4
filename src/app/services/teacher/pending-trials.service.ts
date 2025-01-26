import { Injectable } from '@angular/core';

import {
  NgSimpleStateBaseRxjsStore,
  NgSimpleStateStoreConfig,
} from 'ng-simple-state';
import { UsersService } from '../users.service';
import { NetworkService } from '../network.service';
import { NgrxCrudService } from '../abstract/ngrx-crud.service';
@Injectable({
  providedIn: 'root'
})
export class PendingTrialsService extends NgrxCrudService<any> {
  
  ngrxModelName: string = 'PendingTrialsModel';

  constructor(private users: UsersService, private network: NetworkService,) {
    super();
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
      this.setList(data.list, data.page, data.last_page, data.total);
      
      resolve(true);
    });
  }






}
