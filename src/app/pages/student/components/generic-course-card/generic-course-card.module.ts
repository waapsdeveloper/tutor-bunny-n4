import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericCourseCardComponent } from './generic-course-card.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RatingStarsModule } from 'src/app/components/rating-stars/rating-stars.module';
import { TrailMessageModule } from 'src/app/components/trail-message/trail-message.module';
import { TrialReqButtonModule } from '../trial-req-button/trial-req-button.module';


@NgModule({
  declarations: [GenericCourseCardComponent],
  imports: [
    CommonModule,
    IonicModule,
    TrailMessageModule,
    RatingStarsModule,
    FormsModule,
    TrialReqButtonModule
  ],
  exports: [
    GenericCourseCardComponent
  ]
})
export class GenericCourseCardModule { }
