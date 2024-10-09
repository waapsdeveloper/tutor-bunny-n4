import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecTechersBoxComponent } from './rec-techers-box.component';
import { TeacherListModule } from './teacher-list/teacher-list.module';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [RecTechersBoxComponent],
  imports: [
    CommonModule,
    IonicModule,
    TeacherListModule
  ],
  exports: [RecTechersBoxComponent]
})
export class RecTechersBoxModule { }
