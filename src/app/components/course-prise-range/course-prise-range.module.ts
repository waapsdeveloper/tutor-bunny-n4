import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursePriseRangeComponent } from './course-prise-range.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [CoursePriseRangeComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[CoursePriseRangeComponent]
})
export class CoursePriseRangeModule { }
