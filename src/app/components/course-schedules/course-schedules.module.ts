import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseSchedulesComponent } from './course-schedules.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [CourseSchedulesComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[CourseSchedulesComponent]
})
export class CourseSchedulesModule { }
