import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { SdButtonGrayModule } from '../components/sd-button-gray/sd-button-gray.module';
import { SdInputBoxModule } from '../components/sd-input-box/sd-input-box.module';
import { SdHeaderTopModule } from '../components/sd-header-top/sd-header-top.module';
import { SdButtonClearModule } from '../components/sd-button-clear/sd-button-clear.module';
import { ForgetPasswordModule } from './forget-password/forget-password.module';

@NgModule({
  imports: [
    CommonModule,
    ForgetPasswordModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    SdHeaderTopModule,
    SdInputBoxModule,
    SdButtonGrayModule,
    SdButtonClearModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
