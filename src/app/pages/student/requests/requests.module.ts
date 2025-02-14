import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestsPageRoutingModule } from './requests-routing.module';

import { RequestsPage } from './requests.page';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';
import { GenericCourseCardModule } from 'src/app/components/generic-course-card/generic-course-card.module';
import { RequestItemModule } from './request-item/request-item.module';
import { NoDataModule } from 'src/app/components/no-data/no-data.module';
import { GlobalListViewModule } from "../../../components/global-list-view/global-list-view.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestsPageRoutingModule,
    SdHeaderTopModule,
    GenericCourseCardModule,
    RequestItemModule,
    NoDataModule,
    GlobalListViewModule
],
  declarations: [RequestsPage]
})
export class RequestsPageModule {}
