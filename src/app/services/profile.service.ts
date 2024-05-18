import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor() { }

  isProfileCompleted(user) {
    return new Promise((resolve) => {
      if (!user) {
        resolve(null);
        return;
      }

      let flag = true;
      let roleId = parseInt(user.role_id);
      console.log(roleId);

      // Check if the user is a teacher
      if (roleId == 2) {
        if (!user.name || !user.email || !user.student.dial_code || !user.student.phone_number || !user.student.dob ) {
          flag = false;
        }

        if (!user.image) {
          flag = false;
        }

        if (!user.student.country) {
          flag = false;
        }
        if (!user.student.state) {
          flag = false;
        }
        if (!user.student.city) {
          flag = false;
        }
        if (!user.student.zip_code) {
          flag = false;
        }


      }

      if (roleId == 3) {
        if (!user.name || !user.teacher.description || !user.teacher.dial_code || !user.teacher.phone_number || !user.teacher.title ) {
          flag = false;
        }

        if (!user.image) {
          flag = false;
        }

        if (!user.teacher.country) {
          flag = false;
        }
        if (!user.teacher.state) {
          flag = false;
        }
        if (!user.teacher.city) {
          flag = false;
        }
        if (!user.teacher.zip_code) {
          flag = false;
        }
        if (user.teacher.languages.length == 0) {
          flag = false;
        }
        if (user.teacher.subjects.length == 0) {
          flag = false;
        }


      }

      resolve(flag);

    });
  }

}
