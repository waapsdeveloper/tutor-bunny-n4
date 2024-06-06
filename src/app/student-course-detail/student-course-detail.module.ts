import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentCourseDetailPageRoutingModule } from './student-course-detail-routing.module';

import { StudentCourseDetailPage } from './student-course-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentCourseDetailPageRoutingModule
  ],
  declarations: [StudentCourseDetailPage]
})
export class StudentCourseDetailPageModule {}
