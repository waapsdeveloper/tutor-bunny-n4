import { Injectable } from '@angular/core';
import { EventsService } from './events.service';
import Pusher from 'pusher-js';

import {
  NgSimpleStateBaseRxjsStore,
  NgSimpleStateStoreConfig,
} from 'ng-simple-state';
import { UsersService } from './users.service';
import { NetworkService } from './network.service';

export interface GlobalCoursesModel {
  id: number
  is_liked_by_me: boolean,
  user_id: 57,
  user: any,
  title: string,
  description: string,
  language_id: number,
  image: string,
  price: string,
  keywords: [],
  auth_user_currency_symbol: string,
  updated_price: string
}

export type GlobalCoursesModelState = Array<GlobalCoursesModel>;



@Injectable({
  providedIn: 'root',
})
export class GlobalCoursesService extends NgSimpleStateBaseRxjsStore< GlobalCoursesModelState > {


  page = 1;
  last_page = -1;



  // old variables
  courses: any[] = [];
  CourseChannel: any;
  private pusher: Pusher;

  fav_page = 1;
  fav_last_page = -1;
  public favorites: any[] = [];

  otherCoursesPage = 1;
  otherCoursesLastPage = -1;
  otherCourses: any[] = [];
  otherCourseUserId = 0;
  otherExceptCourseId = 0;



  constructor(private network: NetworkService, private events: EventsService, private users :UsersService) {

    super();

    this.events.subscribe(


      'clear-all-services-data',
      () => {
        console.log(this.favorites);
        this.otherCoursesPage = null;
        this.otherCoursesLastPage = null;
        this.otherCourses = [];
        this.courses = [];
        this.otherCourseUserId = null;
        this.otherExceptCourseId = null;
        this.favorites = [];
        if (this.pusher) {
          this.pusher.unsubscribe('course-channel');
          this.pusher.disconnect();
        }
        this.events.unsubscribe('course-rec-update-by-list');
      },
      false
    );

    const options = {
      cluster: 'ap2',
      forceTLS: true,
    };

    this.pusher = new Pusher('a45efbe1a2e731b6dbfb', options);
    this.CourseChannel = this.pusher.subscribe('course-channel');
  }

  // start state management

  storeConfig(): NgSimpleStateStoreConfig {
    return {
      storeName: 'GlobalCoursesModel',
    };
  }

  initialState(): GlobalCoursesModelState {
    return [];
  }

  getList() {
    return this.selectState((state) => state);
  }

  getItem(id) {
    return this.selectState((state) => state.find((x) => x.id == id));
  }

  getCount() {
    return this.selectState((state) => state.length);
  }

  getCountPromise() {
    return new Promise((resolve) => {
      this.selectState((state) => state.length).subscribe((res) => {
        resolve(res);
      });
    });
  }

  getGlobalCoursesFromApi(search = '', page = 1) {
    return new Promise(async (resolve) => {
      const user = this.users.getUser();
      let obj = {
        search: search,
        page: page,
        liked: false,
      };

      let res = await this.network.getAllCourses(obj);
      console.log('courses', res);

      const data = res.result;
      this.page = data.current_page;
      this.last_page = data.last_page;

      this.setState( (state) => {
        if (page === 1) {
          return data.data;
        }
        return [...state, ...data.data];
      });

      resolve(true);
    });
  }

  // end state management


  unRegisterPusherEvent(){
    if (this.pusher) {
      this.pusher.unsubscribe('course-channel');
      this.pusher.disconnect();
    }

    this.events.unsubscribe('course-rec-update-by-list');
  }

  registerPusherEvent() {
    this.CourseChannel.bind(
      'course-rec-update-by-list',
      this.courseChannelReceived.bind(this)
    );
  }

  courseChannelReceived($event: any) {
    this.events.publish('get-dashboard-stats');
    this.updateCourseList($event);
  }

  async updateCourseList(data: any) {
    console.log(data);

    let course_Id = data.course_id;
    if (course_Id) {
      let res = (await this.network.getcourseById(course_Id)) as any;
      let user = this.users.getUser();
      let shownoti = true;
      if (user.role_id == 3) {
        let shownoti = true;
        console.log(user);

        this.events.publish('show-noti-dot', shownoti);
      }
      const course = res.course;
      if (course) {
        const index = this.courses.findIndex((c) => c.id == course.id);
        if (index != -1) {
          this.courses[index] = course;
        } else {
          this.courses = [course, ...this.courses];
        }
        let obj = {
          course: course,
        };

        this.setFavCourseUpdateLogic(course);
        this.setOtherCourseUpdateLOgic(course);
      }
    }
  }

  setFavCourseUpdateLogic(course) {

    let courseId = course.id;
    let findIndex = this.favorites.findIndex((x) => x.id == courseId);

    let isLikedByMe = course.is_liked_by_me;
    if (findIndex != -1) {
      if (isLikedByMe) {
        this.favorites[findIndex] = course;
      } else {
        this.favorites.splice(findIndex, 1);
      }
    } else {
      if (isLikedByMe) {
        this.favorites.push(course);
      }
    }
  }

  setOtherCourseUpdateLOgic(course: any) {
    let ouid = -1;
    if (this.otherCourses.length > 0) {
      let a = this.otherCourses[0].user_id;
      let b = course.user_id;
      if (a == b) {
        ouid = a;
      }
    }
    if (ouid != -1) {
      let findIndexO = this.otherCourses.findIndex((x) => x.id == course.id);
      if (findIndexO != -1) {
        // you found it here
        if (course.status == 'inactive') {
          this.otherCourses.splice(findIndexO, 1);
        } else {
          this.otherCourses[findIndexO] = course;
        }
      } else {
        if (course.status != 'inactive') {
          this.otherCourses.push(course);
        }
      }
    }
  }

  getCoursesFromApi(search = '', page = 1, liked = false) {
    return new Promise(async (resolve) => {
      let obj = {
        search: search,
        page: page,
        liked: liked,
      };
      const res = (await this.network.getAllCourses(obj)) as any;
      const data = res.result;

      this.page = data.current_page;
      this.last_page = data.last_page;
      if (page === 1) {
        this.courses = data.data;
      } else {
        this.courses = [...this.courses, ...data.data];
      }

      resolve(this.courses);
    });
  }

  getAllCourses() {
    return new Promise(async (resolve) => {
      if (this.courses.length == 0) {
        await this.getCoursesFromApi();
      }

      resolve(this.courses);
    });
  }

  cancelTrail(obj, user) {
    return new Promise(async (resolve) => {
      let ite = {
        user_id: user.id,
        course_id: obj.id,
      };
      let res = await this.network.cancelTrail(ite);
      if (res.states == 200) {
        let findIndex = this.courses.findIndex((x) => x.id == obj.id);
        if (findIndex != -1) {
          this.courses[findIndex].trial = res.trial;
        }
      }
      resolve(true);
    });
  }

  requestTrial(obj, user, message) {
    return new Promise(async (resolve) => {
      let ite = {
        user_id: user.id,
        course_id: obj.id,
        message: message,
      };
      let res = await this.network.requestTrail(ite);

      if (res.states == 200) {
        let findIndex = this.courses.findIndex((x) => x.id == obj.id);
        if (findIndex != -1) {
          this.courses[findIndex].trial = res.trial;
        }
      }
      resolve(true);
    });
  }

  getcourseById(id) {
    return new Promise(async (resolve) => {
      let res = (await this.network.getcourseById(id)) as any;
      const c = res.course;
      resolve(c);
    });
  }

  async removeFavorite(obj: any, user) {
    const index = this.courses.findIndex((x) => x.id == obj.id);
    if (index > -1) {
      this.courses[index].is_liked_by_me = false;
    } else {
    }
  }

  async addFavorite(obj: any, user) {
    const index = this.courses.findIndex((x) => x.id == obj.id);
    if (index > -1) {
      this.courses[index].is_liked_by_me = true;
    } else {
    }
  }

  getOtherCourses(userId, exceptCOurseId) {
    this.otherCourseUserId = userId;
    this.otherExceptCourseId = exceptCOurseId;

    return new Promise(async (resolve) => {
      let obj = {
        user_id: this.otherCourseUserId,
        except_course_id: this.otherExceptCourseId,
      };

      const res = (await this.network.getOtherCourseList(obj)) as any;
      const data = res.result;
      this.otherCoursesPage = data.current_page;
      this.otherCoursesLastPage = data.last_page;

      if (this.otherCoursesPage === 1) {
        this.otherCourses = data.data;
      } else {
        this.otherCourses = [...this.otherCourses, ...data.data];
      }

      resolve(true);
    });
  }

  async getFavToApi(search = '', fav_page = 1, liked = true) {
    return new Promise(async (resolve) => {
      let obj = {
        search: search,
        fav_page: fav_page,
        liked: true,
      };
      const res = (await this.network.getAllFavCourses(obj)) as any;
      const result = res.result;
      // this.favorites = data.data;
      this.fav_page = result.current_fav_page;
      this.fav_last_page = result.fav_last_page;
      if (this.fav_page == 1) {
        this.favorites = result['data'];
      } else {
        this.favorites = [...this.favorites, ...result['data']];
      }
      resolve(true);
    });
  }
}
