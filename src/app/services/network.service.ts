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
  loginViaEmail(data) {
    return this.httpPostResponse('login-via-email', data, null, false, true);
  }

  signUpviaEmail(data) {
    return this.httpPostResponse('signup-via-email', data, null, false, true);
  }

  postImages(data) {
    return this.httpPostResponse('gallery/add', data, null, false);
  }

  sendMessage(data) {
    return this.httpPostResponse('add-chat-message', data, null, false, false);
  }

  deleteImage(id) {
    return this.httpDeleteResponse('gallery/delete/ ' + id, true)
  }

  postProfileImage(data) {
    return this.httpPostResponse('user/update-profile-image', data);
  }
  postCoursePhoto(data) {
    return this.httpPostResponse('courses/update-course-image', data);
  }

  updateMessageReaquest(data, id) {
    return this.httpPostResponse('chat-rooms/update-status/' + id, data);
  }

  getChatRead(data) {
    return this.httpPostResponse('message/is-read', data, null, false, false);
  }

  getNotificationRead(data) {
    return this.httpPostResponse('notifications/is-read', data, null, false, false);
  }

  saveFcmToken(data) {

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
  getCountries(data) {
    const str = this.serialize(data);
    return this.httpGetResponse('countries/list' + '?' + str, null, false, false);

  }

  getStates(data) {
    const str = this.serialize(data);
    return this.httpGetResponse('states/by-country' + '?' + str, null, false, false);
  }

  getLanguage(data) {
    const str = this.serialize(data);
    return this.httpGetResponse('languages/list' + '?' + str, null, false, false);
  }

  addLanguage(data) {
    return this.httpPostResponse('languages/add-teacher-language', data);
  }

  getCategory() {
    return this.httpGetResponse('courses/category/list', null, false, false);
  }
  getTravelPolicy() {
    return this.httpGetResponse('teachers/travelpolicy/list', null, false, false);
  }

  getAllCourses(data: any) {
    return this.httpPostResponse('courses/list', data, null, false, false);
  }

  getTimeZone(data: any, id) {
    return this.httpPostResponse('users/timezone/' + id, data, null, false, false);
  }

  getChadRoomId(data: any) {
    return this.httpPostResponse('chat-room-id', data, null, false, false);
  }

  getReviews(data: any) {
    return this.httpPostResponse('review-by-teacher-id', data, null, false, false);
  }

  getAllTeachers() {
    return this.httpGetResponse('teachers/list/approved', null, null, false);
  }

  getAllFavCourses(data: any) {
    return this.httpPostResponse('courses/fav-list', data, null, false, false);
  }
  getAllReqCourses(id: any) {
    return this.httpPostResponse('get-requested/course/trials/' + id, null, false, false);
  }

  geTrailRequests(data, id) {
    const str = this.serialize(data);
    return this.httpGetResponse('course/recent/trials/' + id + '?' + str, null, false, false);
  }

  geTrailRequestsByPusher(id) {
    return this.httpGetResponse('course/trials/by-id/' + id, null, false, false);
  }

  getMessagesRoom(id) {
    return this.httpGetResponse('chat-rooms/' + id, null, false, false);
  }

  getRequsetCount(id) {
    return this.httpGetResponse('chat-rooms/pending/count/' + id, null, false, false);
  }

  getRequestMessagesRoom(id) {
    return this.httpGetResponse('chat-rooms/pending/' + id, null, false, false);
  }

  getdashboardcounts() {
    return this.httpGetResponse('teacher/dashboard/card-statistics', null, false, false);
  }

  getMessages(id) {
    return this.httpGetResponse('messages/by-chatroom-id/' + id, null, false, false);
  }

  getNotifications(id) {
    return this.httpGetResponse('notifications/by-user/' + id, null, false, false);
  }

  getcourseById(id) {
    return this.httpGetResponse('courses/byid/' + id, null, false, false);
  }
  getCourseList(id) {
    return this.httpGetResponse('courses/my-course-list/' + id, null, false, false);
  }

  getMyCourseList(data: any) {
    const str = this.serialize(data);
    return this.httpGetResponse('courses/my-course-list' + '?' + str, null, false, false);
  }

  getOtherCourseList(data: any) {
    const str = this.serialize(data);
    return this.httpGetResponse('courses/other-course-list' + '?' + str, null, false, false);
  }

  getvideos() {
    return this.httpGetResponse('videos/list', null, false, false);
  }
  getPendingTrial(id, data) {
    return this.httpPostResponse('get-pending/course/trials/' + id, data, null, false,);
  }

  getSchedule(id) {
    return this.httpGetResponse('schedule/list/by-course/' + id, null, false, false);
  }

  getMyLanguages(data) {
    const str = this.serialize(data);
    return this.httpGetResponse('languages/my-list' + '?' + str, null, false, false);
  }

  removeMyLanguages(data) {
    return this.httpPostResponse('languages/remove-from-my-list', data, false, false);
  }

  addSubject(data) {
    return this.httpPostResponse('subjects/add-teacher-subject', data);
  }
  addKeyword(data) {
    return this.httpPostResponse('keywords/add-keyword', data);
  }

  addInputKeyword(data) {
    return this.httpPostResponse('keywords/add-name-keyword', data);
  }

  getMySubjects(data) {
    const str = this.serialize(data);
    return this.httpGetResponse('subjects/my-list' + '?' + str, null, false, false);
  }

  getMyKeyword(data) {
    const str = this.serialize(data);
    return this.httpGetResponse('keywords/my-list' + '?' + str, null, false, false);
  }

  removeMySubjects(data) {
    return this.httpPostResponse('subjects/remove-from-my-list', data, false, false);
  }
  removeMyKeyword(data) {
    return this.httpPostResponse('keywords/remove-from-my-list', data, false, false);
  }

  getSubject(data) {
    const str = this.serialize(data);
    return this.httpGetResponse('subjects/list' + '?' + str, null, false, false);
  }

  getKeywords(data) {
    const str = this.serialize(data);
    return this.httpGetResponse('keywords/list' + '?' + str, null, false, false);
  }

  getUserByEmail(data) {
    const str = this.serialize(data);
    return this.httpGetResponse('user-by-email' + '?' + str, null, false);
  }

  getUserByToken() {
    return this.httpGetResponse('user', null, false);
  }

  updateTeacherProfile(data, id) {
    return this.httpPostResponse('user/teacher/' + id, data, null, true, true);
  }
  updateTeacherProfile3(data, id) {
    return this.httpPostResponse('ser/teacher/third/' + id, data, null, true, true);
  }

  SubmitCourse(data) {
    return this.httpPostResponse('courses/add', data, null, true, true);
  }
  sendEmail(data) {
    return this.httpPostResponse('forget-password', data, null, true, true);
  }

  resetPassword(data) {
    return this.httpPostResponse('validate-otp-and-change-password', data, null, true, true);
  }
  SubmitCourseEdit(data, id) {
    return this.httpPostResponse('courses/edit', data, id, true, true);
  }
  SubmitSecondCourse(data, id) {
    return this.httpPostResponse('course/update-params/' + id, data, null, true, true);
  }

  AddSchedule(data) {
    return this.httpPostResponse('schedule/add', data, null, false, true);
  }
  inactiveCourse(data) {
    return this.httpPostResponse('courses/de-activate-course-by-id', data, null, false, false);
  }

  activeCourse(data) {
    return this.httpPostResponse('courses/activate-course-by-id', data, null, false, false);
  }

  deleteCourse(data) {
    return this.httpPostResponse('courses/delete-course-by-id', data, null, false, false);
  }

  deleteShedule(id) {
    return this.httpDeleteResponse('schedule/delete/' + id, null);
  }

  changeTrailStuts(data, id) {
    return this.httpPostResponse('course/update-status/' + id, data, null, false, false);
  }

  requestTrail(data) {
    return this.httpPostResponse('course-trial/send-request', data, null, false, false);
  }

  cancelTrail(data) {
    return this.httpPostResponse('course-trial/cancel-request', data, null, false, false);
  }

  getTrail(data) {
    return this.httpPostResponse('course-trial/is-sent-request', data, null, false, true);
  }

  addCourseFav(data) {
    return this.httpPostResponse('courses/list/add-fav', data, null, false, false);
  }

  addReview(data) {
    return this.httpPostResponse('add-review', data, null, false, false);
  }

  removeCourseFav(data) {
    return this.httpPostResponse('courses/list/remove-fav', data, null, false, false);
  }

  isCourseFav(data) {
    return this.httpPostResponse('courses/list/is-fav', data, null, false, false);
  }



  updateStudentProfile(data, id) {
    return this.httpPostResponse('students/update-info/' + id, data);
  }

  signupViaEmail(data) {
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
  httpDeleteResponse(key: any, showloader = true) {
    return new Promise<any>((resolve, reject) => {
      if (showloader === true) {
        this.utility.showLoader();
      }
      this.api.delete(key).subscribe((res: any) => {

        this.utility.hideLoader();
        resolve(res);
      });
    });
  }

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
            // return
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
