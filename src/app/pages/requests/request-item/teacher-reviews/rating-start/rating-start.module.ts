import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingStartComponent } from './rating-start.component';



@NgModule({
  declarations: [RatingStartComponent],
  imports: [
    CommonModule
  ],
  exports:[RatingStartComponent]
})
export class RatingStartModule { }
