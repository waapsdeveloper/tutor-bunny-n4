import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CourseDetailPageRoutingModule } from './course-detail-routing.module';

import { CourseDetailPage } from './course-detail.page';
import { SdHeaderTopModule } from '../components/sd-header-top/sd-header-top.module';
import { YoutubeBoxModule } from '../components/youtube-box/youtube-box.module';
import { OtherCoursesModule } from '../components/other-courses/other-courses.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CourseDetailPageRoutingModule,
    SdHeaderTopModule,
    OtherCoursesModule
  ],
  declarations: [CourseDetailPage]
})
export class CourseDetailPageModule { }
