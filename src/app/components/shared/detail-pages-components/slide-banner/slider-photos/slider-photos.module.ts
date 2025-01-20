import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { SliderPhotosComponent } from './slider-photos.component';

@NgModule({
  declarations: [SliderPhotosComponent],
  imports: [CommonModule, SwiperModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  exports: [SliderPhotosComponent],
})
export class SliderPhotosModule {}
