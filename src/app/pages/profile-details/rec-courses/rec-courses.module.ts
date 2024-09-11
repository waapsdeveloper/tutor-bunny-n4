import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecCoursesComponent } from './rec-courses.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [RecCoursesComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    RecCoursesComponent
  ]
})
export class RecCoursesModule { }
