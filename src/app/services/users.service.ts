import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _user;

  constructor() { }

  getUser(){
    return this._user;
  }

  setUser(user){
    this._user = user;
  }

  setTeacher(user){

  }

  setStudent(user){

  }

  


}
