import { Injectable } from '@angular/core';
import { NetworkService } from '../network.service';
import { UsersService } from '../users.service';
import { NgrxCrudService } from '../abstract/ngrx-crud.service';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class ListTrialsService extends NgrxCrudService<any> {

  ngrxModelName: string = 'ListTrialsModel';

  trialChannel: any;
  private pusher: Pusher;

  constructor(private network: NetworkService, private users: UsersService) { 
    super();

    const options = {
      cluster: 'ap2',
      forceTLS: true,
    };
    this.pusher = new Pusher('a45efbe1a2e731b6dbfb', options);
    this.trialChannel = this.pusher.subscribe('trials-channel');

  }


  getTrials(page: number, search: string = '', status: string = ''): Promise<any> {

    const user = this.users.getUser();

    const params: any = { page };
    if (search) params.search = search;
    if (status) params.status = status;

    return new Promise(async (resolve) => {
      const res = await this.network.geTrailRequests(params, user.id);
      const data = res.result;
      this.setList(data.data, data.current_page, data.last_page, data.total);
      resolve(res);
    });
  }

  async changeStatus(obj, trialId) {
    
    let res = await this.network.changeTrailStuts(obj, trialId);
    if(res){
      this.setItem(res.trial);
    }
    
    // if (res.status === 200) {
    //   let findIndex = this.list.findIndex((x) => x.id == trialId);

    //   if (findIndex != -1) {
    //     this.events.publish('update-trail-list');
    //     this.list[findIndex] = res.trial;
    //   }
    // }
  }



}
