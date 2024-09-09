import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursePhotosComponent } from './course-photos.component';



@NgModule({
  declarations: [CoursePhotosComponent],
  imports: [
    CommonModule
  ],
  exports:[CoursePhotosComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class CoursePhotosModule { }
