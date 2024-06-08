import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentCourseDetailPageRoutingModule } from './student-course-detail-routing.module';

import { StudentCourseDetailPage } from './student-course-detail.page';
import { SdHeaderTopModule } from '../components/sd-header-top/sd-header-top.module';
import { SdButtonGrayModule } from '../components/sd-button-gray/sd-button-gray.module';
import { OtherCoursesModule } from '../components/other-courses/other-courses.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentCourseDetailPageRoutingModule,
    SdHeaderTopModule,
    SdButtonGrayModule,
    OtherCoursesModule
  ],
  declarations: [StudentCourseDetailPage]
})
export class StudentCourseDetailPageModule { }
