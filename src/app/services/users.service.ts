import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';

import {
  NgSimpleStateBaseRxjsStore,
  NgSimpleStateStoreConfig,
} from 'ng-simple-state';

export interface UserModel {
  id: number;
  name: string;
  currency: string;
  status: string;

}

@Injectable({
  providedIn: 'root',
})
export class UsersService extends NgSimpleStateBaseRxjsStore<UserModel> {

  private _user;
  image = null;

  constructor(private network: NetworkService) {
    super();
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
      currency: '$',
      status: ''
    };
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
    console.log(user);

    this._user = user;
    this.image = user.image;
    console.log(this.image);

    this.setState( state => ({
      ...state,
      id: user.id,
      name: user.name,
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

  }

  setStudent(user) {

  }

  setCurrency(currency: string) {
    this.setState( state => ({
      ...state,
      currency
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
    // console.log("user-sq", res)

    // await this.userSq.addUser("Peter");

    // const res2 = await this.userSq.loadUsers();
    // console.log("user-sq", res2)

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
    // console.log("user-sq", res)

    // await this.userSq.addUser("Peter");

    // const res2 = await this.userSq.loadUsers();
    // console.log("user-sq", res2)

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
