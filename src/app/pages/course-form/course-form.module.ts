import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CourseFormPageRoutingModule } from './course-form-routing.module';

import { CourseFormPage } from './course-form.page';
import { AcceptTermsProfileModule } from 'src/app/components/accept-terms-profile/accept-terms-profile.module';
import { CourseCategoryModule } from 'src/app/components/course-category/course-category.module';
import { CourseDatesModule } from 'src/app/components/course-dates/course-dates.module';
import { CourseLanguageModule } from 'src/app/components/course-language/course-language.module';
import { CoursePhotoModule } from 'src/app/components/course-photo/course-photo.module';
import { ModeOfTeachingModule } from 'src/app/components/mode-of-teaching/mode-of-teaching.module';
import { SdAgeBooxModule } from 'src/app/components/sd-age-boox/sd-age-boox.module';
import { SdBbackBtnModule } from 'src/app/components/sd-bback-btn/sd-bback-btn.module';
import { SdButtonGrayModule } from 'src/app/components/sd-button-gray/sd-button-gray.module';
import { SdCountryBoxModule } from 'src/app/components/sd-country-box/sd-country-box.module';
import { SdDailcodeBoxModule } from 'src/app/components/sd-dailcode-box/sd-dailcode-box.module';
import { SdDateBoxModule } from 'src/app/components/sd-date-box/sd-date-box.module';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';
import { SdImageBoxModule } from 'src/app/components/sd-image-box/sd-image-box.module';
import { SdInputBoxModule } from 'src/app/components/sd-input-box/sd-input-box.module';
import { SdLanguageBoxModule } from 'src/app/components/sd-language-box/sd-language-box.module';
import { SdStateBoxModule } from 'src/app/components/sd-state-box/sd-state-box.module';
import { SdSubjectBoxModule } from 'src/app/components/sd-subject-box/sd-subject-box.module';
import { SdTextareaAboutModule } from 'src/app/components/sd-textarea-about/sd-textarea-about.module';
import { SdTextareaBoxModule } from 'src/app/components/sd-textarea-box/sd-textarea-box.module';
import { SearchKeywordModule } from 'src/app/components/search-keyword/search-keyword.module';

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
    CourseLanguageModule,
    CoursePhotoModule,
    ModeOfTeachingModule,
    SearchKeywordModule,
    CourseDatesModule,
    CourseCategoryModule,
    SdAgeBooxModule,
    SdDateBoxModule
  ],
  declarations: [CourseFormPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CourseFormPageModule { }
