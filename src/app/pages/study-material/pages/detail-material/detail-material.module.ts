import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OtherCoursesModule } from 'src/app/components/other-courses/other-courses.module';
import { IonicModule } from '@ionic/angular';

import { DetailMaterialPageRoutingModule } from './detail-material-routing.module';

import { DetailMaterialPage } from './detail-material.page';
import { CourseSchedulesModule } from 'src/app/components/course-schedules/course-schedules.module';
import { RatingStarsModule } from 'src/app/components/rating-stars/rating-stars.module';
import { GlobalTextReadModule } from 'src/app/components/global-text-read/global-text-read.module';
import { MaterialAttachmentsModule } from './material-attachments/material-attachments.module';
import { MyRatingsModule } from "../../../../components/my-ratings/my-ratings.module";
import { SdButtonClearModule } from "../../../../components/sd-button-clear/sd-button-clear.module";
import { SdButtonGoldenModule } from "../../../../components/sd-button-golden/sd-button-golden.module";
import { SlideBannerModule } from "../../../../components/shared/detail-pages-components/slide-banner/slide-banner.module";
import { ScdPageInfoModule } from "../../../../components/shared/detail-pages-components/scd-page-info/scd-page-info.module";
import { TeacherInfoCardModule } from "../../../../components/teacher-info-card/teacher-info-card.module";
import { MyCoursesModule } from "../../../../components/my-courses/my-courses.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailMaterialPageRoutingModule,
    OtherCoursesModule,
    CourseSchedulesModule,
    RatingStarsModule,
    GlobalTextReadModule,
    MaterialAttachmentsModule,
    MyRatingsModule,
    SdButtonClearModule,
    SdButtonGoldenModule,
    SlideBannerModule,
    ScdPageInfoModule,
    TeacherInfoCardModule,
    MyCoursesModule
],
  declarations: [DetailMaterialPage],
})
export class DetailMaterialPageModule {}
