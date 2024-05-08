import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubeBoxComponent } from './youtube-box.component';



@NgModule({
  declarations: [YoutubeBoxComponent],
  imports: [
    CommonModule
  ],
  exports: [YoutubeBoxComponent]
})
export class YoutubeBoxModule { }
