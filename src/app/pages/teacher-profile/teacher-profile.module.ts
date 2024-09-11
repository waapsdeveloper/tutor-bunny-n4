import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherProfilePageRoutingModule } from './teacher-profile-routing.module';

import { TeacherProfilePage } from './teacher-profile.page';
import { TeacherProfileStatisticsModule } from './teacher-profile-statistics/teacher-profile-statistics.module';
import { RatingReviewModule } from './rating-review/rating-review.module';
import { TeacherQualificationModule } from './teacher-qualification/teacher-qualification.module';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';
import { MyCoursesModule } from 'src/app/components/my-courses/my-courses.module';
import { MyGalleryModule } from 'src/app/components/my-gallery/my-gallery.module';
import { OtherCoursesModule } from 'src/app/components/other-courses/other-courses.module';
import { ProfileBoxModule } from 'src/app/components/profile-box/profile-box.module';
import { YoutubeBoxModule } from 'src/app/components/youtube-box/youtube-box.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherProfilePageRoutingModule,
    SdHeaderTopModule,
    ProfileBoxModule,
    TeacherProfileStatisticsModule,
    YoutubeBoxModule,
    MyCoursesModule,
    MyGalleryModule,
    RatingReviewModule,
    OtherCoursesModule,
    TeacherQualificationModule
  ],
  declarations: [TeacherProfilePage],
})
export class TeacherProfilePageModule { }
