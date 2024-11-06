import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatRequestsPageRoutingModule } from './chat-requests-routing.module';

import { ChatRequestsPage } from './chat-requests.page';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';
import { RequestListModule } from "./request-list/request-list.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatRequestsPageRoutingModule,
    SdHeaderTopModule,
    RequestListModule
],
  declarations: [ChatRequestsPage]
})
export class ChatRequestsPageModule {}
