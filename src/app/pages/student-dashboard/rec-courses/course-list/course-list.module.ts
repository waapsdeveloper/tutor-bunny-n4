import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from './course-list.component';
import { IonicModule } from '@ionic/angular';
import { NamesPipe } from 'src/app/pipes/names.pipe';
import { TrailMessageModule } from './trail-message/trail-message.module';



@NgModule({
  declarations: [CourseListComponent],
  imports: [
    CommonModule,
    IonicModule,
    TrailMessageModule
  ],
  exports: [CourseListComponent]
})
export class CourseListModule { }
