import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherListComponent } from './teacher-list.component';
import { NamesPipe } from 'src/app/pipes/names.pipe';
import { NamesPipeModule } from 'src/app/pipes/name.pipe.module';



@NgModule({
  declarations: [TeacherListComponent],
  imports: [
    CommonModule,
    NamesPipeModule
  ],
  exports:[TeacherListComponent]
})
export class TeacherListModule { }
