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
  params;

  constructor(
    injector: Injector,
    public createCourseService: CreateCourseService
  ) {
    super(injector);
    this.initialize();
  }

  ngOnInit() {}

  async initialize() {}

  setBackgroundImage(item) {
    return `url('${item.image}')`;
  }

  async addImageInArray(imageString) {
    const user = JSON.parse(localStorage.getItem('user'));
    const courseId = this.createCourseService.courseId;

    let obj = {
      user_id: user.id,
      course_id: courseId,
      image: imageString,
    };

    this.createCourseService.coursePhotos.push(obj);

    if (courseId) {
      obj.course_id = courseId;
      await this.network.postCourseImage(obj);
    }

    if (this.createCourseService.coursePhotos.length == 1) {
      this.createCourseService.coursePhotos[0].feature = true;
      this.createCourseService.formData.image = imageString;

      if (courseId) {
        let obj = {
          course_id: courseId,
          image: imageString,
        };
        await this.network.postCoursePhoto(obj);
      }
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

  async updateFeatureImage(item: any, index, event: Event) {
    event.stopPropagation();

    for(var i = 0; i < this.createCourseService.coursePhotos.length; i++){
      this.createCourseService.coursePhotos[i].feature = false;
    }

    this.createCourseService.coursePhotos[index].feature = true;

    const courseId = this.createCourseService.courseId;
    const img = item.image;
    this.createCourseService.formData.image = item.image;

    if (courseId) {
      let obj = {
        course_id: courseId,
        image: img,
      };
      await this.network.postCoursePhoto(obj);
    }

    //this.initialize();
  }

  async clearImage(index: any, event: Event) {
    event.stopPropagation();

    // check for feature image flag
    const pht = this.createCourseService.coursePhotos[index];
    if(!pht){
      return;
    }

    if(pht.feature == true){
      // check if a item behind the index exist
      const phtPrev = this.createCourseService.coursePhotos[index - 1];
      if(!phtPrev){
        return;
      }

      this.createCourseService.coursePhotos[index - 1].feature = true;
      this.createCourseService.formData.image = phtPrev.image;

      const courseId = this.createCourseService.courseId;
      
      if (courseId) {
        let obj = {
          course_id: courseId,
          image: phtPrev.image,
        };
        await this.network.postCoursePhoto(obj);
      }

      
    }


    this.createCourseService.coursePhotos.splice(index, 1);

    let item = this.createCourseService.coursePhotos[index];
    if (item.id) {
      await this.network.deleteCourseImage(item.id);
    }

    // this.initialize();
  }

  openImage(image) {
    this.nav.push('/course-profile/course-photo/gallery-image', {
      backUrl: '/course-profile/course-photo',
      image: image,
    });
  }

  backToProfile() {
    this.nav.pop();
  }
}
