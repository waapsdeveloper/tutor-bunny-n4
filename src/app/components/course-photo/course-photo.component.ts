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

  constructor(injector:Injector) { 
    super(injector)
  }

  ngOnInit() {}

  onProfileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      const pmi = reader.result as string;
      let user = JSON.parse(localStorage.getItem('user'));
      let obj = {
        user_id: user.id,
        image: pmi
      }
      // const res = await this.network.postProfileImage(obj)
      // this.coursePhoto = res.result.image;
      this.updateCourseImage.emit(this.coursePhoto)

    };
    reader.readAsDataURL(file);
  }

}
