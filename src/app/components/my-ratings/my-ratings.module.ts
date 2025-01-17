import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyRatingsComponent } from './my-ratings.component';
import { RatingListModule } from './rating-list/rating-list.module';



@NgModule({
  declarations: [MyRatingsComponent],
  imports: [
    CommonModule, 
    RatingListModule   
  ],
  exports: [
    MyRatingsComponent
  ]
})
export class MyRatingsModule { }
