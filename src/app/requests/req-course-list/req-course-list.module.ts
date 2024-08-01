import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReqCourseListComponent } from './req-course-list.component';
import { CourseListModule } from './course-list/course-list.module';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ReqCourseListComponent],
  imports: [
    CommonModule,
    CourseListModule,
    IonicModule
  ],
  exports: [ReqCourseListComponent]
})
export class ReqCourseListModule { }
