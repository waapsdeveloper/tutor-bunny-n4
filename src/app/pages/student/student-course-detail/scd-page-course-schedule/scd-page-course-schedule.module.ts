import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScdPageCourseScheduleComponent } from './scd-page-course-schedule.component';
import { CourseSchedulesModule } from "../../../../components/course-schedules/course-schedules.module";



@NgModule({
  declarations: [ScdPageCourseScheduleComponent],
  imports: [
    CommonModule,
    CourseSchedulesModule
],
  exports: [ScdPageCourseScheduleComponent] 
})
export class ScdPageCourseScheduleModule { }
