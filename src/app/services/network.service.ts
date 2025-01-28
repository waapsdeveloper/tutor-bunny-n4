import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { ApiService } from './api.service';
import { UtilityService } from './utility.service';
import { ModalService } from './basic/modal.service';
import { log } from 'node:console';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  
  constructor(
    public api: ApiService,
    public router: Router,
    public utility: UtilityService,
    public modals: ModalService
  ) {}

  // Authentication Related APIs
  login(data: any) {
    return this.httpPostResponse('login-via-social', data);
  }
  loginViaEmail(data) {
    return this.httpPostResponse('login-via-email', data, null, false, false);
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
    return this.httpDeleteResponse('gallery/delete/ ' + id, true);
  }

  postProfileImage(data) {
    return this.httpPostResponse('user/update-profile-image', data);
  }
  postCoursePhoto(data) {
    return this.httpPostResponse('courses/update-course-image', data, false);
  }

  updateMessageReaquest(data, id) {
    return this.httpPostResponse('chat-rooms/update-status/' + id, data);
  }

  postCertificate(data) {
    return this.httpPostResponse('certificate/add', data, null, false, false);
  }

  postCourseImage(data) {
    return this.httpPostResponse('course/image/add', data, null, false, false);
  }

  getChatRead(data) {
    return this.httpPostResponse('message/is-read', data, null, false, false);
  }

  getNotificationRead(data) {
    return this.httpPostResponse(
      'notifications/is-read',
      data,
      null,
      false,
      false
    );
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
      false,
      false
    );
  }
  getCountries(data) {
    const str = this.serialize(data);
    return this.httpGetResponse(
      'countries/list' + '?' + str,
      null,
      false,
      false
    );
  }

  getAllCountries() {
    return this.httpGetResponse('countries/all', null, false, false);
  }

  FavCourseByIds(data) {
    return this.httpPostResponse('courses/list-By-ids', data, false, false);
  }

  getStates(data) {
    const str = this.serialize(data);
    return this.httpGetResponse(
      'states/by-country' + '?' + str,
      null,
      false,
      false
    );
  }

  getAllStates() {
    return this.httpGetResponse('states/all', null, false, false);
  }

  getNotificationById(id) {
    return this.httpGetResponse('notifications/by/' + id, null, false, false);
  }

  getLanguage(data) {
    const str = this.serialize(data);
    return this.httpGetResponse(
      'languages/list' + '?' + str,
      null,
      false,
      false
    );
  }

  getAllLanguages() {
    return this.httpGetResponse('languages/all', null, false, false);
  }

  addLanguage(data) {
    return this.httpPostResponse(
      'languages/add-teacher-language',
      data,
      null,
      false,
      false
    );
  }

  getCategory() {
    return this.httpGetResponse('courses/category/list', null, false, false);
  }
  getTravelPolicy() {
    return this.httpGetResponse(
      'teachers/travelpolicy/list',
      null,
      false,
      false
    );
  }
  getchatById(id: any) {
    return this.httpGetResponse('chat-by-id/' + id, null, false, false);
  }

  getUnreadChat(data: any) {
    return this.httpPostResponse('get-unread-chats/count', data, false, false);
  }

  getChatRoomById(id: any, params: any) {
    const str = this.serialize(params);
    return this.httpGetResponse(
      'chat-rooms-single/' + id + '?' + str,
      null,
      false,
      false
    );
  }

  getAllCourses(data: any) {
    return this.httpPostResponse('courses/list', data, null, false, false);
  }

  getSimilarCourses(data: any) {
    const str = this.serialize(data);
    return this.httpGetResponse(
      'similar/courses' + '?' + str,
      null,
      false,
      false
    );
  }

  getTeacherCourses(data: any) {
    const str = this.serialize(data);
    return this.httpGetResponse(
      'courses/course-list-by-teacher-id' + '?' + str,
      null,
      false,
      false
    );
  }

  searchFromKeywords(data: any) {
    return this.httpPostResponse(
      'courses/special-filter',
      data,
      null,
      false,
      false
    );
  }

  getpriceRange(id) {
    return this.httpPostResponse('min-max/' + id, null, null, false, false);
  }

  getIsProfileComplete(id, data) {
    return this.httpPostResponse(
      'profile-complete/' + id,
      data,
      null,
      false,
      false
    );
  }

  getTimeZone(data: any, id) {
    return this.httpPostResponse(
      'users/timezone/' + id,
      data,
      null,
      false,
      false
    );
  }

  getChadRoomId(data: any) {
    return this.httpPostResponse('chat-room-id', data, null, false, false);
  }

  getReviews(data: any) {
    return this.httpPostResponse(
      'review-by-teacher-id',
      data,
      null,
      false,
      false
    );
  }

  getRecentSearchs(data: any) {
    return this.httpPostResponse('recent-searches', data, null, false, false);
  }

  getAllTeachers(data) {
    const str = this.serialize(data);
    return this.httpGetResponse(
      'teachers/list/approved' + '?' + str,
      null,
      null,
      false
    );
  }

  getAllFavCourses(data: any) {
    return this.httpPostResponse('courses/fav-list', data, null, false, false);
  }

  getAllFavCoursesIds() {
    return this.httpPostResponse(
      'courses/fav-list-all',
      null,
      null,
      false,
      false
    );
  }

  getAllFavMaterialIds() {
    return this.httpPostResponse(
      'material/fav-list-all',
      null,
      null,
      false,
      false
    );
  }
  getAllReqCourses(id: any, data) {
    const str = this.serialize(data);
    return this.httpGetResponse(
      'requested/course/trials/' + id + '?' + str,
      null,
      false,
      false
    );
  }

  deleteCouseImage(data: any) {
    return this.httpPostResponse('course/image/null', data, false, false);
  }

  geTrailRequests(data, id) {
    const str = this.serialize(data);
    return this.httpGetResponse(
      'course/recent/trials/' + id + '?' + str,
      null,
      false,
      false
    );
  }

  geTrailRequestsByPusher(id) {
    return this.httpGetResponse(
      'course/trials/by-id/' + id,
      null,
      false,
      false
    );
  }

  getMessagesRoom(id, data) {
    const str = this.serialize(data);
    return this.httpGetResponse(
      'chat-rooms/' + id + '?' + str,
      null,
      false,
      false
    );
  }

  getRequsetCount(id) {
    return this.httpGetResponse(
      'chat-rooms/pending/count/' + id,
      null,
      false,
      false
    );
  }

  getRequestMessagesRoom(data, id) {
    const str = this.serialize(data);
    return this.httpGetResponse(
      'chat-rooms/pending/' + id + '?' + str,
      null,
      false,
      false
    );
  }

  getdashboardcounts() {
    return this.httpGetResponse(
      'teacher/dashboard/card-statistics',
      null,
      false,
      false
    );
  }

  getMessages(id) {
    return this.httpGetResponse(
      'messages/by-chatroom-id/' + id,
      null,
      false,
      false
    );
  }

  getAllNotifications(data) {
    const str = this.serialize(data);
    return this.httpGetResponse(
      'notifications' + '?' + str,
      null,
      false,
      false
    );
  }

  getNotificationUnreadCount() {
    return this.httpGetResponse(
      'notifications/unread-count',
      null,
      false,
      false
    );
  }

  getNotifications(id) {
    return this.httpGetResponse(
      'notifications/by-user/' + id,
      null,
      false,
      false
    );
  }

  getcourseById(id) {
    return this.httpGetResponse('courses/byid/' + id, null, false, false);
  }

  getCourseImages(data) {
    const str = this.serialize(data);
    return this.httpGetResponse(
      'course/image/list' + '?' + str,
      null,
      false,
      false
    );
  }

  getCertificates(data) {
    const str = this.serialize(data);
    return this.httpGetResponse(
      'certificate/list' + '?' + str,
      null,
      false,
      false
    );
  }

  deleteCourseImage(id) {
    return this.httpDeleteResponse('course/image/delete/' + id, false);
  }

  deleteCertificates(id) {
    return this.httpDeleteResponse('certificate/delete/' + id, true);
  }

  getCourseList(id) {
    return this.httpGetResponse(
      'courses/my-course-list/' + id,
      null,
      false,
      false
    );
  }

  getMyCourseList(data: any, id) {
    const str = this.serialize(data);
    return this.httpGetResponse(
      'courses/my-course-list/' + id + '?' + str,
      null,
      false,
      false
    );
  }

  getOtherCourseList(data: any) {
    const str = this.serialize(data);
    return this.httpGetResponse(
      'courses/other-course-list' + '?' + str,
      null,
      false,
      false
    );
  }

  getvideos() {
    return this.httpGetResponse('videos/list', null, false, false);
  }
  getPendingTrial(id, data) {
    return this.httpPostResponse(
      'get-pending/course/trials/' + id,
      data,
      null,
      false,
      false
    );
  }

  getSchedule(id) {
    return this.httpGetResponse(
      'schedule/list/by-course/' + id,
      null,
      false,
      false
    );
  }

  getMyLanguages(data) {
    const str = this.serialize(data);
    return this.httpGetResponse(
      'languages/my-list' + '?' + str,
      null,
      false,
      false
    );
  }

  removeMyLanguages(data) {
    return this.httpPostResponse(
      'languages/remove-from-my-list',
      data,
      false,
      false
    );
  }

  addSubject(data) {
    return this.httpPostResponse('subjects/add-teacher-subject', data);
  }
  addKeyword(data) {
    return this.httpPostResponse('keywords/add-keyword', data, false);
  }

  addInputKeyword(data) {
    return this.httpPostResponse('keywords/add-name-keyword', data);
  }

  getMySubjects(data) {
    const str = this.serialize(data);
    return this.httpGetResponse(
      'subjects/my-list' + '?' + str,
      null,
      false,
      false
    );
  }

  getMyKeyword(data) {
    const str = this.serialize(data);
    return this.httpGetResponse(
      'keywords/my-list' + '?' + str,
      null,
      false,
      false
    );
  }

  removeMySubjects(data) {
    return this.httpPostResponse(
      'subjects/remove-from-my-list',
      data,
      false,
      false
    );
  }
  removeMyKeyword(data) {
    return this.httpPostResponse(
      'keywords/remove-from-my-list',
      data,
      false,
      false
    );
  }

  getSubject(data) {
    const str = this.serialize(data);
    return this.httpGetResponse(
      'subjects/list' + '?' + str,
      null,
      false,
      false
    );
  }

  getKeywords(data) {
    const str = this.serialize(data);
    return this.httpGetResponse(
      'keywords/list' + '?' + str,
      null,
      false,
      false
    );
  }

  getUserByEmail(data) {
    const str = this.serialize(data);
    return this.httpGetResponse('user-by-email' + '?' + str, null, false);
  }

  getStudentTeacherProfileByEmail(data) {
    const str = this.serialize(data);
    return this.httpGetResponse(
      'student-teacher-profile-by-email' + '?' + str,
      null,
      false
    );
  }

  getUserByToken() {
    return this.httpGetResponse('user', null, false);
  }

  updateTeacherProfile(data, id) {
    return this.httpPostResponse('user/teacher/' + id, data, null, true, false);
  }
  updateTeacherProfile3(data, id) {
    return this.httpPostResponse(
      'ser/teacher/third/' + id,
      data,
      null,
      true,
      false
    );
  }

  SubmitCourse(data) {
    return this.httpPostResponse('courses/add', data, null, false, false);
  }

  setRecentSeach(data) {
    return this.httpPostResponse('search/course/add', data, null, true, false);
  }

  sendEmail(data) {
    return this.httpPostResponse('forget-password', data, null, true, false);
  }

  resetPassword(data) {
    return this.httpPostResponse(
      'validate-otp-and-change-password',
      data,
      null,
      true,
      false
    );
  }
  SubmitCourseEdit(data, id) {
    return this.httpPostResponse('courses/edit', data, id, false, false);
  }
  SubmitSecondCourse(data, id) {
    return this.httpPostResponse(
      'course/update-params/' + id,
      data,
      null,
      false,
      false
    );
  }

  AddSchedule(data) {
    return this.httpPostResponse('schedule/add', data, null, false, false);
  }

  notificationRead(data) {
    return this.httpPostResponse(
      'notifications/is-open',
      data,
      null,
      false,
      false
    );
  }

  checkReview(data) {
    return this.httpPostResponse('check-review', data, null, false, false);
  }

  inactiveCourse(data) {
    return this.httpPostResponse(
      'courses/de-activate-course-by-id',
      data,
      null,
      false,
      false
    );
  }

  activeCourse(data) {
    return this.httpPostResponse(
      'courses/activate-course-by-id',
      data,
      null,
      false,
      false
    );
  }

  deleteCourse(data) {
    return this.httpPostResponse(
      'courses/delete-course-by-id',
      data,
      null,
      false,
      false
    );
  }

  deleteMaterial(data) {
    return this.httpPostResponse('material/delete',data, null, false, false);
  }


  deleteShedule(id) {
    return this.httpDeleteResponse('schedule/delete/' + id, null);
  }

  changeTrailStuts(data, id) {
    return this.httpPostResponse(
      'course/update-status/' + id,
      data,
      null,
      false,
      false
    );
  }

  requestTrail(data) {
    return this.httpPostResponse(
      'course-trial/send-request',
      data,
      null,
      false,
      false
    );
  }

  cancelTrail(data) {
    return this.httpPostResponse(
      'course-trial/cancel-request',
      data,
      null,
      false,
      false
    );
  }

  getTrail(data) {
    return this.httpPostResponse(
      'course-trial/is-sent-request',
      data,
      null,
      false,
      false
    );
  }

  addCourseFav(data) {
    return this.httpPostResponse(
      'courses/list/add-fav',
      data,
      null,
      false,
      true
    );
  }

  addReview(data) {
    return this.httpPostResponse('add-review', data, null, false, false);
  }

  removeCourseFav(data) {
    return this.httpPostResponse(
      'courses/list/remove-fav',
      data,
      null,
      false,
      true
    );
  }

  isCourseFav(data) {
    return this.httpPostResponse(
      'courses/list/is-fav',
      data,
      null,
      false,
      false
    );
  }

  updateStudentProfile(data, id) {
    return this.httpPostResponse('students/update-info/' + id, data);
  }

  signupViaEmail(data) {
    return this.httpPostResponse('signup-via-email', data);
  }

  storeStudyMaterial(data) {
    return this.httpPostResponse('material/add', data, null, false, false);
  }

  updateStudyMaterial(data, id) {
    return this.httpPostResponse(
      'material/edit/' + id,
      data,
      null,
      false,
      false
    );
  }

  postStudyMaterialPhoto(data: any) {
    return this.httpPostResponse(
      'material/update-material-image',
      data,
      null,
      false,
      false
    );
  }

  postMaterialImage(data) {
    return this.httpPostResponse(
      'material/image/add',
      data,
      null,
      false,
      false
    );
  }

  getAllMaterials(data: any) {
    const str = this.serialize(data);
    return this.httpGetResponse(
      'material/list' + '?' + str,
      null,
      false,
      false
    );
  }

  purchaseMaterial(data: any) {
    return this.httpPostResponse('material/purchase', data, null, false, false);
  }
  getMaterialById(id) {
    return this.httpGetResponse('material/byid/' + id, null, false, false);
  }

  uploadStudtMaterialFile(data) {
    return this.httpPostResponse(
      'material/upload/docs',
      data,
      null,
      false,
      false,
      'multipart/form-data'
    );
  }

  uploadIntoVideoFile(data) {
    return this.httpPostResponse(
      'profile/video',
      data,
      null,
      false,
      false,
      'multipart/form-data'
    );
  }

  deleteStudyMaterialFile(data) {
    return this.httpPostResponse(
      'material/delete/document',
      data,
      false,
      true,
      false
    );
  }

  getMaterialImages(data) {
    const str = this.serialize(data);
    return this.httpGetResponse(
      'material/image/list' + '?' + str,
      null,
      false,
      false
    );
  }

  getMaterialDocs(data) {
    const str = this.serialize(data);
    return this.httpGetResponse(
      'material/docs/list' + '?' + str,
      null,
      false,
      false
    );
  }

  submitSecondMaterial(data, id) {
    return this.httpPostResponse(
      'material/update-params/' + id,
      data,
      null,
      false,
      false
    );
  }

  getMyMaterialList(data: any, id) {
    const str = this.serialize(data);
    return this.httpGetResponse(
      'material/my-material-list/' + id + '?' + str,
      null,
      false,
      false
    );
  }

  getotherMaterialList(data: any) {
    const str = this.serialize(data);
    return this.httpGetResponse(
      'material/other-material-list' + '?' + str,
      null,
      false,
      false
    );
  }
  addMaterialFav(data) {
    return this.httpPostResponse(
      'material/list/add-fav',
      data,
      null,
      false,
      false
    );
  }
  removeMaterialFav(data) {
    return this.httpPostResponse(
      'material/list/remove-fav',
      data,
      null,
      false,
      false
    );
  }

  addItemToCart(data) {
    return this.httpPostResponse(
      'material/add-to-cart',
      data,
      null,
      false,
      false
    );
  }

  removeItemToCart(data, id) {
    return this.httpPostResponse(
      'material/remove-to-cart/' + id,
      data,
      null,
      false,
      false
    );
  }

  buyNow(data) {
    return this.httpPostResponse('stripe/add', data, false, true, false);
  }

  getAllCart(user_id) {
    return this.httpGetResponse('material/cart-list', user_id, false, false);
  }

  materialCheckout(data) {
    return this.httpPostResponse(
      'material/cart/checkout',
      data,
      false,
      true,
      false
    );
  }

  materialCheckoutHistory(id) {
    return this.httpGetResponse('material/buyer-history', id, false, true);
  }

  postStudentOrder(data: any) {
    return this.httpPostResponse('student/order', data, null, false, true);
  }

  getStudentOrders() {
    return this.httpGetResponse('student/order/list', null, false, false);
  }

  getTeacherPurchases() {
    return this.httpGetResponse('teacher/order/list', null, false, false);
  }

  getStudentOrder(params: Params) {
    const str = this.serialize(params);
    return this.httpGetResponse(
      'student/order-by-order-number' + '?' + str,
      null,
      false,
      false
    );
  }

  getTeacherOrder(params: Params) {
    const str = this.serialize(params);
    return this.httpGetResponse(
      'teacher/order-by-order-number' + '?' + str,
      null,
      false,
      false
    );
  }

  getCoinLevels() {
    return this.httpGetResponse('credit-coins', null, false, false);
  }
  buyCredit(data: any) {
    return this.httpPostResponse('teacher/buy-credit', data, null, false, true);
  }
  creditHistory(data: any) {
    const str = this.serialize(data);
    return this.httpGetResponse(
      'teacher/credit-history' + '/'+ data,
      null,
      false,
      false
    );
  }

  getTeacherWallet() {
    return this.httpGetResponse('teacher/wallet', null, false, false);
  }

  getStudentWallet() {
    return this.httpGetResponse('student/wallet', null, false, false);
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
            this.utility.hideLoader();
          }

          console.log('url ' + url);
          console.log('showerror ' + showError);

          if (showError == true && res.message) {
            this.utility.presentSuccessToast(res.message);
          }

          resolve(res);
        },
        error: (err: any) => {
          this.utility.hideLoader();

          if (showError == true) {
            this.utility.presentFailureToast(err.error.message);
          }
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
