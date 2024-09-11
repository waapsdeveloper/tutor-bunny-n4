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

  setFormData(data) {
    this.formData['title'] = data['title'];
    this.formData['description'] = data['description'];
    this.formData['language_id'] = data['language_id'];
    this.formData['price'] = data['price'];
    this.formData['from_age'] = data['from_age'];
    this.formData['to_age'] = data['to_age'];
    this.formData['start_date'] = data['start_date'];
    this.formData['end_date'] = data['end_date'];
    this.formData['duration'] = data['duration'];
    this.formData['image'] = data['image'];
    this.formData['capacity'] = data['capacity'];
    this.formData['category'] = data['category'];
    this.formData['mode_type'] = data['mode_type'];
    this.formData['language'] = data['language'];
    this.formData['keyword'] = data['keywords'];
    this.formData['lesson'] = data['lesson'];
    this.formData['category'] = data['category'][0];
    const lang = data['language'];
    if (lang) {
      this.formData['language_id'] = lang.id;
    }
    
  }

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
