import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryListComponent } from './gallery-list.component';
import { SwiperModule } from 'swiper/angular';
import { GalleryViewerModule } from '../gallery-viewer/gallery-viewer.module';


@NgModule({
  declarations: [GalleryListComponent],
  imports: [
    CommonModule,
    SwiperModule,
    GalleryViewerModule
  ],
  exports:[GalleryListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GalleryListModule { }
