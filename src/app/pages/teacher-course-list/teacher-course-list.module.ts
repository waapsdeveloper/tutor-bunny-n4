import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherCourseListPageRoutingModule } from './teacher-course-list-routing.module';

import { TeacherCourseListPage } from './teacher-course-list.page';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';
import { TeacherOtherCourseModule } from './teacher-other-course/teacher-other-course.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherCourseListPageRoutingModule,
    SdHeaderTopModule,
    TeacherOtherCourseModule
  ],
  declarations: [TeacherCourseListPage]
})
export class TeacherCourseListPageModule {}
