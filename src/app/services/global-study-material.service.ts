import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { NetworkService } from './network.service';
import { NgrxCrudService } from './abstract/ngrx-crud.service';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class GlobalStudyMaterialService extends NgrxCrudService<any> {


  trialChannel: any;
  private pusher: Pusher;

  ngrxModelName: string = 'GlobalStudyMaterialModel';

  constructor(private users: UsersService, private network: NetworkService) {
    super();
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
      this.setList(data.data, data.page, data.last_page, data.total);

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
      this.setList(data.data, data.page, data.last_page, data.total);

      resolve(true);
    });
  }


}
