import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherProfileCompletePageRoutingModule } from './teacher-profile-complete-routing.module';

import { TeacherProfileCompletePage } from './teacher-profile-complete.page';
import { SdButtonGrayModule } from 'src/app/components/sd-button-gray/sd-button-gray.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherProfileCompletePageRoutingModule,
    SdButtonGrayModule
  ],
  declarations: [TeacherProfileCompletePage]
})
export class TeacherProfileCompletePageModule {}
