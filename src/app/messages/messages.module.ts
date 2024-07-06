import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessagesPageRoutingModule } from './messages-routing.module';

import { MessagesPage } from './messages.page';
import { SdHeaderTopModule } from '../components/sd-header-top/sd-header-top.module';
import { SdBontiBtnModule } from '../components/sd-bonti-btn/sd-bonti-btn.module';
import { SdBsearchBtnModule } from '../components/sd-bsearch-btn/sd-bsearch-btn.module';
import { SdBbackBtnModule } from '../components/sd-bback-btn/sd-bback-btn.module';

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
  ],
  declarations: [MessagesPage]
})
export class MessagesPageModule { }
