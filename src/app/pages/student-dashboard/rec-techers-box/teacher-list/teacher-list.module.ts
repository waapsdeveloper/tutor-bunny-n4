import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherListComponent } from './teacher-list.component';
import { NamesPipe } from 'src/app/pipes/names.pipe';
import { NamesPipeModule } from 'src/app/pipes/name.pipe.module';
import { RatingStarsModule } from 'src/app/pages/reviews-by-student/review-card/rating-stars/rating-stars.module';



@NgModule({
  declarations: [TeacherListComponent],
  imports: [
    CommonModule,
    NamesPipeModule,
    RatingStarsModule
  ],
  exports:[TeacherListComponent]
})
export class TeacherListModule { }
