import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewCardComponent } from './review-card.component';
import { RatingStarsModule } from 'src/app/components/rating-stars/rating-stars.module';



@NgModule({
  declarations: [ReviewCardComponent],
  imports: [
    CommonModule,
    RatingStarsModule
  ],
  exports:[ReviewCardComponent]
})
export class ReviewCardModule { }
