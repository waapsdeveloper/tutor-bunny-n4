import { Injectable } from '@angular/core';
import { resolve } from 'path';
import { NetworkService } from './network.service';
import { UserSqService } from './sqlite/user-sq.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _user;
  image = null;

  constructor(private network: NetworkService, private userSq: UserSqService) {}

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

    return user;
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

  setTeacher(user) {}

  setStudent(user) {}

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
