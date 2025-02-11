import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';

import {
  NgSimpleStateBaseRxjsStore,
  NgSimpleStateStoreConfig,
} from 'ng-simple-state';
import { UtilityService } from './utility.service';
import { EventsService } from './events.service';

export interface UserModel {
  id: number;
  name: string;
  displayName: string;
  currency: string;
  status: string;
  image: string;
  total_rating: number;
  avg_rating: number;
  flag: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService extends NgSimpleStateBaseRxjsStore<UserModel> {

  private _user;
  image = null;

  constructor(private network: NetworkService, private utility: UtilityService, private events: EventsService) {
    super();

    this.events.subscribe('user-update-via-pusher', this.updateUserEvent.bind(this));

  }

  updateUserEvent(event: any){
    console.log("update user", event )
  }

  storeConfig(): NgSimpleStateStoreConfig {
    return {
      storeName: 'userStore',
    };
  }

  protected initialState(): UserModel {
    return {
      id: -1,
      name: '',
      displayName: '',
      currency: '$',
      status: '',
      image: '',
      total_rating: 0,
      avg_rating: 0,
      flag: 'US'
    };
  }
  resetUserState() {
    this._user = null;  // Clear local user object
    this.image = null;

    // Reset ngSimpleState
    this.resetState();

    // Remove persisted userStore from localStorage (if ngSimpleState persists it)
    localStorage.removeItem('NgSimpleState::userStore');
}

  getUserState(){
    return this.selectState( (state) => state );
  }

  getUser() {
    if (!this._user) {
      const res = localStorage.getItem('user');
      if (res) {
        this._user = JSON.parse(res);
      }
    }
    return this._user;
  }

  async setUser(user): Promise<any> {
    // const aww = await this.userSq.setUserInDatabase(user);
    localStorage.setItem('user', JSON.stringify(user));


    this._user = user;
    this.image = user.image;

    this.setState( state => ({
      ...state,
      id: user.id,
      name: user.name,
      image: user.image,
    }));

    if(user.role_id == 2){
      this.setStudent(user);
    }

    if(user.role_id == 3){
      this.setTeacher(user);
    }

    return user;
  }



  setTeacher(user) {

    let v = user?.teacher?.country?.currency_symbol;
    this.setCurrency(v ?? '$');

    let status = user?.teacher?.status;
    this.setState( state => ({
      ...state,
      status: status
    }));

    // setDisplayName
    let displayName = this.utility.getAmericanName(user.name);
    this.setState( state => ({
      ...state,
      displayName: displayName
    }));

    let total_rating = user?.teacher?.total_rating ?? 0;

    this.setState( state => ({
      ...state,
      total_rating: total_rating
    }));

    let avg_rating = user?.teacher?.avg_rating ?? 0;

    this.setState( state => ({
      ...state,
      avg_rating: avg_rating
    }));

    let flag = this.getFlag(user);

    this.setState( state => ({
      ...state,
      flag: flag
    }));






  }

  getFlag(user) {

    if (user.student && user.student.country) {
      const flag = user.student.country.iso2;
      return flag ? flag.toLowerCase() : "";
    } else if (user.teacher && user.teacher.country) {
      const flag = user.teacher.country.iso2;
      return flag ? flag.toLowerCase() : "";
    } else {
      return "";
    }
  }

  setStudent(user) {
    let v = user?.student?.country?.currency_symbol;
    this.setCurrency(v ?? '$');
  }

  setCurrency(currency: string) {
    this.setState( state => ({
      ...state,
      currency: currency
    }));
  }

  getCurrency() {

    return new Promise((resolve, reject) => {
      this.selectState(state => state.currency).subscribe((data) => {
        resolve(data);
      });
    });

  }

  getUserRole() {
    const res = localStorage.getItem('user');
    if (res) {
      this._user = JSON.parse(res);
    }

    if (!this._user) {
      return -1;
    }

    if (!this._user.role_id) {
      return -1;
    }

    return this._user.role_id;
  }



  async getLoginUserFromApi() {
    // const res = await this.userSq.loadUsers();
    //

    // await this.userSq.addUser("Peter");

    // const res2 = await this.userSq.loadUsers();
    //

    return new Promise(async (resolve) => {
      let token = localStorage.getItem('token');
      if (!token) {
        resolve(false);
        return;
      }
      try {
        let res = await this.network.getUserByToken();
        this.setUser(res.user);
        resolve(res.user);
      } catch (err) {
        resolve(false);
      }
    });
  }

  async getLoginUser() {
    // const res = await this.userSq.loadUsers();
    //

    // await this.userSq.addUser("Peter");

    // const res2 = await this.userSq.loadUsers();
    //

    return new Promise(async (resolve) => {
      let token = localStorage.getItem('token');
      if (!token) {
        resolve(false);
        return;
      }
      try {
        let res = await this.network.getUserByToken();
        this.setUser(res.user);
        resolve(res.user);
      } catch (err) {
        resolve(false);
      }
    });
  }
}
