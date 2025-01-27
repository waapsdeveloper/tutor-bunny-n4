import { Injectable } from '@angular/core';
import { UsersService } from '../users.service';
import { NetworkService } from '../network.service';
import { NgrxCrudService } from '../abstract/ngrx-crud.service';
import Pusher from 'pusher-js';
@Injectable({
  providedIn: 'root'
})
export class PendingTrialsService extends NgrxCrudService<any> {
  
  trialChannel: any;
  private pusher: Pusher;

  ngrxModelName: string = 'PendingTrialsModel';

  constructor(private users: UsersService, private network: NetworkService,) {
    super();

    const options = {
      cluster: 'ap2',
      forceTLS: true,
    };
    this.pusher = new Pusher('a45efbe1a2e731b6dbfb', options);
    this.trialChannel = this.pusher.subscribe('trials-channel');

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
      this.setList(data.data, data.page, data.last_page, data.total);
      
      resolve(true);
    });
  }

  changeTrailStuts(trailId, key, userId) {
    return new Promise(async (resolve) => {
      let obj = {
        status: key,
        user_id: userId,
      };
      let res = await this.network.changeTrailStuts(obj, trailId);
      
      if (res) {
        if(key == 'Accepted' || key == 'Rejected'){
          this.removeItem(trailId);
        }  
      }

      resolve(res);
    });
  }








}
