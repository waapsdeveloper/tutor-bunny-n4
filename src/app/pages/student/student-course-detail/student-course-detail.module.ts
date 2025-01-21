import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentCourseDetailPageRoutingModule } from './student-course-detail-routing.module';

import { StudentCourseDetailPage } from './student-course-detail.page';
import { StudentOtherCoursesModule } from './student-other-courses/student-other-courses.module';
import { TrailMessageModule } from 'src/app/components/trail-message/trail-message.module';
import { RatingStarsModule } from 'src/app/components/rating-stars/rating-stars.module';
import { CoursePhotosModule } from 'src/app/components/course-photos/course-photos.module';
import { CourseSchedulesModule } from 'src/app/components/course-schedules/course-schedules.module';
import { OtherCoursesModule } from 'src/app/components/other-courses/other-courses.module';
import { SdButtonClearModule } from 'src/app/components/sd-button-clear/sd-button-clear.module';
import { SdButtonGrayModule } from 'src/app/components/sd-button-gray/sd-button-gray.module';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';

import { GlobalTextReadModule } from 'src/app/components/global-text-read/global-text-read.module';
import { ScdPageCourseStatisticsModule } from '../../../components/shared/detail-pages-components/scd-page-course-statistics/scd-page-course-statistics.module';
import { ScdPageCourseScheduleModule } from './scd-page-course-schedule/scd-page-course-schedule.module';
import { ScdPageFooterModule } from './scd-page-footer/scd-page-footer.module';
import { SlideBannerModule } from 'src/app/components/shared/detail-pages-components/slide-banner/slide-banner.module';
import { ScdPageInfoModule } from 'src/app/components/shared/detail-pages-components/scd-page-info/scd-page-info.module';
import { TeacherInfoCardModule } from 'src/app/components/teacher-info-card/teacher-info-card.module';
import { MyCoursesModule } from "../../../components/my-courses/my-courses.module";
import { MyRatingsModule } from "../../../components/my-ratings/my-ratings.module";
import { SdButtonGoldenModule } from "../../../components/sd-button-golden/sd-button-golden.module";


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
    TrailMessageModule,
    CoursePhotosModule,
    RatingStarsModule,
    GlobalTextReadModule,
    // ScdPageHeaderModule,
    SlideBannerModule,
    TeacherInfoCardModule,
    ScdPageInfoModule,
    ScdPageCourseStatisticsModule,
    ScdPageCourseScheduleModule,
    ScdPageFooterModule,
    MyCoursesModule,
    MyRatingsModule,
    SdButtonGoldenModule
],
  declarations: [StudentCourseDetailPage]
})
export class StudentCourseDetailPageModule { }
