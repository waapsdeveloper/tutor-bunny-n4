import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { UtilityService } from './utility.service';
import { ModalService } from './basic/modal.service';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  constructor(
    public api: ApiService,
    public router: Router,
    public utility: UtilityService,
    public modals: ModalService
  ) { }

  // Authentication Related APIs
  login(data: any) {
    return this.httpPostResponse('login-via-social', data);
  }

  postImages(data) {
    return this.httpPostResponse('gallery/add', data);
  }
  deleteImage(id){
    return this.httpDeleteResponse('gallery/delete/ ' + id)
  }

  postProfileImage(data) {
    return this.httpPostResponse('user/update-profile-image', data);
  }
  saveFcmToken(data){
    return this.httpPostResponse('update-firebase-token', data);
  }


  postPhotoIdImage(data) {
    return this.httpPostResponse('user/update-photoid-image', data);
  }


  postStudentPhotoIdImage(data) {
    return this.httpPostResponse('students/update-profile', data);
  }

  getImage(data) {

    return this.httpGetResponse(
      'gallery/list' + '?user_id=' + data,
      null,
      false
    );
  }
  getCountries(data){
    const str = this.serialize(data);
    return this.httpGetResponse('countries/list'+'?'+ str , null, false, false);

  }

  getStates(data){
    const str = this.serialize(data);
    return this.httpGetResponse('states/by-country' + '?'+ str, null, false, false );
  }

  getLanguage(data) {
    const str = this.serialize(data);
    return this.httpGetResponse('languages/list' + '?'+ str, null, false, false);
  }

  addLanguage(data) {
    return this.httpPostResponse('languages/add-teacher-language', data);
  }

  getvideos(){
    return this.httpGetResponse('videos/list' , null, false, false);
  }

  getMyLanguages(data) {
    const str = this.serialize(data);
    return this.httpGetResponse('languages/my-list' + '?'+ str, null, false, false);
  }

  removeMyLanguages(data) {
    return this.httpPostResponse('languages/remove-from-my-list', data, false, false);
  }

  addSubject(data) {
    return this.httpPostResponse('subjects/add-teacher-subject', data);
  }

  getMySubjects(data) {
    const str = this.serialize(data);
    return this.httpGetResponse('subjects/my-list' + '?'+ str, null, false, false);
  }

  removeMySubjects(data) {
    return this.httpPostResponse('subjects/remove-from-my-list', data, false, false);
  }

  getSubject(data) {
    const str = this.serialize(data);
    return this.httpGetResponse('subjects/list'+'?'+ str, null, false, false);
  }

  getUserByEmail(data) {
    const str = this.serialize(data);
    return this.httpGetResponse(
      'user-by-email' + '?' + str,
      null,
      false
    );

  }

  updateTeacherProfile(data, id){
    return this.httpPostResponse('user/teacher/'+ id, data);
  }

  updateStudentProfile(data, id){
    return this.httpPostResponse('student-profile-update/'+ id, data);
  }

  signupViaEmail(data){
    return this.httpPostResponse('signup-via-email', data);
  }

  serialize = (obj: any) => {
    const str: any[] = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        let f: string =
          encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]);
        str.push(f);
      }
    }
    return str.join('&');
  };

  // Function for POST method
  httpPostResponse(
    key: any,
    data: any,
    id = null,
    showloader = true,
    showError = true,
    contenttype = 'application/json'
  ) {
    return this.httpResponse(
      'post',
      key,
      data,
      id,
      showloader,
      showError,
      contenttype
    );
  }

  // Function for GET method
  httpGetResponse(
    key: any,
    id = null,
    showloader = true,
    showError = true,
    contenttype = 'application/json'
  ) {
    return this.httpResponse(
      'get',
      key,
      {},
      id,
      showloader,
      showError,
      contenttype
    );
  }

  // Function for PUT method
  httpPutResponse(key: any, data: any, id = null) {
    return new Promise<any>((resolve, reject) => {
      this.api.put(key, data).subscribe((res: any) => {
        resolve(res);
      });
    });
  }

  // Function for PATCH method
  httpPatchResponse(key: any, data: any, id = null) {
    return new Promise<any>((resolve, reject) => {
      this.api.patch(key, data).subscribe((res: any) => {
        resolve(res);
      });
    });
  }

  // Function for DELETE method
  httpDeleteResponse(key: any) {
    return new Promise<any>((resolve, reject) => {
      this.api.delete(key).subscribe((res: any) => {
        resolve(res);
      });
    });
  }

  // Main function for makinf HTTP calls.
  httpResponse(
    type = 'get',
    key: any,
    data: any,
    id = null,
    showloader = true,
    showError = true,
    contenttype = 'application/json'
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      if (showloader === true) {
        this.utility.showLoader();
      }
      const url = key + (id ? '/' + id : '');
      const seq =
        type === 'get' ? this.api.get(url, {}) : this.api.post(url, data);

      seq.subscribe({
        next: (res: any) => {
          if (showloader === true) {
            this.utility.hideLoader();
          }
          resolve(res);
        },
        error: (err: any) => {
          this.utility.hideLoader();
          this.utility.presentFailureToast(err.error.message);
          if (err.status == 401) {
            this.modals.dismiss(false);
            localStorage.removeItem('token');
            localStorage.removeItem('user_role');
            this.router.navigate(['']);
          }
          reject(err.error);
        },
      });
    }).catch((err) => {
      if (err.status == 'Error') {
        this.utility.presentFailureToast(err.message);
        if (err.message == 'User Not Logged In!') {
          this.router.navigate(['']);
        }
      }
    });
  }
}
