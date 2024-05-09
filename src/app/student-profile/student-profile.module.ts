import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentProfilePageRoutingModule } from './student-profile-routing.module';

import { StudentProfilePage } from './student-profile.page';
import { ProfileBoxModule } from '../components/profile-box/profile-box.module';
import { SdHeaderTopModule } from '../components/sd-header-top/sd-header-top.module';
import { ProfileBoxStudentModule } from '../components/profile-box-student/profile-box-student.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentProfilePageRoutingModule,
    SdHeaderTopModule,
    ProfileBoxStudentModule
  ],
  declarations: [StudentProfilePage],
})
export class StudentProfilePageModule { }
