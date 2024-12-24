import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageBoxdComponent } from './message-boxd.component';
import { SwiperModule } from 'swiper/angular';
import { MessageBoxdItemModule } from './message-boxd-item/message-boxd-item.module';


@NgModule({
  declarations: [MessageBoxdComponent],
  imports: [
    CommonModule,
    SwiperModule,
    MessageBoxdItemModule
  ],
  exports: [MessageBoxdComponent]
})
export class MessageBoxdModule { }
