import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherReviewsComponent } from './teacher-reviews.component';
import { SdTextareaAboutModule } from 'src/app/components/sd-textarea-about/sd-textarea-about.module';
import { SdButtonGrayModule } from 'src/app/components/sd-button-gray/sd-button-gray.module';
import { SdButtonClearModule } from 'src/app/components/sd-button-clear/sd-button-clear.module';
import { FormsModule } from '@angular/forms';
import { RatingStarsModule } from 'src/app/components/rating-stars/rating-stars.module';





@NgModule({
  declarations: [TeacherReviewsComponent],
  imports: [
    CommonModule,
    SdTextareaAboutModule,
    SdButtonGrayModule,
    SdButtonClearModule,
    FormsModule,
    RatingStarsModule
  ],
  exports:[TeacherReviewsComponent]
})
export class TeacherReviewsModule { }
