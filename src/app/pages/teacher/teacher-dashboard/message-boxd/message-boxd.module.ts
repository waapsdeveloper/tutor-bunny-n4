import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageBoxdComponent } from './message-boxd.component';
import { SwiperModule } from 'swiper/angular';
import { MessageBoxdItemModule } from './message-boxd-item/message-boxd-item.module';
import { RequestListModule } from 'src/app/pages/chat-requests/request-list/request-list.module';


@NgModule({
  declarations: [MessageBoxdComponent],
  imports: [
    CommonModule,
    SwiperModule,
    MessageBoxdItemModule,
    RequestListModule
  ],
  exports: [MessageBoxdComponent]
})
export class MessageBoxdModule { }
