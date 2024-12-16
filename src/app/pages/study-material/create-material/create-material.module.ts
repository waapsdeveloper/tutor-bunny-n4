import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SdErrorInputInfoModule } from 'src/app/components/sd-error-input-info/sd-error-input-info.module';
import { SdTextareaAboutModule } from 'src/app/components/sd-textarea-about/sd-textarea-about.module';
import { SdTextareaBoxModule } from 'src/app/components/sd-textarea-box/sd-textarea-box.module';
import { IonicModule } from '@ionic/angular';
import { MaterialLanguageModule } from 'src/app/components/material-language/material-language.module';
import { CreateMaterialPageRoutingModule } from './create-material-routing.module';
import { ModeOfTeachingModule } from 'src/app/components/mode-of-teaching/mode-of-teaching.module';
import { AcceptTermsProfileModule } from 'src/app/components/accept-terms-profile/accept-terms-profile.module';
import { CourseCategoryModule } from 'src/app/components/course-category/course-category.module';
import { CourseDatesModule } from 'src/app/components/course-dates/course-dates.module';
import { MaterialPhotoModule } from 'src/app/components/material-photo/material-photo.module';
import { CreateMaterialPage } from './create-material.page';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';
import { SdButtonClearModule } from 'src/app/components/sd-button-clear/sd-button-clear.module';
import { SdButtonGrayModule } from 'src/app/components/sd-button-gray/sd-button-gray.module';
import { SdInputBoxModule } from 'src/app/components/sd-input-box/sd-input-box.module';
import { SdAgeBooxModule } from 'src/app/components/sd-age-boox/sd-age-boox.module';
import { SearchKeywordModule } from 'src/app/components/search-keyword/search-keyword.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateMaterialPageRoutingModule,
    SdHeaderTopModule,
    SdButtonGrayModule,
    SdButtonClearModule,
    SdInputBoxModule,
    SdTextareaBoxModule,
    SdTextareaAboutModule,
    MaterialLanguageModule,
    ModeOfTeachingModule,
    MaterialPhotoModule,
    AcceptTermsProfileModule,
    CourseCategoryModule,
    CourseDatesModule,
    SdAgeBooxModule,
    SearchKeywordModule,
    SdErrorInputInfoModule    


  ],
  declarations: [CreateMaterialPage]
})
export class CreateMaterialPageModule {}
