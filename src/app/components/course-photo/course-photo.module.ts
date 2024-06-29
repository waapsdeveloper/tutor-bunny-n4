import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursePhotoComponent } from './course-photo.component';
import { SdErrorInputInfoModule } from '../sd-error-input-info/sd-error-input-info.module';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [CoursePhotoComponent],
  imports: [
    CommonModule,
    SdErrorInputInfoModule,
    IonicModule
  ],
  exports: [CoursePhotoComponent]
})
export class CoursePhotoModule { }
