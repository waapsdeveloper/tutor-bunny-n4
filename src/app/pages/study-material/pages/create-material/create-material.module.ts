import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SdErrorInputInfoModule } from 'src/app/components/sd-error-input-info/sd-error-input-info.module';
import { SdTextareaAboutModule } from 'src/app/components/sd-textarea-about/sd-textarea-about.module';
import { SdTextareaBoxModule } from 'src/app/components/sd-textarea-box/sd-textarea-box.module';
import { IonicModule } from '@ionic/angular';
import { CreateMaterialPageRoutingModule } from './create-material-routing.module';
import { ModeOfTeachingModule } from 'src/app/components/mode-of-teaching/mode-of-teaching.module';
import { AcceptTermsProfileModule } from 'src/app/components/accept-terms-profile/accept-terms-profile.module';
import { CourseCategoryModule } from 'src/app/components/course-category/course-category.module';
import { CourseDatesModule } from 'src/app/components/course-dates/course-dates.module';
import { CreateMaterialPage } from './create-material.page';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';
import { SdButtonClearModule } from 'src/app/components/sd-button-clear/sd-button-clear.module';
import { SdButtonGrayModule } from 'src/app/components/sd-button-gray/sd-button-gray.module';
import { SdInputBoxModule } from 'src/app/components/sd-input-box/sd-input-box.module';
import { SdAgeBooxModule } from 'src/app/components/sd-age-boox/sd-age-boox.module';
import { SearchKeywordModule } from 'src/app/components/search-keyword/search-keyword.module';
// import { MaterialUploadModule } from 'src/app/components/material-upload/material-upload.module';
import { SwiperModule } from 'swiper/angular';
import { InputMaterialTitleComponent } from './input-material-title/input-material-title.component';
import { InputMaterialDescriptionComponent } from './input-material-description/input-material-description.component';
import { InputMaterialPriceComponent } from './input-material-price/input-material-price.component';
import { InputMaterialLanguageComponent } from './input-material-language/input-material-language.component';
import { MaterialLanguageModule } from './input-material-language/material-language/material-language.module';
import { InputMaterialTermsComponent } from './input-material-terms/input-material-terms.component';
import { InputMaterialPhotosComponent } from './input-material-photos/input-material-photos.component';
import { InputMaterialKeywordsComponent } from './input-material-keywords/input-material-keywords.component';
import { MaterialSearchKeywordModule } from './input-material-keywords/material-search-keyword/material-search-keyword.module';
import { InputMaterialDocsComponent } from './input-material-docs/input-material-docs.component';


@NgModule({

  imports: [
    CommonModule,
    // MaterialUploadModule,
    FormsModule,
    IonicModule,
    CreateMaterialPageRoutingModule,
    SwiperModule,
    SdHeaderTopModule,
    SdButtonGrayModule,
    SdButtonClearModule,
    SdInputBoxModule,
    SdTextareaBoxModule,
    SdTextareaAboutModule,

    ModeOfTeachingModule,
    AcceptTermsProfileModule,
    CourseCategoryModule,
    CourseDatesModule,
    SdAgeBooxModule,
    SearchKeywordModule,
    SdErrorInputInfoModule,

    //
    MaterialLanguageModule,
    MaterialSearchKeywordModule,

  ],
  declarations: [
    CreateMaterialPage,
    InputMaterialTitleComponent,
    InputMaterialDescriptionComponent,
    InputMaterialPriceComponent,
    InputMaterialLanguageComponent,
    InputMaterialTermsComponent,
    InputMaterialPhotosComponent,
    InputMaterialKeywordsComponent,
    InputMaterialDocsComponent
  ]
})
export class CreateMaterialPageModule {}
