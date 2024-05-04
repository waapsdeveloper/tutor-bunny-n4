import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherProfileEditPageRoutingModule } from './teacher-profile-edit-routing.module';

import { TeacherProfileEditPage } from './teacher-profile-edit.page';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';
import { SdInputBoxModule } from 'src/app/components/sd-input-box/sd-input-box.module';
import { SdCountryBoxModule } from 'src/app/components/sd-country-box/sd-country-box.module';
import { SdButtonGrayModule } from 'src/app/components/sd-button-gray/sd-button-gray.module';
import { SdTextareaAboutModule } from 'src/app/components/sd-textarea-about/sd-textarea-about.module';
import { SdTextareaBoxModule } from 'src/app/components/sd-textarea-box/sd-textarea-box.module';
import { SdLanguageBoxModule } from 'src/app/components/sd-language-box/sd-language-box.module';
import { AcceptTermsProfileModule } from 'src/app/components/accept-terms-profile/accept-terms-profile.module';
import { SdSubjectBoxModule } from 'src/app/components/sd-subject-box/sd-subject-box.module';
import { SdImageBoxModule } from 'src/app/components/sd-image-box/sd-image-box.module';
import { SdStateBoxModule } from 'src/app/components/sd-state-box/sd-state-box.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TeacherProfileEditPageRoutingModule,
    SdHeaderTopModule,
    SdInputBoxModule,
    SdCountryBoxModule,
    SdButtonGrayModule,
    SdTextareaAboutModule,
    SdTextareaBoxModule,
    SdLanguageBoxModule,
    AcceptTermsProfileModule,
    SdSubjectBoxModule,
    SdImageBoxModule,
    SdStateBoxModule
  ],
  declarations: [TeacherProfileEditPage],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TeacherProfileEditPageModule {}
