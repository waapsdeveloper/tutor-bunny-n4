import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { BasePage } from 'src/app/base-page/base-page';
import { CreateCourseService } from 'src/app/services/create-course.service';

@Component({
  selector: 'app-course-photo',
  templateUrl: './course-photo.component.html',
  styleUrls: ['./course-photo.component.scss'],
})
export class CoursePhotoComponent extends BasePage implements OnInit {

  @Input('key') key = '';
  @Input('coursePhoto') coursePhoto: SafeUrl[] = [];
  @Output('updateCourseImage') updateCourseImage: EventEmitter<any> = new EventEmitter<any>();
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();
  @Input('errorText') errorText = '';
  @Input('needed') needed = true;
  isRequired = false;

  constructor(injector: Injector, public courseForm: CreateCourseService) {
    super(injector);
  }

  ngOnInit() {

    this.events.subscribe('change-sample-course-to-this', (image: any) => {
      console.log(image);


      if (image) {
        this.courseForm.formData.image = image;
      }
      else{
        return
      }

    }, false)

    this.events.subscribe('teacher-course-first-screen-submit-call', (formData) => {
      let v = formData[this.key];
      if (!v || v == '') {
        this.isRequired = true;
        setTimeout(() => {
          this.isRequired = false;
        }, 5000);
      }
    }, false);
  }

  onFilesSelected(event: any) {
    const files: File[] = Array.from(event.target.files);
    files.forEach(file => {
      this.handleFile(file, this.uploadCourseImage.bind(this), this.addCourseImage.bind(this));
    });
  }

  async handleFile(file: File, postFunction: (obj: any) => Promise<any>, emitFunction: (image: string) => void) {
    const reader = new FileReader();
    reader.onload = async () => {
      let pmi = reader.result as string;

      if (file.size > 1048576) {
        pmi = await this.imageService.resizeImage(file, 800, 800);
      }
      let courseId = localStorage.getItem('courseId')

      let user = JSON.parse(localStorage.getItem('user'));
      let obj = {
        user_id: user.id,
        image: pmi,
        course_id: courseId
      };

      const res = await postFunction(obj);
      emitFunction(res.result.image);
    };
    reader.readAsDataURL(file);
  }

  async uploadCourseImage(obj: any): Promise<any> {
    console.log(obj);
    // return await this.network.postCourseImage(obj);
  }

  addCourseImage(image: string) {
    this.coursePhoto.push(image);
    this.updateCourseImage.emit(this.coursePhoto);
  }
}
