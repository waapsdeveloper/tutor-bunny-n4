import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherProfileEditPageRoutingModule } from './teacher-profile-edit-routing.module';

import { TeacherProfileEditPage } from './teacher-profile-edit.page';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';
import { SdInputBoxModule } from 'src/app/components/sd-input-box/sd-input-box.module';
import { SdCountryBoxModule } from 'src/app/components/sd-country-box/sd-country-box.module';
import { SdTextareaBoxModule } from 'src/app/components/sd-textarea-box/sd-input-box.module';
import { SdButtonGrayModule } from 'src/app/components/sd-button-gray/sd-button-gray.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherProfileEditPageRoutingModule,
    SdHeaderTopModule,
    SdInputBoxModule,
    SdTextareaBoxModule,
    SdCountryBoxModule,
    SdButtonGrayModule
  ],
  declarations: [TeacherProfileEditPage],
})
export class TeacherProfileEditPageModule {}
