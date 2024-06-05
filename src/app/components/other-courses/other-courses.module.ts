import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtherCoursesComponent } from './other-courses.component';
import { CourseListModule } from './course-list/course-list.module';



@NgModule({
  declarations: [OtherCoursesComponent],
  imports: [
    CommonModule,
    CourseListModule
  ],
  exports: [OtherCoursesComponent]
})
export class OtherCoursesModule { }
