import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScdPageCourseStatisticsComponent } from './scd-page-course-statistics.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ScdPageCourseStatisticsComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [ScdPageCourseStatisticsComponent]
})
export class ScdPageCourseStatisticsModule { }
