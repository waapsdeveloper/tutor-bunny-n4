import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalTrialsService {

  user: any;
  trials: any[] = [];
  pendingTrials: any[] = []


  constructor(private users: UsersService, private network: NetworkService) { }

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
