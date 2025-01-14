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
import { StpPageCoursesStudyNotesModule } from './stp-page-courses-study-notes/stp-page-courses-study-notes.module';
import { StpPageGalleryModule } from './stp-page-gallery/stp-page-gallery.module';
import { StpPageRatingModule } from './stp-page-rating/stp-page-rating.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentTeacherProfilePageRoutingModule,

    // component modules
    StpPageHeaderModule,
    StpPageVideoBoxModule,
    StpPageInfoModule,
    StpPageProfileStatisticsModule,
    StpPageCoursesStudyNotesModule,
    StpPageGalleryModule,
    StpPageRatingModule

  ],
  declarations: [StudentTeacherProfilePage]
})
export class StudentTeacherProfilePageModule {}
