import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecTeachersComponent } from './rec-teachers.component';



@NgModule({
  declarations: [RecTeachersComponent],
  imports: [
    CommonModule
  ],
  exports: [
    RecTeachersComponent
  ]
})
export class RecTeachersModule { }
