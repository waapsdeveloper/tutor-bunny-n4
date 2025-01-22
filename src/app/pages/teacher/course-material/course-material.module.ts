import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CourseMaterialPageRoutingModule } from './course-material-routing.module';

import { CourseMaterialPage } from './course-material.page';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CourseMaterialPageRoutingModule,
    SdHeaderTopModule,
  ],
  declarations: [CourseMaterialPage]
})
export class CourseMaterialPageModule {}
