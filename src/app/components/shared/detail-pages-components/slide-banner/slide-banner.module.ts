import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideBannerComponent } from './slide-banner.component';
import { SliderPhotosModule } from './slider-photos/slider-photos.module';



@NgModule({
  declarations: [SlideBannerComponent],
  imports: [
    CommonModule,
    SliderPhotosModule
  ],
  exports: [
    SlideBannerComponent
  ]
})
export class SlideBannerModule { }
