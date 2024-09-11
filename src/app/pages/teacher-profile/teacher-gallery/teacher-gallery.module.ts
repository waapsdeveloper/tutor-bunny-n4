import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherGalleryPageRoutingModule } from './teacher-gallery-routing.module';

import { TeacherGalleryPage } from './teacher-gallery.page';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';
import { SdButtonClearModule } from 'src/app/components/sd-button-clear/sd-button-clear.module';
import { SdButtonGrayModule } from 'src/app/components/sd-button-gray/sd-button-gray.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherGalleryPageRoutingModule,
    SdHeaderTopModule,
    SdButtonClearModule,
    SdButtonGrayModule
  ],
  declarations: [TeacherGalleryPage]
})
export class TeacherGalleryPageModule {}
