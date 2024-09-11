import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchFilterPageRoutingModule } from './search-filter-routing.module';

import { SearchFilterPage } from './search-filter.page';
import { SdHeaderTopModule } from '../components/sd-header-top/sd-header-top.module';
import { SearchKeywordModule } from '../components/search-keyword/search-keyword.module';
import { CourseLanguageModule } from '../components/course-language/course-language.module';
import { CoursePriseRangeModule } from "../components/course-prise-range/course-prise-range.module";
import { ModeOfTeachingModule } from '../components/mode-of-teaching/mode-of-teaching.module';
import { SdInputBoxModule } from '../components/sd-input-box/sd-input-box.module';
import { SdCountryBoxModule } from '../components/sd-country-box/sd-country-box.module';
import { SdStateBoxModule } from '../components/sd-state-box/sd-state-box.module';
import { TravelPoliceModule } from '../components/travel-police/travel-police.module';
import { SdAgeBooxModule } from '../components/sd-age-boox/sd-age-boox.module';
import { SdButtonGrayModule } from '../components/sd-button-gray/sd-button-gray.module';

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
