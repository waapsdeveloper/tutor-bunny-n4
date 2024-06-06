import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecCoursesComponent } from './rec-courses.component';
import { IonicModule } from '@ionic/angular';
import { CourseListModule } from './course-list/course-list.module';



@NgModule({
  declarations: [RecCoursesComponent],
  imports: [
    CommonModule,
    IonicModule,
    CourseListModule
  ],
  exports: [
    RecCoursesComponent
  ]
})
export class RecCoursesModule { }
