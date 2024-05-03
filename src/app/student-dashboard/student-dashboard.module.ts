import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentDashboardPageRoutingModule } from './student-dashboard-routing.module';

import { StudentDashboardPage } from './student-dashboard.page';
import { ProfileSearchBoxModule } from './profile-search-box/profile-search-box.module';
import { RecCoursesModule } from './rec-courses/rec-courses.module';
import { RecTeachersModule } from './rec-teachers/rec-teachers.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentDashboardPageRoutingModule,
    ProfileSearchBoxModule,
    RecTeachersModule,
    RecCoursesModule
  ],
  declarations: [StudentDashboardPage]
})
export class StudentDashboardPageModule {}
