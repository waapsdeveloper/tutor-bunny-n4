import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root'
})
export class CreateCourseService {

  courseId = null;
  coursePhotos = [];

  formData: any = {
    title: null,
    description: null,
    language: null,
    image: null,
    mode_type: null,
    price: null,
    duration: null,
    from_age: null,
    to_age: null,
    strat_date: null,
    type: null,
    end_date: null,
    category: null,
    keyword: null,
    lesson: null,
    meeting_link: null,
    schedules: null,
  };

  constructor(private network: NetworkService) { }



  async getCourseImages(){

    if(this.courseId){
      
      let obj = {
        course_id: this.courseId
      }
      
      const res = await this.network.getCourseImages(obj) as any;
      this.coursePhotos = res.result;
      console.log(res);

    }
  }







}
