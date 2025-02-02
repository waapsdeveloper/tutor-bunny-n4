import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoursePhotossPageRoutingModule } from './course-photoss-routing.module';

import { CoursePhotossPage } from './course-photoss.page';
import { SdButtonClearModule } from 'src/app/components/sd-button-clear/sd-button-clear.module';
import { SdButtonGrayModule } from 'src/app/components/sd-button-gray/sd-button-gray.module';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoursePhotossPageRoutingModule,
    SdButtonClearModule,
    SdButtonGrayModule,
    SdHeaderTopModule
  ],
  declarations: [CoursePhotossPage]
})
export class CoursePhotossPageModule {}
