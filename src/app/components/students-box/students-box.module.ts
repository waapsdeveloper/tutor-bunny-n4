import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsBoxComponent } from './students-box.component';



@NgModule({
  declarations: [StudentsBoxComponent],
  imports: [
    CommonModule
  ],
  exports: [
    StudentsBoxComponent
  ]
})
export class StudentsBoxModule { }
