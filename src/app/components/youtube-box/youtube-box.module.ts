import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubeBoxComponent } from './youtube-box.component';
import { YoutubeListModule } from './youtube-list/youtube-list.module';



@NgModule({
  declarations: [YoutubeBoxComponent],
  imports: [
    CommonModule, YoutubeListModule
  ],
  exports: [YoutubeBoxComponent],
})
export class YoutubeBoxModule { }
