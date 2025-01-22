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
import { RatingStarsModule } from 'src/app/components/rating-stars/rating-stars.module';

import { SwiperModule } from 'swiper/angular';
import { GlobalTextReadModule } from 'src/app/components/global-text-read/global-text-read.module';
import { TeacherInfoCardModule } from 'src/app/components/teacher-info-card/teacher-info-card.module';
import { SlideBannerModule } from "../../../components/shared/detail-pages-components/slide-banner/slide-banner.module";
import { ScdPageInfoModule } from "../../../components/shared/detail-pages-components/scd-page-info/scd-page-info.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CourseDetailPageRoutingModule,
    SwiperModule,
    SdHeaderTopModule,
    CourseSchedulesModule,
    OtherCoursesModule,
    CoursePhotosModule,
    RatingStarsModule,
    GlobalTextReadModule,
    TeacherInfoCardModule,
    SlideBannerModule,
    ScdPageInfoModule
],
  declarations: [CourseDetailPage],

})
export class CourseDetailPageModule { }
