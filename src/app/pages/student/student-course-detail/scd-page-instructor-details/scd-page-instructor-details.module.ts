import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScdPageInstructorDetailsComponent } from './scd-page-instructor-details.component';



@NgModule({
  declarations: [ScdPageInstructorDetailsComponent],
  imports: [
    CommonModule
  ],
  exports : [ScdPageInstructorDetailsComponent]
})
export class ScdPageInstructorDetailsModule { }
