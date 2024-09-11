import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { CreateCourseService } from 'src/app/services/create-course.service';

@Component({
  selector: 'app-course-photoss',
  templateUrl: './course-photoss.page.html',
  styleUrls: ['./course-photoss.page.scss'],
})
export class CoursePhotossPage extends BasePage implements OnInit {
  backBtn = '/course-profile/course-photo-edit';
  params

  constructor(injector: Injector, public createCourseService: CreateCourseService) {
    super(injector);
    this.initialize();
  }

  ngOnInit() {
  }

  async initialize() {
  }

  setBackgroundImage(item) {
    return `url('${item.image}')`;
  }

  async addImageInArray(imageString) {
    const user = JSON.parse(localStorage.getItem('user'));

    let obj = {
      user_id: user.id,
      course_id: null,
      image: imageString
    };

    this.createCourseService.coursePhotos.push(obj);
    
    const courseId = localStorage.getItem('courseId');    
    if(courseId){
      obj.course_id = courseId;
      await this.network.postCourseImage(obj);      
    }
    
    

  }

  async onFileSelected(event: any) {
    const files: File[] = Array.from(event.target.files);
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = async () => {
        await this.addImageInArray(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async clearImage(index: any, event: Event) {
    event.stopPropagation();

    let item = Object.assign({}, this.createCourseService.coursePhotos[index]);
    this.createCourseService.coursePhotos.splice(index, 1);

    if(item.id){
      await this.network.deleteCourseImage(item.id);
    }

    //this.initialize();
  }

  openImage(image) {
    this.nav.push('/course-profile/course-photo/gallery-image', {
      backUrl: '/course-profile/course-photo',
      image: image
    });
  }

  backToProfile() {
    this.nav.pop();
  }
}
