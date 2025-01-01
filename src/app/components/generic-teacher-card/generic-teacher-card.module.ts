import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTeacherCardComponent } from './generic-teacher-card.component';
import { RatingStarsModule } from '../rating-stars/rating-stars.module';



@NgModule({
  declarations: [GenericTeacherCardComponent],
  imports: [
    CommonModule,
    RatingStarsModule,
  ],
  exports: [GenericTeacherCardComponent]
})
export class GenericTeacherCardModule { }
