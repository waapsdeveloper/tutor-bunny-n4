import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachmentListComponent } from './attachment-list.component';
import { SwiperModule } from 'swiper/angular';



@NgModule({
  declarations: [AttachmentListComponent],
  imports: [
    CommonModule,
    SwiperModule
  ],
  exports: [
    AttachmentListComponent
  ]
})
export class AttachmentListModule { }
