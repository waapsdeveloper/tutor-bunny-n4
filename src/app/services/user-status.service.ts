import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class UserStatusService {

  constructor(private network: NetworkService, private users: UsersService) { }

  async initialize(){

    const user = this.users.getUser();

    if(!user){
      return;
    }

    //
    let obj = {
      'user_id' : user.id,
      'is_online' : true
    }
    const res = await this.network.updateUserStatus(obj);
    console.log(res)
  }

  async userLeftApp(){

    const user = this.users.getUser();

    if(!user){
      return;
    }

    let obj = {
      'user_id' : user.id,
      'is_online' : false
    }
    const res = await this.network.updateUserStatus(obj);
    console.log(res)

  }

  async getUserStatus(userId): Promise<any>{

    const res = await this.network.getUserStatus(userId);
    return res.status;

  }





}
