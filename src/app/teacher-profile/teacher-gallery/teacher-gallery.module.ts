import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherGalleryPageRoutingModule } from './teacher-gallery-routing.module';

import { TeacherGalleryPage } from './teacher-gallery.page';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherGalleryPageRoutingModule,
    SdHeaderTopModule,
  ],
  declarations: [TeacherGalleryPage]
})
export class TeacherGalleryPageModule {}
