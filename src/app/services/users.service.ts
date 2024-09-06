import { Injectable } from '@angular/core';
import { resolve } from 'path';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _user;

  constructor(private network: NetworkService) { }

  getUser() {
    if (!this._user) {
      const res = localStorage.getItem("user");
      if (res) {
        this._user = JSON.parse(res);
      }
    }
    return this._user;
  }

  setUser(user) {
    // if(!user.image){
    //   user.image = '/assets//svg/signup.svg'
    // }
    localStorage.setItem("user", JSON.stringify(user));
    this._user = user;
  }

  getUserRole() {

    const res = localStorage.getItem("user");
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

  setTeacher(user) {

  }

  setStudent(user) {

  }

  getLoginUser(){
    return new Promise(async (resolve) =>{
      let token = localStorage.getItem('token');
      if(!token){
        resolve(false)
        return
      }
      try {
        let res = await this.network.getUserByToken()
        this.setUser(res.user)
        resolve(res.user)
      } catch (err) {
       resolve(false)
      }
    })
  }



}
