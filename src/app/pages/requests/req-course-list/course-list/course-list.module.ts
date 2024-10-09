import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from './course-list.component';
import { IonicModule } from '@ionic/angular';
import { TeacherReviewsModule } from './teacher-reviews/teacher-reviews.module';
import { RatingStarsModule } from 'src/app/pages/reviews-by-student/review-card/rating-stars/rating-stars.module';



@NgModule({
  declarations: [CourseListComponent],
  imports: [
    CommonModule,
    IonicModule,
    RatingStarsModule,
    TeacherReviewsModule
  ],
  exports: [CourseListComponent]
})
export class CourseListModule { }
