import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyGalleryComponent } from './my-gallery.component';
import { GalleryListModule } from './gallery-list/gallery-list.module';
import { GalleryViewerModule } from './gallery-viewer/gallery-viewer.module';



@NgModule({
  declarations: [MyGalleryComponent],
  imports: [
    CommonModule,
    GalleryListModule,
    GalleryViewerModule
  ],
  exports:[MyGalleryComponent]
})
export class MyGalleryModule { }
