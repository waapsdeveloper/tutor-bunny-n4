import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentOtherCoursesComponent } from './student-other-courses.component';
import { CoursesListModule } from './courses-list/courses-list.module';



@NgModule({
  declarations: [StudentOtherCoursesComponent],
  imports: [
    CommonModule,
    CoursesListModule
  ],
  exports: [StudentOtherCoursesComponent]
})
export class StudentOtherCoursesModule { }
