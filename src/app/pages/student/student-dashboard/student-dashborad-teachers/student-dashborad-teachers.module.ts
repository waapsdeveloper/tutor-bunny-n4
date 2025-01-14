import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentDashboradTeachersPageRoutingModule } from './student-dashborad-teachers-routing.module';

import { StudentDashboradTeachersPage } from './student-dashborad-teachers.page';
import { GenericTeacherCardModule } from 'src/app/components/generic-teacher-card/generic-teacher-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentDashboradTeachersPageRoutingModule,
    GenericTeacherCardModule
  ],
  declarations: [StudentDashboradTeachersPage]
})
export class StudentDashboradTeachersPageModule {}
