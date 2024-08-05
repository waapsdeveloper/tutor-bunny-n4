import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentDashboradTeachersPageRoutingModule } from './student-dashborad-teachers-routing.module';

import { StudentDashboradTeachersPage } from './student-dashborad-teachers.page';
import { RecTechersBoxModule } from '../rec-techers-box/rec-techers-box.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentDashboradTeachersPageRoutingModule,
    RecTechersBoxModule
  ],
  declarations: [StudentDashboradTeachersPage]
})
export class StudentDashboradTeachersPageModule {}
