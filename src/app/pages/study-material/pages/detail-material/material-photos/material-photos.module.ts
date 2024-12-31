import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { MaterialPhotosComponent } from './material-photos.component';

@NgModule({
  declarations: [MaterialPhotosComponent],
  imports: [CommonModule, SwiperModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  exports: [MaterialPhotosComponent],
})
export class MaterialPhotosModule {}
