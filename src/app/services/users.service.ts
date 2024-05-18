import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _user;

  constructor() { }

  getUser(){
    if(!this._user){
      const res = localStorage.getItem("user");
      if(res){
        this._user = JSON.parse(res);
      }
    }
    return this._user;
  }

  setUser(user){
    localStorage.setItem("user", JSON.stringify(user));
    this._user = user;
  }

  getUserRole(){
    if(this._user){
      return -1;
    }

    if(!this._user.role_id){
      return -1;
    }

    return this._user.role_id;
  }

  setTeacher(user){

  }

  setStudent(user){

  }

}
