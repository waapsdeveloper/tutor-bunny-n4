import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPageRoutingModule } from './chat-routing.module';

import { ChatPage } from './chat.page';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';
import { ChatListModule } from './chat-list/chat-list.module';
import { RequestListModule } from '../chat-requests/request-list/request-list.module';
import { NamesPipeModule } from 'src/app/pipes/name.pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPageRoutingModule,
    SdHeaderTopModule,
    NamesPipeModule,
    ChatListModule,
  ],
  declarations: [ChatPage]
})
export class ChatPageModule { }
