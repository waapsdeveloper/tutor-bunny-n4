import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailLoginPageRoutingModule } from './email-login-routing.module';

import { EmailLoginPage } from './email-login.page';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';
import { SdButtonGrayModule } from 'src/app/components/sd-button-gray/sd-button-gray.module';
import { SdInputBoxModule } from 'src/app/components/sd-input-box/sd-input-box.module';

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
