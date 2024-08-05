import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentDashboradCoursesPageRoutingModule } from './student-dashborad-courses-routing.module';

import { StudentDashboradCoursesPage } from './student-dashborad-courses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentDashboradCoursesPageRoutingModule
  ],
  declarations: [StudentDashboradCoursesPage]
})
export class StudentDashboradCoursesPageModule {}
