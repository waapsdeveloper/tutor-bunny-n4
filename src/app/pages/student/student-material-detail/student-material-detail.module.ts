import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentMaterialDetailPageRoutingModule } from './student-material-detail-routing.module';

import { StudentMaterialDetailPage } from './student-material-detail.page';
import { MyCoursesModule } from "../../../components/my-courses/my-courses.module";
import { SdButtonGoldenModule } from "../../../components/sd-button-golden/sd-button-golden.module";
import { SdButtonClearModule } from "../../../components/sd-button-clear/sd-button-clear.module";
import { MyRatingsModule } from "../../../components/my-ratings/my-ratings.module";
import { TeacherInfoCardModule } from "../../../components/teacher-info-card/teacher-info-card.module";
import { MaterialAttachmentsModule } from "../../study-material/pages/detail-material/material-attachments/material-attachments.module";
import { GlobalTextReadModule } from "../../../components/global-text-read/global-text-read.module";
import { ScdPageInfoModule } from "../../../components/shared/detail-pages-components/scd-page-info/scd-page-info.module";
import { SlideBannerModule } from "../../../components/shared/detail-pages-components/slide-banner/slide-banner.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentMaterialDetailPageRoutingModule,
    MyCoursesModule,
    SdButtonGoldenModule,
    SdButtonClearModule,
    MyRatingsModule,
    TeacherInfoCardModule,
    MaterialAttachmentsModule,
    GlobalTextReadModule,
    ScdPageInfoModule,
    SlideBannerModule
],
  declarations: [StudentMaterialDetailPage]
})
export class StudentMaterialDetailPageModule {}
