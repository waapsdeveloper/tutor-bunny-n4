import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from './course-list.component';
import { IonicModule } from '@ionic/angular';
import { NamesPipe } from 'src/app/pipes/names.pipe';
import { TrailMessageModule } from './trail-message/trail-message.module';
import { RatingStarsModule } from '../../../reviews-by-student/review-card/rating-stars/rating-stars.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CourseListComponent],
  imports: [
    CommonModule,
    IonicModule,
    TrailMessageModule,
    RatingStarsModule,
    FormsModule
  ],
  exports: [CourseListComponent]
})
export class CourseListModule { }
