import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from './course-list.component';
import { IonicModule } from '@ionic/angular';
import { NamesPipe } from 'src/app/names.pipe';



@NgModule({
  declarations: [CourseListComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[CourseListComponent]
})
export class CourseListModule { }
