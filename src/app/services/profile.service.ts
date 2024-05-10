import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor() { }

  isProfileCompleted(user) {
    return new Promise((resolve) => {

      if(!user){
        resolve(false);
        return;
      }

      let flag = true;
      let roleId = parseInt(user.role_id);


      // Check if the user is a teacher
      if (roleId == 2) {

        if (user.name && user.email && user.student.dial_code && user.student.phone_number && user.student.dob  && user.student.status) {
          flag = false;
        }
        if (user.student.country) {
          flag = false;
        }
        if (user.student.state) {
          flag = false;
        }
        flag = true;


      }
      
      if (roleId == 3) {
        if (user.name && user.teacher.address && user.teacher.description && user.teacher.dial_code && user.teacher.phone_number && user.teacher.title) {
          flag = false;
        }
        if (user.teacher.country) {
          flag = false;
        }
        if (user.teacher.state) {
          flag = false;
        }
        if (user.teacher.languages.length == 0) {
          flag = false;
        }
        if (user.teacher.subjects.length == 0) {
          flag = false;
        }
        flag = true;

      }
      
      resolve(flag);
      
    });
  }

}
