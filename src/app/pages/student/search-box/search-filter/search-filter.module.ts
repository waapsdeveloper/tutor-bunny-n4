import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchFilterPageRoutingModule } from './search-filter-routing.module';

import { SearchFilterPage } from './search-filter.page';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';
import { SdButtonGrayModule } from 'src/app/components/sd-button-gray/sd-button-gray.module';
import { CourseLanguageModule } from 'src/app/components/course-language/course-language.module';
import { CoursePriseRangeModule } from 'src/app/components/course-prise-range/course-prise-range.module';
import { ModeOfTeachingModule } from 'src/app/components/mode-of-teaching/mode-of-teaching.module';
import { SdAgeBooxModule } from 'src/app/components/sd-age-boox/sd-age-boox.module';
import { SdCountryBoxModule } from 'src/app/components/sd-country-box/sd-country-box.module';
import { SdInputBoxModule } from 'src/app/components/sd-input-box/sd-input-box.module';
import { SdStateBoxModule } from 'src/app/components/sd-state-box/sd-state-box.module';
import { TravelPoliceModule } from 'src/app/components/travel-police/travel-police.module';
import { SearchKeywordModule } from './search-keyword/search-keyword.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchFilterPageRoutingModule,
    SdHeaderTopModule,
    SearchKeywordModule,
    CourseLanguageModule,
    CoursePriseRangeModule,
    ModeOfTeachingModule,
    SdInputBoxModule,
    SdCountryBoxModule,
    SdStateBoxModule,
    TravelPoliceModule,
    SdAgeBooxModule,
    SdButtonGrayModule

],
  declarations: [SearchFilterPage]
})
export class SearchFilterPageModule {}
