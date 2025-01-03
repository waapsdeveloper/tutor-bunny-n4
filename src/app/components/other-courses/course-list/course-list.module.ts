import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from './course-list.component';
import { SwiperModule } from 'swiper/angular';



@NgModule({
  declarations: [CourseListComponent],
  imports: [
    CommonModule,
    SwiperModule
  ],
  exports: [CourseListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class CourseListModule { }
