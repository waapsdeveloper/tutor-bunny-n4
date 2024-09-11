import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CourseDetailPageRoutingModule } from './course-detail-routing.module';

import { CourseDetailPage } from './course-detail.page';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';
import { CoursePhotosModule } from 'src/app/components/course-photos/course-photos.module';
import { CourseSchedulesModule } from 'src/app/components/course-schedules/course-schedules.module';
import { OtherCoursesModule } from 'src/app/components/other-courses/other-courses.module';

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
