import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyTeachersPageRoutingModule } from './my-teachers-routing.module';

import { MyTeachersPage } from './my-teachers.page';
import { SdHeaderTopModule } from '../../components/sd-header-top/sd-header-top.module';
import { TeacherListModule } from './teacher-list/teacher-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyTeachersPageRoutingModule,
    SdHeaderTopModule,
    TeacherListModule
  ],
  declarations: [MyTeachersPage]
})
export class MyTeachersPageModule {}
