import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherWelcomePageRoutingModule } from './teacher-welcome-routing.module';

import { TeacherWelcomePage } from './teacher-welcome.page';
import { SdButtonClearModule } from '../components/sd-button-clear/sd-button-clear.module';
import { SdButtonGrayModule } from '../components/sd-button-gray/sd-button-gray.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SdButtonClearModule,
    SdButtonGrayModule,
    TeacherWelcomePageRoutingModule
  ],
  declarations: [TeacherWelcomePage]
})
export class TeacherWelcomePageModule {}
