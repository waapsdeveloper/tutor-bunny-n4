import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingReviewModule } from 'src/app/pages/teacher-profile/rating-review/rating-review.module';
import { StpPageRatingComponent } from './stp-page-rating.component';



@NgModule({
  declarations: [StpPageRatingComponent],
  imports: [
    CommonModule,
    RatingReviewModule
  ],
  exports: [StpPageRatingComponent]
})
export class StpPageRatingModule { }
