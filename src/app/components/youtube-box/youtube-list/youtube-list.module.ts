import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubeListComponent } from './youtube-list.component';
import { SwiperModule } from 'swiper/angular';


@NgModule({
  declarations: [YoutubeListComponent],
  imports: [
    CommonModule,
    SwiperModule
  ],
  exports:[YoutubeListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class YoutubeListModule { }
