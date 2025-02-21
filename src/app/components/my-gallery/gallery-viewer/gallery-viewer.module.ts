import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryViewerComponent } from './gallery-viewer.component';
import { IonicModule } from '@ionic/angular';
import { SdButtonGrayModule } from "../../sd-button-gray/sd-button-gray.module";
import { SdHeaderTopModule } from "../../sd-header-top/sd-header-top.module";

import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx';


@NgModule({
  declarations: [GalleryViewerComponent],
  imports: [
    CommonModule,
    IonicModule,
    SdButtonGrayModule,
    SdHeaderTopModule
],

  exports: [
    GalleryViewerComponent
  ]
})
export class GalleryViewerModule { }
