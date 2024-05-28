import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursePhotoComponent } from './course-photo.component';



@NgModule({
  declarations: [CoursePhotoComponent],
  imports: [
    CommonModule
  ],
  exports: [CoursePhotoComponent]
})
export class CoursePhotoModule { }
