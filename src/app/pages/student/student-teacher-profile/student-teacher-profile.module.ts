import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentTeacherProfilePageRoutingModule } from './student-teacher-profile-routing.module';

import { StudentTeacherProfilePage } from './student-teacher-profile.page';
import { StpPageHeaderModule } from './stp-page-header/stp-page-header.module';
import { StpPageVideoBoxModule } from './stp-page-video-box/stp-page-video-box.module';
import { StpPageInfoModule } from './stp-page-info/stp-page-info.module';
import { StpPageProfileStatisticsModule } from './stp-page-profile-statistics/stp-page-profile-statistics.module';
import { GlobalTextReadModule } from 'src/app/components/global-text-read/global-text-read.module';
import { MyCoursesModule } from 'src/app/components/my-courses/my-courses.module';
import { MyGalleryModule } from 'src/app/components/my-gallery/my-gallery.module';
import { SdButtonClearModule } from 'src/app/components/sd-button-clear/sd-button-clear.module';
import { SdButtonGoldenModule } from 'src/app/components/sd-button-golden/sd-button-golden.module';
import { MyRatingsModule } from 'src/app/components/my-ratings/my-ratings.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentTeacherProfilePageRoutingModule,
    GlobalTextReadModule,
    MyCoursesModule,
    MyGalleryModule,
    MyRatingsModule,

    // elements
    SdButtonClearModule,
    SdButtonGoldenModule,
    // component modules
    
    StpPageHeaderModule,
    StpPageVideoBoxModule,
    StpPageInfoModule,
    StpPageProfileStatisticsModule,
    

  ],
  declarations: [StudentTeacherProfilePage]
})
export class StudentTeacherProfilePageModule {}
