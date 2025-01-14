import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentTeacherProfilePageRoutingModule } from './student-teacher-profile-routing.module';

import { StudentTeacherProfilePage } from './student-teacher-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentTeacherProfilePageRoutingModule
  ],
  declarations: [StudentTeacherProfilePage]
})
export class StudentTeacherProfilePageModule {}
