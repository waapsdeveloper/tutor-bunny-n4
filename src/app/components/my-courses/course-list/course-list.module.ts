import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from './course-list.component';



@NgModule({
  declarations: [CourseListComponent],
  imports: [
    CommonModule
  ],
  exports: [CourseListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class CourseListModule { }
