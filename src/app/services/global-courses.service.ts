import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalCoursesService {

  page = 1;
  last_page = -1;
  courses: any[] = [];


  constructor(private network: NetworkService) { }

  getCoursesFromApi(search = '', page = 1, liked = false){

    return new Promise( async resolve => {

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


  getAllCourses(){

    return new Promise( async resolve => {

      if(this.courses.length == 0){
        await this.getCoursesFromApi();
      }

      resolve(this.courses)


    })

  }

  async cancelTrail(obj, user){
    let ite = {
      user_id: user.id,
      course_id: obj.id
    }
    let res = await this.network.cancelTrail(ite);

    if(res.states == 200){
      let findIndex = this.courses.findIndex(x => x.id == obj.id);
      if(findIndex != -1){
        this.courses[findIndex].trial = res.trial;
      }
    }

  }

  async requestTrial(obj, user, message){

    let ite = {
      user_id: user.id,
      course_id: obj.id,
      message: message
    }
    let res = await this.network.requestTrail(ite)

    if(res.states == 200){
      let findIndex = this.courses.findIndex(x => x.id == obj.id);
      if(findIndex != -1){
        this.courses[findIndex].trial = res.trial;
      }
    }

  }


}
