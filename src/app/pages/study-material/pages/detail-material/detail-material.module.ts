import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OtherCoursesModule } from 'src/app/components/other-courses/other-courses.module';
import { IonicModule } from '@ionic/angular';

import { DetailMaterialPageRoutingModule } from './detail-material-routing.module';

import { DetailMaterialPage } from './detail-material.page';
import { CourseSchedulesModule } from 'src/app/components/course-schedules/course-schedules.module';
import { MaterialPhotosModule } from './material-photos/material-photos.module';
import { RatingStarsModule } from 'src/app/components/rating-stars/rating-stars.module';
import { MaterialAttachmentsModule } from './material-attachments/material-attachments.module';

import { GlobalTextReadModule } from 'src/app/components/global-text-read/global-text-read.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailMaterialPageRoutingModule,
    OtherCoursesModule,
    CourseSchedulesModule,
    RatingStarsModule,
<<<<<<< HEAD
    GlobalTextReadModule,
    MaterialPhotosModule,
    
=======
    MaterialPhotosModule,
    MaterialAttachmentsModule
>>>>>>> a47292402d115cf0e6de26e8cf380f75da8dbf6b

  ],
  declarations: [DetailMaterialPage],
})
export class DetailMaterialPageModule {}
