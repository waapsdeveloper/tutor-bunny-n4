import { Injectable } from '@angular/core';

import {
  NgSimpleStateBaseRxjsStore,
  NgSimpleStateStoreConfig,
} from 'ng-simple-state';
import { UsersService } from './users.service';
import { NetworkService } from './network.service';
import { NgrxCrudService } from './abstract/ngrx-crud.service';


@Injectable({
  providedIn: 'root'
})
export class GlobalTeacherService extends NgrxCrudService<any>  {

  ngrxModelName: string = 'GlobalTeachersModel';
  constructor(private users: UsersService, private network: NetworkService) {
    super();
  }

  getGlobalTeachersFromApi(search = '', page = 1) {
    

      const user = this.users.getUser();

      const params: any = { page };
      if (search) params.search = search;
      params.user_id = user.id;
  
      return new Promise(async (resolve) => {
        const res = await this.network.getAllTeachers(params);
        const data = res.result;
        this.setList(data.data, data.current_page, data.last_page, data.total);
        resolve(res);
      });

    //   const user = this.users.getUser();
    //   let obj = {
    //     search: search,
    //     page: page,
    //     user_id: user.id,
    //   };

    //   let res = await this.network.getAllTeachers(obj);


    //   const data = res.result;
    //   this.page = data.current_page;
    //   this.last_page = data.last_page;

    //   this.setState( (state) => {
    //     if (page === 1) {
    //       return data.data;
    //     }
    //     return [...state, ...data.data];
    //   });

    //   resolve(true);
    // });
  }
}
