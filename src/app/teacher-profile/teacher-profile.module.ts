import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherProfilePageRoutingModule } from './teacher-profile-routing.module';

import { TeacherProfilePage } from './teacher-profile.page';
import { SdHeaderTopModule } from '../components/sd-header-top/sd-header-top.module';
import { ProfileBoxModule } from '../components/profile-box/profile-box.module';
import { TeacherProfileStatisticsModule } from './teacher-profile-statistics/teacher-profile-statistics.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherProfilePageRoutingModule,
    SdHeaderTopModule,
    ProfileBoxModule,
    TeacherProfileStatisticsModule,
  ],
  declarations: [TeacherProfilePage],
})
export class TeacherProfilePageModule { }
