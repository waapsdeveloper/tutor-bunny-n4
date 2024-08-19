import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherCourseListPageRoutingModule } from './teacher-course-list-routing.module';

import { TeacherCourseListPage } from './teacher-course-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherCourseListPageRoutingModule
  ],
  declarations: [TeacherCourseListPage]
})
export class TeacherCourseListPageModule {}
