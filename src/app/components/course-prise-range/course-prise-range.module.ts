import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursePriseRangeComponent } from './course-prise-range.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CoursePriseRangeComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports:[CoursePriseRangeComponent]
})
export class CoursePriseRangeModule { }
