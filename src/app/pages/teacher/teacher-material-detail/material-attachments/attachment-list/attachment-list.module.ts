import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { AttachmentListComponent } from './attachment-list.component';



@NgModule({
  declarations: [AttachmentListComponent],
  imports: [
    CommonModule,
    SwiperModule
  ],
  exports:[AttachmentListComponent]
})
export class AttachmentListModule { }
