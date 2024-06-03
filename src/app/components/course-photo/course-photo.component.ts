import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-course-photo',
  templateUrl: './course-photo.component.html',
  styleUrls: ['./course-photo.component.scss'],
})
export class CoursePhotoComponent extends BasePage  implements OnInit {
  @Input('coursePhoto') coursePhoto: SafeUrl | undefined;
  @Output('updateImage') updateCourseImage: EventEmitter<any> = new EventEmitter<any>();
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();
  @Input('errorText') errorText = '';
  isRequired = false;
  constructor(injector:Injector) { 
    super(injector)
  }

  ngOnInit() {
    this.events.subscribe('teacher-course-first-screen-submit-call', (formData: any) => {

      if (!formData.image) {
        this.isRequired = true;
        this.errorText = 'Image is required to upload'
        setTimeout( () => {
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
      console.log(pmi);
      let obj={
        image : pmi
      }
      this.onChange.emit(obj);

    
      // const res = await this.network.postProfileImage(obj)
      // this.updateCourseImage.emit(this.coursePhoto)

    };
    reader.readAsDataURL(file);
  }

}
