import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPageRoutingModule } from './chat-routing.module';

import { ChatPage } from './chat.page';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';
import { ChatListModule } from './chat-list/chat-list.module';
import { NamesPipeModule } from 'src/app/pipes/name.pipe.module';
import { ChatPageRequestsButtonModule } from './chat-page-requests-button/chat-page-requests-button.module';
import { RequestListModule } from './request-list/request-list.module';
import { GlobalListViewModule } from "../../components/global-list-view/global-list-view.module";
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPageRoutingModule,
    SdHeaderTopModule,
    NamesPipeModule,
    ChatListModule,
    RequestListModule,
    // additional modules
    ChatPageRequestsButtonModule,
    GlobalListViewModule,
    SwiperModule
],
  declarations: [ChatPage]
})
export class ChatPageModule { }
