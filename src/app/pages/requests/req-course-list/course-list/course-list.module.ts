import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from './course-list.component';
import { IonicModule } from '@ionic/angular';
import { TeacherReviewsModule } from './teacher-reviews/teacher-reviews.module';



@NgModule({
  declarations: [CourseListComponent],
  imports: [
    CommonModule,
    IonicModule,
    TeacherReviewsModule
  ],
  exports: [CourseListComponent]
})
export class CourseListModule { }
