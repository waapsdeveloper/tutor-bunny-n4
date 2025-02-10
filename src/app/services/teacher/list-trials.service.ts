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

  unRegisterPusherEvent(){  
    let user = this.users.getUser() as any;
    if (this.pusher) {
      this.pusher.unsubscribe('trials-channel');
      this.pusher.disconnect();
    }
    this.trialChannel.unbind('trials-rec-' + user.id);
  }

  registerPusherEvent() {

    let user = this.users.getUser() as any;
    console.log('global-trials-pusher = trials-rec-' + user.id);
    this.trialChannel.bind(
      'trials-rec-' + user.id,
      this.trialsChannelReceived.bind(this)
    );
  }

  async trialsChannelReceived(obj: {trial_id: number}) {

    let res = await this.network.geTeacherTrialSingle(obj);
    console.log(res)

    if(!res.result){
      this.removeItem(obj.trial_id)
      return;
    }

    this.setItem(res.result);


    // this.updateTrailsList(res.trial);


    // const user = this.users.getUser();
    // if(user.role_id == 2){

    //   // check if user is student 
    //   // check if the student has a course of that trial 
    //   // update course key trial to the receievd object
    //   let obj = Object.assign({}, $event);
    //   console.log(obj);


    // }

    // if ($event) {
    //   if ($event.slug) {
    //     let trialId = $event.trial_id;
    //     this.removeFromListAndPendingTrials(trialId);
    //     this.GlobalCourses.getCoursesFromApi();
    //     this.events.publish('get-dashboard-stats');
    //     this.events.publish('update-notifications');
    //   } else {
    //     let id = $event.trial_id;
    //     let res = await this.network.geTrailRequestsByPusher(id);
    //     this.updateTrailsList(res.trial);
    //     this.events.publish('update-notifications');
        
        
    //     if (user.role_id == 3) {
    //       let shownoti = true;
    //       this.user = this.users.getUser();
    //       this.events.publish('show-noti-dot', shownoti);
    //     }
    //     this.events.publish('get-dashboard-stats');
    //   }
    // }
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

  getTrialsByIds(ids: any){
    return new Promise(async (resolve) => {
      const res = await this.network.geTrailsByIds(ids);
      const data = res;
      console.log(data)
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
