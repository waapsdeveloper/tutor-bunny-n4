import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CourseDetailPageRoutingModule } from './course-detail-routing.module';

import { CourseDetailPage } from './course-detail.page';
import { SdHeaderTopModule } from '../components/sd-header-top/sd-header-top.module';
import { OtherCoursesModule } from '../components/other-courses/other-courses.module';
import { CourseSchedulesModule } from '../components/course-schedules/course-schedules.module';
import { CoursePhotosModule } from '../components/course-photos/course-photos.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CourseDetailPageRoutingModule,
    SdHeaderTopModule,
    CourseSchedulesModule,
    OtherCoursesModule,
    CoursePhotosModule
  ],
  declarations: [CourseDetailPage],

})
export class CourseDetailPageModule { }
