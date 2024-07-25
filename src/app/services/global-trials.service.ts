import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalTrialsService {

  user: any;
  trials: any[] = [];

  pendingTrialPage = 1;
  pendingTrialLastPage = -1;
  pendingTrials: any[] = []


  constructor(private users: UsersService, private network: NetworkService) { }

  getPendingTrialsFromApi(search = '', page = 1,){

    return new Promise( async resolve => {

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

  getPendingTrials(){

    return new Promise( async resolve => {

      if(this.pendingTrials.length > 0){
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

  removeFromPendingTrials(obj){

    const index = this.pendingTrials.findIndex(x => x.id == obj.id);
    if (index > -1) {
      this.pendingTrials.splice(index, 1);
      console.log(`Removed favorite:`, obj);
    } else {
      console.log(`Favorite not found:`, obj);
    }


  }



}
