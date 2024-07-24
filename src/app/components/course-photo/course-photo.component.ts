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

    this.events.subscribe("set-form-course-image", (data) => {
      this.coursePhoto = data.image;
    })

    this.events.subscribe('teacher-course-first-screen-submit-call', (formData) => {

      let v = formData[this.key];


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

    if (file.size > 1048576) { // Check if file size is greater than 1MB
      this.imageService.resizeImage(file, 800, 800).then((pmi) => {
        this.coursePhoto = pmi;
        this.onChange.emit({ image: pmi });
      }).catch((error) => {
        console.error("Error resizing image", error);
      });
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        const pmi = reader.result as string;
        this.coursePhoto = pmi;
        this.onChange.emit({ image: pmi });
      };
      reader.readAsDataURL(file);
    }
  }

}
