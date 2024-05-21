import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GalleryImagePageRoutingModule } from './gallery-image-routing.module';

import { GalleryImagePage } from './gallery-image.page';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';
import { SdBbackBtnModule } from 'src/app/components/sd-bback-btn/sd-bback-btn.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GalleryImagePageRoutingModule,
    SdHeaderTopModule,
    SdBbackBtnModule
  ],
  declarations: [GalleryImagePage]
})
export class GalleryImagePageModule {}
