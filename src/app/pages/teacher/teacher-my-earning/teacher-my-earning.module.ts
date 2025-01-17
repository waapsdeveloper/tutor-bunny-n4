import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherMyEarningPageRoutingModule } from './teacher-my-earning-routing.module';

import { TeacherMyEarningPage } from './teacher-my-earning.page';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherMyEarningPageRoutingModule,
    SdHeaderTopModule,
  ],
  declarations: [TeacherMyEarningPage]
})
export class TeacherMyEarningPageModule {}
