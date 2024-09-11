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
    const courseId = localStorage.getItem('courseId');
    let firstIndex = this.coursePhotos.findIndex(x => x.image == null);

    if (firstIndex != -1) {
      this.coursePhotos[firstIndex]['image'] = imageString;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    let obj = {
      user_id: user.id,
      course_id: courseId,
      image: imageString
    };

    await this.network.postCourseImage(obj);
    this.initialize();
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

  async clearImage(id: string, event: Event) {
    event.stopPropagation();
    await this.network.deleteCourseImage(id);
    this.initialize();
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
