import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { NetworkService } from './network.service';
import { EventsService } from './events.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalTrialsService {

  user: any;
  page = 1;
  last_page = -1;
  status;
  list: any[] = [];
  courseId: any;
  pendingTrialPage = 1;
  pendingTrialLastPage = -1;
  pendingTrials: any[] = []


  constructor(private users: UsersService, private network: NetworkService, private events: EventsService) {
    this.trialsReceivedViaPusher();
  }

  trialsReceivedViaPusher() {
    this.events.subscribe('trials-received-via-pusher', this.updateTrailsList.bind(this));
  }

  async updateTrailsList(data: any) {

    console.log(data);
    const trialObj = Object.assign({}, data);
    // trial id required

    const index = this.list.findIndex(x => x.id == trialObj.id );
    if(index != -1){

    } else {

    }

    const indexp = this.pendingTrials.findIndex(x => x.id == trialObj.id );
    if(indexp != -1){

    } else {

    }


    // const course = data.course;
    // if(course){
    //   const trial =
    // }
    // const

    // this.courseId = data.course_id;
    // if (this.courseId) {
    //   this.getTrials('', 1);
    //   const index = this.list.findIndex(c => c.id === this.courseId);
    // }
  }
  getPendingTrialsFromApi(search = '', page = 1,) {

    return new Promise(async resolve => {

      this.user = this.users.getUser();
      let obj = {
        search: search,
        page: page,
        teacher_id: this.user.id
      }
      let res = await this.network.getPendingTrial(this.user.id, obj);
      const data = res.result;
      this.pendingTrialPage = data.current_page;
      this.pendingTrialLastPage = data.last_page;
      if (page === 1) {
        this.pendingTrials = data.data;
      } else {
        this.pendingTrials = [...this.pendingTrials, ...data.data];
      }

      resolve(true)

    })

  }

  getPendingTrials() {

    return new Promise(async resolve => {

      if (this.pendingTrials.length > 0) {
        resolve(this.pendingTrials);
        return;
      }

      this.user = this.users.getUser();
      let obj = {
        teacher_id: this.user.id
      }
      let res = await this.network.getPendingTrial(this.user.id, obj);
      this.pendingTrials = res.trials;

    })

  }

  removeFromPendingTrials(obj) {

    const index = this.pendingTrials.findIndex(x => x.id == obj.id);
    if (index > -1) {
      this.pendingTrials.splice(index, 1);
      console.log(`Removed favorite:`, obj);
    } else {
      console.log(`Favorite not found:`, obj);
    }


  }

  async getTrials(search = '', page = 1) {

    return new Promise(async resolve => {

      this.user = this.users.getUser();

      let obj = {
        search: search,
        page: page
      }

      if (this.status) {
        obj['status'] = this.status
      }

      const res = await this.network.geTrailRequests(obj, this.user.id);
      const result = res.result;
      this.page = result.current_page;
      this.last_page = result.last_page;
      if (this.page == 1) {
        this.list = result["data"];
      } else {
        this.list = [...this.list, ...result["data"]]
      }

      resolve(true)

    })

    // this.list = res.trials;

  }

  async changeStatus(obj, trialId) {

    let res = await this.network.changeTrailStuts(obj, trialId);
    if (res.status === 200) {

      let findIndex = this.list.findIndex(x => x.id == trialId)
      if (findIndex != -1) {
        this.list[findIndex] = res.trial;
      }

    }




  }



}
