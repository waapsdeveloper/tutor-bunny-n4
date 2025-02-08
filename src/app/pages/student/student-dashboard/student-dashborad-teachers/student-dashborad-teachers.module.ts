import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentDashboradTeachersPageRoutingModule } from './student-dashborad-teachers-routing.module';

import { StudentDashboradTeachersPage } from './student-dashborad-teachers.page';
import { GenericTeacherCardModule } from 'src/app/components/generic-teacher-card/generic-teacher-card.module';
import { GlobalListViewModule } from "../../../../components/global-list-view/global-list-view.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentDashboradTeachersPageRoutingModule,
    GlobalListViewModule,
    GenericTeacherCardModule,
],
  declarations: [StudentDashboradTeachersPage],
  exports: [StudentDashboradTeachersPage]
})
export class StudentDashboradTeachersPageModule {}
