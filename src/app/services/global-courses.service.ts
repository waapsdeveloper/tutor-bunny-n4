import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';
import { EventsService } from './events.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalCoursesService {

  page = 1;
  last_page = -1;
  courses: any[] = [];

  constructor(private network: NetworkService, private events: EventsService) {
    this.courseReceivedViaPusher();
  }
  courseReceivedViaPusher() {
    this.events.subscribe('course-received-via-pusher', this.updateCourseList.bind(this));
  }

  async updateCourseList(data: any) {
    console.log(data);
    // return
    let course_Id = data.course_id;

    if (course_Id) {
      let res = await this.network.getcourseById(course_Id) as any;
      console.log(res);
      
      const course = res.course;
      if (course) {
        const index = this.courses.findIndex(c => c.id == course.id);
        console.log(index);
        
        if (index != -1) {
          this.courses[index] = course;
        } else { 
          this.courses = [course, ...this.courses];
        }
      }
    }
  }


  getCoursesFromApi(search = '', page = 1, liked = false) {

    return new Promise(async resolve => {

      let obj = {
        search: search,
        page: page,
        liked: liked
      };
      const res = await this.network.getAllCourses(obj) as any;
      const data = res.result;
      this.page = data.current_page;
      this.last_page = data.last_page;
      if (page === 1) {
        this.courses = data.data;
      } else {
        this.courses = [...this.courses, ...data.data];
      }

      // this.courses = data
      resolve(this.courses)
    })
  }


  getAllCourses() {

    return new Promise(async resolve => {

      if (this.courses.length == 0) {
        await this.getCoursesFromApi();
      }

      resolve(this.courses)


    })

  }

  cancelTrail(obj, user) {

    return new Promise(async resolve => {
      let ite = {
        user_id: user.id,
        course_id: obj.id
      }
      let res = await this.network.cancelTrail(ite);

      if (res.states == 200) {
        let findIndex = this.courses.findIndex(x => x.id == obj.id);
        if (findIndex != -1) {
          this.courses[findIndex].trial = res.trial;
        }
      }

      resolve(true)

    })


  }

  requestTrial(obj, user, message) {

    return new Promise(async resolve => {
      let ite = {
        user_id: user.id,
        course_id: obj.id,
        message: message
      }
      let res = await this.network.requestTrail(ite)

      if (res.states == 200) {
        let findIndex = this.courses.findIndex(x => x.id == obj.id);
        if (findIndex != -1) {
          this.courses[findIndex].trial = res.trial;
        }
      }

      resolve(true)
    })


  }

  getcourseById(id) {

    return new Promise(async resolve => {

      let findIndex = this.courses.findIndex(x => x.id == id);
      if (findIndex != -1) {
        resolve(this.courses[findIndex])
        return;
      }

      let res = await this.network.getcourseById(id) as any;
      const c = res.course;
      this.courses.push(c);
      resolve(c);

    })

  }

  async removeFavorite(obj: any, user) {

    const index = this.courses.findIndex(x => x.id == obj.id);
    if (index > -1) {
      this.courses[index].is_liked_by_me = false;
      console.log(`Removed favorite:`, obj);
    } else {
      console.log(`Favorite not found:`, obj);
    }

  }

  async addFavorite(obj: any, user) {
    const index = this.courses.findIndex(x => x.id == obj.id);
    if (index > -1) {
      this.courses[index].is_liked_by_me = true;
      console.log(`Added favorite:`, obj);
    } else {
      console.log(`Favorite already exists:`, obj);
    }


  }



}
