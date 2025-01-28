import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StpPageHeaderComponent } from './stp-page-header.component';
import { IonicModule } from '@ionic/angular';
import { RatingStarsModule } from 'src/app/components/rating-stars/rating-stars.module';



@NgModule({
  declarations: [StpPageHeaderComponent],
  imports: [
    CommonModule,
    IonicModule,
    RatingStarsModule
  ],
  exports: [
    StpPageHeaderComponent
  ]
})
export class StpPageHeaderModule { }
