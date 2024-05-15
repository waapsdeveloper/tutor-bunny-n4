import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubeListComponent } from './youtube-list.component';



@NgModule({
  declarations: [YoutubeListComponent],
  imports: [
    CommonModule
  ],
  exports:[YoutubeListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class YoutubeListModule { }
