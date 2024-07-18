import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherProfilePageRoutingModule } from './teacher-profile-routing.module';

import { TeacherProfilePage } from './teacher-profile.page';
import { SdHeaderTopModule } from '../components/sd-header-top/sd-header-top.module';
import { ProfileBoxModule } from '../components/profile-box/profile-box.module';
import { TeacherProfileStatisticsModule } from './teacher-profile-statistics/teacher-profile-statistics.module';
import { SdButtonClearModule } from '../components/sd-button-clear/sd-button-clear.module';
import { YoutubeBoxModule } from '../components/youtube-box/youtube-box.module';
import { MyCoursesModule } from '../components/my-courses/my-courses.module';
import { MyGalleryModule } from '../components/my-gallery/my-gallery.module';
import { RatingReviewModule } from '../components/rating-review/rating-review.module';
import { OtherCoursesModule } from '../components/other-courses/other-courses.module';

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
    OtherCoursesModule
  ],
  declarations: [TeacherProfilePage],
})
export class TeacherProfilePageModule { }
