import { Injectable } from '@angular/core';

import { UsersService } from '../users.service';
import { NetworkService } from '../network.service';
import { NgrxCrudService } from '../abstract/ngrx-crud.service';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class ListRequestsService extends NgrxCrudService<any> {
  
  ngrxModelName: string = 'ListRequestsModel';

  requests;
  requestCount = 0;

  constructor(private users: UsersService, private network: NetworkService) { 
    super()
  }

  getRequests(page: number, search: string = '', status: string = ''): Promise<any> {

    const user = this.users.getUser();
    console.log(page, search, status, user.id)

    const params: any = { page };
    if (search) params.search = search;
    if (status) params.status = status;


    return new Promise(async (resolve) => {
      const res = await this.network.getRequestMessagesRoom(params, user.id);
      const data = res.result;
      this.setList(data.data, data.current_page, data.last_page, data.total);
      resolve(res);
    });
  }
}
