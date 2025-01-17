import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingListComponent } from './rating-list.component';
import { SwiperModule } from 'swiper/angular';
import { SingleRatingItemComponent } from './single-rating-item/single-rating-item.component';
import { GlobalTextReadModule } from "../../global-text-read/global-text-read.module";
import { RatingStarsModule } from "../../rating-stars/rating-stars.module";


@NgModule({
  declarations: [RatingListComponent, SingleRatingItemComponent],
  imports: [
    CommonModule,
    SwiperModule,
    GlobalTextReadModule,
    RatingStarsModule
],
  exports: [
    RatingListComponent
  ]
})
export class RatingListModule { }
