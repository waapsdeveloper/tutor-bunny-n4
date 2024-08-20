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

],
  declarations: [SearchFilterPage]
})
export class SearchFilterPageModule {}
