import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailLoginPageRoutingModule } from './email-login-routing.module';

import { EmailLoginPage } from './email-login.page';
import { SdHeaderTopModule } from '../components/sd-header-top/sd-header-top.module';
import { SdInputBoxModule } from '../components/sd-input-box/sd-input-box.module';
import { SdButtonGrayModule } from '../components/sd-button-gray/sd-button-gray.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailLoginPageRoutingModule,
    SdHeaderTopModule,
    SdInputBoxModule,
    SdButtonGrayModule
  ],
  declarations: [EmailLoginPage]
})
export class EmailLoginPageModule {}
