import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestItemComponent } from './request-item.component';
import { IonicModule } from '@ionic/angular';
import { RatingStarsModule } from 'src/app/components/rating-stars/rating-stars.module';
import { TeacherReviewsModule } from './teacher-reviews/teacher-reviews.module';



@NgModule({
  declarations: [RequestItemComponent],
  imports: [
    CommonModule,
    IonicModule,
    RatingStarsModule,
    TeacherReviewsModule
  ],
  exports:[RequestItemComponent]
})
export class RequestItemModule { }
