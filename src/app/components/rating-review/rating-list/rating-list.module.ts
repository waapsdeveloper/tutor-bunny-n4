import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingListComponent } from './rating-list.component';



@NgModule({
  declarations: [RatingListComponent],
  imports: [
    CommonModule
  ],
  exports: [RatingListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RatingListModule { }
