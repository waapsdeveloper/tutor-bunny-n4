import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCoursesComponent } from './my-courses.component';
import { CourseListModule } from './course-list/course-list.module';



@NgModule({
  declarations: [MyCoursesComponent],
  imports: [
    CommonModule,
    CourseListModule
  ],
  exports:[MyCoursesComponent]
})
export class MyCoursesModule { }
