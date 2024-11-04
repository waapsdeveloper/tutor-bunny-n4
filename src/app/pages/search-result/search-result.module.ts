import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchResultPageRoutingModule } from './search-result-routing.module';

import { SearchResultPage } from './search-result.page';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';
import { SearchCourseBoxModule } from './search-course-box/search-course-box.module';
import { GenericCourseCardModule } from 'src/app/components/generic-course-card/generic-course-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchResultPageRoutingModule,
    SdHeaderTopModule,
    SearchCourseBoxModule,
    GenericCourseCardModule
  ],
  declarations: [SearchResultPage]
})
export class SearchResultPageModule {}
