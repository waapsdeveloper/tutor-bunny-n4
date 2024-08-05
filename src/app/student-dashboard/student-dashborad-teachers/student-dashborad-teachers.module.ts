import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentDashboradTeachersPageRoutingModule } from './student-dashborad-teachers-routing.module';

import { StudentDashboradTeachersPage } from './student-dashborad-teachers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentDashboradTeachersPageRoutingModule
  ],
  declarations: [StudentDashboradTeachersPage]
})
export class StudentDashboradTeachersPageModule {}
