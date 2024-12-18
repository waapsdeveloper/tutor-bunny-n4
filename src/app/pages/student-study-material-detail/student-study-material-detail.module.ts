import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentStudyMaterialDetailPageRoutingModule } from './student-study-material-detail-routing.module';

import { StudentStudyMaterialDetailPage } from './student-study-material-detail.page';
import { SdHeaderTopModule } from '../../components/sd-header-top/sd-header-top.module';
import { SdButtonGrayModule } from '../../components/sd-button-gray/sd-button-gray.module';
import { SdButtonClearModule } from '../../components/sd-button-clear/sd-button-clear.module';
import { CourseSchedulesModule } from '../../components/course-schedules/course-schedules.module';
import { StudentOtherStudyMaterialModule } from './student-other-study-material/student-other-study-material.module';
import { CoursePhotosModule } from '../../components/course-photos/course-photos.module';
import { TrailMessageModule } from 'src/app/components/trail-message/trail-message.module';
import { RatingStarsModule } from 'src/app/components/rating-stars/rating-stars.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentStudyMaterialDetailPageRoutingModule,
    SdHeaderTopModule,
    SdButtonGrayModule,
    SdButtonClearModule,
    CourseSchedulesModule,
    StudentOtherStudyMaterialModule,
    TrailMessageModule,
    CoursePhotosModule,
    RatingStarsModule

  ],

  declarations: [StudentStudyMaterialDetailPage]
})
export class StudentStudyMaterialDetailPageModule { }
