import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingReviewComponent } from './rating-review.component';
import { RatingListModule } from './rating-list/rating-list.module';



@NgModule({
  declarations: [RatingReviewComponent],
  imports: [
    CommonModule,
    RatingListModule
  ],
  exports:[RatingReviewComponent]
})
export class RatingReviewModule { }
