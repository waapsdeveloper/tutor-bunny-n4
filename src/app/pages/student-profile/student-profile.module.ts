import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentProfilePageRoutingModule } from './student-profile-routing.module';

import { StudentProfilePage } from './student-profile.page';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';
import { ProfileBoxStudentModule } from 'src/app/components/profile-box-student/profile-box-student.module';

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
