import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDatesComponent } from './course-dates.component';



@NgModule({
  declarations: [CourseDatesComponent],
  imports: [
    CommonModule
  ],
  exports:[CourseDatesComponent]
})
export class CourseDatesModule { }
