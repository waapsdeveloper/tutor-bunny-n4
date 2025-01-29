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


  getGlobalStudyMaterialFromApi(page = 1, search = '' ): Promise<any> {
    // return new Promise(async (resolve) => {
    //   const user = this.users.getUser();
    //   let obj = {
    //     search: search,
    //     page: page,
    //     user_id: user.id,
    //   };

    //   let res = await this.network.getAllMaterials(obj);


    //   const data = res.result;
    //   this.setList(data.data, data.page, data.last_page, data.total);

    //   resolve(true);
    // });

    const user = this.users.getUser();

    const params: any = { page };
    if (search) params.search = search;
    params.user_id = user.id;

    return new Promise(async (resolve) => {
      const res = await this.network.getAllMaterials(params);
      const data = res.result;
      this.setList(data.data, data.current_page, data.last_page, data.total);
      resolve(res);
    });
  }

  getMyStudyMaterialFromApi(page = 1, search = '' ): Promise<any> {

    const user = this.users.getUser();

    const params: any = { page };
    if (search) params.search = search;

    return new Promise(async (resolve) => {
      const res = await this.network.getMyMaterialList(params, user.id);
      const data = res.result;
      this.setList(data.data, data.current_page, data.last_page, data.total);
      resolve(res);
    });

    // return new Promise(async (resolve) => {
    //   const user = this.users.getUser();
    //   let obj = {
    //     search: search,
    //     page: page,
    //     user_id: user.id,
    //   };

    //   let res = await this.network.getMyMaterialList(obj, user.id);

    //   const data = res.result;
    //   this.setList(data.data, data.page, data.last_page, data.total);

    //   resolve(true);
    // });
  }


}
