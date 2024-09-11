import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from './course-card.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [CourseCardComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[CourseCardComponent]
})
export class CourseCardModule { }
