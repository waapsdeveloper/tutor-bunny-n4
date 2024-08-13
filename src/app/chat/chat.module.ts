import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPageRoutingModule } from './chat-routing.module';

import { ChatPage } from './chat.page';
import { SdHeaderTopModule } from '../components/sd-header-top/sd-header-top.module';
import { NamesPipeModule } from '../pipes/name.pipe.module';
import { ChatListModule } from './chat-list/chat-list.module';
import { RequestListModule } from './request-list/request-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPageRoutingModule,
    SdHeaderTopModule,
    NamesPipeModule,
    ChatListModule,
    RequestListModule
  ],
  declarations: [ChatPage]
})
export class ChatPageModule { }
