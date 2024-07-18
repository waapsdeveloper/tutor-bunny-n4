import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentCourseDetailPageRoutingModule } from './student-course-detail-routing.module';

import { StudentCourseDetailPage } from './student-course-detail.page';
import { SdHeaderTopModule } from '../components/sd-header-top/sd-header-top.module';
import { SdButtonGrayModule } from '../components/sd-button-gray/sd-button-gray.module';
import { OtherCoursesModule } from '../components/other-courses/other-courses.module';
import { SdButtonClearModule } from '../components/sd-button-clear/sd-button-clear.module';
import { CourseSchedulesModule } from '../components/course-schedules/course-schedules.module';
import { StudentOtherCoursesModule } from './student-other-courses/student-other-courses.module';
import { TrailMessageModule } from '../student-dashboard/rec-courses/course-list/trail-message/trail-message.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentCourseDetailPageRoutingModule,
    SdHeaderTopModule,
    SdButtonGrayModule,
    SdButtonClearModule,
    OtherCoursesModule,
    CourseSchedulesModule,
    StudentOtherCoursesModule,
    TrailMessageModule
  ],
  declarations: [StudentCourseDetailPage]
})
export class StudentCourseDetailPageModule { }
