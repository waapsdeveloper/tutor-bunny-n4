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

  getGlobalTeacherTrialFromApi(search = '', page = 1, perpage = 10) {
    return new Promise(async (resolve) => {
      const user = await this.users.getUser();
      const params: any = { teacher_id: user.id };
      if (search) params.search = search;
      if (page) params.page = page;
      if (perpage) params.perpage = perpage;

      let res = await this.network.geTeacherTrialList(params);
      const data = res.result;
      this.setList(data.data, data.current_page, data.last_page, data.total);
      resolve(res);
    });
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
