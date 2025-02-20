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
import { RatingStarsModule } from 'src/app/components/rating-stars/rating-stars.module';
import { StpPageHeaderModule } from 'src/app/components/shared/teacher-profile-pages-components/stp-page-header/stp-page-header.module';
import { StpPageVideoBoxModule } from 'src/app/components/shared/teacher-profile-pages-components/stp-page-header/stp-page-video-box/stp-page-video-box.module';
import { StpPageInfoModule } from 'src/app/components/shared/teacher-profile-pages-components/stp-page-header/stp-page-info/stp-page-info.module';
import { StpPageProfileStatisticsModule } from 'src/app/components/shared/teacher-profile-pages-components/stp-page-profile-statistics/stp-page-profile-statistics.module';
import { GlobalTextReadModule } from 'src/app/components/global-text-read/global-text-read.module';
import { MyRatingsModule } from 'src/app/components/my-ratings/my-ratings.module';
import { SdButtonClearModule } from 'src/app/components/sd-button-clear/sd-button-clear.module';
import { ExpQulRetroModule } from 'src/app/components/exp-qul-retro/exp-qul-retro.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherProfilePageRoutingModule,
    SdHeaderTopModule,
    ProfileBoxModule,
    // TeacherProfileStatisticsModule,
    YoutubeBoxModule,
    MyCoursesModule,
    MyGalleryModule,
    RatingReviewModule,
    OtherCoursesModule,
    // TeacherQualificationModule,
    RatingStarsModule,
    GlobalTextReadModule,
    MyRatingsModule,
    // 
    StpPageHeaderModule,
    StpPageVideoBoxModule,
    StpPageInfoModule,
    StpPageProfileStatisticsModule,
    SdButtonClearModule,
    ExpQulRetroModule
  ],
  declarations: [TeacherProfilePage],
})
export class TeacherProfilePageModule { }
