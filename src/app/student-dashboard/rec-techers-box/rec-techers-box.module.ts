import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecTechersBoxComponent } from './rec-techers-box.component';
import { TeacherListModule } from './teacher-list/teacher-list.module';



@NgModule({
  declarations: [RecTechersBoxComponent],
  imports: [
    CommonModule,
    TeacherListModule
  ],
  exports: [RecTechersBoxComponent]
})
export class RecTechersBoxModule { }
