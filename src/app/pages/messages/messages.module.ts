import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessagesPageRoutingModule } from './messages-routing.module';

import { MessagesPage } from './messages.page';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';
import { MessageListModule } from './message-list/message-list.module';
import { ImageViewModule } from './image-view/image-view.module';
import { SdBbackBtnModule } from 'src/app/components/sd-bback-btn/sd-bback-btn.module';
import { SdBontiBtnModule } from 'src/app/components/sd-bonti-btn/sd-bonti-btn.module';
import { SdBsearchBtnModule } from 'src/app/components/sd-bsearch-btn/sd-bsearch-btn.module';
import { TypingBoxModule } from './typing-box/typing-box.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessagesPageRoutingModule,
    SdHeaderTopModule,
    SdBbackBtnModule,
    SdBsearchBtnModule,
    SdBontiBtnModule,
    MessageListModule,
    ImageViewModule,

    TypingBoxModule
  ],
  declarations: [MessagesPage]
})
export class MessagesPageModule { }
