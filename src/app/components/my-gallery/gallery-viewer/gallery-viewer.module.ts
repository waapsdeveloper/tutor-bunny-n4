import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryViewerComponent } from './gallery-viewer.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [GalleryViewerComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    GalleryViewerComponent
  ]
})
export class GalleryViewerModule { }
