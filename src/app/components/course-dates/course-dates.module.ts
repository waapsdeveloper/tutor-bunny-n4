import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDatesComponent } from './course-dates.component';
import { AddScheduleModule } from './add-schedule/add-schedule.module';



@NgModule({
  declarations: [CourseDatesComponent],
  imports: [
    CommonModule,
    AddScheduleModule
  ],
  exports:[CourseDatesComponent]
})
export class CourseDatesModule { }
