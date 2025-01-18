import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScdPageInfoComponent } from './scd-page-info.component';
import { RatingStarsModule } from 'src/app/components/rating-stars/rating-stars.module';



@NgModule({
  declarations: [ScdPageInfoComponent],
  imports: [
    CommonModule,
    RatingStarsModule,
  ],
  exports: [ScdPageInfoComponent]
})
export class ScdPageInfoModule { }
