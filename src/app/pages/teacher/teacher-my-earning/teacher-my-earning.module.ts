import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherMyEarningPageRoutingModule } from './teacher-my-earning-routing.module';

import { TeacherMyEarningPage } from './teacher-my-earning.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherMyEarningPageRoutingModule
  ],
  declarations: [TeacherMyEarningPage]
})
export class TeacherMyEarningPageModule {}
