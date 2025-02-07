import { Injectable } from '@angular/core';
import { EventsService } from './events.service';
import { UsersService } from './users.service';
import { NetworkService } from './network.service';
import { NgrxCrudService } from './abstract/ngrx-crud.service';
import Pusher from 'pusher-js';
export interface GlobalCoursesModel {
  page: number;
  last_page: number;
  list: any[];
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class GlobalCoursesService extends NgrxCrudService<any> {
  ngrxModelName: string = 'GlobalCoursesModel';

  // old variables
  courses: any[] = [];
  courseChannel: any;
  private pusher: Pusher;

  fav_page = 1;
  fav_last_page = -1;
  public favorites: any[] = [];

  otherCoursesPage = 1;
  otherCoursesLastPage = -1;
  otherCourses: any[] = [];
  otherCourseUserId = 0;
  otherExceptCourseId = 0;
  page: any;
  last_page: any;

  constructor(
    private network: NetworkService,
    private events: EventsService,
    private users: UsersService
  ) {
    super();

    this.events.subscribe(
      'clear-all-services-data',
      () => {
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

    this.events.subscribe('update-course-price', () => {
      this.getGlobalCoursesFromApi('', 1)
    } );

    const options = {
      cluster: 'ap2',
      forceTLS: true,
    };

    this.pusher = new Pusher('a45efbe1a2e731b6dbfb', options);
    this.courseChannel = this.pusher.subscribe('course-channel');
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

      const data = res.result;

      this.setState((state) => {
        if (page === 1) {
          // Replace the list when on the first page
          return {
            ...state,
            page: data.current_page,
            last_page: data.last_page,
            list: data.data, // Update the list
          };
        }
        // Append to the list for subsequent pages
        return {
          ...state,
          page: data.current_page,
          last_page: data.last_page,
          list: [...state.list, ...data.data],
        };
      });

      resolve(true);
    });
  }

  async getMyCoursesFromApi(page = 1, search = ''): Promise<any> {
    const user = this.users.getUser();

    const params: any = { page };
    if (search) params.search = search;

    return new Promise(async (resolve) => {
      const res = await this.network.getMyCourseList(params, user.id);
      const data = res.result;
      this.setList(data.data, data.current_page, data.last_page, data.total);
      resolve(res);
    });

    // const user = this.users.getUser();
    // let obj = {
    //   search: search,
    //   page: page,
    // };

    // let res = await this.network.getMyCourseList(obj, user.id);

    // const data = res.result;
    // this.setState((state) => {
    //   if (page === 1) {
    //     // Replace the list when on the first page
    //     return {
    //       ...state,
    //       page: data.current_page,
    //       last_page: data.last_page,
    //       list: data.data, // Update the list
    //     };
    //   }
    //   // Append to the list for subsequent pages
    //   return {
    //     ...state,
    //     page: data.current_page,
    //     last_page: data.last_page,
    //     list: [...state.list, ...data.data],
    //   };
    // });

    // resolve(true);
  }

  getcourseById(id) {
    return new Promise(async (resolve) => {
      let res = (await this.network.getcourseById(id)) as any;
      const c = res.course;
      resolve(c);
    });
  }

  // end state management

  unRegisterPusherEvent() {
    if (this.pusher) {
      this.pusher.unsubscribe('course-channel');
      this.pusher.disconnect();
    }

    this.events.unsubscribe('course-rec-update-by-list');
  }

  registerPusherEvent() {
    this.courseChannel.bind(
      'course-rec-update-by-list',
      this.courseChannelReceived.bind(this)
    );
  }

  courseChannelReceived($event: any) {
    this.events.publish('get-dashboard-stats');
    this.updateCourseList($event);
  }

  async updateCourseList(data: any) {
    console.log('rewqtwrw', data);

    let course_Id = data.course_id;
    if (course_Id) {
      let res = (await this.network.getcourseById(course_Id)) as any;
      const course = res.course;
      if (course) {
        this.setItem(course);

        // const index = this.courses.findIndex((c) => c.id == course.id);
        // if (index != -1) {
        //   this.courses[index] = course;
        // } else {
        //   this.courses = [course, ...this.courses];
        // }
        // let obj = {
        //   course: course,
        // };

        // this.setFavCourseUpdateLogic(course);
        // this.setOtherCourseUpdateLOgic(course);
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
