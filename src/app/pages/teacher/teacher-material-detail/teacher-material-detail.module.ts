import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherMaterialDetailPageRoutingModule } from './teacher-material-detail-routing.module';

import { TeacherMaterialDetailPage } from './teacher-material-detail.page';
import { SdButtonClearModule } from "../../../components/sd-button-clear/sd-button-clear.module";
import { SdButtonGoldenModule } from "../../../components/sd-button-golden/sd-button-golden.module";
import { MyRatingsModule } from "../../../components/my-ratings/my-ratings.module";
import { SlideBannerModule } from "../../../components/shared/detail-pages-components/slide-banner/slide-banner.module";
import { GlobalTextReadModule } from "../../../components/global-text-read/global-text-read.module";
import { MaterialAttachmentsModule } from "../../study-material/pages/detail-material/material-attachments/material-attachments.module";
import { TeacherInfoCardModule } from "../../../components/teacher-info-card/teacher-info-card.module";
import { MyCoursesModule } from "../../../components/my-courses/my-courses.module";
import { ScdPageInfoModule } from "../../../components/shared/detail-pages-components/scd-page-info/scd-page-info.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherMaterialDetailPageRoutingModule,
    SdButtonClearModule,
    SdButtonGoldenModule,
    MyRatingsModule,
    SlideBannerModule,
    GlobalTextReadModule,
    MaterialAttachmentsModule,
    TeacherInfoCardModule,
    MyCoursesModule,
    ScdPageInfoModule
],
  declarations: [TeacherMaterialDetailPage]
})
export class TeacherMaterialDetailPageModule {}
