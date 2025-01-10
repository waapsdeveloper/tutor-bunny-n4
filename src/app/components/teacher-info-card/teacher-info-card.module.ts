import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherInfoCardComponent } from './teacher-info-card.component';



@NgModule({
  declarations: [TeacherInfoCardComponent],
  imports: [
    CommonModule
  ],
  exports: [
    TeacherInfoCardComponent
  ]
})
export class TeacherInfoCardModule { }
