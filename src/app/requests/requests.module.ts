import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestsPageRoutingModule } from './requests-routing.module';

import { RequestsPage } from './requests.page';
import { SdHeaderTopModule } from '../components/sd-header-top/sd-header-top.module';
import { ReqCourseListModule } from './req-course-list/req-course-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestsPageRoutingModule,
    SdHeaderTopModule,
    ReqCourseListModule
  ],
  declarations: [RequestsPage]
})
export class RequestsPageModule {}
