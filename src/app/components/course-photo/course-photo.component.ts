import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-course-photo',
  templateUrl: './course-photo.component.html',
  styleUrls: ['./course-photo.component.scss'],
})
export class CoursePhotoComponent extends BasePage implements OnInit {

  @Input('key') key = '';
  @Input('coursePhoto') coursePhoto: SafeUrl | undefined;
  @Output('updateImage') updateCourseImage: EventEmitter<any> = new EventEmitter<any>();
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();
  @Input('errorText') errorText = '';
  @Input('needed') needed = true;
  isRequired = false;

  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit() {
    this.events.subscribe('teacher-course-first-screen-submit-call', (formData) => {

      let v = formData[this.key];

      console.log(v, this.key)

      if (!v || v == '') {
        this.isRequired = true;
        setTimeout(() => {
          this.isRequired = false;
        }, 5000);
      }

    }, false)

  }

  onProfileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      const pmi = reader.result as string;

      this.coursePhoto = pmi;
      let obj = {
        image: pmi
      }
      this.onChange.emit(obj);


      // const res = await this.network.postProfileImage(obj)s

    };
    reader.readAsDataURL(file);
  }

}
