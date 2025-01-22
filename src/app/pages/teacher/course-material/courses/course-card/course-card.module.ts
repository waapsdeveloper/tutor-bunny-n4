import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from './course-card.component';
import { IonicModule } from '@ionic/angular';
import { RatingStarsModule } from 'src/app/components/rating-stars/rating-stars.module';



@NgModule({
  declarations: [CourseCardComponent],
  imports: [
    CommonModule,
    IonicModule,
    RatingStarsModule
  ],
  exports:[CourseCardComponent]
})
export class CourseCardModule { }
