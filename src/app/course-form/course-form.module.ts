import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CourseFormPageRoutingModule } from './course-form-routing.module';

import { CourseFormPage } from './course-form.page';
import { AcceptTermsProfileModule } from '../components/accept-terms-profile/accept-terms-profile.module';
import { SdBbackBtnModule } from '../components/sd-bback-btn/sd-bback-btn.module';
import { SdButtonGrayModule } from '../components/sd-button-gray/sd-button-gray.module';
import { SdCountryBoxModule } from '../components/sd-country-box/sd-country-box.module';
import { SdDailcodeBoxModule } from '../components/sd-dailcode-box/sd-dailcode-box.module';
import { SdHeaderTopModule } from '../components/sd-header-top/sd-header-top.module';
import { SdImageBoxModule } from '../components/sd-image-box/sd-image-box.module';
import { SdInputBoxModule } from '../components/sd-input-box/sd-input-box.module';
import { SdLanguageBoxModule } from '../components/sd-language-box/sd-language-box.module';
import { SdStateBoxModule } from '../components/sd-state-box/sd-state-box.module';
import { SdSubjectBoxModule } from '../components/sd-subject-box/sd-subject-box.module';
import { SdTextareaAboutModule } from '../components/sd-textarea-about/sd-textarea-about.module';
import { SdTextareaBoxModule } from '../components/sd-textarea-box/sd-textarea-box.module';
import { CourseLanguageModule } from '../components/course-language/course-language.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CourseFormPageRoutingModule,
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
    SdStateBoxModule,
    SdDailcodeBoxModule,
    SdBbackBtnModule,
    CourseLanguageModule
  ],
  declarations: [CourseFormPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CourseFormPageModule { }
