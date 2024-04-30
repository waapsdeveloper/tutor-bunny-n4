import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherProfileEditPageRoutingModule } from './teacher-profile-edit-routing.module';

import { TeacherProfileEditPage } from './teacher-profile-edit.page';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherProfileEditPageRoutingModule,
    SdHeaderTopModule,
  ],
  declarations: [TeacherProfileEditPage],
})
export class TeacherProfileEditPageModule {}
