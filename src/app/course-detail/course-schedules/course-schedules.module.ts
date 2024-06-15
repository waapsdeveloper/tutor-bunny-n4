import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseSchedulesComponent } from './course-schedules.component';



@NgModule({
  declarations: [CourseSchedulesComponent],
  imports: [
    CommonModule
  ],
  exports:[CourseSchedulesComponent]
})
export class CourseSchedulesModule { }
