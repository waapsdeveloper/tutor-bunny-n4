import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentDashboradCoursesPageRoutingModule } from './student-dashborad-courses-routing.module';

import { StudentDashboradCoursesPage } from './student-dashborad-courses.page';
import { RecCoursesModule } from '../rec-courses/rec-courses.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentDashboradCoursesPageRoutingModule,
    RecCoursesModule
  ],
  declarations: [StudentDashboradCoursesPage]
})
export class StudentDashboradCoursesPageModule {}
