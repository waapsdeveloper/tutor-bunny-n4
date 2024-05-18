import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailSignupPageRoutingModule } from './email-signup-routing.module';

import { EmailSignupPage } from './email-signup.page';
import { SdInputBoxModule } from '../components/sd-input-box/sd-input-box.module';
import { SdHeaderTopModule } from '../components/sd-header-top/sd-header-top.module';
import { SdButtonGrayModule } from '../components/sd-button-gray/sd-button-gray.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailSignupPageRoutingModule,
    SdHeaderTopModule,
    SdInputBoxModule,
    SdButtonGrayModule
  ],
  declarations: [EmailSignupPage]
})
export class EmailSignupPageModule {}
