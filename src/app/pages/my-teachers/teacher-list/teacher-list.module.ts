import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherListComponent } from './teacher-list.component';



@NgModule({
  declarations: [TeacherListComponent],
  imports: [
    CommonModule
  ],
  exports:[TeacherListComponent]
})
export class TeacherListModule { }
