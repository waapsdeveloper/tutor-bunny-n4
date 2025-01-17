import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewsByStudentPageRoutingModule } from './reviews-by-student-routing.module';

import { ReviewsByStudentPage } from './reviews-by-student.page';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';
import { ReviewCardModule } from './review-card/review-card.module';
import { RatingStarsModule } from 'src/app/components/rating-stars/rating-stars.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewsByStudentPageRoutingModule,
    SdHeaderTopModule,
    ReviewCardModule,
    RatingStarsModule
  ],
  declarations: [ReviewsByStudentPage]
})
export class ReviewsByStudentPageModule {}
