import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TeacherQualificationComponent } from './teacher-qualification.component';



@NgModule({
  declarations: [TeacherQualificationComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[TeacherQualificationComponent]
})
export class TeacherQualificationModule { }
