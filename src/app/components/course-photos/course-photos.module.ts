import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursePhotosComponent } from './course-photos.component';

import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [CoursePhotosComponent],
  imports: [
    CommonModule,
    SwiperModule
  ],
  exports:[CoursePhotosComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class CoursePhotosModule { }
