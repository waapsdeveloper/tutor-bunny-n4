import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherOtherCourseComponent } from './teacher-other-course.component';
import { IonicModule } from '@ionic/angular';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseListModule } from './course-list/course-list.module';



@NgModule({
  declarations: [TeacherOtherCourseComponent],
  imports: [
    CommonModule,
    IonicModule,
    CourseListModule
  ],
  exports:[TeacherOtherCourseComponent]
})
export class TeacherOtherCourseModule { }
